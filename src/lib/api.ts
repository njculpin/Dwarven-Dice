import { supabase } from "./client";
import { GAME } from "../../types/types";

export async function createAnonUser(): Promise<string | null> {
  try {
    const { data, error } = await supabase.auth.signInAnonymously();
    if (error) throw error;
    if (!data.user) throw "no user";
    return data.user.id;
  } catch (error) {
    console.error("Error creating new user:", error);
    throw new Error("Failed to create user");
  }
}

export async function createNewGame(): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from("games")
      .insert({})
      .select("game_code")
      .single();
    if (error) throw error;
    return data.game_code;
  } catch (error) {
    console.error("Error creating new game:", error);
    throw new Error("Failed to create a new game");
  }
}

export async function getGameByCode(code: string): Promise<GAME | null> {
  try {
    const { data, error } = await supabase
      .from("games")
      .select("*")
      .eq("game_code", code)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error getting games:", error);
    throw new Error("Failed to get game");
  }
}

export async function joinGameByCode(userId: string, gameId: number) {
  try {
    const { data, error } = await supabase
      .from("user_game")
      .insert({
        user_id: userId,
        game_id: gameId,
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating new game:", error);
    throw new Error("Failed to create a new game");
  }
}
