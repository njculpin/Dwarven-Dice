import { useState, useEffect } from "react";
import { Dice } from "./Dice";
import { Vector3 } from "three";
import { Center } from "@react-three/drei";
import { useGame } from "../hooks/useGame";
import { RollButton } from "./RollButton";
import { GameContextType } from "../hooks/useGameProvider";

export function MobileController() {
  const { rolls, setSelectedFace, reduceOneRoll } =
    useGame() as GameContextType;
  const [roll, setRoll] = useState(false);

  function handleRoll() {
    if (rolls > 0) {
      setRoll(true);
      reduceOneRoll();
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
          setSelectedFace={(face) => setSelectedFace(face)}
        />
        <Dice
          roll={roll}
          position={new Vector3(-2.5, 1, 0)}
          setSelectedFace={(face) => setSelectedFace(face)}
        />
        <Dice
          roll={roll}
          position={new Vector3(-2.5, 1, 2.5)}
          setSelectedFace={(face) => setSelectedFace(face)}
        />
        <Dice
          roll={roll}
          position={new Vector3(0, 1, 2.5)}
          setSelectedFace={(face) => setSelectedFace(face)}
        />
        <Dice
          roll={roll}
          position={new Vector3(0, 1, -2.5)}
          setSelectedFace={(face) => setSelectedFace(face)}
        />
        <Dice
          roll={roll}
          position={new Vector3(2.5, 1, 0)}
          setSelectedFace={(face) => setSelectedFace(face)}
        />
        <Dice
          roll={roll}
          position={new Vector3(2.5, 1, 2.5)}
          setSelectedFace={(face) => setSelectedFace(face)}
        />
        <Dice
          roll={roll}
          position={new Vector3(2.5, 1, -2.5)}
          setSelectedFace={(face) => setSelectedFace(face)}
        />
      </group>
      <Center>
        <RollButton rolls={rolls} setRoll={() => handleRoll()} />
      </Center>
    </>
  );
}
