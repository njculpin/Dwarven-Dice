import { Suspense } from "react";
import { Dice } from "./Dice";
import { Box } from "./Box";
import { Ground } from "./Ground";

export function MobileController() {
  return (
    <>
      <group>
        <Suspense fallback={null}>
          <Dice />
          <Dice />
          <Dice />
          <Dice />
          <Dice />
          <Dice />
          <Dice />
          <Dice />
        </Suspense>
        <Box />
        <Ground />
      </group>
    </>
  );
}
