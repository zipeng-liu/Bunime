// import { useState, useEffect } from "react";
// import { Button } from "./components/ui/button";
// import { Input } from "./components/ui/input";
// import { Card } from "./components/ui/card";
// import { Modal } from "./components/AnimeInfoModal";
// import "./App.css";

// // Jikan API anime type
// type Anime = {
//   mal_id: number;
//   images: {
//     jpg: {
//       image_url: string;
//     };
//   };
//   title: string;
//   synopsis?: string;
// };

// function App() {
//   const [search, setSearch] = useState<string>(""); 
//   const [animeData, setAnimeData] = useState<Anime[]>([]); 
//   const [animeInfo, setAnimeInfo] = useState<Anime | null>(null);
//   const [suggestedAnimes, setSuggestedAnimes] = useState<Anime[]>([]); 
//   const [hasSearched, setHasSearched] = useState<boolean>(false); 
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

//   // Fetch anime data based on search query
//   const getAnimeData = async () => {
//     if (!search) return;
//     try {
//       const res = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&limit=25`);
//       const data = await res.json();
//       setAnimeData(data.data || []);
//       setHasSearched(true); 
//     } catch (error) {
//       console.error("Error fetching anime data:", error);
//     }
//   };

//   // Fetch suggested animes
//   const getSuggestedAnimes = async () => {
//     try {
//       const res = await fetch(`https://api.jikan.moe/v4/anime?order_by=popularity&sort=asc&limit=20`);
//       const data = await res.json();
//       setSuggestedAnimes(data.data || []);
//     } catch (error) {
//       console.error("Error fetching suggested animes:", error);
//     }
//   };

//   useEffect(() => {
//     getSuggestedAnimes(); 
//   }, []);

//   const openModal = (anime: Anime) => {
//     setAnimeInfo(anime);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setAnimeInfo(null);
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="min-h-screen bg-background text-foreground flex">
//       <div className="flex-1 max-w-4xl mx-auto px-4 py-6">
//         {/* Search bar */}
//         <div className="flex items-center gap-4 mb-6">
//           <Input
//             type="text"
//             placeholder="Search for anime..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <Button onClick={getAnimeData}>Search</Button>
//         </div>

//         {/* Search Results */}
//         {hasSearched ? (
//           <>
//             <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {animeData.length > 0 ? (
//                 animeData.map((anime) => (
//                   <Card key={anime.mal_id} className="p-4">
//                     <img
//                       src={anime.images.jpg.image_url}
//                       alt={anime.title}
//                       className="w-full h-48 object-cover rounded-lg mb-3"
//                     />
//                     <h3 className="font-semibold text-lg">{anime.title}</h3>
//                     <p className="text-sm text-muted">
//                       {anime.synopsis
//                         ? anime.synopsis.slice(0, 100) + "..."
//                         : "No synopsis available."}
//                     </p>
//                     <Button variant="outline" className="mt-3">
//                       Add to Watchlist
//                     </Button>
//                   </Card>
//                 ))
//               ) : (
//                 <p className="text-center">
//                   No anime found. Try searching for something else!
//                 </p>
//               )}
//             </div>
//           </>
//         ) : (
//           <>
//             {/* Suggested animes */}
//             <h2 className="text-2xl font-semibold mb-4">Suggested Animes</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {suggestedAnimes.map((anime) => (
//                 <Card key={anime.mal_id} className="p-4">
//                   <img
//                     src={anime.images.jpg.image_url}
//                     alt={anime.title}
//                     className="w-full h-48 object-cover rounded-lg mb-3"
//                   />
//                   <h3 className="font-semibold text-lg">{anime.title}</h3>
//                   <p className="text-sm text-muted">
//                     {anime.synopsis
//                       ? anime.synopsis.slice(0, 100) + "..."
//                       : "No synopsis available."}
//                   </p>
//                   <Button variant="outline" className="mt-3">
//                     Add to Watchlist
//                   </Button>
//                 </Card>
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;


import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Card } from "./components/ui/card";
import { AnimeDialog } from "./components/AnimeDialog"; 
import "./App.css";

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

function App() {
  const [search, setSearch] = useState<string>("");
  const [animeData, setAnimeData] = useState<Anime[]>([]);
  const [animeInfo, setAnimeInfo] = useState<Anime | null>(null); 
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

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

  const openDialog = (anime: Anime) => {
    setAnimeInfo(anime);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setAnimeInfo(null);
    setIsDialogOpen(false);
  };

  useEffect(() => {
    setSearch("Naruto");
    getAnimeData();
  }, []);

  useEffect(() => {
    fetch("/api/watchlist")
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Input
            type="text"
            placeholder="Search for anime..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={getAnimeData}>Search</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {animeData.map((anime) => (
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

      {/* Dialog Component */}
      <AnimeDialog
        animeInfo={animeInfo}
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onAddToWatchlist={() => console.log("Added to Watchlist")}
      />
    </div>
  );
}

export default App;
