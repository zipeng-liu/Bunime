import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

type EditAnimeDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: { status: string; progress: string }) => void;
};

export const EditAnimeDialog: React.FC<EditAnimeDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [status, setStatus] = useState<string>("");
  const [progress, setProgress] = useState<string>("");

  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ status, progress });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-6 rounded-lg bg-background text-foreground w-full max-w-lg space-y-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit Anime</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Update the status and progress for this anime.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Status Field */}
          <div>
            <label className="block mb-2 text-sm font-medium">Status</label>
            <Select
              onValueChange={(value) => setStatus(value)}
              value={status}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Not Started">Not Started</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Paused">Paused</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Progress Field */}
          <div>
            <label className="block mb-2 text-sm font-medium">Progress</label>
            <Input
              type="text"
              placeholder="Enter progress (e.g., Episode 5)"
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Close
            </Button>
            <Button type="submit">Update</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
