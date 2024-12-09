export type Anime = {
  mal_id: number;
  images: {
    jpg: {
      image_url: string;
      large_image_url: string;
    };
  };
  title: string;
  source: string;
  rank: number;
  score: number;
  popularity: number;
  members: number;
  status: string;
  rating: string;
  duration: string;
  type: string;
};