CREATE TABLE "watchlist" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"anime_id" integer NOT NULL,
	"status" varchar(20) DEFAULT 'Not Started' NOT NULL,
	"progress" text,
	"type" varchar(20) NOT NULL
);
--> statement-breakpoint
CREATE INDEX "user_id_idx" ON "watchlist" USING btree ("user_id");