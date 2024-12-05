import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Card } from "./components/ui/card";
import { NavigationMenu } from "./components/ui/navigation-menu";
import "./App.css";

// Jikan API anime type
type Anime = {
  mal_id: number; 
  images: {
    jpg: {
      image_url: string; 
    };
  };
  title: string; 
  synopsis?: string; 
};

function App() {
  const [search, setSearch] = useState<string>(""); 
  const [animeData, setAnimeData] = useState<Anime[]>([]); 
  
  // Fetch anime data from Jikan API
  const getAnimeData = async () => {
    if (!search) return; 
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&limit=25`);
      const data = await res.json();
      setAnimeData(data.data || []); 
    } catch (error) {
      console.error("Error fetching anime data:", error);
    }
  };

  // Optionally preload anime data (e.g., on first load)
  useEffect(() => {
    setSearch("Naruto");
    getAnimeData();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top navigation bar */}
      <NavigationMenu />

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Search bar */}
        <div className="flex items-center gap-4 mb-6">
          <Input
            type="text"
            placeholder="Search for anime..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={getAnimeData}>Search</Button>
        </div>

        {/* Search results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {animeData.length > 0 ? (
            animeData.map((anime) => (
              <Card key={anime.mal_id} className="p-4">
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
                <h3 className="font-semibold text-lg">{anime.title}</h3>
                <p className="text-sm text-muted">
                  {anime.synopsis ? anime.synopsis.slice(0, 100) + "..." : "No synopsis available."}
                </p>
                <Button variant="outline" className="mt-3">
                  Add to Watchlist
                </Button>
              </Card>
            ))
          ) : (
            <p className="text-center">No anime found. Try searching for something else!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;