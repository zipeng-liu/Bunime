import { Navbar } from "../components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center">Welcome to Your Anime Watchlist</h1>
      </div>
    </div>
  );
};

export default Home;
