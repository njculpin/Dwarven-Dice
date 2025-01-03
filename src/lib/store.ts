import { create } from "zustand";
import { supabase } from "./client";
import { User, RealtimeChannel } from "@supabase/supabase-js";
import { GAME } from "types/types";

interface GameState {
  game: GAME | null;
  currentRoom: string | null;
  currentChannel: RealtimeChannel | null;
  user: User | null;
  createRoom: () => Promise<string | null>;
  setGame: (game: GAME) => void;
  setUser: (user: User | null) => void;
  subscribeToRoom: (roomCode: string) => void;
  unsubscribeFromRoom: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  game: null,
  currentRoom: null,
  currentChannel: null,
  user: null,
  setGame: (game) => set(() => ({ game: game })),
  setCurrentRoom: (roomCode: string) => {
    set({ currentRoom: roomCode });
    get().subscribeToRoom(roomCode);
  },
  setUser: (user) => set({ user }),
  subscribeToRoom: (roomCode) => {
    const { unsubscribeFromRoom } = get();
    unsubscribeFromRoom(); // Unsubscribe from previous room if any
    const channel = supabase
      .channel(`room:${roomCode}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "games",
          filter: `room_code=eq.${roomCode}`,
        },
        (payload) => {
          const game = payload.new as GAME;
          get().setGame(game);
        }
      )
      .subscribe();
    set({ currentRoom: roomCode, currentChannel: channel });
  },
  unsubscribeFromRoom: () => {
    const { currentChannel } = get();
    if (currentChannel) {
      supabase.removeChannel(currentChannel);
    }
    set({ currentRoom: null, currentChannel: null });
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
    set({ currentRoom: data.game_code });
    return data.game_code;
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
}));
