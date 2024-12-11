import { z } from "zod";

// Define the watchlist schema
export const watchlistSchema = z.object({
  id: z.number().int().positive(), // Primary key
  user_id: z.string().nonempty(), // User ID as text
  anime_id: z.number().int().positive(), // Anime ID as integer
  progress: z.string().nullable().optional(), // Progress as a nullable or optional string
  status: z.string().min(1), // Status as an enum
  type: z.string().min(1), // Type as an enum
});

// Type inferred from watchlist schema
export type Watchlist = z.infer<typeof watchlistSchema>;

// Schema for adding a new watchlist item (omit the `id` field)
export const addWatchlistSchema = z.object({
  user_id: z.string().nonempty(), // User ID as text
  anime_id: z.number().int().positive(), // Anime ID as integer
  progress: z.string().nullable().optional(), // Progress is nullable or optional
  status: z.string().min(1), // Status as an enum
  type: z.string().min(1), // Type as an enum
});

export type AddWatchlist = z.infer<typeof addWatchlistSchema>;

// Schema for updating a watchlist item
export const updateWatchlistSchema = z.object({
  status: z.enum(["Not Started", "In Progress", "Completed", "Paused"]), // Status to update
  progress: z.string().nullable().optional(), // Progress as nullable or optional string
});
