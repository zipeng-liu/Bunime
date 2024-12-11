import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  schema: "./server/db/schema/*",

  driver: "pglite",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
