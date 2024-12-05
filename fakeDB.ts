export type Watchlist = {
  id: number; // Unique identifier for the record
  user_id: number; // ID of the user who owns this progress
  anime_id: number; // Anime ID from Jikan API
  current_episode: number; // Current episode the user is on
  current_season: number; // Current season the user is on
  status: "Not Started" | "In Progress" | "Completed" | "Paused"; // Status of the anime for the user
  rating?: number | null; // User's personal rating for the anime (optional, can be null)
};

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
