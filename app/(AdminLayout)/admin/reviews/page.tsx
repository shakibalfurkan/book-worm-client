"use client";

import DeleteBookDialog from "@/components/dialogs/books/DeleteBookDialog";
import DeleteReviewDialog from "@/components/dialogs/review/DeleteReviewDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllReviews } from "@/hooks/review.hook";
import { IReview } from "@/interfaces/review.interface";
import { Star } from "lucide-react";

export default function Reviews() {
  const { data: reviews, isPending, error, isError } = useGetAllReviews();
  console.log(reviews);
  return (
    <section className="max-w-7xl mx-auto p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold font-serif">Manage Genres</h2>
        {/* <CreateGenreDialog /> */}
      </div>

      <div className="mt-4">
        <Table className="">
          {reviews?.data?.length === 0 && (
            <TableCaption>No Reviews</TableCaption>
          )}
          {isError && <TableCaption>{error?.message}</TableCaption>}
          <TableHeader className="bg-card">
            <TableRow>
              <TableHead className="w-20 text-center">#</TableHead>
              <TableHead>Book Title</TableHead>
              <TableHead>User Email</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending &&
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">
                    <Skeleton className="h-4 w-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-40" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-10" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-10" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-10" />
                  </TableCell>
                </TableRow>
              ))}
            {reviews?.data?.map((review: IReview, i: number) => (
              <TableRow key={review._id}>
                <TableCell className="font-medium text-center">
                  {(i + 1).toString().padStart(2, "0")}
                </TableCell>
                <TableCell>
                  <span className="font-medium text-foreground">
                    {review.book?.title || "Deleted Book"}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {review.user?.email}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-amber-500">
                      {review.rating}
                    </span>
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      review.status === "PENDING"
                        ? "bg-orange-500/10 text-orange-600 border-orange-200"
                        : "bg-emerald-500/10 text-emerald-600 border-emerald-200"
                    }
                  >
                    <span className="capitalize">{review.status}</span>
                  </Badge>
                </TableCell>
                <TableCell className="space-x-2">
                  {review.status === "PENDING" ? (
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 h-8"
                    >
                      Approve
                    </Button>
                  ) : (
                    <Button size="sm" variant="destructive" className="h-8">
                      Reject
                    </Button>
                  )}
                  <DeleteReviewDialog reviewId={review._id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
