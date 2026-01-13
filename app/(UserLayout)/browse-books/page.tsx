"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllBooks } from "@/hooks/book.hook";
import useDebounce from "@/hooks/debounce.hook";
import { useGetAllGenres } from "@/hooks/genre.hook";
import { IBook } from "@/interfaces/book.interface";
import { IGenre } from "@/interfaces/genre.interface";
import {
  ArrowUpDown,
  BookOpen,
  Calendar,
  Clock,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  TrendingUp,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function BrowseBooks() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue);

  const [filters, setFilters] = useState({
    searchTerm: "",
    genre: [] as string[],
    minRating: "",
    maxRating: "",
    sortBy: "createdAt",
    sortOrder: "desc",
    page: 1,
    limit: 9,
  });
  const combinedFilters = useMemo(
    () => ({
      ...filters,
      searchTerm: debouncedSearchValue,
    }),
    [filters, debouncedSearchValue]
  );
  const {
    data: books,
    isPending,
    error,
    isError,
  } = useGetAllBooks(combinedFilters);

  const { data: genres, isPending: genresPending } = useGetAllGenres();

  const meta = books?.data?.meta;
  const currentPage = meta?.page || 1;
  const totalPages = meta?.totalPages || 1;
  const totalBooks = meta?.total || 0;
  const displayedBooks = books?.data?.data || [];

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setFilters((prev) => ({ ...prev, page: newPage }));
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleGenreToggle = (genreId: string) => {
    setFilters((prev) => {
      const currentGenres = prev.genre;
      const newGenres = currentGenres.includes(genreId)
        ? currentGenres.filter((id) => id !== genreId)
        : [...currentGenres, genreId];
      return { ...prev, genre: newGenres, page: 1 };
    });
  };

  const activeFilterCount =
    filters.genre.length +
    Number(!!filters.minRating) +
    Number(!!filters.maxRating);

  const hasActiveFilters = activeFilterCount > 0;

  const handleClearFilters = () => {
    setFilters({
      searchTerm: "",
      genre: [],
      minRating: "",
      maxRating: "",
      sortBy: "createdAt",
      sortOrder: "desc",
      page: 1,
      limit: 10,
    });
  };

  const removeGenreFilter = (genreId: string) => {
    setFilters((prev) => ({
      ...prev,
      genre: prev.genre.filter((g) => g !== genreId),
      page: 1,
    }));
  };

  return (
    <section className="min-h-screen bg-background">
      {/* Banner */}
      <div className="relative bg-linear-to-br from-card via-background to-card border-b border-border overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/50 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Discover Your Next Great Read
              </span>
            </div>
            <h1 className="text-5xl font-display font-bold text-foreground mb-4">
              Browse Our Collection
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore thousands of carefully curated books across all genres
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search by title or author..."
                className="pl-12 pr-12 h-14 rounded-2xl text-base border-border focus-visible:ring-primary/50"
              />
              {filters.searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleSearchChange("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-secondary"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Filter Toggle & Stats */}
          <div className="flex items-center justify-between mt-6 max-w-7xl mx-auto flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="secondary"
                className="rounded-xl gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="font-medium">Filters</span>
                {hasActiveFilters && (
                  <Badge className="ml-1 h-5 px-2 bg-primary text-primary-foreground">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>

              {hasActiveFilters && (
                <Button
                  onClick={handleClearFilters}
                  variant="ghost"
                  size="sm"
                  className="rounded-xl gap-2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                  Clear All
                </Button>
              )}
            </div>

            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">
                {totalBooks}
              </span>{" "}
              books found
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mt-4 max-w-7xl mx-auto">
              <div className="flex flex-wrap gap-2">
                {filters.genre.map((genreId) => {
                  const genre = genres?.data?.find(
                    (g: IGenre) => g._id === genreId
                  );
                  return genre ? (
                    <Badge
                      key={genreId}
                      variant="secondary"
                      className="gap-2 pl-3 pr-2 py-1.5 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20"
                    >
                      {genre.name}
                      <button
                        onClick={() => removeGenreFilter(genreId)}
                        className="hover:bg-primary/20 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ) : null;
                })}

                {filters.minRating && (
                  <Badge
                    variant="secondary"
                    className="gap-2 pl-3 pr-2 py-1.5 bg-primary/10 text-primary border border-primary/20"
                  >
                    Min Rating: {filters.minRating}★
                    <button
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          minRating: "",
                          page: 1,
                        }))
                      }
                      className="hover:bg-primary/20 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}

                {filters.maxRating && (
                  <Badge
                    variant="secondary"
                    className="gap-2 pl-3 pr-2 py-1.5 bg-primary/10 text-primary border border-primary/20"
                  >
                    Max Rating: {filters.maxRating}★
                    <button
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          maxRating: "",
                          page: 1,
                        }))
                      }
                      className="hover:bg-primary/20 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* main filters and stats */}
      <div
        className={`transition-all duration-300 ease-out overflow-hidden ${
          showFilters ? "opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Card className="bg-card/80 backdrop-blur-sm border-border shadow-lg card-glow">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {/* Genre Filter */}
                <div className="lg:col-span-2">
                  <Label className="flex items-center gap-2 mb-3 text-sm font-semibold">
                    <BookOpen className="h-4 w-4 text-primary" />
                    Genres
                  </Label>
                  <ScrollArea className="h-44 rounded-xl border border-border bg-background/50 p-3">
                    {genresPending ? (
                      <div className="space-y-2">
                        {[...Array(6)].map((_, i) => (
                          <Skeleton key={i} className="h-8 w-full" />
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {genres?.data?.map((genre: IGenre) => (
                          <label
                            key={genre._id}
                            className="flex items-center gap-3 cursor-pointer rounded-lg px-3 py-2 hover:bg-secondary/50 transition-colors group"
                          >
                            <Checkbox
                              checked={filters.genre.includes(genre._id)}
                              onCheckedChange={() =>
                                handleGenreToggle(genre._id)
                              }
                              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                            <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                              {genre.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </div>

                {/* Min Rating */}
                <div>
                  <Label className="flex items-center gap-2 mb-3 text-sm font-semibold">
                    <Star className="h-4 w-4 text-primary" />
                    Min Rating
                  </Label>
                  <Select
                    value={filters.minRating}
                    onValueChange={(value) =>
                      setFilters((prev) => ({
                        ...prev,
                        minRating: value,
                        page: 1,
                      }))
                    }
                  >
                    <SelectTrigger className="rounded-xl border-border">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1★ & up</SelectItem>
                      <SelectItem value="2">2★ & up</SelectItem>
                      <SelectItem value="3">3★ & up</SelectItem>
                      <SelectItem value="4">4★ & up</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Max Rating */}
                <div>
                  <Label className="flex items-center gap-2 mb-3 text-sm font-semibold">
                    <Star className="h-4 w-4 text-primary" />
                    Max Rating
                  </Label>
                  <Select
                    value={filters.maxRating}
                    onValueChange={(value) =>
                      setFilters((prev) => ({
                        ...prev,
                        maxRating: value,
                        page: 1,
                      }))
                    }
                  >
                    <SelectTrigger className="rounded-xl border-border">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="2">Up to 2★</SelectItem>
                      <SelectItem value="3">Up to 3★</SelectItem>
                      <SelectItem value="4">Up to 4★</SelectItem>
                      <SelectItem value="5">Up to 5★</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort By */}
                <div>
                  <Label className="flex items-center gap-2 mb-3 text-sm font-semibold">
                    <SlidersHorizontal className="h-4 w-4 text-primary" />
                    Sort By
                  </Label>
                  <Select
                    value={filters.sortBy}
                    onValueChange={(value) =>
                      setFilters((prev) => ({
                        ...prev,
                        sortBy: value,
                        page: 1,
                      }))
                    }
                  >
                    <SelectTrigger className="rounded-xl border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="createdAt">
                        <span className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Recently Added
                        </span>
                      </SelectItem>
                      <SelectItem value="rating">
                        <span className="flex items-center gap-2">
                          <Star className="h-4 w-4" />
                          Rating
                        </span>
                      </SelectItem>
                      <SelectItem value="shelved">
                        <span className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          Most Shelved
                        </span>
                      </SelectItem>
                      <SelectItem value="title">
                        <span className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          Title
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Sort Order - Full Width Below */}
              <div className="mt-6 pt-6 border-t border-border">
                <Label className="flex items-center gap-2 mb-3 text-sm font-semibold">
                  <ArrowUpDown className="h-4 w-4 text-primary" />
                  Sort Order
                </Label>
                <div className="grid grid-cols-2 gap-3 max-w-md">
                  <Button
                    type="button"
                    variant={
                      filters.sortOrder === "asc" ? "default" : "outline"
                    }
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        sortOrder: "asc",
                        page: 1,
                      }))
                    }
                    className="rounded-xl justify-start gap-2"
                  >
                    <TrendingUp className="h-4 w-4" />
                    Ascending
                  </Button>
                  <Button
                    type="button"
                    variant={
                      filters.sortOrder === "desc" ? "default" : "outline"
                    }
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        sortOrder: "desc",
                        page: 1,
                      }))
                    }
                    className="rounded-xl justify-start gap-2"
                  >
                    <TrendingUp className="h-4 w-4 rotate-180" />
                    Descending
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isPending ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-3/4 w-full" />
                <CardContent className="p-5 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-8 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
              <X className="w-10 h-10 text-destructive" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Error Loading Books
            </h3>
            <p className="text-muted-foreground">
              {error?.message ||
                "Something went wrong. Please try again later."}
            </p>
          </div>
        ) : displayedBooks.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary/50 flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No books found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search query
            </p>
            {hasActiveFilters && (
              <Button onClick={handleClearFilters} className="rounded-xl gap-2">
                <X className="w-4 h-4" />
                Clear Filters
              </Button>
            )}
          </div>
        ) : (
          <>
            {/* Books Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {displayedBooks.map((book: IBook, index: number) => (
                <Card
                  key={book._id}
                  className="group overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 md:hover:-translate-y-1 card-glow border-border"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                  }}
                >
                  {/* Book Cover Section */}
                  <div className="relative aspect-2/3 sm:aspect-3/4 overflow-hidden bg-secondary/30">
                    <Image
                      src={book.coverImage || "/placeholder-book.jpg"}
                      alt={book.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      priority={index < 3}
                    />

                    {/* Genre Badge */}
                    <Badge className="absolute top-3 right-3 bg-background/95 backdrop-blur-sm border border-border text-xs font-medium shadow-md text-foreground group-hover:text-primary">
                      {book.genre?.name || "Unknown"}
                    </Badge>

                    {/* Rating Badge */}
                    {book.avgRating && book.avgRating > 0 && (
                      <Badge className="absolute top-3 left-3 bg-primary/95 text-primary-foreground backdrop-blur-sm border-0 text-xs font-bold shadow-md flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        {book.avgRating.toFixed(1)}
                      </Badge>
                    )}
                  </div>

                  {/* Book Info Section */}
                  <CardContent className="p-4 md:p-5 space-y-3">
                    {/* Title & Author */}
                    <div className="space-y-1">
                      <h3 className="font-display font-bold text-base md:text-lg text-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground font-medium">
                        by {book.author}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs md:text-sm text-text-mist/90 line-clamp-2 leading-relaxed">
                      {book.description}
                    </p>

                    {/* Stats Section */}
                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-primary/5">
                          <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                          <span className="text-xs md:text-sm font-bold text-foreground">
                            {book.avgRating?.toFixed(1) || "0.0"}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          ({book.totalReviews || 0} reviews)
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span className="hidden sm:inline">
                          {(book?.shelfCount?.wantToRead || 0) +
                            (book?.shelfCount?.currentlyReading || 0) +
                            (book?.shelfCount?.read || 0)}{" "}
                          shelved
                        </span>
                        <span className="sm:hidden">
                          {(book?.shelfCount?.wantToRead || 0) +
                            (book?.shelfCount?.currentlyReading || 0) +
                            (book?.shelfCount?.read || 0)}
                        </span>
                      </div>
                    </div>

                    {/* Mobile/Tablet Action Buttons */}
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 py-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>

                <div className="flex items-center gap-1">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    return (
                      <Button
                        key={pageNumber}
                        variant={
                          currentPage === pageNumber ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => handlePageChange(pageNumber)}
                        className="w-9"
                      >
                        {pageNumber}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
