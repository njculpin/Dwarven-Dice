import { useState, useEffect } from "react";
import { Dice } from "./Dice";
import { Vector3 } from "three";
import { useThree } from "@react-three/fiber";
import { useGame } from "../hooks/useGame";
import { RollButton } from "./RollButton";
import { GameContextType } from "../hooks/useGameProvider";

export function MobileController() {
  const { height } = useThree((state) => state.viewport);
  const { setSelectedFace } = useGame() as GameContextType;
  const [roll, setRoll] = useState(false);

  function handleRoll() {
    setRoll(true);
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
          position={new Vector3(-2.5, 0, -2.5)}
          setSelectedFace={(face) => setSelectedFace(face)}
        />
        <Dice
          roll={roll}
          position={new Vector3(-2.5, 0, 0)}
          setSelectedFace={(face) => setSelectedFace(face)}
        />
        <Dice
          roll={roll}
          position={new Vector3(-2.5, 0, 2.5)}
          setSelectedFace={(face) => setSelectedFace(face)}
        />
        <Dice
          roll={roll}
          position={new Vector3(0, 0, 2.5)}
          setSelectedFace={(face) => setSelectedFace(face)}
        />
        <Dice
          roll={roll}
          position={new Vector3(0, 0, -2.5)}
          setSelectedFace={(face) => setSelectedFace(face)}
        />
        <Dice
          roll={roll}
          position={new Vector3(2.5, 0, 0)}
          setSelectedFace={(face) => setSelectedFace(face)}
        />
        <Dice
          roll={roll}
          position={new Vector3(2.5, 0, 2.5)}
          setSelectedFace={(face) => setSelectedFace(face)}
        />
        <Dice
          roll={roll}
          position={new Vector3(2.5, 0, -2.5)}
          setSelectedFace={(face) => setSelectedFace(face)}
        />
      </group>
      <RollButton
        position={new Vector3(0, 0, height / 2 - 2)}
        setRoll={() => handleRoll()}
      />
    </>
  );
}
