import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Anime } from "@/types/anime";
import { Watchlist } from "@server/types/watchlist";

type WatchlistCardProps = {
  anime: Anime & Watchlist;
  onRemove: (id: number) => void;
  onOpenDialog: (anime: Anime & Watchlist) => void;
};

export const WatchlistCard: React.FC<WatchlistCardProps> = ({ anime, onRemove, onOpenDialog }) => {
  return (
    <Card className="p-4 flex flex-col justify-between bg-gray-800 rounded-lg shadow-lg">
      <img
        src={anime.images.jpg.image_url}
        alt={anime.title}
        className="w-full h-full object-cover rounded-lg mb-3"
      />
      <h3 className="font-semibold text-lg text-white text-center mb-3">{anime.title}</h3>
      <div className="bg-gray-700 p-3 rounded-lg text-white mb-3">
        <p className="text-sm mb-2">
          <strong>Status:</strong> {anime.status}
        </p>
        <p className="text-sm mb-2">
          <strong>Type:</strong> {anime.type}
        </p>
        <p className="text-sm">
          <strong>Progress:</strong> {anime.progress || "Not Started"}
        </p>
      </div>
      <div className="flex justify-between mt-3">
        <Button variant="outline" className="text-white" onClick={() => onRemove(anime.id)}>
          Remove
        </Button>
        <Button variant="outline" className="text-white" onClick={() => onOpenDialog(anime)}>
          Info
        </Button>
        <Button variant="outline" className="text-white" onClick={() => console.log("Edit Placeholder")}>
          Edit
        </Button>
      </div>
    </Card>
  );
};
