import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { addWatchlistSchema, updateWatchlistSchema } from "../types/watchlist";
import { getUser } from "../kinde";
import { fakeWatchlist } from "../db/fakeDb";

export const watchlistRoute = new Hono()
  // GET watchlist items for a specific user
  .get("/", getUser, (c) => {
    const user = c.var.user
    const userId = c.req.query("user_id");

    const userWatchlist = fakeWatchlist.filter(
      (item) => item.user_id === Number(userId)
    );

    return c.json({ watchlist: userWatchlist }, 200);
  })

  // POST: Update watchlist item status and progress
  .post(
    "/:id{[0-9]+}/update",
    getUser,
    zValidator("json", updateWatchlistSchema),
    async (c) => {
      const id = Number.parseInt(c.req.param("id"));
      const updateData = await c.req.valid("json");

      const watchlistItem = fakeWatchlist.find((item) => item.id === id);
      if (!watchlistItem) {
        return c.notFound();
      }

      // Update the status and progress fields
      watchlistItem.status = updateData.status;
      if (updateData.progress) {
        watchlistItem.progress = updateData.progress;
      }

      // Return a success message
      return c.json({ message: "Watchlist item updated successfully." }, 204);
    }
  );
