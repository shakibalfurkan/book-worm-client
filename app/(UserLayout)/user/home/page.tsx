"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUser } from "@/context/user.provider";
import { useGetRecommendedBooks } from "@/hooks/book.hook";
import { useGetMyShelves } from "@/hooks/shelve.hook";
import { IBook } from "@/interfaces/book.interface";
import { IGenre } from "@/interfaces/genre.interface";
import { IUserShelve } from "@/interfaces/shelve.interface";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
  BookOpen,
  Heart,
  Info,
  Sparkles,
  Star,
  TrendingUp,
  BookMarked,
  CheckCircle2,
  Calendar,
  Award,
  Target,
  BarChart3,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

export default function UserHome() {
  const { user } = useUser();
  const { data, isLoading } = useGetRecommendedBooks();
  const { data: shelvesData, isLoading: shelvesLoading } = useGetMyShelves();

  const recommendations = data?.data?.books || [];
  const myShelves: IUserShelve[] = shelvesData?.data || [];
  console.log(myShelves);
  const stats = useMemo(() => {
    const currentYear = new Date().getFullYear();

    let wantToRead = 0;
    let currentlyReading = 0;
    let read = 0;
    let readThisYear = 0;
    let totalPagesRead = 0;

    const genreCounts: Record<string, { name: string; count: number }> = {};

    myShelves.forEach((s) => {
      if (s.shelve === "WANT_TO_READ") wantToRead++;
      else if (s.shelve === "CURRENTLY_READING") currentlyReading++;
      else if (s.shelve === "READ") {
        read++;

        totalPagesRead += s.book?.totalPages || 0;

        if (
          s.finishedAt &&
          new Date(s.finishedAt).getFullYear() === currentYear
        ) {
          readThisYear++;
        }

        const genre = s.book?.genre;
        if (genre) {
          const gId = typeof genre === "object" ? genre._id : String(genre);
          const gName =
            typeof genre === "object" ? (genre as IGenre).name : "Unknown";

          if (!genreCounts[gId]) {
            genreCounts[gId] = { name: gName, count: 0 };
          }
          genreCounts[gId].count++;
        }
      }
    });

    const favoriteGenreObj = Object.values(genreCounts).sort(
      (a, b) => b.count - a.count
    )[0];

    return {
      wantToRead,
      currentlyReading,
      read,
      totalBooks: myShelves.length,
      readThisYear,
      totalPagesRead,
      favoriteGenre: favoriteGenreObj?.name || "None yet",
      favoriteGenreCount: favoriteGenreObj?.count || 0,
      streak: currentlyReading > 0 ? currentlyReading : 0,
    };
  }, [myShelves]);

  if (isLoading || shelvesLoading) {
    return (
      <section className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Skeleton className="h-10 w-64 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i}>
                <Skeleton className="aspect-2/3 w-full" />
                <CardContent className="p-4 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-8 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Welcome back, {user?.name?.split(" ")[0] || "Reader"}!
          </h1>
          <p className="text-muted-foreground">
            Here&apos;s your reading journey at a glance
          </p>
        </div>

        {/* Stats Overview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {/* Total Books */}
          <Card className="border-border bg-linear-to-br from-card to-card/50 hover:shadow-lg transition-all duration-300 card-glow group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <BookMarked className="w-6 h-6 text-primary" />
                </div>
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-foreground">
                  {stats.totalBooks}
                </p>
                <p className="text-sm text-muted-foreground font-medium">
                  Total Books
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <Badge variant="secondary" className="text-xs">
                    <Heart className="w-3 h-3 mr-1 text-purple-400" />
                    {stats.wantToRead} Wishlist
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Currently Reading */}
          <Card className="border-border bg-linear-to-br from-card to-card/50 hover:shadow-lg transition-all duration-300 card-glow group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors">
                  <BookOpen className="w-6 h-6 text-amber-400" />
                </div>
                <BarChart3 className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-foreground">
                  {stats.currentlyReading}
                </p>
                <p className="text-sm text-muted-foreground font-medium">
                  Currently Reading
                </p>
                {stats.currentlyReading > 0 && (
                  <div className="flex items-center gap-1 pt-2">
                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 w-3/5 rounded-full" />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Books Read This Year */}
          <Card className="border-border bg-linear-to-br from-card to-card/50 hover:shadow-lg transition-all duration-300 card-glow group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <Calendar className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-foreground">
                  {stats.readThisYear}
                </p>
                <p className="text-sm text-muted-foreground font-medium">
                  Books in {new Date().getFullYear()}
                </p>
                <p className="text-xs text-emerald-400 pt-2">
                  {stats.read} total completed
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Reading Streak */}
          <Card className="border-border bg-linear-to-br from-card to-card/50 hover:shadow-lg transition-all duration-300 card-glow group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors">
                  <Award className="w-6 h-6 text-orange-400" />
                </div>
                <Target className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-foreground">
                  {stats.streak}
                  <span className="text-lg text-muted-foreground ml-1">
                    days
                  </span>
                </p>
                <p className="text-sm text-muted-foreground font-medium">
                  Reading Streak
                </p>
                {stats.streak > 0 && (
                  <p className="text-xs text-orange-400 pt-2">🔥 Keep it up!</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {/* Pages Read */}
          <Card className="border-border hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Total Pages Read
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stats.totalPagesRead.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-blue-500/10">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Favorite Genre */}
          <Card className="border-border hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Favorite Genre
                  </p>
                  <p className="text-xl font-bold text-foreground line-clamp-1">
                    {stats.favoriteGenre}
                  </p>
                  {stats.favoriteGenreCount > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {stats.favoriteGenreCount} books read
                    </p>
                  )}
                </div>
                <div className="p-3 rounded-xl bg-purple-500/10">
                  <Star className="w-5 h-5 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reading Goal Progress */}
          <Card className="border-border hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    2026 Reading Goal
                  </p>
                  <Target className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-foreground">
                    {stats.readThisYear}
                  </p>
                  <p className="text-sm text-muted-foreground">/ 50 books</p>
                </div>
                <div className="space-y-1">
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-primary to-brand-hover rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(
                          (stats.readThisYear / 50) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((stats.readThisYear / 50) * 100)}% complete
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-linear-to-r from-primary/20 to-primary/5 border border-primary/20 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Personalized
                </span>
              </div>

              <div className="flex items-center gap-3">
                <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground tracking-tight">
                  Recommended Books
                </h2>

                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="p-1 rounded-full hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50">
                        <Info className="w-5 h-5 text-muted-foreground/60" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className="max-w-xs p-3 bg-popover border-border shadow-xl"
                    >
                      <div className="space-y-1.5">
                        <p className="text-xs font-bold text-primary uppercase">
                          Why these books?
                        </p>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {data?.data?.reason ||
                            "Based on your reading history and community favorites"}
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <p className="text-muted-foreground text-sm md:text-base">
                Based on your reading history and community favorites
              </p>
            </div>
            <Link href="/browse-books">
              <Button variant="outline" className="rounded-xl cursor-pointer">
                View All
              </Button>
            </Link>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recommendations.slice(0, 12).map((book: IBook, index: number) => (
              <Card
                key={book._id}
                className="group overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 card-glow"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`,
                }}
              >
                <div className="relative aspect-2/3 overflow-hidden bg-secondary/30">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <Badge className="absolute top-3 text-foreground right-3 bg-background/95 backdrop-blur-sm border border-border text-xs">
                    {book.genre?.name || "Unknown"}
                  </Badge>

                  {book.avgRating > 0 && (
                    <Badge className="absolute top-3 left-3 bg-primary/95 text-primary-foreground backdrop-blur-sm border-0 text-xs font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      {book.avgRating.toFixed(1)}
                    </Badge>
                  )}
                </div>

                <CardContent className="p-4 space-y-3">
                  <div>
                    <h3 className="font-display font-bold text-base text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      by {book.author}
                    </p>
                  </div>
                  <div className="pt-2">
                    <Link href={`/browse-books/${book._id}`}>
                      <Button
                        size="sm"
                        variant="default"
                        className="w-full gap-2 cursor-pointer"
                      >
                        <BookOpen className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          View Details
                        </span>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
