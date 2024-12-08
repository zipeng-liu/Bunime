import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-primary text-primary-foreground px-4 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          Bunime
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link to="/search">Search</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/profile">Profile</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};