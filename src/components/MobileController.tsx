import { Dice } from "./Dice";
import { Vector3 } from "three";

export function MobileController() {
  return (
    <>
      <group>
        <Dice position={new Vector3(-3, 0, -3)} />
        <Dice position={new Vector3(-3, 0, 0)} />
        <Dice position={new Vector3(-3, 0, 3)} />
        <Dice position={new Vector3(0, 0, 3)} />
        <Dice position={new Vector3(0, 0, -3)} />
        <Dice position={new Vector3(3, 0, 0)} />
        <Dice position={new Vector3(3, 0, 3)} />
        <Dice position={new Vector3(3, 0, -3)} />
      </group>
    </>
  );
}
