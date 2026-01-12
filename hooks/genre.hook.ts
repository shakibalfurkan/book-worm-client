import { createGenre } from "@/services/GenreService";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useCreateGenre = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_GENRE"],
    mutationFn: async (genreData) => await createGenre(genreData),

    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
