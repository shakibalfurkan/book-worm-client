import { AlertCircleIcon, TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

import { useState } from "react";
import { IGenre } from "@/interfaces/genre.interface";
import { useDeleteGenre } from "@/hooks/genre.hook";

export default function DeleteGenreDialog({ genre }: { genre: IGenre }) {
  const [open, setOpen] = useState(false);

  const { mutate: deleteGenre, isError, error, isPending } = useDeleteGenre();
  const handleDelete = () => {
    deleteGenre(genre._id, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"destructive"}
          size={"icon"}
          className="cursor-pointer"
        >
          <TrashIcon />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106.25">
        {isError && (
          <Alert variant="destructive" className="mb-5">
            <AlertCircleIcon />
            <AlertTitle>Unable to delete genre.</AlertTitle>
            <AlertDescription>
              <p>{error?.message}</p>
            </AlertDescription>
          </Alert>
        )}

        <DialogHeader className="mb-4">
          <DialogTitle className="text-center">
            Are you sure you want to delete this genre?
          </DialogTitle>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>

          <Button
            onClick={() => handleDelete()}
            disabled={isPending}
            type="button"
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
