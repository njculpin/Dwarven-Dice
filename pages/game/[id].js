import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../utils/supabaseClient";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Modal from "react-modal";

// Game Imports
import roll from "../../game/roll";
import pass from "../../game/pass";
import end from "../../game/end";
import axebombs from "../../game/spend/axebombs";
import beerhorns from "../../game/spend/beerhorns";
import heads from "../../game/spend/heads";
import lanterns from "../../game/spend/lanterns";
import commit from "../../game/commit/committer";
import collect from "../../game/collect/collect";

Modal.setAppElement("#__next");

export default function Game() {
  const router = useRouter();
  const [game, setGameState] = useState({
    game_version: 1,
    game_uid: "",
    host: "",
    turns: 0,
    players: 0,
    active_player: "",
    secondary_player: "",
    active_player_rolls: 0,
    secondary_player_rolls: 0,
    p1_address: "",
    p2_address: "",
    p3_address: "",
    p4_address: "",
    p5_address: "",
    die1_face: 0,
    die2_face: 0,
    die3_face: 0,
    die4_face: 0,
    die5_face: 0,
    die6_face: 0,
    die7_face: 0,
    die8_face: 0,
    die1_state: 0,
    die2_state: 0,
    die3_state: 0,
    die4_state: 0,
    die5_state: 0,
    die6_state: 0,
    die7_state: 0,
    die8_state: 0,
    die1_location: "",
    die2_location: "",
    die3_location: "",
    die4_location: "",
    die5_location: "",
    die6_location: "",
    die7_location: "",
    die8_location: "",
    green_mine: 3,
    purple_mine: 4,
    red_mine: 6,
    blue_mine: 12,
    black_mine: 60,
    green_table: 0,
    purple_table: 0,
    red_table: 0,
    blue_table: 0,
    black_table: 0,
    green_p1: 0,
    purple_p1: 0,
    red_p1: 0,
    blue_p1: 0,
    black_p1: 0,
    green_p2: 0,
    purple_p2: 0,
    red_p2: 0,
    blue_p2: 0,
    black_p2: 0,
    green_p3: 0,
    purple_p3: 0,
    red_p3: 0,
    blue_p3: 0,
    black_p3: 0,
    green_p4: 0,
    purple_p4: 0,
    red_p4: 0,
    blue_p4: 0,
    black_p4: 0,
    green_p5: 0,
    purple_p5: 0,
    red_p5: 0,
    blue_p5: 0,
    black_p5: 0,
  });

  const [winner, setWinner] = useState("");
  const [profile, setProfile] = useState(null);
  const [headDie, setHeadDie] = useState(0);
  const [headModalIsOpen, setHeadModalOpen] = useState(false);
  const [lanternDie, setLanternDie] = useState(0);
  const [lanternModalIsOpen, setLanternModalIsOpen] = useState(false);
  const [isLoadModalOpen, setLoadModalIsOpen] = useState(false);
  const [tip, setTip] = useState("");

  useEffect(() => {
    fetchProfile();
    getGameState();
    const query = String(`gamestates:game_uid=eq.${router.query.id}`);
    const mySubscription = supabase
      .from(query)
      .on("*", (payload) => {
        setGameState(payload.new);
      })
      .subscribe();
    return () => {
      supabase.removeSubscription(mySubscription);
    };
  }, []);

  useEffect(() => {
    if (game) {
      setGameState(game);
      let totalMine =
        game.green_mine +
        game.purple_mine +
        game.red_mine +
        game.blue_mine +
        game.black_mine;
      if (totalMine <= 0) {
        end(router.query.id).then((res) => {
          setLoadModalIsOpen(false);
          if (res) {
            setWinner(res.player_uid);
          }
        });
      }
    }
  }, [game]);

  const getGameState = async () => {
    const { data, error } = await supabase
      .from("gamestates")
      .select()
      .match({ game_uid: router.query.id });
    if (error) {
      console.log(`error -> ${JSON.stringify(error)}`);
    } else {
      setGameState(data[0]);
    }
  };

  const openLanternModal = (die) => {
    if (die === 1) {
      if (game.die1_state === 0) {
        setLanternDie(die);
        setLanternModalIsOpen(true);
      }
    }
    if (die === 2) {
      if (game.die2_state === 0) {
        setLanternDie(die);
        setLanternModalIsOpen(true);
      }
    }
    if (die === 3) {
      if (game.die3_state === 0) {
        setLanternDie(die);
        setLanternModalIsOpen(true);
      }
    }
    if (die === 4) {
      if (game.die4_state === 0) {
        setLanternDie(die);
        setLanternModalIsOpen(true);
      }
    }
    if (die === 5) {
      if (game.die5_state === 0) {
        setLanternDie(die);
        setLanternModalIsOpen(true);
      }
    }
    if (die === 6) {
      if (game.die6_state === 0) {
        setLanternDie(die);
        setLanternModalIsOpen(true);
      }
    }
    if (die === 7) {
      if (game.die7_state === 0) {
        setLanternDie(die);
        setLanternModalIsOpen(true);
      }
    }
    if (die === 8) {
      if (game.die8_state === 0) {
        setLanternDie(die);
        setLanternModalIsOpen(true);
      }
    }
  };

  const openHeadModal = (die) => {
    // check player count
    // if only one player prevent this
    if (die === 1) {
      if (game.die1_state === 0) {
        setHeadDie(die);
        setHeadModalOpen(true);
      }
    }
    if (die === 2) {
      if (game.die2_state === 0) {
        setHeadDie(die);
        setHeadModalOpen(true);
      }
    }
    if (die === 3) {
      if (game.die3_state === 0) {
        setHeadDie(die);
        setHeadModalOpen(true);
      }
    }
    if (die === 4) {
      if (game.die4_state === 0) {
        setHeadDie(die);
        setHeadModalOpen(true);
      }
    }
    if (die === 5) {
      if (game.die5_state === 0) {
        setHeadDie(die);
        setHeadModalOpen(true);
      }
    }
    if (die === 6) {
      if (game.die6_state === 0) {
        setHeadDie(die);
        setHeadModalOpen(true);
      }
    }
    if (die === 7) {
      if (game.die7_state === 0) {
        setHeadDie(die);
        setHeadModalOpen(true);
      }
    }
    if (die === 8) {
      if (game.die8_state === 0) {
        setHeadDie(die);
        setHeadModalOpen(true);
      }
    }
  };

  const closeLanternModal = (color) => {
    setLoadModalIsOpen(true);
    setLanternModalIsOpen(false);

    lanterns(lanternDie, router.query.id, color).then(() => {
      setLoadModalIsOpen(false);
    });
  };

  const closeHeadModal = (secondary_player) => {
    setLoadModalIsOpen(true);
    setHeadModalOpen(false);

    heads(headDie, router.query.id, secondary_player).then(() => {
      setLoadModalIsOpen(false);
    });
  };

  const fetchProfile = async () => {
    const profileData = supabase.auth.user();
    if (!profileData) {
      router.push("/sign-in");
    } else {
      setProfile(profileData);
    }
  };

  const rollAllDie = () => {
    if (profile) {
      if (
        game.active_player === profile.id ||
        game.secondary_player === profile.id
      ) {
        if (game.active_player_rolls >= 1 || game.secondary_player_rolls >= 1) {
          setLoadModalIsOpen(true);

          roll(router.query.id, profile.id).then(() => {
            setLoadModalIsOpen(false);
          });
        } else {
          setTip("sorry you have no rolls! spend a beer or horns to get more.");
        }
      } else {
        setTip("sorry its not your turn to roll");
      }
    }
  };

  const passTurn = () => {
    setLoadModalIsOpen(true);
    pass(router.query.id, game.active_player, profile.id).then(() => {
      setLoadModalIsOpen(false);
    });
  };

  const getFaceValue = (value) => {
    switch (value) {
      case 0:
        return "head";
      case 1:
        return "lantern";
      case 2:
        return "bomb";
      case 3:
        return "axe";
      case 4:
        return "horns";
      case 5:
        return "beers";
    }
  };

  const collectOnCommits = () => {
    setLoadModalIsOpen(true);
    collect(router.query.id).then(() => {
      setLoadModalIsOpen(false);
    });
  };

  const getTip = (action, face) => {
    if (action === "spend") {
      switch (face) {
        case 0:
          return setTip(
            "Take the remaining dice divided in half and rounded up and give them to another player of your choice. Select a color of gem they control. Each player rolls. If you roll more heads from the player you selected, you recieve all the gems of the chosen color."
          );
        case 1:
          return setTip(
            "select a color gem of your choice from the mine and move it to the table"
          );
        case 2:
          return setTip(
            "remove three random gems from the mine and move them to the table"
          );
        case 3:
          return setTip(
            "remove a random gem from the mine and move them to the table"
          );
        case 4:
          return setTip("get 2 rerolls");
        case 5:
          return setTip("get 1 reroll");
      }
    }
    if (action === "commit") {
      switch (face) {
        case 0:
          return setTip(
            "Keep 3 Heads then press commit to collect all green gems from the table"
          );
        case 1:
          return setTip(
            "Keep 3 Heads then press commit to collect all purple gems from the table"
          );
        case 2:
          return setTip(
            "Keep 3 Heads then press commit to collect all red gems from the table"
          );
        case 3:
          return setTip(
            "Keep 3 Heads then press commit to collect all blue gems from the table"
          );
        case 4:
          return setTip(
            "Keep 1 Horn and 2 Beers then press commit to collect all black gems from the table"
          );
        case 5:
          return setTip(
            "Keep 3 Beers then press commit to collect all black gems from the table"
          );
      }
    }
  };

  const activateDie = (action, face, number) => {
    if (action === "spend") {
      if (face === 0) {
        if (game.players >= 2) {
          setLoadModalIsOpen(true);
          console.log(`game.players -> ${game.players}`);
          openHeadModal(number);
        } else {
          setTip("Not enough players to challenge");
        }
      }
      if (face === 1) {
        setLoadModalIsOpen(true);
        if (
          game.green_mine +
            game.purple_mine +
            game.red_mine +
            game.blue_mine +
            game.black_mine >=
          3
        ) {
          setLoadModalIsOpen(false);
        }
        openLanternModal(number);
      }
      if (face === 2 || face === 3) {
        setLoadModalIsOpen(true);
        axebombs(number, router.query.id).then(() => {
          setLoadModalIsOpen(false);
        });
      }
      if (face === 4 || face === 5) {
        setLoadModalIsOpen(true);
        beerhorns(number, game.game_uid, profile.id).then(() => {
          setLoadModalIsOpen(false);
        });
      }
    }

    if (action === "commit") {
      setLoadModalIsOpen(true);
      commit(number, router.query.id).then(() => {
        setLoadModalIsOpen(false);
      });
    }
  };

  const dieSpendButtonStyle = (state) => {
    switch (state) {
      case 1:
        return "border px-4 py-2 text-center text-gray-100";
      case 2:
        return "border px-4 py-2 text-center";
      default:
        return "border px-4 py-2 text-center shadow-lg";
    }
  };

  const rollButtonStyle = () => {
    if (profile) {
      if (game.active_player === profile.id) {
        if (game.active_player_rolls >= 1) {
          return "border px-4 py-2 text-center shadow-lg";
        } else {
          return "border px-4 py-2 text-center";
        }
      } else {
        return "border px-4 py-2 text-center";
      }
    } else {
      return "border px-4 py-2 text-center";
    }
  };

  const commitButtonStyle = () => {
    if (profile) {
      if (game.active_player === profile.id) {
        return "border px-4 py-2 text-center shadow-lg";
      } else {
        return "border px-4 py-2 text-center";
      }
    } else {
      return "border px-4 py-2 text-center";
    }
  };

  const passButtonStyle = () => {
    if (profile) {
      if (game.active_player === profile.id) {
        return "border px-4 py-2 text-center shadow-lg";
      } else {
        return "border px-4 py-2 text-center";
      }
    } else {
      return "border px-4 py-2 text-center";
    }
  };

  const dieCommitButtonStyle = (state) => {
    switch (state) {
      case 1:
        return "border px-4 py-2 text-center";
      case 2:
        return "border px-4 py-2 text-center text-gray-100";
      default:
        return "border px-4 py-2 text-center shadow-lg";
    }
  };

  const rollsAvailable = (player) => {
    if (player) {
      if (game.active_player === player) {
        return game.active_player_rolls;
      }

      if (game.secondary_player === player) {
        return game.secondary_player_rolls;
      }
    }
  };

  const activePlayerStyle = (player_address) => {
    if (player_address !== "") {
      if (game.active_player === player_address) {
        return "w-full p-2 border-4 border-green-400";
      }
      if (game.secondary_player === player_address) {
        return "w-full p-2 border-4 border-blue-400";
      }
      if (
        game.active_player !== player_address &&
        game.active_player !== player_address
      ) {
        return "w-full p-2 border-4 border-black";
      }
    } else {
      return "w-full p-2 border-2 border-black";
    }
  };

  const activeDieStyle = (player_location) => {
    if (player_location !== "") {
      if (player_location === game.active_player) {
        return "grid grid-flow-col grid-cols-1 grid-rows-3 justify-center items-center gap-4 border-4 border-green-400 p-2";
      }
      if (player_location === game.secondary_player) {
        return "grid grid-flow-col grid-cols-1 grid-rows-3 justify-center items-center gap-4 border-4 border-blue-400 p-2";
      }
      if (
        player_location !== game.active_player &&
        player_location !== game.secondary_player
      ) {
        return "grid grid-flow-col grid-cols-1 grid-rows-3 justify-center items-center gap-4 border p-2";
      }
    } else {
      return "grid grid-flow-col grid-cols-1 grid-rows-3 justify-center items-center gap-4 border p-2";
    }
  };

  const getDiceStyle = (value) => {
    switch (value) {
      case 0:
        return "bg-green-500 rounded-full h-14 text-white flex justify-center items-center";
      case 1:
        return "bg-purple-500 rounded-full h-14 text-white flex justify-center items-center";
      case 2:
        return "bg-red-500 rounded-full h-14 text-white flex justify-center items-center";
      case 3:
        return "bg-blue-500 rounded-full h-14 text-white flex justify-center items-center";
      case 4:
        return "bg-black rounded-full h-14 text-white flex justify-center items-center";
      case 5:
        return "bg-black rounded-full h-14 text-white flex justify-center items-center";
    }
  };

  if (winner !== "") {
    return (
      <div className="p-2 flex flex-col justify-center items-center space-y-4">
        <h1>WINNER {winner}!</h1>
      </div>
    );
  }

  if (!game) {
    return null;
  }

  if (game) {
    return (
      <div className="p-2 flex flex-col justify-center items-center space-y-4">
        <div className="grid grid-flow-col grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-4 text-center">
          <div className="border w-full bg-black">
            <h1 className="text-white font-bold text-lg">Mine</h1>
            <div className="grid grid-flow-col grid-cols-5">
              <div className="span-1 bg-green-500 p-2">{game.green_mine}</div>
              <div className="span-1 bg-purple-500 p-2">{game.purple_mine}</div>
              <div className="span-1 bg-red-500 p-2">{game.red_mine}</div>
              <div className="span-1 bg-blue-500 p-2">{game.blue_mine}</div>
              <div className="span-1 bg-gray-500 p-2">{game.black_mine}</div>
            </div>
          </div>
          <div className="border w-full bg-black">
            <h1 className="text-white font-bold text-lg">Table</h1>
            <div className="grid grid-flow-col grid-cols-5">
              <div className="span-1 bg-green-500 p-2">{game.green_table}</div>
              <div className="span-1 bg-purple-500 p-2">
                {game.purple_table}
              </div>
              <div className="span-1 bg-red-500 p-2">{game.red_table}</div>
              <div className="span-1 bg-blue-500 p-2">{game.blue_table}</div>
              <div className="span-1 bg-gray-500 p-2">{game.black_table}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-flow-col grid-cols-2 grid-rows-3 md:grid-cols-5 md:grid-rows-1 gap-4 text-center">
          <div className={activePlayerStyle(game.p1_address)}>
            {game.p1_address && (
              <h1>{rollsAvailable(game.p1_address)} rolls remaining</h1>
            )}
            <h1 className="truncate p-2">
              {game.p1_address ? game.p1_address : "empty seat"}
            </h1>
            {game.p1_address && (
              <div className="grid grid-flow-col grid-cols-5">
                <div className="span-1 bg-green-500 p-2">{game.green_p1}</div>
                <div className="span-1 bg-purple-500 p-2">{game.purple_p1}</div>
                <div className="span-1 bg-red-500 p-2">{game.red_p1}</div>
                <div className="span-1 bg-blue-500 p-2">{game.blue_p1}</div>
                <div className="span-1 bg-gray-500 p-2">{game.black_p1}</div>
              </div>
            )}
          </div>
          <div className={activePlayerStyle(game.p2_address)}>
            {game.p2_address && (
              <h1>{rollsAvailable(game.p2_address)} rolls remaining</h1>
            )}
            <h1 className="truncate p-2">
              {game.p2_address ? game.p2_address : "empty seat"}
            </h1>
            {game.p2_address && (
              <div className="grid grid-flow-col grid-cols-5">
                <div className="span-1 bg-green-500 p-2">{game.green_p2}</div>
                <div className="span-1 bg-purple-500 p-2">{game.purple_p2}</div>
                <div className="span-1 bg-red-500 p-2">{game.red_p2}</div>
                <div className="span-1 bg-blue-500 p-2">{game.blue_p2}</div>
                <div className="span-1 bg-gray-500 p-2">{game.black_p2}</div>
              </div>
            )}
          </div>
          <div className={activePlayerStyle(game.p3_address)}>
            {game.p3_address && (
              <h1>{rollsAvailable(game.p2_address)} rolls remaining</h1>
            )}
            <h1 className="truncate p-2">
              {game.p3_address ? game.p3_address : "empty seat"}
            </h1>
            {game.p3_address && (
              <div className="grid grid-flow-col grid-cols-5">
                <div className="span-1 bg-green-500 p-2">{game.green_p3}</div>
                <div className="span-1 bg-purple-500 p-2">{game.purple_p3}</div>
                <div className="span-1 bg-red-500 p-2">{game.red_p3}</div>
                <div className="span-1 bg-blue-500 p-2">{game.blue_p3}</div>
                <div className="span-1 bg-gray-500 p-2">{game.black_p3}</div>
              </div>
            )}
          </div>
          <div className={activePlayerStyle(game.p4_address)}>
            {game.p4_address && (
              <h1>{rollsAvailable(game.p4_address)} rolls remaining</h1>
            )}
            <h1 className="truncate p-2">
              {game.p4_address ? game.p4_address : "empty seat"}
            </h1>
            {game.p4_address && (
              <div className="grid grid-flow-col grid-cols-5">
                <div className="span-1 bg-green-500 p-2">{game.green_p4}</div>
                <div className="span-1 bg-purple-500 p-2">{game.purple_p4}</div>
                <div className="span-1 bg-red-500 p-2">{game.red_p4}</div>
                <div className="span-1 bg-blue-500 p-2">{game.blue_p4}</div>
                <div className="span-1 bg-gray-500 p-2">{game.black_p4}</div>
              </div>
            )}
          </div>
          <div className={activePlayerStyle(game.p5_address)}>
            {game.p5_address && (
              <h1>{rollsAvailable(game.p5_address)} rolls remaining</h1>
            )}
            <h1 className="truncate p-2">
              {game.p5_address ? game.p5_address : "empty seat"}
            </h1>
            {game.p5_address && (
              <div className="grid grid-flow-col grid-cols-5">
                <div className="span-1 bg-green-500 p-2">{game.green_p5}</div>
                <div className="span-1 bg-purple-500 p-2">{game.purple_p5}</div>
                <div className="span-1 bg-red-500 p-2">{game.red_p5}</div>
                <div className="span-1 bg-blue-500 p-2">{game.blue_p5}</div>
                <div className="span-1 bg-gray-500 p-2">{game.black_p5}</div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-flow-col grid-cols-4 grid-rows-2 md:grid-cols-8 md:grid-rows-1 gap-4">
          <div className={activeDieStyle(game.die1_location)}>
            <button
              onMouseOver={() => getTip("spend", game.die1_face)}
              onMouseLeave={() => setTip("")}
              className={dieSpendButtonStyle(game.die1_state)}
              onClick={() => activateDie("spend", game.die1_face, 1)}
            >
              <h1>Spend</h1>
            </button>
            <div className={getDiceStyle(game.die1_face)}>
              {getFaceValue(game.die1_face)}
            </div>
            <button
              onMouseOver={() => getTip("commit", game.die1_face)}
              onMouseLeave={() => setTip("")}
              className={dieCommitButtonStyle(game.die1_state)}
              onClick={() => activateDie("commit", game.die1_face, 1)}
            >
              <h1>Keep</h1>
            </button>
          </div>

          <div className={activeDieStyle(game.die2_location)}>
            <button
              onMouseOver={() => getTip("spend", game.die2_face)}
              onMouseLeave={() => setTip("")}
              className={dieSpendButtonStyle(game.die2_state)}
              onClick={() => activateDie("spend", game.die2_face, 2)}
            >
              <h1>Spend</h1>
            </button>
            <div className={getDiceStyle(game.die2_face)}>
              {getFaceValue(game.die2_face)}
            </div>
            <button
              onMouseOver={() => getTip("commit", game.die2_face)}
              onMouseLeave={() => setTip("")}
              className={dieCommitButtonStyle(game.die2_state)}
              onClick={() => activateDie("commit", game.die2_face, 2)}
            >
              <h1>Keep</h1>
            </button>
          </div>

          <div className={activeDieStyle(game.die3_location)}>
            <button
              onMouseOver={() => getTip("spend", game.die3_face)}
              onMouseLeave={() => setTip("")}
              className={dieSpendButtonStyle(game.die3_state)}
              onClick={() => activateDie("spend", game.die3_face, 3)}
            >
              <h1>Spend</h1>
            </button>
            <div className={getDiceStyle(game.die3_face)}>
              {getFaceValue(game.die3_face)}
            </div>
            <button
              onMouseOver={() => getTip("commit", game.die3_face)}
              onMouseLeave={() => setTip("")}
              className={dieCommitButtonStyle(game.die3_state)}
              onClick={() => activateDie("commit", game.die3_face, 3)}
            >
              <h1>Keep</h1>
            </button>
          </div>

          <div className={activeDieStyle(game.die4_location)}>
            <button
              onMouseOver={() => getTip("spend", game.die4_face)}
              onMouseLeave={() => setTip("")}
              className={dieSpendButtonStyle(game.die4_state)}
              onClick={() => activateDie("spend", game.die4_face, 4)}
            >
              <h1>Spend</h1>
            </button>
            <div className={getDiceStyle(game.die4_face)}>
              {getFaceValue(game.die4_face)}
            </div>
            <button
              onMouseOver={() => getTip("commit", game.die4_face)}
              onMouseLeave={() => setTip("")}
              className={dieCommitButtonStyle(game.die4_state)}
              onClick={() => activateDie("commit", game.die4_face, 4)}
            >
              <h1>Keep</h1>
            </button>
          </div>

          <div className={activeDieStyle(game.die5_location)}>
            <button
              onMouseOver={() => getTip("spend", game.die5_face)}
              onMouseLeave={() => setTip("")}
              className={dieSpendButtonStyle(game.die5_state)}
              onClick={() => activateDie("spend", game.die5_face, 5)}
            >
              <h1>Spend</h1>
            </button>
            <div className={getDiceStyle(game.die5_face)}>
              {getFaceValue(game.die5_face)}
            </div>
            <button
              onMouseOver={() => getTip("commit", game.die6_face)}
              onMouseLeave={() => setTip("")}
              className={dieCommitButtonStyle(game.die5_state)}
              onClick={() => activateDie("commit", game.die5_face, 5)}
            >
              <h1>Keep</h1>
            </button>
          </div>

          <div className={activeDieStyle(game.die6_location)}>
            <button
              onMouseOver={() => getTip("spend", game.die6_face)}
              onMouseLeave={() => setTip("")}
              className={dieSpendButtonStyle(game.die6_state)}
              onClick={() => activateDie("spend", game.die6_face, 6)}
            >
              <h1>Spend</h1>
            </button>
            <div className={getDiceStyle(game.die6_face)}>
              {getFaceValue(game.die6_face)}
            </div>
            <button
              onMouseOver={() => getTip("commit", game.die6_face)}
              onMouseLeave={() => setTip("")}
              className={dieCommitButtonStyle(game.die6_state)}
              onClick={() => activateDie("commit", game.die6_face, 6)}
            >
              <h1>Keep</h1>
            </button>
          </div>

          <div className={activeDieStyle(game.die7_location)}>
            <button
              onMouseOver={() => getTip("spend", game.die7_face)}
              onMouseLeave={() => setTip("")}
              className={dieSpendButtonStyle(game.die7_state)}
              onClick={() => activateDie("spend", game.die7_face, 7)}
            >
              <h1>Spend</h1>
            </button>
            <div className={getDiceStyle(game.die7_face)}>
              {getFaceValue(game.die7_face)}
            </div>
            <button
              onMouseOver={() => getTip("commit", game.die7_face)}
              onMouseLeave={() => setTip("")}
              className={dieCommitButtonStyle(game.die7_state)}
              onClick={() => activateDie("commit", game.die7_face, 7)}
            >
              <h1>Keep</h1>
            </button>
          </div>

          <div className={activeDieStyle(game.die8_location)}>
            <button
              onMouseOver={() => getTip("spend", game.die8_face)}
              onMouseLeave={() => setTip("")}
              className={dieSpendButtonStyle(game.die8_state)}
              onClick={() => activateDie("spend", game.die8_face, 8)}
            >
              <h1>Spend</h1>
            </button>
            <div className={getDiceStyle(game.die8_face)}>
              {getFaceValue(game.die8_face)}
            </div>
            <button
              onMouseOver={() => getTip("commit", game.die8_face)}
              onMouseLeave={() => setTip("")}
              className={dieCommitButtonStyle(game.die8_state)}
              onClick={() => activateDie("commit", game.die8_face, 8)}
            >
              <h1>Keep</h1>
            </button>
          </div>
        </div>

        <div className="w-1/2 flex justify-between items-center p-4">
          <button className={rollButtonStyle()} onClick={() => rollAllDie()}>
            <h1>Roll</h1>
          </button>
          <button
            className={commitButtonStyle()}
            onClick={() => collectOnCommits()}
          >
            <h1>Collect</h1>
          </button>
          <button className={passButtonStyle()} onClick={() => passTurn()}>
            <h1>Pass</h1>
          </button>
          <p>Turn {game.turns}</p>
          <p>Its {game.active_player} Turn</p>
        </div>

        <div className="w-1/2 flex justify-between items-center p-4 text-center">
          <p className="w-full italic">{tip}</p>
        </div>

        {/* LANTERN COLOR SELECTOR MODAL */}
        <Modal
          isOpen={lanternModalIsOpen}
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
            },
          }}
          contentLabel="Select a color to remove from the Mine"
        >
          <div className="grid grid-flow-col grid-cols-5">
            {game.green_mine >= 1 && (
              <div className="span-1 bg-green-500 p-2">
                <button
                  className="w-full h-full"
                  onClick={() => closeLanternModal("green")}
                >
                  {game.green_mine}
                </button>
              </div>
            )}
            {game.purple_mine >= 1 && (
              <div className="span-1 bg-purple-500 p-2">
                <button
                  className="w-full h-full"
                  onClick={() => closeLanternModal("purple")}
                >
                  {game.purple_mine}
                </button>
              </div>
            )}
            {game.red_mine >= 1 && (
              <div className="span-1 bg-red-500 p-2">
                <button
                  className="w-full h-full"
                  onClick={() => closeLanternModal("red")}
                >
                  {game.red_mine}
                </button>
              </div>
            )}
            {game.blue_mine >= 1 && (
              <div className="span-1 bg-blue-500 p-2">
                <button
                  className="w-full h-full"
                  onClick={() => closeLanternModal("blue")}
                >
                  {game.blue_mine}
                </button>
              </div>
            )}
            {game.black_mine >= 1 && (
              <div className="span-1 bg-gray-500 p-2">
                <button
                  className="w-full h-full"
                  onClick={() => closeLanternModal("black")}
                >
                  {game.black_mine}
                </button>
              </div>
            )}
          </div>
        </Modal>

        {/* HEAD SECONDARY PLAYER SELECTOR MODAL */}
        <Modal
          isOpen={headModalIsOpen}
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
            },
          }}
          contentLabel="Select a color to remove from the Mine"
        >
          <div className="grid grid-flow-col grid-cols-1 grid-rows-5">
            {game.p1_address !== "" && game.p1_address !== profile.id && (
              <div className="span-1 p-2">
                <button
                  className="w-full h-full"
                  onClick={() => closeHeadModal(game.p1_address)}
                >
                  1
                </button>
              </div>
            )}

            {game.p2_address !== "" && game.p2_address !== profile.id && (
              <div className="span-1 p-2">
                <button
                  className="w-full h-full"
                  onClick={() => closeHeadModal(game.p2_address)}
                >
                  2
                </button>
              </div>
            )}

            {game.p3_address !== "" && game.p3_address !== profile.id && (
              <div className="span-1 p-2">
                <button
                  className="w-full h-full"
                  onClick={() => closeHeadModal(game.p3_address)}
                >
                  3
                </button>
              </div>
            )}

            {game.p4_address !== "" && game.p4_address !== profile.id && (
              <div className="span-1 p-2">
                <button
                  className="w-full h-full"
                  onClick={() => closeHeadModal(game.p4_address)}
                >
                  4
                </button>
              </div>
            )}

            {game.p5_address !== "" && game.p5_address !== profile.id && (
              <div className="span-1 p-2">
                <button
                  className="w-full h-full"
                  onClick={() => closeHeadModal(game.p5_address)}
                >
                  5
                </button>
              </div>
            )}
          </div>
        </Modal>

        <Modal
          isOpen={isLoadModalOpen}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.0)",
            },
            content: {
              backgroundColor: "rgba(0, 0, 0, 0.0)",
              outline: "none",
              border: "0px",
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
            },
          }}
        >
          <Loader
            type="Oval"
            color="#000000"
            height={100}
            width={100}
            timeout={3000}
          />
        </Modal>
      </div>
    );
  }
}
