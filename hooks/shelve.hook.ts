import { ApiResponse } from "@/interfaces";
import { IUserShelve } from "@/interfaces/shelve.interface";
import { getMyShelvesFromDB, toggleShelve } from "@/services/ShelveService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  return useQuery<ApiResponse<IUserShelve[]>, Error>({
    queryKey: ["GET_MY_SHELVES"],
    queryFn: async () => await getMyShelvesFromDB(),
  });
};
