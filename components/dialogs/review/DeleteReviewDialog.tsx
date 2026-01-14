import { AlertCircleIcon, TrashIcon } from "lucide-react";

import { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useDeleteReview } from "@/hooks/review.hook";

export default function DeleteReviewDialog({ reviewId }: { reviewId: string }) {
  const [open, setOpen] = useState(false);

  const { mutate: deleteReview, isError, error, isPending } = useDeleteReview();
  const handleDelete = () => {
    deleteReview(reviewId, {
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
