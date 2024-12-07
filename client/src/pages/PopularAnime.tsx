import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Navbar } from "../components/Navbar";
import { AnimeDialog } from "../components/AnimeDialog"; // Import AnimeDialog component

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
};

const PopularAnime = () => {
  const [popularAnimes, setPopularAnimes] = useState<Anime[]>([]); // Store popular animes
  const [animeInfo, setAnimeInfo] = useState<Anime | null>(null); // Store selected anime info
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // Dialog open state

  // Fetch popular animes
  const getPopularAnimes = async () => {
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime?order_by=popularity&sort=asc&limit=20`);
      const data = await res.json();
      setPopularAnimes(data.data || []);
    } catch (error) {
      console.error("Error fetching popular animes:", error);
    }
  };

  // Open AnimeDialog
  const openDialog = (anime: Anime) => {
    setAnimeInfo(anime);
    setIsDialogOpen(true);
  };

  // Close AnimeDialog
  const closeDialog = () => {
    setAnimeInfo(null);
    setIsDialogOpen(false);
  };

  // Fetch popular animes on component load
  useEffect(() => {
    getPopularAnimes();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 max-w-4xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-semibold mb-4">Popular Animes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularAnimes.map((anime) => (
            <Card key={anime.mal_id} className="p-4 flex flex-col justify-between">
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="w-full h-64 object-cover rounded-lg mb-3"
              />
              <h3 className="font-semibold text-lg">{anime.title}</h3>
              <div className="flex justify-between mt-3">
                <Button variant="outline" onClick={() => console.log("Add to Watchlist")}>
                  Add to Watchlist
                </Button>
                <Button variant="outline" onClick={() => openDialog(anime)}>
                  Info
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Dialog for Anime Details */}
      <AnimeDialog
        animeInfo={animeInfo}
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onAddToWatchlist={() => console.log("Added to Watchlist")}
      />
    </div>
  );
};

export default PopularAnime;
