import { Suspense } from "react";
import { Dice } from "./Dice";
import { Box } from "./Box";
import { Vector3 } from "three";

export function MobileController() {
  return (
    <>
      <group>
        <Suspense fallback={null}>
          <Dice position={new Vector3(-3, 1, -3)} />
          <Dice position={new Vector3(-3, 1, 0)} />
          <Dice position={new Vector3(-3, 1, 3)} />
          <Dice position={new Vector3(0, 1, 3)} />
          <Dice position={new Vector3(0, 1, -3)} />
          <Dice position={new Vector3(3, 1, 0)} />
          <Dice position={new Vector3(3, 1, 3)} />
          <Dice position={new Vector3(3, 1, -3)} />
        </Suspense>
        <Box />
      </group>
    </>
  );
}
