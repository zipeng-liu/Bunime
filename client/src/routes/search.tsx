// src/pages/RouteComponent.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { AnimeDialog } from "../components/AnimeDialog";
import { AnimeCard } from "../components/AnimeCard";
import { Anime } from "@/types/anime";

export const Route = createFileRoute("/search")({
  component: RouteComponent,
});

function RouteComponent() {
  const [search, setSearch] = useState<string>(""); // User search input
  const [animeData, setAnimeData] = useState<Anime[]>([]); // Anime search results
  const [animeInfo, setAnimeInfo] = useState<Anime | null>(null); // Anime details for dialog
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // Dialog open state
  const [hasSearched, setHasSearched] = useState<boolean>(false); // Tracks if the user has searched
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state

  // Fetch anime data from the API
  const getAnimeData = async () => {
    if (!search.trim()) return; // Prevent empty searches
    try {
      setIsLoading(true); // Start loading
      const res = await fetch(
        `https://api.jikan.moe/v4/anime?q=${search}&limit=25`
      );
      const data = await res.json();
      setAnimeData(data.data || []);
      setHasSearched(true); // Mark that a search has been performed
    } catch (error) {
      console.error("Error fetching anime data:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Open the AnimeDialog
  const openDialog = (anime: Anime) => {
    setAnimeInfo(anime);
    setIsDialogOpen(true);
  };

  // Close the AnimeDialog
  const closeDialog = () => {
    setAnimeInfo(null);
    setIsDialogOpen(false);
  };

  // Clear search results
  const clearResults = () => {
    setAnimeData([]);
    setSearch("");
    setHasSearched(false); // Reset the search state
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Search Input and Buttons */}
        <div className="flex items-center gap-4 mb-6">
          <Input
            type="text"
            placeholder="Search for anime..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={getAnimeData}>Search</Button>
          <Button onClick={clearResults}>Clear</Button>
        </div>

        {/* Anime Results */}
        <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
        {isLoading ? (
          <div className="flex justify-center items-center col-span-full h-[50vh]">
            <p className="text-center text-muted-foreground">Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {animeData.length > 0 ? (
              animeData.map((anime) => (
                <AnimeCard
                  key={anime.mal_id}
                  anime={anime}
                  onAddToWatchlist={() => console.log("Add to Watchlist")}
                  onInfo={() => openDialog(anime)}
                />
              ))
            ) : hasSearched ? (
              <div className="flex justify-center items-center col-span-full h-[50vh]">
                <p className="text-center text-muted-foreground">
                  No results found. Try searching for something else.
                </p>
              </div>
            ) : (
              <div className="flex justify-center items-center col-span-full h-[50vh]">
                <p className="text-center text-muted-foreground">
                  Type in to search for something.
                </p>
              </div>
            )}
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


