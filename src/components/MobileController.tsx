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
    setRolling,
    takeAction,
    selectedDie,
    setSelectedDie,
  } = useGame() as GameContextType;

  // DESKTOP
  useEventListener("click", handleClick);
  function handleClick(e: UIEvent) {
    switch (e.detail) {
      case 1:
        break;
      case 2:
        if (rolls > 0) {
          setSelectedDie(0);
          setRolling(true);
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
          dieId={1}
          roll={rolling}
          position={new Vector3(-2.5, 1, -2.5)}
          rotation={new Euler(0, 0, 0)}
          reset={reset}
          setReset={(e) => setReset(e)}
          setSelectedAction={(face, action) => takeAction(face, action)}
          selectedDie={selectedDie}
          setSelectedDie={(dieId) => setSelectedDie(dieId)}
        />
        <Dice
          dieId={2}
          roll={rolling}
          position={new Vector3(-2.5, 1, 0)}
          rotation={new Euler(0, 0, 0)}
          reset={reset}
          setReset={(e) => setReset(e)}
          setSelectedAction={(face, action) => takeAction(face, action)}
          selectedDie={selectedDie}
          setSelectedDie={(dieId) => setSelectedDie(dieId)}
        />
        <Dice
          dieId={3}
          roll={rolling}
          position={new Vector3(-2.5, 1, 2.5)}
          rotation={new Euler(0, 0, 0)}
          reset={reset}
          setReset={(e) => setReset(e)}
          setSelectedAction={(face, action) => takeAction(face, action)}
          selectedDie={selectedDie}
          setSelectedDie={(dieId) => setSelectedDie(dieId)}
        />
        <Dice
          dieId={4}
          roll={rolling}
          position={new Vector3(0, 1, 2.5)}
          rotation={new Euler(0, 0, 0)}
          reset={reset}
          setReset={(e) => setReset(e)}
          setSelectedAction={(face, action) => takeAction(face, action)}
          selectedDie={selectedDie}
          setSelectedDie={(dieId) => setSelectedDie(dieId)}
        />
        <Dice
          dieId={5}
          roll={rolling}
          position={new Vector3(0, 1, -2.5)}
          rotation={new Euler(0, 0, 0)}
          reset={reset}
          setReset={(e) => setReset(e)}
          setSelectedAction={(face, action) => takeAction(face, action)}
          selectedDie={selectedDie}
          setSelectedDie={(dieId) => setSelectedDie(dieId)}
        />
        <Dice
          dieId={6}
          roll={rolling}
          position={new Vector3(2.5, 1, 0)}
          rotation={new Euler(0, 0, 0)}
          reset={reset}
          setReset={(e) => setReset(e)}
          setSelectedAction={(face, action) => takeAction(face, action)}
          selectedDie={selectedDie}
          setSelectedDie={(dieId) => setSelectedDie(dieId)}
        />
        <Dice
          dieId={7}
          roll={rolling}
          position={new Vector3(2.5, 1, 2.5)}
          rotation={new Euler(0, 0, 0)}
          reset={reset}
          setReset={(e) => setReset(e)}
          setSelectedAction={(face, action) => takeAction(face, action)}
          selectedDie={selectedDie}
          setSelectedDie={(dieId) => setSelectedDie(dieId)}
        />
        <Dice
          dieId={8}
          roll={rolling}
          position={new Vector3(2.5, 1, -2.5)}
          rotation={new Euler(0, 0, 0)}
          reset={reset}
          setReset={(e) => setReset(e)}
          setSelectedAction={(face, action) => takeAction(face, action)}
          selectedDie={selectedDie}
          setSelectedDie={(dieId) => setSelectedDie(dieId)}
        />
      </group>
    </>
  );
}
