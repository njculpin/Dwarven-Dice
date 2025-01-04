import { createContext, ReactNode, useContext } from "react";
import { GameStore, useGameStore } from "./use-game-store";

const GameContext = createContext<GameStore>({} as GameStore);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const store = useGameStore();
  return <GameContext.Provider value={store}>{children}</GameContext.Provider>;
};

export const useGameContext = () => useContext(GameContext);
