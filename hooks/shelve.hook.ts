import { toggleShelve } from "@/services/ShelveService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useToggleShelve = () => {
  const queryClient = useQueryClient();
  return useMutation<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    Error,
    {
      user: string;
      book: string;
    }
  >({
    mutationKey: ["TOGGLE_SHELVE"],
    mutationFn: async (shelveData) => await toggleShelve(shelveData),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["GET_BOOK_BY_ID"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
