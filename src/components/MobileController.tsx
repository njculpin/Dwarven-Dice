import { useState, useEffect } from "react";
import { Dice } from "./Dice";
import { Euler, Vector3 } from "three";
import { Center } from "@react-three/drei";
import { useGame } from "../hooks/useGame";
import { RollButton } from "./RollButton";
import { GameContextType } from "../hooks/useGameProvider";

export function MobileController() {
  const {
    rolls,
    setSelectedFace,
    reduceOneRoll,
    selectedFace,
    getGemsFromMine,
  } = useGame() as GameContextType;

  const [roll, setRoll] = useState(false);

  function handleRoll() {
    if (rolls > 0) {
      setRoll(true);
      reduceOneRoll();
    }
  }

  function setSelectedAction(action: string) {
    if (action === "spend") {
      if (selectedFace === "axes") {
        getGemsFromMine(1);
      }
      if (selectedFace === "bombs") {
        getGemsFromMine(3);
      }
    }
  }

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
      <Center>
        <RollButton setRoll={() => handleRoll()} />
      </Center>
    </>
  );
}
