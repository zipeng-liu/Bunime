import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export const watchlistSchema = z.object({
  id: z.number().int().positive(),
  user_id: z.number().int().positive(),
  anime_id: z.number().int().positive(),
  current_episode: z.number().int().min(0),
  current_season: z.number().int().min(1),
  status: z.enum(["Not Started", "In Progress", "Completed", "Paused"]),
  rating: z.number().min(0).max(10).nullable().optional(),
});

type Watchlist = z.infer<typeof watchlistSchema>;

const addWatchlistSchema = watchlistSchema.omit({ id: true });

export const fakeWatchlist: Watchlist[] = [
  {
    id: 1,
    user_id: 101,
    anime_id: 5114, // Fullmetal Alchemist: Brotherhood
    current_episode: 15,
    current_season: 1,
    status: "In Progress",
    rating: 9,
  },
  {
    id: 2,
    user_id: 101,
    anime_id: 40028, // Jujutsu Kaisen
    current_episode: 24,
    current_season: 1,
    status: "Completed",
    rating: 10,
  },
  {
    id: 3,
    user_id: 102,
    anime_id: 32281, // Your Name (Kimi no Na wa.)
    current_episode: 1,
    current_season: 1,
    status: "Completed",
    rating: 8,
  },
  {
    id: 4,
    user_id: 101,
    anime_id: 16498, // Shingeki no Kyojin
    current_episode: 5,
    current_season: 1,
    status: "Paused",
    rating: null,
  },
  {
    id: 5,
    user_id: 103,
    anime_id: 918, // Clannad
    current_episode: 8,
    current_season: 1,
    status: "Not Started",
    rating: null,
  },
];

export const watchlistRoute = new Hono()
  .get("/", (c) => {
    return c.json({ watchlist: fakeWatchlist });
  })
  .post("/", zValidator("json", addWatchlistSchema), async (c) => {
    const watchlist = await c.req.valid("json");
    fakeWatchlist.push({ ...watchlist, id: fakeWatchlist.length });
    c.status(201);
    return c.json(watchlist);
  })
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
  .delete("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const index = fakeWatchlist.findIndex((watchlist) => watchlist.id === id);
    if (index === -1) {
      return c.notFound();
    }

    const deletedWatchlistItem = fakeWatchlist.splice(index, 1)[0];
    return c.json({ item: deletedWatchlistItem });
  });
