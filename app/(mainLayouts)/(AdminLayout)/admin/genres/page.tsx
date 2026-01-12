"use client";
import CreateGenreDialog from "@/components/dialogs/CreateGenreDialog";
import EditGenreDialog from "@/components/dialogs/EditGenreDialog";
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
import { useGetAllGenres } from "@/hooks/genre.hook";
import { IGenre } from "@/interfaces/genre.interface";

export default function Genres() {
  const {
    data: genres,
    isPending,
    error,
    isError,
    isSuccess,
  } = useGetAllGenres();

  return (
    <section className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold font-serif">Manage Genres</h2>
        <CreateGenreDialog />
      </div>

      <div className="mt-4">
        <Table className="">
          {isError && <TableCaption>{error?.message}</TableCaption>}
          <TableHeader className="bg-card">
            <TableRow>
              <TableHead className="w-25">Serial</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Action</TableHead>
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
                </TableRow>
              ))}
            {genres?.data?.map((genre: IGenre, i: number) => (
              <TableRow key={genre._id}>
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell>{genre.name}</TableCell>
                <TableCell>{genre.description}</TableCell>
                <TableCell>
                  <EditGenreDialog genre={genre} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
