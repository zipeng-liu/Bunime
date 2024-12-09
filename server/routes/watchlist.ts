import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { addWatchlistSchema } from "../types/watchlist";
import { fakeWatchlist } from "../db/fakeDb";

export const watchlistRoute = new Hono()
  // GET watchlist items for a specific user
  .get("/", (c) => {
    const userId = c.req.query("user_id");

    const userWatchlist = fakeWatchlist.filter(
      (item) => item.user_id === Number(userId)
    );

    return c.json({ watchlist: userWatchlist }, 200);
  })

  // POST a new watchlist item
  .post("/", zValidator("json", addWatchlistSchema), async (c) => {
    const watchlist = await c.req.valid("json");

    const newWatchlist = {
      ...watchlist,
      id: fakeWatchlist.length + 1, // Assign a unique ID
    };

    fakeWatchlist.push(newWatchlist);
    c.status(201);
    return c.json(newWatchlist);
  })

  // GET a specific watchlist item by ID
  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const watchlistItem = fakeWatchlist.find(
      (watchlist) => watchlist.id === id
    );
    if (!watchlistItem) {
      return c.notFound();
    }
    return c.json({ watchlistItem });
  })

  // DELETE a specific watchlist item by ID
  .delete("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const index = fakeWatchlist.findIndex((watchlist) => watchlist.id === id);
    if (index === -1) {
      return c.notFound();
    }

    const deletedWatchlistItem = fakeWatchlist.splice(index, 1)[0];
    return c.json({ item: deletedWatchlistItem });
  });
