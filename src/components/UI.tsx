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
    showColorPicker,
    setShowColorPicker,
    pickGemFromMine,
    rolls,
    players,
    mineGreen,
    minePurple,
    mineRed,
    mineBlue,
    mineBlack,
    fieldGreen,
    fieldPurple,
    fieldRed,
    fieldBlue,
    fieldBlack,
    myGreen,
    myPurple,
    myRed,
    myBlue,
    myBlack,
    commitBeers,
    commitHorns,
    commitAxes,
    commitBombs,
    commitLanterns,
    commitHeads,
    setReset,
    addRoll,
    setRolling,
  } = useGame() as GameContextType;

  function handlePickColor(color: string) {
    pickGemFromMine(color, 1);
    setShowColorPicker(false);
  }

  function handleEndTurn() {
    setReset(true);
    addRoll(1);
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
        <div className="flex justify-between items-center">
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
            <div className="mt-2">
              <button
                onClick={() => setRolling(true)}
                className="pointer-events-auto border px-4 py-2"
              >
                Roll
              </button>
            </div>
          </div>
          <div className="p-8">
            <p className="w-full text-left text-xs italic">My Commit Dice</p>
            <div className="w-full flex space-x-2">
              <p className="font-bold">{commitBeers}</p>
              <p className="font-bold">{commitHorns}</p>
              <p className="font-bold text-blue-500">{commitAxes}</p>
              <p className="font-bold text-red-500">{commitBombs}</p>
              <p className="font-bold text-purple-500">{commitLanterns}</p>
              <p className="font-bold text-green-500">{commitHeads}</p>
            </div>
            <div className="mt-2">
              <button
                onClick={() => handleEndTurn()}
                className="pointer-events-auto border px-4 py-2"
              >
                End Turn
              </button>
            </div>
          </div>
        </div>
      </div>
      <Transition show={showColorPicker}>
        <Dialog className="relative z-10" onClose={() => setShowColorPicker}>
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
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
                  <div className="mt-3 text-center">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-center text-gray-900"
                    >
                      Pick a color
                    </DialogTitle>
                    <div className="grid grid-cols-5 gap-6 mt-6 p-4">
                      {mineGreen > 0 && (
                        <div
                          onClick={() => handlePickColor("green")}
                          className="h-8 w-8 rounded-full"
                          style={{ backgroundColor: "green" }}
                        />
                      )}
                      {minePurple > 0 && (
                        <div
                          onClick={() => handlePickColor("purple")}
                          className="h-8 w-8 rounded-full"
                          style={{ backgroundColor: "purple" }}
                        />
                      )}
                      {mineRed > 0 && (
                        <div
                          onClick={() => handlePickColor("red")}
                          className="h-8 w-8 rounded-full"
                          style={{ backgroundColor: "red" }}
                        />
                      )}
                      {mineBlue > 0 && (
                        <div
                          onClick={() => handlePickColor("blue")}
                          className="h-8 w-8 rounded-full"
                          style={{ backgroundColor: "blue" }}
                        />
                      )}
                      {mineBlack > 0 && (
                        <div
                          onClick={() => handlePickColor("black")}
                          className="h-8 w-8 rounded-full"
                          style={{ backgroundColor: "black" }}
                        />
                      )}
                    </div>
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
