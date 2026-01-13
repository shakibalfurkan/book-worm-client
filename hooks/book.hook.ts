import { IBook, IBookFilters } from "@/interfaces/book.interface";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "@/services/BookService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useCreateBook = () => {
  const queryClient = useQueryClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_BOOK"],
    mutationFn: async (bookData) => await createBook(bookData),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_BOOKS"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllBooks = (filters: IBookFilters) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useQuery<any, Error, FieldValues>({
    queryKey: ["GET_ALL_BOOKS", filters],
    queryFn: async () => await getAllBooks(filters),
  });
};
export const useGetBookById = (id: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useQuery<any, Error, FieldValues>({
    queryKey: ["GET_BOOK_BY_ID"],
    queryFn: async () => await getBookById(id),
  });
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      updateBook(id, formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_BOOKS"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_BOOK"],
    mutationFn: async (id) => await deleteBook(id),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_BOOKS"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
