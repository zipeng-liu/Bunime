import {
  pgTable,
  serial,
  integer,
  varchar,
  text,
  index,
} from "drizzle-orm/pg-core";

// Define the watchlist table using the new API
export const watchlist = pgTable("watchlist", {
  id: serial("id").primaryKey(), // Unique ID for each watchlist item
  user_id: text("user_id").notNull(), // User ID
  anime_id: integer("anime_id").notNull(), // Anime ID
  status: varchar("status", { length: 20 }) // Status of the anime
    .notNull()
    .default("Not Started"),
  progress: text("progress"), // Progress of watching (optional)
  type: varchar("type", { length: 20 }).notNull(), // Type of anime (TV, Movie, etc.)
}, (t) => [
  index("user_id_idx").on(t.user_id), // Index on user_id for efficient lookups
]);
