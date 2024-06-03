import {
  useMultiplayerState,
  usePlayersList,
  useIsHost,
  myPlayer,
  getState,
} from "playroomkit";

type Die = {
  id: number;
  face: string;
  spent: boolean;
  commit: boolean;
  used: boolean;
};

type PlayerKeep = {
  id: string;
  black: number;
  blue: number;
  red: number;
  purple: number;
  green: number;
};

export function useGameManager() {
  const isHost = useIsHost();
  const me = myPlayer();
  const [gameStarted, setGameStarted] = useMultiplayerState(
    "gameStarted",
    false
  );
  const [mineGems, setMineGems] = useMultiplayerState("mineGems", []);
  const [fieldGems, setFieldGems] = useMultiplayerState("fieldGems", []);
  const [playerGems, setPlayerGems] = useMultiplayerState("playerGems", []);
  const [inChallenge, setInChallenge] = useMultiplayerState(
    "inChallenge",
    false
  );
  const [challenged, setChallenged] = useMultiplayerState("challenged", 0);
  const [challenger, setChallenger] = useMultiplayerState("challenger", 0);
  const [challengeColor, setChallengeColor] = useMultiplayerState(
    "challengeColor",
    ""
  );

  const players = usePlayersList(true);
  players.sort((a, b) => a.id.localeCompare(b.id));

  function startGame() {
    if (!isHost) {
      return;
    }
    setGameStarted(true);
    setupMineGems();
    setupPlayerGems();
    generateDice();
  }

  function setupMineGems() {
    const green = new Array(3).fill(0).map(() => "green");
    const purple = new Array(4).fill(0).map(() => "purple");
    const red = new Array(6).fill(0).map(() => "red");
    const blue = new Array(12).fill(0).map(() => "blue");
    const black = new Array(60).fill(0).map(() => "black");
    setMineGems([...green, ...purple, ...red, ...blue, ...black]);
  }

  function setupPlayerGems() {
    const pg: PlayerKeep[] = [];
    players.forEach((player) => {
      pg.push({
        id: player.id,
        black: 0,
        blue: 0,
        red: 0,
        purple: 0,
        green: 0,
      });
    });
    setPlayerGems([...pg]);
  }

  function myDice() {
    if (!me) {
      return;
    }
    return me.getState("dice");
  }

  function generateDice() {
    players.forEach((player) => {
      const d: Die[] = [];
      for (let i = 1; i <= 8; i++) {
        const face = getNewRandomFace();
        if (!face) {
          continue;
        }
        d.push({
          id: i,
          face: face,
          spent: false,
          commit: false,
          used: false,
        });
      }
      player.setState("dice", [...d]);
      player.setState("gems", []);
      player.setState("rolls", 1);
    });
  }

  function rollDice() {
    if (!me) {
      return;
    }
    const dice = me.getState("dice");
    if (!dice) {
      return;
    }
    const rolls = me.getState("rolls");
    // if (rolls < 1) {
    //   return;
    // }
    const newDice = [];
    for (let i = 0; i <= dice.length; i++) {
      const die = dice[i];
      if (!die) {
        continue;
      }
      if (die.used) {
        newDice.push(die);
      } else {
        const newDie = {
          ...die,
          face: getNewRandomFace(),
        };
        newDice.push(newDie);
      }
    }
    me.setState("dice", newDice);
    me.setState("rolls", rolls - 1);
    checkEndPhase();
  }

  function getNewRandomFace() {
    const index = randomIntFromInterval(1, 6);
    switch (index) {
      case 1:
        return "beers";
      case 2:
        return "horns";
      case 3:
        return "axes";
      case 4:
        return "bombs";
      case 5:
        return "lanterns";
      case 6:
        return "heads";
    }
  }

  function spendDie({
    id,
    color,
    challengedPlayer,
    challengerPlayer,
  }: {
    id: number;
    color?: string;
    challengedPlayer?: number;
    challengerPlayer?: number;
  }) {
    const dice = me.getState("dice");
    const notThisOne = dice.filter((x: Die) => x.id !== id);
    const thisOne = dice.find((x: Die) => x.id === id);
    if (thisOne.spent || thisOne.commit) {
      return;
    }
    const newDie = {
      ...thisOne,
      spent: true,
    };
    me.setState("dice", [...notThisOne, newDie]);
    switch (thisOne.face) {
      case 1:
        spendBeer();
        break;
      case 2:
        spendHorns();
        break;
      case 3:
        spendAxe();
        break;
      case 4:
        spendBomb();
        break;
      case 5:
        spendLantern(color);
        break;
      case 6:
        spendHead({ color, challengedPlayer, challengerPlayer });
        break;
      default:
        break;
    }
    checkEndPhase();
  }

  function commitDie({ id }: { id: number }) {
    const dice = me.getState("dice");
    const notThisOne = dice.filter((x: Die) => x.id !== id);
    const thisOne = dice.find((x: Die) => x.id === id);
    if (thisOne.spent || thisOne.commit) {
      return;
    }
    const newDie = {
      ...thisOne,
      commit: true,
    };
    me.setState("dice", [...notThisOne, newDie]);
    if (thisOne.face === "beer" || thisOne.face === "horns") {
      const allOfType = dice
        .filter((x: Die) => x.face === "beer" || x.face === "horns")
        .filter((x: Die) => !x.used)
        .filter((x: Die) => x.commit === true);
      if (allOfType.length === 3) {
        collectColorFromField({ face: thisOne.face });
        markAllOfFaceUsed({ face: "beer" });
        markAllOfFaceUsed({ face: "horns" });
      }
    } else {
      const allOfType = dice
        .filter((x: Die) => x.face === thisOne.face)
        .filter((x: Die) => !x.used)
        .filter((x: Die) => x.commit === true);
      if (allOfType.length === 3) {
        collectColorFromField({ face: thisOne.face });
        markAllOfFaceUsed({ face: thisOne.face });
      }
    }
    checkEndPhase();
  }

  function markAllOfFaceUsed({ face }: { face: string }) {
    const update = [];
    const dice = me.getState("dice");
    for (let i = 0; i < dice.length; i++) {
      const die = dice[i];
      if (die.face === face) {
        const newDie = {
          ...die,
          used: true,
        };
        update.push(newDie);
      }
    }
    me.setState("dice", update);
  }

  function collectColorFromField({ face }: { face: string }) {
    const color = getColorFromFace({ face });
    if (!color) {
      return;
    }
    const allOfColor = fieldGems.filter((x: string) => x === color);
    const allOthers = fieldGems.filter((x: string) => x != color);
    me.setState("gems", [...me.getState("gems"), ...allOfColor]);
    const thisPlayerGems = playerGems.find((x: PlayerKeep) => x.id === me.id);
    const allOtherPlayerGems = playerGems.filter(
      (x: PlayerKeep) => x.id !== me.id
    );
    thisPlayerGems[color] += allOfColor;
    setPlayerGems([...allOtherPlayerGems, thisPlayerGems]);
    setFieldGems([...allOthers]);
  }

  function getColorFromFace({ face }: { face: string }) {
    switch (face) {
      case "beer":
        return "black";
      case "horns":
        return "black";
      case "axes":
        return "blue";
      case "bombs":
        return "red";
      case "lanterns":
        return "purple";
      case "head":
        return "green";
    }
  }

  function spendBeer() {
    const rolls = me.getState("rolls");
    me.setState("rolls", rolls + 1);
  }

  function spendHorns() {
    const rolls = me.getState("rolls");
    me.setState("rolls", rolls + 2);
  }

  function spendAxe() {
    const gems = getState("gems");
    const index = Math.floor(Math.random() * gems.length);
    const newFieldGem = gems[index];
    const newGemList = gems.splice(index, 1);
    setMineGems([...newGemList]);
    setFieldGems([...fieldGems, newFieldGem]);
    if (!gems.length) {
      checkWinner();
    }
  }

  function spendBomb() {
    const gems = getState("gems");
    const newFieldGems = [];
    for (let i = 1; i <= 3; i++) {
      const index = Math.floor(Math.random() * gems.length);
      const newFieldGem = gems[index];
      newFieldGems.push(newFieldGem);
      gems.splice(index, 1);
    }
    setMineGems([...gems]);
    setFieldGems([...fieldGems, ...newFieldGems]);
    if (!gems.length) {
      checkWinner();
    }
  }

  function spendLantern(color?: string) {
    if (!color) {
      return;
    }
    const gems = getState("gems");
    const index = gems.indexOf((x: string) => x === color);
    gems.slice(index, 1);
    setMineGems([...gems]);
    setFieldGems([...fieldGems, color]);
    if (!gems.length) {
      checkWinner();
    }
  }

  function spendHead({
    challengerPlayer,
    challengedPlayer,
    color,
  }: {
    challengerPlayer?: number;
    challengedPlayer?: number;
    color?: string;
  }) {
    if (inChallenge) {
      return;
    }
    if (!color || !challengedPlayer || !challengerPlayer) {
      return;
    }
    setInChallenge(true);
    setChallenged(challengedPlayer);
    setChallenger(challengerPlayer);
    setChallengeColor(color);
  }

  function checkEndPhase() {}

  function checkWinner() {}

  function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return {
    isHost,
    gameStarted,
    mineGems,
    fieldGems,
    challenged,
    challenger,
    challengeColor,
    startGame,
    myDice,
    rollDice,
    spendDie,
    commitDie,
  };
}
