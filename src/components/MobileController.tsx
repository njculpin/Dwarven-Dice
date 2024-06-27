import { useState, useEffect } from "react";
import { Dice } from "./Dice";
import { Euler, Vector3 } from "three";
import { useGame } from "../hooks/useGame";
import { GameContextType } from "../hooks/useGameProvider";
import { useEventListener } from "../hooks/useEventListener";

export function MobileController() {
  const {
    reset,
    setReset,
    rolls,
    rolling,
    spentDice,
    setRolling,
    selectedDieId,
    handleRoll,
    handlePickDie,
  } = useGame() as GameContextType;

  // DESKTOP
  useEventListener("click", handleClick);
  function handleClick(e: UIEvent) {
    switch (e.detail) {
      case 1:
        break;
      case 2:
        if (rolls > 0) {
          handleRoll();
        }
        break;
      case 3:
        break;
    }
  }

  // MOBILE
  const [lastTap, setLastTap] = useState(0);
  useEventListener("touchstart", handleTap);
  function handleTap() {
    const date = new Date();
    const time = date.getTime();
    const time_between_taps = 200;
    if (time - lastTap < time_between_taps) {
      if (rolls > 0) {
        handleRoll();
      }
    }
    setLastTap(time);
  }

  useEffect(() => {
    setTimeout(() => {
      setRolling(false);
    }, 2000);
  }, [rolling]);

  function checkIfExploded(dieId: number) {
    switch (dieId) {
      case 1:
        return spentD1;
      case 2:
        return spentD2;
      case 3:
        return spentD3;
      case 4:
        return spentD4;
      case 5:
        return spentD5;
      case 6:
        return spentD6;
      case 7:
        return spentD7;
      case 8:
        return spentD8;
    }
    return false;
  }

  return (
    <>
      <group>
        {[
          { id: 1, position: new Vector3(-2.5, 1, -2.5) },
          { id: 2, position: new Vector3(-2.5, 1, 0) },
          { id: 3, position: new Vector3(-2.5, 1, 2.5) },
          { id: 4, position: new Vector3(0, 1, 2.5) },
          { id: 5, position: new Vector3(0, 1, -2.5) },
          { id: 6, position: new Vector3(2.5, 1, 0) },
          { id: 7, position: new Vector3(2.5, 1, 2.5) },
          { id: 8, position: new Vector3(2.5, 1, -2.5) },
        ].map(function (die) {
          return (
            <Dice
              key={die.id}
              dieId={die.id}
              exploded={checkIfExploded(die.id)}
              rolling={rolling}
              position={die.position}
              rotation={new Euler(0, 0, 0)}
              reset={reset}
              setReset={(e) => setReset(e)}
              selectedDieId={selectedDieId}
              setSelectedDieId={(face, dieId) => handlePickDie(face, dieId)}
            />
          );
        })}
      </group>
    </>
  );
}
