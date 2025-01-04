import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createGameSlice, GameSlice } from "./game.slice";

export type GameStore = GameSlice;

export const useGameStore = create<GameStore>()(
  persist(
    (...a) => ({
      ...createGameSlice(...a),
    }),
    { name: "game-store" }
  )
);
