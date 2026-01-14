"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/context/user.provider";
import { useGetMyShelves } from "@/hooks/shelve.hook";
import { IUserShelve } from "@/interfaces/shelve.interface";
import { BookOpen, CheckCircle2, Heart, Star, Sparkles } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

const tabsData = [
  {
    value: "WANT_TO_READ",
    label: "Want to Read",
    icon: Heart,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
  {
    value: "CURRENTLY_READING",
    label: "Currently Reading",
    icon: BookOpen,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
  },
  {
    value: "READ",
    label: "Read",
    icon: CheckCircle2,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
];

export default function MyLibrary() {
  const { user } = useUser();
  const { data, isLoading } = useGetMyShelves();
  const [activeTab, setActiveTab] = useState("WANT_TO_READ");

  const myShelves: IUserShelve[] = data?.data || [];

  const shelfStats = useMemo(() => {
    return tabsData.map((tab) => ({
      ...tab,
      count: myShelves.filter((shelve) => shelve.shelve === tab.value).length,
    }));
  }, [myShelves]);

  const totalBooks = myShelves.length;
  const currentlyReading = myShelves.filter(
    (s) => s.shelve === "CURRENTLY_READING"
  ).length;
  const booksRead = myShelves.filter((s) => s.shelve === "READ").length;

  const getFilteredShelves = (shelfType: string) => {
    return myShelves.filter((shelve) => shelve.shelve === shelfType);
  };

  const calculateProgress = (shelve: IUserShelve) => {
    if (!shelve.progressPages || !shelve.book?.totalPages) return 0;
    return Math.round((shelve.progressPages / shelve.book.totalPages) * 100);
  };

  const EmptyState = ({ shelfType }: { shelfType: string }) => {
    const tabData = tabsData.find((tab) => tab.value === shelfType);
    const Icon = tabData?.icon || BookOpen;

    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div
          className={`w-20 h-20 rounded-full ${tabData?.bgColor} flex items-center justify-center mb-4`}
        >
          <Icon className={`w-10 h-10 ${tabData?.color}`} />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No books in {tabData?.label}
        </h3>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          Start building your library by adding books
        </p>
        <Button className="rounded-xl gap-2">
          <BookOpen className="w-4 h-4" />
          Browse Books
        </Button>
      </div>
    );
  };

  return (
    <section className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative bg-linear-to-br from-card via-background to-card border-b border-border overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/50 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Your Personal Library
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-2">
                Welcome back, {user?.name?.split(" ")[0] || "Reader"}!
              </h1>
              <p className="text-lg text-muted-foreground">
                Track your reading journey
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="bg-card/80 backdrop-blur-sm border border-primary/20 min-h-30 flex items-center justify-center">
                <CardContent className="text-center">
                  <div className="text-4xl sm:text-5xl font-extrabold text-purple-400 leading-tight">
                    {totalBooks}
                  </div>
                  <div className="text-sm sm:text-xs text-muted-foreground uppercase tracking-wide mt-1">
                    Total Books
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border border-primary/20 min-h-30 flex items-center justify-center">
                <CardContent className="text-center">
                  <div className="text-4xl sm:text-5xl font-extrabold text-primary leading-tight">
                    {currentlyReading}
                  </div>
                  <div className="text-sm sm:text-xs text-muted-foreground uppercase tracking-wide mt-1">
                    Reading
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border border-emerald-500/20 min-h-30 flex items-center justify-center">
                <CardContent className="text-center">
                  <div className="text-4xl sm:text-5xl font-extrabold text-emerald-400 leading-tight">
                    {booksRead}
                  </div>
                  <div className="text-sm sm:text-xs text-muted-foreground uppercase tracking-wide mt-1">
                    Books Read
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          {/* Tabs */}
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-4 bg-transparent p-0 h-auto">
            {shelfStats.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.value;

              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={`rounded-2xl border-2 p-6 transition-all ${
                    isActive
                      ? `border-primary/30 ${tab.bgColor} shadow-lg`
                      : "border-border bg-card"
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className={`p-3 rounded-xl ${
                        isActive ? "bg-background/50" : "bg-secondary/50"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          isActive ? tab.color : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div className="text-center">
                      <div
                        className={`text-sm font-semibold mb-1 ${
                          isActive ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {tab.label}
                      </div>
                      <Badge
                        className={
                          isActive
                            ? `${tab.bgColor} ${tab.color}`
                            : "bg-secondary/50"
                        }
                      >
                        {tab.count} books
                      </Badge>
                    </div>
                  </div>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Tab Content */}
          {tabsData.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-80 rounded-xl" />
                  ))}
                </div>
              ) : getFilteredShelves(tab.value).length === 0 ? (
                <EmptyState shelfType={tab.value} />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getFilteredShelves(tab.value).map((shelve) => {
                    const progress = calculateProgress(shelve);

                    return (
                      <div
                        key={shelve._id}
                        className="group relative bg-card border rounded-xl overflow-hidden shadow hover:shadow-xl transition-transform duration-200"
                      >
                        {/* Book Image */}
                        <div className="relative w-full h-64 sm:h-80">
                          <Image
                            src={shelve.book?.coverImage || "/placeholder.jpg"}
                            alt={shelve.book?.title || "Book"}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          {/* Genre Badge */}
                          <Badge className="absolute top-3 text-foreground right-3 bg-background/90 text-xs">
                            {shelve.book?.genre?.name || "Unknown"}
                          </Badge>
                          {/* Rating Badge */}
                          {shelve.book?.avgRating > 0 && (
                            <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-xs font-bold flex items-center gap-1">
                              <Star className="w-3 h-3 fill-current" />
                              {shelve.book.avgRating.toFixed(1)}
                            </Badge>
                          )}
                        </div>

                        {/* Book Info */}
                        <div className="p-4 space-y-2">
                          <h3 className="font-semibold text-lg line-clamp-2">
                            {shelve.book?.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            by {shelve.book?.author}
                          </p>

                          {/* Progress for Currently Reading */}
                          {tab.value === "CURRENTLY_READING" && (
                            <div className="mt-2">
                              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                <span>Progress</span>
                                <span className="font-bold text-primary">
                                  {progress}%
                                </span>
                              </div>
                              <Progress
                                value={progress}
                                className="h-2 rounded-full"
                              />
                              <p className="text-xs text-muted-foreground mt-1">
                                Page {shelve.progressPages} of{" "}
                                {shelve.book?.totalPages}
                              </p>
                            </div>
                          )}

                          {/* Dates */}
                          <div className="flex justify-between text-xs text-muted-foreground mt-2">
                            <span>
                              Added{" "}
                              {new Date(shelve.createdAt).toLocaleDateString()}
                            </span>
                            {shelve.finishedAt && (
                              <span className="text-emerald-500">
                                Finished{" "}
                                {new Date(
                                  shelve.finishedAt
                                ).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
