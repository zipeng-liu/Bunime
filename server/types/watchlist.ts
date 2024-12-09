import { z } from "zod";

export const watchlistSchema = z.object({
  id: z.number().int().positive(),
  user_id: z.number().int().positive(),
  anime_id: z.number().int().positive(),
  progress: z.string().nullable().optional(), 
  status: z.enum(["Not Started", "In Progress", "Completed", "Paused"]),
  type: z.enum(["TV", "Movie", "OVA", "ONA", "Special"]), 
});

export type Watchlist = z.infer<typeof watchlistSchema>;

export const addWatchlistSchema = watchlistSchema.omit({ id: true });