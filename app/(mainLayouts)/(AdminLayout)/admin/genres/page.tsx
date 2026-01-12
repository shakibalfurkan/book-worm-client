"use client";
import CreateGenreDialog from "@/components/dialogs/CreateGenreDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllGenres } from "@/hooks/genre.hook";
import { IGenre } from "@/interfaces/genre.interface";
import { TbEdit } from "react-icons/tb";

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
          <TableHeader className="bg-card">
            <TableRow>
              <TableHead className="w-25">Serial</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {genres?.data?.map((genre: IGenre, i: number) => (
              <TableRow key={genre._id}>
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell>{genre.name}</TableCell>
                <TableCell>{genre.description}</TableCell>
                <TableCell>
                  <TbEdit />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
