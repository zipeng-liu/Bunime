import type { Watchlist } from "../types/watchlist";

export const fakeWatchlist: Watchlist[] = [
  {
    id: 1,
    user_id: 1,
    anime_id: 16498, // Shingeki no Kyojin
    status: "In Progress",
    type: "TV",
    progress: "Episode 10",
  },
  {
    id: 2,
    user_id: 1,
    anime_id: 1535, // Death Note
    status: "Completed",
    type: "TV",
    progress: "Episode 37",
  },
  {
    id: 3,
    user_id: 1,
    anime_id: 5114, // Fullmetal Alchemist: Brotherhood
    status: "Paused",
    type: "TV",
    progress: "Episode 15",
  },
  {
    id: 4,
    user_id: 2,
    anime_id: 30276, // One Punch Man
    status: "Not Started",
    type: "TV",
    progress: null,
  },
  {
    id: 5,
    user_id: 2,
    anime_id: 31964, // Boku no Hero Academia
    status: "In Progress",
    type: "TV",
    progress: "Episode 8",
  },
  {
    id: 6,
    user_id: 2,
    anime_id: 19815, // No Game No Life
    status: "Paused",
    type: "TV",
    progress: "Episode 6",
  },
  {
    id: 7,
    user_id: 1,
    anime_id: 32281, // Kimi no Na wa.
    status: "Completed",
    type: "Movie",
    progress: "Completed",
  },
  {
    id: 8,
    user_id: 2,
    anime_id: 33486, // Boku no Hero Academia 2nd Season
    status: "Not Started",
    type: "TV",
    progress: null,
  },
  {
    id: 9,
    user_id: 1,
    anime_id: 21, // One Piece
    status: "In Progress",
    type: "TV",
    progress: "Episode 45",
  },
  {
    id: 10,
    user_id: 2,
    anime_id: 28851, // Koe no Katachi
    status: "Completed",
    type: "Movie",
    progress: "Completed",
  },
];