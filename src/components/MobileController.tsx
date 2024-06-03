import { Suspense } from "react";
import { useGameManager } from "../hooks/useGameManager";
import { Die } from "./Die";
import { Walls } from "./Walls";
import { Ground } from "./Ground";

type Die = {
  id: number;
  face: string;
  spent: boolean;
  commit: boolean;
  used: boolean;
  roll: () => void;
};

export function MobileController() {
  const game = useGameManager();
  const dice = game.myDice();
  if (!dice) {
    return <></>;
  }

  return (
    <group>
      <Suspense fallback={null}>
        {dice.map(function (die: Die) {
          return <Die key={die.id} die={die} />;
        })}
      </Suspense>
      <Ground />
      <Walls />
    </group>
  );
}
