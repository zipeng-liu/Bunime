import type { Watchlist } from "../routes/watchlist";

export const fakeWatchlist: Watchlist[] = [
  {
    id: 1,
    user_id: 1,
    anime_id: 5114, // Fullmetal Alchemist: Brotherhood
    status: "In Progress",
    type: "TV",
    progress: "Episode 25",
  },
  {
    id: 2,
    user_id: 1,
    anime_id: 11061, // Hunter x Hunter Movie 1: Phantom Rouge
    status: "Completed",
    type: "Movie",
    progress: "Completed",
  },
  {
    id: 3,
    user_id: 2,
    anime_id: 9253, // Steins;Gate
    status: "Paused",
    type: "TV",
    progress: "Episode 10",
  },
  {
    id: 4,
    user_id: 1,
    anime_id: 19815, // Sword Art Online: Extra Edition
    status: "In Progress",
    type: "OVA",
    progress: "Part 1",
  },
  {
    id: 5,
    user_id: 1,
    anime_id: 30276, // One Punch Man
    status: "Not Started",
    type: "TV",
    progress: null,
  },
  {
    id: 6,
    user_id: 2,
    anime_id: 28851, // Kimi no Na wa.
    status: "In Progress",
    type: "Movie",
    progress: "0:45:00",
  },
  {
    id: 7,
    user_id: 1,
    anime_id: 1535, // Death Note
    status: "Completed",
    type: "TV",
    progress: "Episode 37",
  },
  {
    id: 8,
    user_id: 2,
    anime_id: 23273, // Shingeki no Kyojin: No Regrets
    status: "In Progress",
    type: "ONA",
    progress: "Episode 3",
  },
  {
    id: 9,
    user_id: 2,
    anime_id: 1, // Cowboy Bebop
    status: "Paused",
    type: "TV",
    progress: "Episode 5",
  },
  {
    id: 10,
    user_id: 1,
    anime_id: 21, // One Piece: Episode of Nami
    status: "In Progress",
    type: "Special",
    progress: "Part 2",
  },
];
