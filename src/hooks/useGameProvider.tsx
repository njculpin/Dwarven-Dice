import React, { FC, createContext, useEffect, useState } from "react";
import {
  useMultiplayerState,
  myPlayer,
  usePlayersList,
  PlayerState,
} from "playroomkit";

export interface GameContextType {
  players: PlayerState[];
  rolls: number;
  rolling: boolean;
  showColorPicker: boolean;
  mineGreen: number;
  minePurple: number;
  mineRed: number;
  mineBlue: number;
  mineBlack: number;
  fieldGreen: number;
  fieldPurple: number;
  fieldRed: number;
  fieldBlue: number;
  fieldBlack: number;
  myGreen: number;
  myPurple: number;
  myRed: number;
  myBlue: number;
  myBlack: number;
  spentDice: boolean[];
  commitBeers: number;
  commitHorns: number;
  commitAxes: number;
  commitBombs: number;
  commitLanterns: number;
  commitHeads: number;
  reset: boolean;
  selectedDieId: number;
  selectedDieFace: string;
  setShowColorPicker: (show: boolean) => void;
  pickGemFromMine: (color: string, count: number) => void;
  setRolling: (rolling: boolean) => void;
  start: () => void;
  handleAction: (action: string) => void;
  setReset: (reset: boolean) => void;
  setSelectedDieId: (dieId: number) => void;
  handleRoll: () => void;
  handleEndTurn: () => void;
  handlePickColor: (color: string) => void;
  handlePickDie: (face: string, dieId: number) => void;
}

export const GameContext = createContext<GameContextType | null>(null);

const GameProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const me = myPlayer();

  const [mineGreen, setMineGreen] = useMultiplayerState("mineGreen", 0);
  const [minePurple, setMinePurple] = useMultiplayerState("minePurple", 0);
  const [mineRed, setMineRed] = useMultiplayerState("mineRed", 0);
  const [mineBlue, setMineBlue] = useMultiplayerState("mineBlue", 0);
  const [mineBlack, setMineBlack] = useMultiplayerState("mineBlack", 0);

  const [fieldGreen, setFieldGreen] = useMultiplayerState("fieldGreen", 0);
  const [fieldPurple, setFieldPurple] = useMultiplayerState("fieldPurple", 0);
  const [fieldRed, setFieldRed] = useMultiplayerState("fieldRed", 0);
  const [fieldBlue, setFieldBlue] = useMultiplayerState("fieldBlue", 0);
  const [fieldBlack, setFieldBlack] = useMultiplayerState("fieldBlack", 0);

  const [selectedDieId, setSelectedDieId] = useState(0);
  const [selectedDieFace, setSelectedDieFace] = useState("");
  const [rolling, setRolling] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [reset, setReset] = useState(false);
  const rolls = me.getState("rolls") || 0;
  const myGreen = me.getState("myGreen");
  const myPurple = me.getState("myPurple");
  const myRed = me.getState("myRed");
  const myBlue = me.getState("myBlue");
  const myBlack = me.getState("myBlack");
  const commitBeers = me.getState("commitBeers");
  const commitHorns = me.getState("commitHorns");
  const commitAxes = me.getState("commitAxes");
  const commitBombs = me.getState("commitBombs");
  const commitLanterns = me.getState("commitLanterns");
  const commitHeads = me.getState("commitHeads");
  const spentDice = me.getState("spentDice");

  const players = usePlayersList(true);
  players.sort((a, b) => a.id.localeCompare(b.id));

  useEffect(() => {
    if (rolling) {
      if (rolls < 1) {
        return;
      }
      const prev = me.getState("rolls");
      me.setState("rolls", prev - 1, true);
    }
  }, [rolling]);

  function start() {
    setUpPlayers();
    setMineGreen(3);
    setMinePurple(4);
    setMineRed(6);
    setMineBlue(12);
    setMineBlack(60);
  }

  function setUpPlayers() {
    players.forEach((player) => {
      player.setState("rolls", 5);
      player.setState("myGreen", 0);
      player.setState("myPurple", 0);
      player.setState("myRed", 0);
      player.setState("myBlue", 0);
      player.setState("myBlack", 0);
      player.setState("commitHeads", 0);
      player.setState("commitLanterns", 0);
      player.setState("commitBombs", 0);
      player.setState("commitAxes", 0);
      player.setState("commitHorns", 0);
      player.setState("commitBeers", 0);
      player.setState("spentDice", []);
    });
  }

  function getGemsFromMine(amount: number) {
    const green = new Array(mineGreen).fill(0).map(() => "green");
    const purple = new Array(minePurple).fill(0).map(() => "purple");
    const red = new Array(6).fill(mineRed).map(() => "red");
    const blue = new Array(12).fill(mineBlue).map(() => "blue");
    const black = new Array(60).fill(mineBlack).map(() => "black");
    const all = [...green, ...purple, ...red, ...blue, ...black];
    const removeThese = [];
    for (let i = 0; i < amount; i++) {
      const index = Math.floor(Math.random() * all.length);
      removeThese.push(all[index]);
    }
    const countGreen = removeThese.filter((v) => v === "green").length;
    const countPurple = removeThese.filter((v) => v === "purple").length;
    const countRed = removeThese.filter((v) => v === "red").length;
    const countBlue = removeThese.filter((v) => v === "blue").length;
    const countBlack = removeThese.filter((v) => v === "black").length;
    if (countGreen > 0) {
      pickGemFromMine("green", countGreen);
    }
    if (countPurple > 0) {
      pickGemFromMine("purple", countPurple);
    }
    if (countRed > 0) {
      pickGemFromMine("red", countRed);
    }
    if (countBlue > 0) {
      pickGemFromMine("blue", countBlue);
    }
    if (countBlack > 0) {
      pickGemFromMine("black", countBlack);
    }
  }

  function pickGemFromMine(color: string, count: number) {
    switch (color) {
      case "green":
        setMineGreen(mineGreen - count, true);
        setFieldGreen(fieldGreen + count, true);
        return;
      case "purple":
        setMinePurple(minePurple - count, true);
        setFieldPurple(fieldPurple + count, true);
        return;
      case "red":
        setMineRed(mineRed - count, true);
        setFieldRed(fieldRed + count, true);
        return;
      case "blue":
        setMineBlue(mineBlue - count, true);
        setFieldBlue(fieldBlue + count, true);
        return;
      case "black":
        setMineBlack(mineBlack - count, true);
        setFieldBlack(fieldBlack + count, true);
        return;
      default:
        return;
    }
  }

  function collectColorFromField(color: string) {
    const green = me.getState("myGreen") + fieldGreen;
    const purple = me.getState("purple") + fieldPurple;
    const red = me.getState("myRed") + fieldRed;
    const blue = me.getState("myBlue") + fieldBlue;
    const black = me.getState("myBlack") + fieldBlack;
    switch (color) {
      case "green":
        me.setState("myGreen", green);
        setFieldGreen(0);
        return;
      case "purple":
        me.setState("myPurple", purple);
        setFieldPurple(0);
        return;
      case "red":
        me.setState("myRed", red);
        setFieldRed(0);
        return;
      case "blue":
        me.setState("myBlue", blue);
        setFieldBlue(0);
        return;
      case "black":
        me.setState("myBlack", black);
        setFieldBlack(0);
        return;
      default:
        return;
    }
  }

  function addRoll(amount: number) {
    const prev = me.getState("rolls");
    me.setState("rolls", prev + amount, true);
  }

  function setRolls(amount: number) {
    me.setState("rolls", amount, true);
  }

  function handleAction(action: string) {
    const face = selectedDieFace;
    destroyDie();
    handleUnPickDie();
    const commitHeads = me.getState("commitHeads");
    const commitLanterns = me.getState("commitLanterns");
    const commitBombs = me.getState("commitBombs");
    const commitAxes = me.getState("commitAxes");
    const commitHorns = me.getState("commitHorns");
    const commitBeers = me.getState("commitBeers");
    switch (face) {
      case "beers":
        switch (action) {
          case "spend":
            return addRoll(1);
          case "commit":
            if (commitBeers + 1 === 3) {
              me.setState("commitBeers", 0);
              collectColorFromField("black");
            } else if (
              (commitBeers + 1 === 1 && commitHorns === 1) ||
              (commitBeers === 1 && commitHorns + 1 === 1)
            ) {
              me.setState("commitBeers", 0);
              me.setState("commitHorns", 0);
              collectColorFromField("black");
            } else {
              me.setState("commitBeers", commitBeers + 1);
            }
            return;
          default:
            return;
        }
      case "horns":
        switch (action) {
          case "spend":
            return addRoll(2);
          case "commit":
            if (commitHorns + 1 === 3) {
              me.setState("commitHorns", 0);
              collectColorFromField("black");
            } else if (commitBeers === 1 && commitHorns === 1) {
              me.setState("commitBeers", 0);
              me.setState("commitHorns", 0);
              collectColorFromField("black");
            } else {
              me.setState("commitHorns", commitHorns + 1);
            }
            return;
          default:
            return;
        }
      case "axes":
        switch (action) {
          case "spend":
            return getGemsFromMine(1);
          case "commit":
            console.log(commitAxes);
            if (commitAxes + 1 === 3) {
              me.setState("commitAxes", 0);
              collectColorFromField("blue");
            } else {
              me.setState("commitAxes", commitAxes + 1);
            }
            return;
          default:
            return;
        }
      case "bombs":
        switch (action) {
          case "spend":
            return getGemsFromMine(3);
          case "commit":
            if (commitBombs + 1 === 3) {
              me.setState("commitBombs", 0);
              collectColorFromField("red");
            } else {
              console.log("commitBombs", commitBombs);
              me.setState("commitBombs", commitBombs + 1);
            }
            return;
          default:
            return;
        }
      case "lanterns":
        switch (action) {
          case "spend":
            return setShowColorPicker(true);
          case "commit":
            if (commitLanterns + 1 === 3) {
              me.setState("commitLanterns", 0);
              collectColorFromField("purple");
            } else {
              me.setState("commitLanterns", commitLanterns + 1);
            }
            return;
          default:
            return;
        }
      case "heads":
        switch (action) {
          case "spend":
            // challenge
            return;
          case "commit":
            if (commitHeads + 1 === 3) {
              me.setState("commitHeads", 0);
              collectColorFromField("green");
            } else {
              me.setState("commitHeads", commitHeads + 1);
            }
            return;
          default:
            return;
        }
    }
  }

  function handlePickColor(color: string) {
    pickGemFromMine(color, 1);
    setShowColorPicker(false);
  }

  function handleEndTurn() {
    setReset(true);
    setRolls(1);
    setSelectedDieId(0);
    me.setState("spentDice", []);
  }

  function handleRoll() {
    setRolling(true);
    setSelectedDieId(0);
  }

  function handlePickDie(face: string, dieId: number) {
    setSelectedDieId(dieId);
    setSelectedDieFace(face);
  }

  function handleUnPickDie() {
    setSelectedDieId(0);
    setSelectedDieFace("");
  }

  function destroyDie() {
    switch (selectedDieId) {
      case 1:
        me.setState("spentD1", true);
        return;
      case 2:
        me.setState("spentD2", true);
        return;
      case 3:
        me.setState("spentD3", true);
        return;
      case 4:
        me.setState("spentD4", true);
        return;
      case 5:
        me.setState("spentD5", true);
        return;
      case 6:
        me.setState("spentD6", true);
        return;
      case 7:
        me.setState("spentD7", true);
        return;
      case 8:
        me.setState("spentD8", true);
        return;
      default:
        break;
    }
  }

  const value: GameContextType = {
    players,
    rolls,
    rolling,
    showColorPicker,
    mineGreen,
    minePurple,
    mineRed,
    mineBlue,
    mineBlack,
    fieldGreen,
    fieldPurple,
    fieldRed,
    fieldBlue,
    fieldBlack,
    myGreen,
    myPurple,
    myRed,
    myBlue,
    myBlack,
    spentDice,
    commitBeers,
    commitHorns,
    commitAxes,
    commitBombs,
    commitLanterns,
    commitHeads,
    reset,
    selectedDieId,
    selectedDieFace,
    setShowColorPicker,
    pickGemFromMine,
    setRolling,
    start,
    handleAction,
    setReset,
    setSelectedDieId,
    handleRoll,
    handleEndTurn,
    handlePickColor,
    handlePickDie,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default GameProvider;
