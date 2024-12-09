import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { AnimeDialog } from "../components/AnimeDialog";
import { Navbar } from "../components/Navbar";

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

const Search = () => {
  const [search, setSearch] = useState<string>(""); // User search input
  const [animeData, setAnimeData] = useState<Anime[]>([]); // Anime search results
  const [animeInfo, setAnimeInfo] = useState<Anime | null>(null); // Anime details for dialog
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // Dialog open state
  const [hasSearched, setHasSearched] = useState<boolean>(false); // Tracks if the user has searched

  // Fetch anime data from the API
  const getAnimeData = async () => {
    if (!search.trim()) return; // Prevent empty searches
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&limit=25`);
      const data = await res.json();
      setAnimeData(data.data || []);
      setHasSearched(true); // Mark that a search has been performed
    } catch (error) {
      console.error("Error fetching anime data:", error);
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
      {/* Navigation */}
      <Navbar />

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {animeData.length > 0 ? (
            animeData.map((anime) => (
              <Card key={anime.mal_id} className="p-4 flex flex-col justify-between bg-gray-800 rounded-lg shadow-lg">
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  className="w-full h-full object-cover rounded-lg mb-3"
                />
                <h3 className="font-semibold text-lg text-white text-center mb-3">{anime.title}</h3>
                <div className="flex justify-between mt-3">
                  <Button variant="outline" className="text-white" onClick={() => console.log("Add to Watchlist")}>
                    Add to Watchlist
                  </Button>
                  <Button variant="outline" className="text-white" onClick={() => openDialog(anime)}>
                    Info
                  </Button>
                </div>
              </Card>
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

export default Search;