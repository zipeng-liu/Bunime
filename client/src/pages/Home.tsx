import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimeDialog } from "@/components/AnimeDialog";

// Jikan API anime type
type Anime = {
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

type WatchlistItem = {
  id: number;
  user_id: number;
  anime_id: number;
  status: "Not Started" | "In Progress" | "Completed" | "Paused";
  type: "TV" | "Movie" | "OVA" | "ONA" | "Special";
  progress: string | null;
};

const Home = () => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [animeData, setAnimeData] = useState<(Anime & WatchlistItem)[]>([]);
  const [animeInfo, setAnimeInfo] = useState<Anime | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchWatchlist = async () => {
    try {
      const res = await fetch("/api/watchlist?user_id=1");
      const data = await res.json();
      console.log("Fetched watchlist:", data);
      setWatchlist(data.watchlist); // Correctly set the watchlist array
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    }
  };

  const fetchAnimeDetails = async () => {
    try {
      const animeDetails = await Promise.all(
        watchlist.map(async (item) => {
          console.log("Fetching anime details for ID:", item.anime_id);
          const res = await fetch(`https://api.jikan.moe/v4/anime/${item.anime_id}`);
          const data = await res.json();
          console.log("Fetched details:", data.data);
          return { ...data.data, ...item };
        })
      );
      console.log("Final anime details:", animeDetails);
      setAnimeData(animeDetails);
    } catch (error) {
      console.error("Error fetching anime details:", error);
    }
  };

  const openDialog = (anime: Anime) => {
    setAnimeInfo(anime);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setAnimeInfo(null);
    setIsDialogOpen(false);
  };

  const removeFromWatchlist = (id: number) => {
    setAnimeData(animeData.filter((anime) => anime.id !== id));
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  useEffect(() => {
    console.log("Watchlist state:", watchlist);
    if (watchlist.length > 0) {
      console.log("Watchlist is ready, fetching anime details...");
      fetchAnimeDetails();
    }
  }, [watchlist]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center mb-6">Your Anime Watchlist</h1>
        {animeData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {animeData.map((anime) => (
              <Card key={anime.mal_id} className="p-4 flex flex-col justify-between bg-gray-800 rounded-lg shadow-lg">
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
                <Button variant="outline" className="text-white" onClick={() => removeFromWatchlist(anime.id)}>
                  Remove
                </Button>
                <Button variant="outline" className="text-white" onClick={() => openDialog(anime)}>
                  Info
                </Button>
                <Button variant="outline" className="text-white" onClick={() => console.log("Edit Placeholder")}>
                  Edit
                </Button>
              </div>
            </Card>
            
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            No anime found in your watchlist. Add some to get started!
          </p>
        )}
      </div>
      <AnimeDialog
        animeInfo={animeInfo}
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onAddToWatchlist={() => console.log("Added to Watchlist")}
      />
    </div>
  );
};

export default Home;
