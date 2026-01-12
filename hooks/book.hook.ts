import { createBook } from "@/services/BookService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateBook = () => {
  const queryClient = useQueryClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_BOOK"],
    mutationFn: async (bookData) => await createBook(bookData),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["GET_BOOKS"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
