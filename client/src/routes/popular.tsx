import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AnimeDialog } from "../components/AnimeDialog";
import { AnimeCard } from "../components/AnimeCard";
import { Anime } from "@/types/anime";

export const Route = createFileRoute("/popular")({
  component: RouteComponent,
});

function RouteComponent() {
  const [popularAnimes, setPopularAnimes] = useState<Anime[]>([]); // Store popular animes
  const [animeInfo, setAnimeInfo] = useState<Anime | null>(null); // Store selected anime info
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // Dialog open state
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state

  // Fetch popular animes
  const getPopularAnimes = async () => {
    try {
      setIsLoading(true); // Set loading to true before fetching
      const res = await fetch(
        `https://api.jikan.moe/v4/anime?order_by=popularity&sort=asc&limit=20`
      );
      const data = await res.json();
      setPopularAnimes(data.data || []);
    } catch (error) {
      console.error("Error fetching popular animes:", error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching
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
      {/* Main Content */}
      <div className="flex-1 max-w-4xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-semibold mb-4">Popular Animes</h2>
        {isLoading ? (
          <div className="flex justify-center items-center col-span-full h-[50vh]">
            <p className="text-center text-muted-foreground">Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularAnimes.map((anime) => (
              <AnimeCard
                key={anime.mal_id}
                anime={anime}
                onAddToWatchlist={() => console.log("Add to Watchlist")}
                onInfo={() => openDialog(anime)}
              />
            ))}
          </div>
        )}
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
}

export default RouteComponent;
