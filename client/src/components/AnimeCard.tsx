import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Anime } from "@/types/anime";

type AnimeCardProps = {
  anime: Anime;
  onAddToWatchlist: () => void;
  onInfo: () => void;
};

export const AnimeCard: React.FC<AnimeCardProps> = ({
  anime,
  onAddToWatchlist,
  onInfo,
}) => {
  return (
    <Card className="p-4 flex flex-col justify-between bg-gray-800 rounded-lg shadow-lg">
      <img
        src={anime.images.jpg.image_url}
        alt={anime.title}
        className="w-full h-full object-cover rounded-lg mb-3"
      />
      <h3 className="font-semibold text-lg text-white text-center mb-3">
        {anime.title}
      </h3>
      <div className="flex justify-between mt-3">
        <Button
          variant="outline"
          className="text-white"
          onClick={onAddToWatchlist}
        >
          Add to Watchlist
        </Button>
        <Button variant="outline" className="text-white" onClick={onInfo}>
          Info
        </Button>
      </div>
    </Card>
  );
};
