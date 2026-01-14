import axiosClient from "@/lib/Axios/axios-client";
import { isAxiosError } from "axios";
export const getUserFromDB = async () => {
  try {
    const { data } = await axiosClient.get(`/users/me`);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to get user from DB";

      throw new Error(message);
    }

    throw new Error("Something went wrong");
  }
};
export const getAllUsersFromDB = async () => {
  try {
    const { data } = await axiosClient.get("/users");
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to get users";
      throw new Error(message);
    }

    throw new Error("Something went wrong");
  }
};
