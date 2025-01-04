import { StateCreator } from "zustand";
import { GAME } from "types/types";
import { User, RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "../lib/client";

export interface GameSlice {
  game: GAME | null;
  gameCode: string | null;
  currentChannel: RealtimeChannel | null;
  user: User | null;
  createRoom: () => Promise<string | null>;
  joinRoom: (display_name: string, game_code: string) => void;
  setGame: (game: GAME) => void;
  setUser: (user: User | null) => void;
  subscribeToRoom: (gameCode: string) => void;
  unsubscribeFromRoom: () => void;
}

export const createGameSlice: StateCreator<GameSlice> = (set, get) => ({
  game: null,
  gameCode: null,
  currentChannel: null,
  user: null,
  setGame: (game) => set(() => ({ game: game })),
  setCurrentRoom: (gameCode: string) => {
    set({ gameCode: gameCode });
    get().subscribeToRoom(gameCode);
  },
  setUser: (user) => set({ user }),
  subscribeToRoom: (gameCode) => {
    const { unsubscribeFromRoom } = get();
    unsubscribeFromRoom();
    const currentChannel = supabase
      .channel(`room:${gameCode}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "games",
          filter: `room_code=eq.${gameCode}`,
        },
        (payload) => {
          const game = payload.new as GAME;
          get().setGame(game);
        }
      )
      .subscribe();
    set({ gameCode: gameCode, currentChannel: currentChannel });
  },
  unsubscribeFromRoom: () => {
    const { currentChannel } = get();
    if (currentChannel) {
      supabase.removeChannel(currentChannel);
    }
    set({ gameCode: null, currentChannel: null });
  },
  createRoom: async () => {
    const { data, error } = await supabase
      .from("games")
      .insert({})
      .select("game_code")
      .single();
    if (error) {
      return null;
    }
    set({ gameCode: data.game_code });
    return data.game_code;
  },
  joinRoom: async (display_name, game_code) => {
    console.log(display_name, game_code);
  },
  signInAnonymously: async () => {
    const { data, error } = await supabase.auth.signInAnonymously();
    if (error) {
      console.error("Error signing in anonymously:", error);
      return null;
    }
    set({ user: data.user });
    return data.user;
  },
});
