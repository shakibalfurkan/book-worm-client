"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { XAxis, YAxis, CartesianGrid, LineChart, Line } from "recharts";
import {
  BookOpen,
  Users,
  TrendingUp,
  Star,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  Activity,
  Sparkles,
} from "lucide-react";
import { useMemo } from "react";
import { useGetAllBooks } from "@/hooks/book.hook";
import { IBook } from "@/interfaces/book.interface";
import { useGetAllUsers } from "@/hooks/user.hook";
import { useGetAllReviews } from "@/hooks/review.hook";
import { IUser } from "@/context/user.provider";
import { IReview } from "@/interfaces/review.interface";

const chartConfig = {
  books: {
    label: "Books",
    color: "#fbbf24",
  },
  users: {
    label: "Users",
    color: "#3b82f6",
  },
};

export default function Dashboard() {
  const { data: booksData, isLoading: booksLoading } = useGetAllBooks({});
  const { data: usersData, isLoading: usersLoading } = useGetAllUsers();
  const { data: reviewsData, isLoading: reviewsLoading } = useGetAllReviews();

  const books = booksData?.data?.data || [];
  const users = usersData?.data || [];
  const reviews = reviewsData?.data || [];

  const stats = useMemo(() => {
    const currentMonth = new Date().getMonth();

    // 1. Core KPIs
    const totalBooks = booksData?.data?.meta?.total || 0;
    const totalUsers = users.length;

    const booksAddedThisMonth = books.filter(
      (b: IBook) => new Date(b.createdAt).getMonth() === currentMonth
    ).length;

    const newUsersThisMonth = users.filter(
      (u: IUser) => new Date(u.createdAt).getMonth() === currentMonth
    ).length;

    const pendingReviews = reviews.filter(
      (r: IReview) => r.status === "PENDING"
    ).length;
    const approvedReviews = reviews.filter(
      (r: IReview) => r.status === "APPROVED"
    ).length;

    const monthlyActivity = Array.from({ length: 6 }, (_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const m = d.getMonth();
      const y = d.getFullYear();

      return {
        month: d.toLocaleString("default", { month: "short" }),
        books: books.filter((b: IBook) => {
          const dt = new Date(b.createdAt);
          return dt.getMonth() === m && dt.getFullYear() === y;
        }).length,
        users: users.filter((u: IUser) => {
          const dt = new Date(u.createdAt);
          return dt.getMonth() === m && dt.getFullYear() === y;
        }).length,
      };
    }).reverse();

    return {
      totalBooks,
      totalUsers,
      pendingReviews,
      approvedReviews,
      booksAddedThisMonth,
      newUsersThisMonth,
      monthlyActivity,
    };
  }, [books, users, reviews, booksData?.data?.meta?.total]);

  const isLoading = booksLoading || usersLoading || reviewsLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <Skeleton className="h-12 w-64" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-80" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="relative bg-linear-to-br from-card via-background to-card border-b border-border overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/50 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-primary/10">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-1">
                <Sparkles className="w-3 h-3 text-primary" />
                <span className="text-xs font-medium text-primary">
                  Admin Panel
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                Dashboard Overview
              </h1>
            </div>
          </div>
          <p className="text-muted-foreground ml-16">
            Monitor your BookWorm platform performance and insights
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Total Books */}
          <Card className="border-border hover:shadow-xl transition-all duration-300 card-glow group bg-linear-to-br from-card to-card/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <Badge
                  variant="secondary"
                  className="bg-primary/5 text-primary border-primary/20"
                >
                  <TrendingUp className="w-3 h-3 mr-1" />+
                  {stats?.booksAddedThisMonth || 0}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-foreground">
                  {stats?.totalBooks || 0}
                </p>
                <p className="text-sm text-muted-foreground font-medium">
                  Total Books
                </p>
                <p className="text-xs text-muted-foreground">
                  {stats?.booksAddedThisMonth || 0} added this month
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Total Users */}
          <Card className="border-border hover:shadow-xl transition-all duration-300 card-glow group bg-linear-to-br from-card to-card/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <Badge
                  variant="secondary"
                  className="bg-blue-500/5 text-blue-400 border-blue-500/20"
                >
                  <TrendingUp className="w-3 h-3 mr-1" />+
                  {stats?.newUsersThisMonth || 0}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-foreground">
                  {stats?.totalUsers || 0}
                </p>
                <p className="text-sm text-muted-foreground font-medium">
                  Total Users
                </p>
                <p className="text-xs text-muted-foreground">
                  {stats?.newUsersThisMonth || 0} joined this month
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Pending Reviews */}
          <Card className="border-border hover:shadow-xl transition-all duration-300 card-glow group bg-linear-to-br from-card to-card/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors">
                  <Clock className="w-6 h-6 text-orange-400" />
                </div>
                <Badge
                  variant="secondary"
                  className="bg-orange-500/5 text-orange-400 border-orange-500/20"
                >
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Pending
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-foreground">
                  {stats?.pendingReviews || 0}
                </p>
                <p className="text-sm text-muted-foreground font-medium">
                  Pending Reviews
                </p>
                <p className="text-xs text-muted-foreground">
                  Awaiting moderation
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Approved Reviews */}
          <Card className="border-border hover:shadow-xl transition-all duration-300 card-glow group bg-linear-to-br from-card to-card/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                  <CheckCircle className="w-6 h-6 text-emerald-400" />
                </div>
                <Badge
                  variant="secondary"
                  className="bg-emerald-500/5 text-emerald-400 border-emerald-500/20"
                >
                  <Star className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-foreground">
                  {stats?.approvedReviews || 0}
                </p>
                <p className="text-sm text-muted-foreground font-medium">
                  Approved Reviews
                </p>
                <p className="text-xs text-muted-foreground">
                  Published on site
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-border card-glow lg:col-span-2">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Activity className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-xl font-display">
                    Monthly Activity
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Books added and users joined over time
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-75 w-full">
                <LineChart data={stats?.monthlyActivity || []}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="month"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="books"
                    stroke="#fbbf24"
                    strokeWidth={2}
                    dot={{ fill: "#fbbf24", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
