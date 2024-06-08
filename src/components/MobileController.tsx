import { useState, useEffect } from "react";
import { Dice } from "./Dice";
import { Euler, Vector3 } from "three";
import { useGame } from "../hooks/useGame";
import { GameContextType } from "../hooks/useGameProvider";
import { useEventListener } from "../hooks/useEventListener";

export function MobileController() {
  const {
    rolls,
    setSelectedFace,
    reduceOneRoll,
    addRolls,
    selectedFace,
    getGemsFromMine,
  } = useGame() as GameContextType;

  const [roll, setRoll] = useState(false);

  function setSelectedAction(action: string) {
    if (action === "spend") {
      if (selectedFace === "axes") {
        getGemsFromMine(1);
      }
      if (selectedFace === "bombs") {
        getGemsFromMine(3);
      }
      if (selectedFace === "beers") {
        addRolls(1);
      }
      if (selectedFace === "horns") {
        addRolls(2);
      }
    }
  }

  function handleClick(e: UIEvent) {
    switch (e.detail) {
      case 1:
        console.log("click");
        break;
      case 2:
        if (rolls > 0) {
          setRoll(true);
          reduceOneRoll();
        }
        break;
      case 3:
        console.log("triple click");
        break;
    }
  }

  const [lastTap, setLastTap] = useState(0);

  function handleTap() {
    const date = new Date();
    const time = date.getTime();
    const time_between_taps = 200;
    if (time - lastTap < time_between_taps) {
      if (rolls > 0) {
        setRoll(true);
        reduceOneRoll();
      }
    }
    setLastTap(time);
  }

  useEventListener("click", handleClick);
  useEventListener("touchstart", handleTap);

  useEffect(() => {
    setTimeout(() => {
      setRoll(false);
    }, 2000);
  }, [roll]);

  return (
    <>
      <group>
        <Dice
          roll={roll}
          position={new Vector3(-2.5, 1, -2.5)}
          rotation={new Euler(0, 0, 0)}
          setSelectedFace={(face) => setSelectedFace(face)}
          setSelectedAction={(action) => setSelectedAction(action)}
        />
        <Dice
          roll={roll}
          position={new Vector3(-2.5, 1, 0)}
          rotation={new Euler(0, 0, 0)}
          setSelectedFace={(face) => setSelectedFace(face)}
          setSelectedAction={(action) => setSelectedAction(action)}
        />
        <Dice
          roll={roll}
          position={new Vector3(-2.5, 1, 2.5)}
          rotation={new Euler(0, 0, 0)}
          setSelectedFace={(face) => setSelectedFace(face)}
          setSelectedAction={(action) => setSelectedAction(action)}
        />
        <Dice
          roll={roll}
          position={new Vector3(0, 1, 2.5)}
          rotation={new Euler(0, 0, 0)}
          setSelectedFace={(face) => setSelectedFace(face)}
          setSelectedAction={(action) => setSelectedAction(action)}
        />
        <Dice
          roll={roll}
          position={new Vector3(0, 1, -2.5)}
          rotation={new Euler(0, 0, 0)}
          setSelectedFace={(face) => setSelectedFace(face)}
          setSelectedAction={(action) => setSelectedAction(action)}
        />
        <Dice
          roll={roll}
          position={new Vector3(2.5, 1, 0)}
          rotation={new Euler(0, 0, 0)}
          setSelectedFace={(face) => setSelectedFace(face)}
          setSelectedAction={(action) => setSelectedAction(action)}
        />
        <Dice
          roll={roll}
          position={new Vector3(2.5, 1, 2.5)}
          rotation={new Euler(0, 0, 0)}
          setSelectedFace={(face) => setSelectedFace(face)}
          setSelectedAction={(action) => setSelectedAction(action)}
        />
        <Dice
          roll={roll}
          position={new Vector3(2.5, 1, -2.5)}
          rotation={new Euler(0, 0, 0)}
          setSelectedFace={(face) => setSelectedFace(face)}
          setSelectedAction={(action) => setSelectedAction(action)}
        />
      </group>
    </>
  );
}
