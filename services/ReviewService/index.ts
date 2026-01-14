"use server";

import { TReviewFormData } from "@/components/dialogs/review/AddReviewDialog";
import axiosInstance from "@/lib/Axios/axiosInstance";

import { isAxiosError } from "axios";

export const createReview = async (reviewData: TReviewFormData) => {
  try {
    const { data } = await axiosInstance.post("/reviews", reviewData);
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
export const getAllReviews = async () => {
  try {
    const { data } = await axiosInstance.get("/reviews");
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

export const deleteReview = async (reviewId: string) => {
  try {
    const { data } = await axiosInstance.delete(`/reviews/${reviewId}`);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to delete review";
      throw new Error(message);
    }

    throw new Error("Something went wrong");
  }
};
