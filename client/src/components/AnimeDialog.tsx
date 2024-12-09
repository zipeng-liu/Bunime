import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";

type AnimeDialogProps = {
  animeInfo: {
    title: string;
    synopsis?: string;
    images: { jpg: { large_image_url: string } };
    source: string;
    rank: number;
    score: number;
    popularity: number;
    members: number;
    status: string;
    rating: string;
    duration: string;
    type: string; // Added to display the anime type
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToWatchlist: () => void;
};

export const AnimeDialog: React.FC<AnimeDialogProps> = ({
  animeInfo,
  isOpen,
  onClose,
  onAddToWatchlist,
}) => {
  if (!animeInfo) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="p-4 sm:p-6 rounded-lg bg-background text-foreground w-full max-w-lg sm:max-w-2xl mx-auto space-y-6 overflow-y-auto"
        style={{ maxHeight: "90vh" }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{animeInfo.title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {animeInfo.synopsis || "No synopsis available for this anime."}
          </DialogDescription>
        </DialogHeader>

        {/* Anime Image */}
        <img
          src={animeInfo.images.jpg.large_image_url}
          alt={animeInfo.title}
          className="w-full h-full object-cover rounded-lg"
        />

        {/* Anime Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p><strong>Type:</strong> {animeInfo.type}</p> {/* Display anime type */}
            <p><strong>Source:</strong> {animeInfo.source}</p>
            <p><strong>Rank:</strong> {animeInfo.rank}</p>
            <p><strong>Score:</strong> {animeInfo.score}</p>
            <p><strong>Popularity:</strong> {animeInfo.popularity}</p>
          </div>
          <div>
            <p><strong>Members:</strong> {animeInfo.members}</p>
            <p><strong>Status:</strong> {animeInfo.status}</p>
            <p><strong>Rating:</strong> {animeInfo.rating}</p>
            <p><strong>Duration:</strong> {animeInfo.duration}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between space-x-2">
          <Button variant="outline" onClick={onAddToWatchlist}>
            Add to Watchlist
          </Button>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
