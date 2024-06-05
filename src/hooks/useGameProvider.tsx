import React, { FC, createContext } from "react";
import {
  useMultiplayerState,
  myPlayer,
  usePlayersList,
  PlayerState,
} from "playroomkit";

export interface GameContextType {
  players: PlayerState[];
  mineGems: string[];
  fieldGems: string[];
  rolls: number;
  start: () => void;
  reduceOneRoll: () => void;
  oneGemFromMineToField: () => void;
}

export const GameContext = createContext<GameContextType | null>(null);

const GameProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const me = myPlayer();
  const [mineGems, setMineGems] = useMultiplayerState("mineGems", []);
  const [fieldGems, setFieldGems] = useMultiplayerState("fieldGems", []);

  const players = usePlayersList(true);
  players.sort((a, b) => a.id.localeCompare(b.id));

  function start() {
    setUpPlayers();
    setUpGems();
  }

  function setUpGems() {
    const green = new Array(3).fill(0).map(() => "green");
    const purple = new Array(4).fill(0).map(() => "purple");
    const red = new Array(6).fill(0).map(() => "red");
    const blue = new Array(12).fill(0).map(() => "blue");
    const black = new Array(60).fill(0).map(() => "black");
    setMineGems([...green, ...purple, ...red, ...blue, ...black]);
  }

  function setUpPlayers() {
    players.forEach((player) => {
      player.setState("rolls", 1);
    });
  }

  function oneGemFromMineToField() {
    const index = Math.floor(Math.random() * mineGems.length);
    const newFieldGem = mineGems[index];
    if (!newFieldGem) {
      return;
    }
    mineGems.splice(index, 1);
    setFieldGems([...fieldGems, newFieldGem]);
    setMineGems([...mineGems]);
    console.log("mineGems", mineGems);
    console.log("fieldGems", fieldGems);
  }

  function reduceOneRoll() {
    const prev = me.getState("rolls");
    console.log(prev);
    me.setState("rolls", prev - 1);
  }

  const rolls = me.getState("rolls") || 0;

  const value: GameContextType = {
    players,
    mineGems,
    fieldGems,
    rolls,
    start,
    reduceOneRoll,
    oneGemFromMineToField,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default GameProvider;
