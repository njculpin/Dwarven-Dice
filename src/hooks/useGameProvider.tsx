import React, { FC, createContext, useEffect, useState } from "react";
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
  myGems: string[];
  rolls: number;
  rolling: boolean;
  setRolling: (rolling: boolean) => void;
  start: () => void;
  takeAction: (face: string, action: string) => void;
}

export const GameContext = createContext<GameContextType | null>(null);

const GameProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const me = myPlayer();
  const [mineGems, setMineGems] = useMultiplayerState("mineGems", []);
  const [fieldGems, setFieldGems] = useMultiplayerState("fieldGems", []);
  const [rolling, setRolling] = useState(false);

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
      player.setState("rolls", 1, true);
    });
  }

  function getGemsFromMine(amount: number) {
    const newFieldGems: string[] = [];
    for (let i = 0; i < amount; i++) {
      const index = Math.floor(Math.random() * mineGems.length);
      const newFieldGem = mineGems[index];
      if (!newFieldGem) {
        continue;
      }
      mineGems.splice(index, 1);
      newFieldGems.push(newFieldGem);
    }
    setFieldGems([...fieldGems, ...newFieldGems], true);
    setMineGems([...mineGems], true);
  }

  function pickGemFromMine(color: string) {
    const index = mineGems.indexOf(color);

    if (!index) {
      return;
    }
    const pick = mineGems[index];
    mineGems.splice(index, 1);
    setFieldGems([...fieldGems, pick]);
    setMineGems([...mineGems], true);
  }

  function addRolls(amount: number) {
    const prev = me.getState("rolls");
    me.setState("rolls", prev + amount, true);
  }

  const rolls = me.getState("rolls") || 0;
  const myGems = me.getState("myGems") || [];

  function takeAction(face: string, action: string) {
    switch (face) {
      case "beers":
        switch (action) {
          case "spend":
            return addRolls(1);
          case "commit":
            return;
          default:
            return;
        }
      case "horns":
        switch (action) {
          case "spend":
            return addRolls(2);
          case "commit":
            return;
          default:
            return;
        }
      case "axes":
        switch (action) {
          case "spend":
            return getGemsFromMine(1);
          case "commit":
            return;
          default:
            return;
        }
      case "bombs":
        switch (action) {
          case "spend":
            return getGemsFromMine(3);
          case "commit":
            return;
          default:
            return;
        }
      case "lanterns":
        switch (action) {
          case "spend":
            return pickGemFromMine("black");
          case "commit":
            return;
          default:
            return;
        }
      case "heads":
        switch (action) {
          case "spend":
            return;
          case "commit":
            return;
          default:
            return;
        }
      default:
        return;
    }
  }

  const value: GameContextType = {
    players,
    mineGems,
    fieldGems,
    myGems,
    rolls,
    rolling,
    setRolling,
    start,
    takeAction,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default GameProvider;
