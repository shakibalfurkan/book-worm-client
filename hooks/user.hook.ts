import { getAllUsersFromDB } from "@/services/UserService";
import { useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";

export const useGetAllUsers = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useQuery<any, Error, FieldValues>({
    queryKey: ["GET_ALL_USERS"],
    queryFn: async () => await getAllUsersFromDB(),
  });
};
