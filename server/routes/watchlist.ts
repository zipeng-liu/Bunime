import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { addWatchlistSchema, updateWatchlistSchema } from "../types/watchlist";
import { getUser } from "../kinde";
import { fakeWatchlist } from "../db/fakeDb";
import { db } from "../db";
import { watchlist as watchlistTable } from "../db/schema/watchlist";
import { eq } from "drizzle-orm";

export const watchlistRoute = new Hono()
  // GET watchlist items for a specific user
  .get("/", getUser, async (c) => {
    const user = c.var.user;
    const watchlist = await db
      .select()
      .from(watchlistTable)
      .where(eq(watchlistTable.user_id, user.id));
    return c.json({ watchlist: watchlist }, 200);
  })

  // POST: Add a new watchlist item
  .post("/", getUser, zValidator("json", addWatchlistSchema), async (c) => {
    const user = c.var.user;
    const watchlistData = await c.req.valid("json"); 
    const newWatchlistItem = {
      user_id: user.id, 
      anime_id: watchlistData.anime_id,
      status: watchlistData.status || "Not Started", 
      progress: watchlistData.progress || null, 
      type: watchlistData.type,
    };
    await db.insert(watchlistTable).values(newWatchlistItem);
    return c.json({ message: "Watchlist item added successfully" }, 201);
  });
