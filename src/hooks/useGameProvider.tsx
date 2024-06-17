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
  pickGemFromMine: (color: string) => void;
  setRolling: (rolling: boolean) => void;
  start: () => void;
  takeAction: (face: string, action: string) => void;
}

export const GameContext = createContext<GameContextType | null>(null);

const GameProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const me = myPlayer();

  const [mineGreen, setMineGreen] = useMultiplayerState("mineGreen", 3);
  const [minePurple, setMinePurple] = useMultiplayerState("minePurple", 4);
  const [mineRed, setMineRed] = useMultiplayerState("mineRed", 6);
  const [mineBlue, setMineBlue] = useMultiplayerState("mineBlue", 12);
  const [mineBlack, setMineBlack] = useMultiplayerState("mineBlack", 60);

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

  function getRandomValueFromMine() {
    const gems = {
      green: mineGreen,
      purple: minePurple,
      red: mineRed,
      blue: mineBlue,
      black: mineBlack,
    };
    const total = Object.values(gems).reduce((sum, count) => sum + count, 0);
    if (total === 0) {
      return undefined;
    }
    let weightedSum = 0;
    const randomTarget = Math.floor(Math.random() * total);
    for (const color in gems) {
      const sum = gems[color as "green" | "purple" | "red" | "blue" | "black"];
      weightedSum += sum;
      if (weightedSum > randomTarget) {
        return color;
      }
    }
    return null;
  }

  function getGemsFromMine(amount: number) {
    for (let i = 0; i < amount; i++) {
      const color = getRandomValueFromMine();
      if (!color) {
        continue;
      }
      pickGemFromMine(color);
    }
  }

  function pickGemFromMine(color: string) {
    switch (color) {
      case "green":
        setMineGreen(mineGreen - 1, true);
        setFieldGreen(fieldGreen + 1, true);
        break;
      case "purple":
        setMinePurple(minePurple - 1, true);
        setFieldPurple(fieldPurple + 1, true);
        break;
      case "red":
        setMineRed(mineRed - 1, true);
        setFieldRed(fieldRed + 1, true);
        break;
      case "blue":
        setMineBlue(mineBlue - 1, true);
        setFieldBlue(fieldBlue + 1, true);
        break;
      case "black":
        setMineBlack(mineBlack - 1, true);
        setFieldBlack(fieldBlack + 1, true);
        break;
      default:
        break;
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
