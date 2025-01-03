import { Database } from "./supabase";

export type GAME = Database["public"]["Tables"]["games"]["Row"];
export type GAMEUSER = Database["public"]["Tables"]["user_game"]["Row"];
