export type WatchlistItem = {
  id: number;
  user_id: number;
  anime_id: number;
  status: "Not Started" | "In Progress" | "Completed" | "Paused";
  type: "TV" | "Movie" | "OVA" | "ONA" | "Special";
  progress: string | null;
};

