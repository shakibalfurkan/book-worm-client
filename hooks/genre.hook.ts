import { createGenre, getAllGenres } from "@/services/GenreService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useCreateGenre = () => {
  const queryClient = useQueryClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_GENRE"],
    mutationFn: async (genreData) => await createGenre(genreData),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["GET_GENRES"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllGenres = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useQuery<any, Error, FieldValues>({
    queryKey: ["GET_GENRES"],
    queryFn: async () => await getAllGenres(),
  });
};
