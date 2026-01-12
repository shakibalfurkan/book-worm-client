import axiosClient from "@/lib/Axios/axios-client";
import { isAxiosError } from "axios";

export const createBook = async (bookData: FormData) => {
  try {
    const { data } = await axiosClient.post("/books", bookData);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to create genre";
      throw new Error(message);
    }

    throw new Error("Something went wrong");
  }
};
