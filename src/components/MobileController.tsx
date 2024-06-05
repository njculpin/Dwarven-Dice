import { Dice } from "./Dice";
import { Vector3 } from "three";
import { useGame } from "../hooks/useGame";
import { GameContextType } from "../hooks/useGameProvider";

export function MobileController() {
  const { addRolls, getGemsFromMine } = useGame() as GameContextType;

  function selectFace(face: string) {
    switch (face) {
      case "beers":
        addRolls(1);
        break;
      case "horns":
        addRolls(2);
        break;
      case "axes":
        getGemsFromMine(1);
        break;
      case "bombs":
        getGemsFromMine(3);
        break;
    }
  }

  return (
    <>
      <group>
        <Dice
          position={new Vector3(-2.5, 0, -2.5)}
          selectFace={(face) => selectFace(face)}
        />
        <Dice
          position={new Vector3(-2.5, 0, 0)}
          selectFace={(face) => selectFace(face)}
        />
        <Dice
          position={new Vector3(-2.5, 0, 2.5)}
          selectFace={(face) => selectFace(face)}
        />
        <Dice
          position={new Vector3(0, 0, 2.5)}
          selectFace={(face) => selectFace(face)}
        />
        <Dice
          position={new Vector3(0, 0, -2.5)}
          selectFace={(face) => selectFace(face)}
        />
        <Dice
          position={new Vector3(2.5, 0, 0)}
          selectFace={(face) => selectFace(face)}
        />
        <Dice
          position={new Vector3(2.5, 0, 2.5)}
          selectFace={(face) => selectFace(face)}
        />
        <Dice
          position={new Vector3(2.5, 0, -2.5)}
          selectFace={(face) => selectFace(face)}
        />
      </group>
    </>
  );
}
