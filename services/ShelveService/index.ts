import axiosClient from "@/lib/Axios/axios-client";
import { isAxiosError } from "axios";

export const toggleShelve = async (shelveData: {
  user: string;
  book: string;
}) => {
  try {
    const { data } = await axiosClient.post(
      "/shelves/toggle-shelve",
      shelveData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to toggle shelve";
      throw new Error(message);
    }

    throw new Error("Something went wrong");
  }
};
export const getMyShelvesFromDB = async () => {
  try {
    const { data } = await axiosClient.get("/shelves/my-shelves");
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to get shelves";
      throw new Error(message);
    }

    throw new Error("Something went wrong");
  }
};
