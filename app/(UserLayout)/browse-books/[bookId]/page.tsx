"use client";

import AddReviewDialog from "@/components/dialogs/review/AddReviewDialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RatingGroupAdvanced } from "@/components/ui/rating-group";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/context/user.provider";
import { useGetBookById } from "@/hooks/book.hook";
import { useToggleShelve } from "@/hooks/shelve.hook";
import { IBook } from "@/interfaces/book.interface";
import { IReview } from "@/interfaces/review.interface";
import { AlertCircle, BookOpen, Heart, RefreshCw, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

interface IProps {
  params: Promise<{ bookId: string }>;
}

export default function BookDetails({ params }: IProps) {
  const resolvedParams = use(params);
  const bookId = resolvedParams.bookId;

  const { user } = useUser();

  const { data: book, isLoading, isError, refetch } = useGetBookById(bookId);
  const data: IBook = book?.data?.book;
  const reviews: IReview[] = book?.data?.reviews;

  const { mutate: toggleShelve, isPending: toggleShelvePending } =
    useToggleShelve();

  const handleToggleShelve = () => {
    toggleShelve(
      {
        user: user?._id as string,
        book: bookId,
      },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  const isShelved = data?.userShelves.some((id) => id === user!._id);
  console.log(data);
  if (isLoading) {
    return (
      <section className="min-h-screen max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cover Skeleton */}
          <Skeleton className="aspect-3/4 rounded-2xl" />

          {/* Info Skeleton */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-3">
              <Skeleton className="h-10 w-2/3" />
              <Skeleton className="h-5 w-1/3" />
            </div>

            <div className="flex gap-6">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-24" />
            </div>

            <Skeleton className="h-10 w-40" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-28 w-full rounded-xl" />
          ))}
        </div>
      </section>
    );
  }

  if (isError || !data) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md bg-destructive/10">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle className="font-display font-bold">
            Something went wrong
          </AlertTitle>
          <AlertDescription className="mt-2 text-muted-foreground">
            We couldn&apos;t load the book details. It might be a connection
            issue or the book doesn&apos;t exist.
          </AlertDescription>
          <div className="mt-4 flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Try Again
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/browse-books">Back to Library</Link>
            </Button>
          </div>
        </Alert>
      </section>
    );
  }

  return (
    <section className="min-h-screen max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Book Cover */}
        <div className="relative aspect-3/4 rounded-2xl overflow-hidden bg-card shadow-xl">
          <Image
            src={data?.coverImage || "/placeholder-book.jpg"}
            alt={data?.title || "Book Cover"}
            fill
            className="object-cover"
          />
          <Badge className="absolute text-foreground top-4 right-4 bg-background/90 backdrop-blur border border-border">
            {data?.genre?.name}
          </Badge>
        </div>

        {/* Book Info */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-4xl font-display font-bold text-foreground mb-2">
              {data?.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              by{" "}
              <span className="font-medium text-foreground">
                {data?.author}
              </span>
            </p>
          </div>

          {/* Rating & Stats */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-primary text-primary" />
              <span className="font-semibold">
                {data?.avgRating?.toFixed(1) || "0.0"}
              </span>
              <span className="text-sm text-muted-foreground">
                ({data?.totalReviews || 0} reviews)
              </span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="w-4 h-4" />
              <span>{data?.totalPages} pages</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Heart className="w-4 h-4" />
              <span>{data?.userShelves?.length || 0} shelved</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            {isShelved ? (
              <Button
                onClick={handleToggleShelve}
                disabled={toggleShelvePending}
                variant="outline"
                className="gap-2 border-primary text-primary hover:bg-primary/10 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                {toggleShelvePending ? "Removing..." : "Remove from Shelf"}
              </Button>
            ) : (
              <Button
                onClick={handleToggleShelve}
                disabled={toggleShelvePending}
                className="gap-2 bg-primary hover:bg-brand-hover text-background cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                {toggleShelvePending ? "Adding..." : "Add to Shelf"}
              </Button>
            )}
          </div>

          {/* Description */}
          <p className="text-text-mist leading-relaxed max-w-3xl">
            {data?.description}
          </p>
        </div>
      </div>

      <Separator className="my-12" />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-display font-semibold">
            Reader Reviews
          </h2>
          <AddReviewDialog bookId={data?._id} userId={user?._id as string} />
        </div>

        {/* Reviews List */}
        <div className="grid gap-6">
          {reviews?.length > 0 ? (
            reviews.map((review: IReview) => (
              <Card key={review._id} className="bg-card border-border">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{review.user?.name}</p>
                    <div className="flex items-center gap-1">
                      <RatingGroupAdvanced
                        allowHalf={true}
                        readOnly={true}
                        value={review.rating.toString()}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {review.comment}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground">
              No reviews yet. Be the first to review this book!
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
