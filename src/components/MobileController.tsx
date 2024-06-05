import { Dice } from "./Dice";
import { Vector3 } from "three";
import { useThree } from "@react-three/fiber";
import { useGame } from "../hooks/useGame";
import { RollButton } from "./RollButton";
import { GameContextType } from "../hooks/useGameProvider";

export function MobileController() {
  const { height } = useThree((state) => state.viewport);
  const { setSelectedFace } = useGame() as GameContextType;
  return (
    <>
      <group>
        <Dice
          position={new Vector3(-2.5, 0, -2.5)}
          setSelectedFace={(face) => setSelectedFace(face)}
        />
        <Dice
          position={new Vector3(-2.5, 0, 0)}
          setSelectedFace={(face) => setSelectedFace(face)}
        />
        <Dice
          position={new Vector3(-2.5, 0, 2.5)}
          setSelectedFace={(face) => setSelectedFace(face)}
        />
        <Dice
          position={new Vector3(0, 0, 2.5)}
          setSelectedFace={(face) => setSelectedFace(face)}
        />
        <Dice
          position={new Vector3(0, 0, -2.5)}
          setSelectedFace={(face) => setSelectedFace(face)}
        />
        <Dice
          position={new Vector3(2.5, 0, 0)}
          setSelectedFace={(face) => setSelectedFace(face)}
        />
        <Dice
          position={new Vector3(2.5, 0, 2.5)}
          setSelectedFace={(face) => setSelectedFace(face)}
        />
        <Dice
          position={new Vector3(2.5, 0, -2.5)}
          setSelectedFace={(face) => setSelectedFace(face)}
        />
      </group>
      <RollButton position={new Vector3(0, 0, height / 2 - 2)} />
    </>
  );
}
