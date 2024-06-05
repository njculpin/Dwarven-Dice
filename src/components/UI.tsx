import { useGame } from "../hooks/useGame";
import { GameContextType } from "../hooks/useGameProvider";

export function UI() {
  const { rolls } = useGame() as GameContextType;
  return (
    <div className="fixed pointer-events-none top-0 right-0 left-0 bottom-0">
      <div className="w-full h-full flex justify-center">
        <div className="w-full flex justify-between p-4">
          <div>
            <h4 className="font-bold">Dwarven Dice</h4>
          </div>
          <div>
            <p className="font-bold">{rolls} Rolls Remaining</p>
          </div>
        </div>
      </div>
    </div>
  );
}
