import { Dice } from "./Dice";
import { Vector3 } from "three";

export function MobileController() {
  return (
    <>
      <group>
        <Dice position={new Vector3(-2.5, 1, -2.5)} />
        <Dice position={new Vector3(-2.5, 1, 0)} />
        <Dice position={new Vector3(-2.5, 1, 2.5)} />
        <Dice position={new Vector3(0, 1, 2.5)} />
        <Dice position={new Vector3(0, 1, -2.5)} />
        <Dice position={new Vector3(2.5, 1, 0)} />
        <Dice position={new Vector3(2.5, 1, 2.5)} />
        <Dice position={new Vector3(2.5, 1, -2.5)} />
      </group>
    </>
  );
}
