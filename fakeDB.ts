export type Watchlist = {
  id: number; // Unique identifier for the record
  user_id: number; // ID of the user who owns this progress
  anime_id: number; // Anime ID from Jikan API
  current_episode: number; // Current episode the user is on
  status: "Watching" | "Completed" | "On Hold" | "Dropped"; // Current status of the anime for the user
  rating?: number | null; // User's personal rating for the anime (optional)
  notes?: string; // Personal notes about the anime (optional)
  last_updated: string; // Timestamp for the last update (ISO string)
};

export const fakeWatchlist: Watchlist[] = [
  {
    id: 1,
    user_id: 101,
    anime_id: 5114, // Fullmetal Alchemist: Brotherhood
    current_episode: 15,
    status: "Watching",
    rating: 9,
    notes: "Really enjoying the character development so far!",
    last_updated: "2024-12-01T10:15:30Z",
  },
  {
    id: 2,
    user_id: 101,
    anime_id: 40028, // Jujutsu Kaisen
    current_episode: 24,
    status: "Completed",
    rating: 10,
    notes: "The animation and fights were phenomenal.",
    last_updated: "2024-11-20T18:45:00Z",
  },
  {
    id: 3,
    user_id: 102,
    anime_id: 32281, // Your Name (Kimi no Na wa.)
    current_episode: 1,
    status: "Completed",
    rating: 8,
    notes: "Beautiful story and visuals.",
    last_updated: "2024-12-03T14:30:00Z",
  },
  {
    id: 4,
    user_id: 101,
    anime_id: 16498, // Shingeki no Kyojin
    current_episode: 5,
    status: "On Hold",
    rating: null,
    notes: "Will return to this after finishing FMA.",
    last_updated: "2024-12-02T09:15:00Z",
  },
  {
    id: 5,
    user_id: 103,
    anime_id: 918, // Clannad
    current_episode: 8,
    status: "Dropped",
    rating: null,
    notes: "Too slow-paced for my taste.",
    last_updated: "2024-11-25T12:00:00Z",
  },
];
