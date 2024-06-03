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
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport
          axisColors={["red", "green", "blue"]}
          labelColor="black"
        />
      </GizmoHelper>
      <Suspense fallback={null}>
        {dice.map(function (die: Die, index: number) {
          return (
            <Die
              face={die.face}
              key={index}
              position={new Vector3(0, 0, index - dice.length / 2)}
            />
          );
        })}
      </Suspense>
    </group>
  );
}
