// src/pages/RouteComponent.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimeDialog } from "@/components/AnimeDialog";
import { AnimeCard } from "@/components/AnimeCard";
import { Anime } from "@/types/anime";
import { api, userQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/search")({
  component: RouteComponent,
});

function RouteComponent() {
  const [search, setSearch] = useState<string>(""); // Search input state
  const [animeData, setAnimeData] = useState<Anime[]>([]); // Anime search results
  const [animeInfo, setAnimeInfo] = useState<Anime | null>(null); // Anime details for dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false); // AnimeDialog open state
  const [isLoading, setIsLoading] = useState(false); // Loading state for search
  const [isAdding, setIsAdding] = useState(false); // Loading state for adding to watchlist

  // Fetch user info
  const { data: userData, isPending: isUserLoading, error: userError } = useQuery(userQueryOptions);

  // Fetch anime data from Jikan API
  const getAnimeData = async () => {
    if (!search.trim()) return; // Prevent empty searches
    try {
      setIsLoading(true); // Start loading
      const res = await fetch(
        `https://api.jikan.moe/v4/anime?q=${search}&limit=25`
      );
      const data = await res.json();
      setAnimeData(data.data || []);
    } catch (error) {
      console.error("Error fetching anime data:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Add to watchlist handler
  const handleAddToWatchlist = async (anime: Anime) => {
    try {
      if (isUserLoading || !userData?.user) {
        throw new Error("User information is not available.");
      }

      setIsAdding(true); // Start adding
      const payload = {
        anime_id: anime.mal_id,
        user_id: userData.user.id, // User ID fetched from backend
        status: "Not Started",
        progress: null,
        type: anime.type || "TV",
      };

      const res = await api.watchlist.$post({ json: payload });
      if (!res.ok) {
        throw new Error("Failed to add to watchlist");
      }

      alert("Anime added to watchlist!");
    } catch (error) {
      alert("Failed to add anime to watchlist.");
      console.error(error);
    } finally {
      setIsAdding(false); // Stop adding
    }
  };

  // Handlers for AnimeDialog
  const openDialog = (anime: Anime) => {
    setAnimeInfo(anime);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setAnimeInfo(null);
    setIsDialogOpen(false);
  };

  // Clear search results
  const clearResults = () => {
    setAnimeData([]);
    setSearch("");
  };

  if (isUserLoading) {
    return <p className="text-center text-muted-foreground">Loading user data...</p>;
  }

  if (userError) {
    return <p className="text-center text-muted-foreground">User not logged in</p>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Search Input */}
        <div className="flex items-center gap-4 mb-6">
          <Input
            type="text"
            placeholder="Search for anime..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={getAnimeData} disabled={isLoading}>
            {isLoading ? "Searching..." : "Search"}
          </Button>
          <Button onClick={clearResults}>Clear</Button>
        </div>

        {/* Anime Results */}
        <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
        {isLoading ? (
          <p className="text-center text-muted-foreground">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {animeData.length > 0 ? (
              animeData.map((anime) => (
                <AnimeCard
                  key={anime.mal_id}
                  anime={anime}
                  onAddToWatchlist={() => handleAddToWatchlist(anime)}
                  onInfo={() => openDialog(anime)}
                />
              ))
            ) : (
              <p className="text-center text-muted-foreground">No results found.</p>
            )}
          </div>
        )}
      </div>

      {/* AnimeDialog for details */}
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
