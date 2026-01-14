import { getMyShelvesFromDB, toggleShelve } from "@/services/ShelveService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useToggleShelve = () => {
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
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetMyShelves = () => {
  return useMutation({
    mutationFn: async () => await getMyShelvesFromDB(),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
