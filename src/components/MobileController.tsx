import { Suspense } from "react";
import { useGameManager } from "../hooks/useGameManager";
// import { Die } from "./Die";
import { Dice } from "./Dice";
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
          return <Dice key={die.id} />;
        })}
      </Suspense>
      <Box />
      <Ground />
    </group>
  );
}
