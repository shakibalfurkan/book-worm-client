"use client";

import CreateBookDialog from "@/components/dialogs/books/CreateBookDialog";
import DeleteBookDialog from "@/components/dialogs/books/DeleteBookDialog";
import EditBookDialog from "@/components/dialogs/books/EditBookDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useGetAllBooks } from "@/hooks/book.hook";
import { IBook } from "@/interfaces/book.interface";
import { useState } from "react";

export default function BookManagement() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  });

  const { data: books, isPending, error, isError } = useGetAllBooks(filters);

  const meta = books?.data?.meta;
  const currentPage = meta?.page || 1;
  const totalPages = meta?.totalPages || 1;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setFilters((prev) => ({ ...prev, page: newPage }));
    }
  };

  console.log(books);

  return (
    <section className="max-w-7xl mx-auto h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold font-serif">Manage Books</h2>
        <CreateBookDialog />
      </div>
      <div className="mt-4">
        <Table className="">
          {books?.data?.data?.length === 0 && (
            <TableCaption>No Genres</TableCaption>
          )}
          {isError && <TableCaption>{error?.message}</TableCaption>}
          <TableHeader className="bg-card">
            <TableRow>
              <TableHead className="w-25">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending &&
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">
                    <Skeleton className="h-10 w-10 rounded-md" />
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
            {books?.data?.data?.map((book: IBook) => (
              <TableRow key={book?._id}>
                <TableCell>
                  <Avatar className="rounded-md size-10">
                    <AvatarImage src={book?.coverImage} alt={book?.title} />
                    <AvatarFallback>{book?.title}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{book?.title}</TableCell>
                <TableCell>
                  <div className="max-w-100 truncate" title={book?.description}>
                    {book?.description}
                  </div>
                </TableCell>
                <TableCell className="space-x-2">
                  <EditBookDialog book={book} />
                  <DeleteBookDialog id={book?._id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

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
                  variant={currentPage === pageNumber ? "default" : "outline"}
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
    </section>
  );
}
