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
  selectedFace: string;
  myGems: string[];
  rolls: number;
  start: () => void;
  setSelectedFace: (face: string) => void;
  addRolls: (amount: number) => void;
  reduceOneRoll: () => void;
  pickGemFromMine: (color: string) => void;
  getGemsFromMine: (amount: number) => void;
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
      player.setState("rolls", 10, true);
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
    const pick = mineGems(index);
    mineGems.splice(index, 1);
    setFieldGems([...fieldGems, pick]);
    setMineGems([...mineGems], true);
  }

  function addRolls(amount: number) {
    const prev = me.getState("rolls");
    me.setState("rolls", prev + amount, true);
  }

  function reduceOneRoll() {
    if (rolls < 1) {
      return;
    }
    const prev = me.getState("rolls");
    me.setState("rolls", prev - 1, true);
  }

  const rolls = me.getState("rolls") || 0;
  const myGems = me.getState("myGems") || [];

  function setSelectedFace(face: string) {
    me.setState("selectedFace", face);
  }

  const selectedFace = me.getState("selectedFace") || "";

  const value: GameContextType = {
    players,
    mineGems,
    fieldGems,
    selectedFace,
    myGems,
    rolls,
    start,
    setSelectedFace,
    addRolls,
    reduceOneRoll,
    pickGemFromMine,
    getGemsFromMine,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default GameProvider;
