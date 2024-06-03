import { Suspense } from "react";
import { GizmoHelper, GizmoViewport } from "@react-three/drei";
import { useGameManager } from "../hooks/useGameManager";
import { Die } from "./Die";

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
            <group key={index} position={[0, 0, index - dice.length / 2]}>
              <Die face={die.face} />
            </group>
          );
        })}
      </Suspense>
    </group>
  );
}
