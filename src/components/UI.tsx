import { Fragment, useEffect, useState } from "react";
import { useGame } from "../hooks/useGame";
import { GameContextType } from "../hooks/useGameProvider";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

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

  const [open, setOpen] = useState(false);

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
      setOpen(true);
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
    setOpen(false);
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
                  <div className="w-16 h-16">
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
      <Transition show={open}>
        <Dialog className="relative z-10" onClose={setOpen}>
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Choose to Spend or Commit the {selectedFace}
                      </DialogTitle>
                      <div className="mt-2">
                        <Description face={selectedFace} />
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="button"
                      className="rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => spendDie()}
                    >
                      Spend
                    </button>
                    <button
                      type="button"
                      className="rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => setOpen(false)}
                    >
                      Commit
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

function Description({ face }: { face: string }) {
  let text = "";
  switch (face) {
    case "beers":
      text =
        "Spend a Beer to get a reroll, Commit 3 Beers to collect all black gems from the field";
      break;
    case "horns":
      text =
        "Spend a Horn to get two rerolls, Commit a Horn and 1 Beer to collect all black gems from the field";
      break;
    case "axes":
      text =
        "Spend a Axe to get 1 random gem from the mine on the field, Commit 3 axes to collect all the blue gems on the field";
      break;
    case "bombs":
      text =
        "Spend a Bomb to get 3 random gems from the mine on the field, Commit 3 bombs to collect all the red gems on the field";
      break;
    case "lanterns":
      text =
        "Spend a Lantern to get 1 gem of your choice from the mine on the field, Commit 3 lanterns to collect all the purple gems on the field";
      break;
    case "heads":
      text =
        "Spend a Head to challenge another player for your choice of colors, Commit 3 heads to collect all the green gems on the field";
      break;
  }
  return <p className="text-sm text-gray-500">{text}</p>;
}
