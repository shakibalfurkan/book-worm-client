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
        "Failed to create genre";
      throw new Error(message);
    }

    throw new Error("Something went wrong");
  }
};

export const getAllGenres = async () => {
  try {
    const { data } = await axiosClient.get("/genres");
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to get genres";
      throw new Error(message);
    }

    throw new Error("Something went wrong");
  }
};

export const updateGenre = async ({
  id,
  genreData,
}: {
  id: string;
  genreData: FieldValues;
}) => {
  try {
    const { data } = await axiosClient.put(`/genres/${id}`, genreData);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to update genre";
      throw new Error(message);
    }

    throw new Error("Something went wrong");
  }
};

export const deleteGenre = async (id: string) => {
  try {
    const { data } = await axiosClient.delete(`/genres/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to delete genre";
      throw new Error(message);
    }

    throw new Error("Something went wrong");
  }
};
