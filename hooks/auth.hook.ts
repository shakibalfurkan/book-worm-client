import { loginUser, registerUserIntoDB } from "@/services/AuthService";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
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

export const useUserLogin = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["LOGIN_USER"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
