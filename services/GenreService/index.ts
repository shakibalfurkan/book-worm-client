import axiosClient from "@/lib/Axios/axios-client";
import { isAxiosError } from "axios";
import { FieldValues } from "react-hook-form";

export const createGenre = async (genreData: FieldValues) => {
  try {
    const { data } = await axiosClient.post("/genres", genreData);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Register failed";
      throw new Error(message);
    }

    throw new Error("Something went wrong");
  }
};
