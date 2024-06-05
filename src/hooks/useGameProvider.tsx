import React, { FC, createContext } from "react";
import { useMultiplayerState } from "playroomkit";

export interface GameContextType {
  mineGems: string[];
  fieldGems: string[];
  start: () => void;
  oneGemFromMineToField: () => void;
}

export const GameContext = createContext<GameContextType | null>(null);

const GameProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mineGems, setMineGems] = useMultiplayerState("mineGems", []);
  const [fieldGems, setFieldGems] = useMultiplayerState("fieldGems", []);

  function start() {
    const green = new Array(3).fill(0).map(() => "green");
    const purple = new Array(4).fill(0).map(() => "purple");
    const red = new Array(6).fill(0).map(() => "red");
    const blue = new Array(12).fill(0).map(() => "blue");
    const black = new Array(60).fill(0).map(() => "black");
    setMineGems([...green, ...purple, ...red, ...blue, ...black]);
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
  }

  const value: GameContextType = {
    mineGems,
    fieldGems,
    start,
    oneGemFromMineToField,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default GameProvider;
