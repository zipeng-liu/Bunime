import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Button } from "@/components/ui/button"; 
import { type QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      {/* Navbar */}
      <nav className="bg-primary text-primary-foreground px-4 py-3 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold">
            Bunime
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/popular">Popular Anime</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/search">Search</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/profile">Profile</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
