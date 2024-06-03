import { Suspense } from "react";
import { useGameManager } from "../hooks/useGameManager";
import { Die } from "./Die";
import { Box } from "./Box";
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
      <Box />
      <Ground />
    </group>
  );
}
