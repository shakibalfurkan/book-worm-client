import { registerUserIntoDB } from "@/services/AuthService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUserRegistration = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useMutation<any, Error, FormData>({
    mutationKey: ["REGISTER_USER"],
    mutationFn: async (userData) => await registerUserIntoDB(userData),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
