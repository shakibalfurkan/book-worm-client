"use server";
import { IBookFilters } from "@/interfaces/book.interface";
import axiosInstance from "@/lib/Axios/axiosInstance";
import { isAxiosError } from "axios";

export const createBook = async (bookData: FormData) => {
  try {
    const { data } = await axiosInstance.post("/books", bookData);
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

export const getAllBooks = async (filters: IBookFilters) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: Record<string, any> = {};

    if (filters.searchTerm) params.searchTerm = filters.searchTerm;
    if (filters.genre && filters.genre.length > 0) {
      params.genre = filters.genre.join(",");
    }
    if (filters.minRating) params.minRating = filters.minRating;
    if (filters.maxRating) params.maxRating = filters.maxRating;
    if (filters.sortBy) params.sortBy = filters.sortBy;
    if (filters.sortOrder) params.sortOrder = filters.sortOrder;
    if (filters.page) params.page = filters.page;
    if (filters.limit) params.limit = filters.limit;

    const { data } = await axiosInstance.get(`/books`, { params });
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to get books";
      throw new Error(message);
    }

    throw new Error("Something went wrong");
  }
};

export const getBookById = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/books/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to get book";
      throw new Error(message);
    }

    throw new Error("Something went wrong");
  }
};

export const getRecommendedBooks = async () => {
  try {
    const { data } = await axiosInstance.get(`/books/recommended`);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to get books";
      throw new Error(message);
    }

    throw new Error("Something went wrong");
  }
};

export const updateBook = async (id: string, formData: FormData) => {
  try {
    const { data } = await axiosInstance.put(`/books/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to update book";
      throw new Error(message);
    }
    throw new Error("Something went wrong");
  }
};

export const deleteBook = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/books/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to delete book";
      throw new Error(message);
    }

    throw new Error("Something went wrong");
  }
};
