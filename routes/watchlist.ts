import { Hono } from "hono";
import { fakeWatchlist } from "../fakeDB";

export const watchlistRoute = new Hono()
  .get("/", (c) => {
    return c.json({ watchlist: fakeWatchlist });
  })
  .post("/", async (c) => {
    const watchlist = await c.req.json();
    console.log({ watchlist });
    return c.json(watchlist);
  });
// .delete
// .put
