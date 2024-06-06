import { useEffect } from "react";
import { useGame } from "../hooks/useGame";
import { GameContextType } from "../hooks/useGameProvider";

export function UI() {
  const {
    rolls,
    fieldGems,
    myGems,
    players,
    selectedFace,
    setSelectedFace,
    addRolls,
    getGemsFromMine,
    pickGemFromMine,
  } = useGame() as GameContextType;

  const fieldBlack = fieldGems.filter((x) => x === "black").length || 0;
  const fieldBlue = fieldGems.filter((x) => x === "blue").length || 0;
  const fieldRed = fieldGems.filter((x) => x === "red").length || 0;
  const fieldPurple = fieldGems.filter((x) => x === "purple").length || 0;
  const fieldGreen = fieldGems.filter((x) => x === "purple").length || 0;

  const myBlack = myGems.filter((x) => x === "black").length || 0;
  const myBlue = myGems.filter((x) => x === "blue").length || 0;
  const myRed = myGems.filter((x) => x === "red").length || 0;
  const myPurple = myGems.filter((x) => x === "purple").length || 0;
  const myGreen = myGems.filter((x) => x === "purple").length || 0;

  useEffect(() => {
    if (selectedFace !== "") {
      spendDie();
    }
  }, [selectedFace]);

  function spendDie() {
    if (selectedFace === "beers") {
      addRolls(1);
    }
    if (selectedFace === "horns") {
      addRolls(2);
    }
    if (selectedFace === "axes") {
      getGemsFromMine(1);
    }
    if (selectedFace === "bombs") {
      getGemsFromMine(3);
    }
    if (selectedFace === "lantern") {
      pickGemFromMine("black");
    }
    setSelectedFace("");
  }

  return (
    <div className="fixed pointer-events-none top-0 right-0 left-0 bottom-0">
      <div className="w-full h-full flex flex-col justify-between">
        <div className="p-8 w-full flex justify-between">
          <div>
            <p className="w-full text-left text-xs italic">Gems On Field</p>
            <div className="w-full flex space-x-2">
              <p className="font-bold">{fieldBlack}</p>
              <p className="font-bold text-blue-500">{fieldBlue}</p>
              <p className="font-bold text-red-500">{fieldRed}</p>
              <p className="font-bold text-purple-500">{fieldPurple}</p>
              <p className="font-bold text-green-500">{fieldGreen}</p>
            </div>
          </div>
          <div className="flex flex-row space-x-2">
            {players.map(function (player) {
              return (
                <div key={player.id}>
                  <div className="w-8 h-8">
                    <img src={player.getProfile().photo} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="p-8">
          <p className="w-full text-left text-xs italic">My Gems</p>
          <p className="w-full text-left text-xs italic">{rolls} remaining</p>
          <div className="w-full flex space-x-2">
            <p className="font-bold">{myBlack}</p>
            <p className="font-bold text-blue-500">{myBlue}</p>
            <p className="font-bold text-red-500">{myRed}</p>
            <p className="font-bold text-purple-500">{myPurple}</p>
            <p className="font-bold text-green-500">{myGreen}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
