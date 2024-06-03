import { Suspense } from "react";
import { GizmoHelper, GizmoViewport } from "@react-three/drei";
import { useGameManager } from "../hooks/useGameManager";
import { Die } from "./Die";
import { Vector3 } from "three";

type Die = {
  id: number;
  face: string;
  spent: boolean;
  commit: boolean;
  used: boolean;
};

export function MobileController() {
  const game = useGameManager();
  const dice = game.myDice();
  if (!dice) {
    return <></>;
  }
  return (
    <group>
      <GizmoHelper
        alignment="bottom-right" // widget alignment within scene
        margin={[80, 80]} // widget margins (X, Y)
      >
        <GizmoViewport
          axisColors={["red", "green", "blue"]}
          labelColor="black"
        />
        {/* alternative: <GizmoViewcube /> */}
      </GizmoHelper>
      <Suspense fallback={null}>
        {dice.map(function (die: Die, index: number) {
          return (
            <Die
              face={die.face}
              key={index}
              position={new Vector3(0, 0, 1 * index)}
            />
          );
        })}
      </Suspense>
    </group>
  );
}
