import { getAllUsersFromDB, updateUser } from "@/services/UserService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useGetAllUsers = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useQuery<any, Error, FieldValues>({
    queryKey: ["GET_ALL_USERS"],
    queryFn: async () => await getAllUsersFromDB(),
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    Error,
    {
      id: string;
      role: string;
    }
  >({
    mutationKey: ["UPDATE_USER"],
    mutationFn: async (userData) => await updateUser(userData),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_USERS"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
