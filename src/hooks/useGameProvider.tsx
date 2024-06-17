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
  setShowColorPicker: (show: boolean) => void;
  pickGemFromMine: (color: string, count: number) => void;
  setRolling: (rolling: boolean) => void;
  start: () => void;
  takeAction: (face: string, action: string) => void;
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

  const [rolling, setRolling] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

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
      player.setState("rolls", 1, true);
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
    switch (color) {
      case "green":
        me.setState("myGreen", me.getState("myGreen") + fieldGreen);
        setFieldGreen(0);
        break;
      case "purple":
        me.setState("myPurple", me.getState("myPurple") + fieldPurple);
        setFieldPurple(0);
        break;
      case "red":
        me.setState("myRed", me.getState("myRed") + fieldRed);
        setFieldRed(0);
        break;
      case "blue":
        me.setState("myBlue", me.getState("myBlue") + fieldBlue);
        setFieldBlue(0);
        break;
      case "black":
        me.setState("myBlack", me.getState("myBlack") + fieldBlack);
        setFieldBlack(0);
        break;
      default:
        break;
    }
  }

  function addRolls(amount: number) {
    const prev = me.getState("rolls");
    me.setState("rolls", prev + amount, true);
  }

  const rolls = me.getState("rolls") || 0;

  function takeAction(face: string, action: string) {
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
            return addRolls(1);
          case "commit":
            if (commitBeers === 3) {
              me.setState("commitBeers", 0);
              collectColorFromField("black");
            } else if (commitBeers === 1 && commitHorns === 1) {
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
            return addRolls(2);
          case "commit":
            if (commitHorns === 3) {
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
            if (commitAxes === 3) {
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
            if (commitBombs === 3) {
              me.setState("commitBombs", 0);
              collectColorFromField("red");
            } else {
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
            if (commitLanterns === 3) {
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
            if (commitHeads === 3) {
              me.setState("commitHeads", 0);
              collectColorFromField("green");
            } else {
              me.setState("commitHeads", commitHeads + 1);
            }
            return;
          default:
            return;
        }
      default:
        return;
    }
  }

  const myGreen = me.getState("myGreen");
  const myPurple = me.getState("myPurple");
  const myRed = me.getState("myRed");
  const myBlue = me.getState("myBlue");
  const myBlack = me.getState("myBlack");

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
    setShowColorPicker,
    pickGemFromMine,
    setRolling,
    start,
    takeAction,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default GameProvider;
