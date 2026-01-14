"use service";

import axiosInstance from "@/lib/Axios/axiosInstance";
import { isAxiosError } from "axios";
import { FieldValues } from "react-hook-form";

export const createTutorial = async (tutorialData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/tutorials", tutorialData);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to create tutorial";
      throw new Error(message);
    }

    throw new Error("Something went wrong");
  }
};

export const getAllTutorials = async () => {
  try {
    const { data } = await axiosInstance.get("/tutorials");
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to get tutorials";
      throw new Error(message);
    }

    throw new Error("Something went wrong");
  }
};
