import { useState, useEffect } from "react";
import { Dice } from "./Dice";
import { Euler, Vector3 } from "three";
import { useGame } from "../hooks/useGame";
import { GameContextType } from "../hooks/useGameProvider";
import { useEventListener } from "../hooks/useEventListener";

export function MobileController() {
  const { rolls, rolling, setRolling, takeAction } =
    useGame() as GameContextType;

  // DESKTOP
  useEventListener("click", handleClick);
  function handleClick(e: UIEvent) {
    switch (e.detail) {
      case 1:
        console.log("click");
        break;
      case 2:
        if (rolls > 0) {
          setRolling(true);
        }
        break;
      case 3:
        console.log("triple click");
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
        setRolling(true);
      }
    }
    setLastTap(time);
  }

  useEffect(() => {
    setTimeout(() => {
      setRolling(false);
    }, 2000);
  }, [rolling]);

  return (
    <>
      <group>
        <Dice
          roll={rolling}
          position={new Vector3(-2.5, 1, -2.5)}
          rotation={new Euler(0, 0, 0)}
          setSelectedAction={(face, action) => takeAction(face, action)}
        />
        <Dice
          roll={rolling}
          position={new Vector3(-2.5, 1, 0)}
          rotation={new Euler(0, 0, 0)}
          setSelectedAction={(face, action) => takeAction(face, action)}
        />
        <Dice
          roll={rolling}
          position={new Vector3(-2.5, 1, 2.5)}
          rotation={new Euler(0, 0, 0)}
          setSelectedAction={(face, action) => takeAction(face, action)}
        />
        <Dice
          roll={rolling}
          position={new Vector3(0, 1, 2.5)}
          rotation={new Euler(0, 0, 0)}
          setSelectedAction={(face, action) => takeAction(face, action)}
        />
        <Dice
          roll={rolling}
          position={new Vector3(0, 1, -2.5)}
          rotation={new Euler(0, 0, 0)}
          setSelectedAction={(face, action) => takeAction(face, action)}
        />
        <Dice
          roll={rolling}
          position={new Vector3(2.5, 1, 0)}
          rotation={new Euler(0, 0, 0)}
          setSelectedAction={(face, action) => takeAction(face, action)}
        />
        <Dice
          roll={rolling}
          position={new Vector3(2.5, 1, 2.5)}
          rotation={new Euler(0, 0, 0)}
          setSelectedAction={(face, action) => takeAction(face, action)}
        />
        <Dice
          roll={rolling}
          position={new Vector3(2.5, 1, -2.5)}
          rotation={new Euler(0, 0, 0)}
          setSelectedAction={(face, action) => takeAction(face, action)}
        />
      </group>
    </>
  );
}
