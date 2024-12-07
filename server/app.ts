import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import { watchlistRoute } from "./routes/watchlist";

const app = new Hono();

app.use("*", logger());

const apiRoutes = app.basePath("/api").route("/watchlist", watchlistRoute);

app.get("*", serveStatic({ root: "./client/dist" }));
app.get("*", serveStatic({ path: "./client/dist/index.html" }));

export default app;
export type ApiRoutes = typeof apiRoutes;
