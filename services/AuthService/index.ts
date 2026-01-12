import envConfig from "@/config/envConfig";
import axiosClient from "@/lib/Axios/axios-client";
import axios, { isAxiosError } from "axios";
import { FieldValues } from "react-hook-form";

export const registerUserIntoDB = async (userData: FormData) => {
  try {
    const { data } = await axiosClient.post("/auth/register", userData, {
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
        "Register failed";
      throw new Error(message);
    }

    throw new Error("Something went wrong");
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosClient.post("/auth/login", userData);

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login failed";

      throw new Error(message);
    }

    throw new Error("Something went wrong");
  }
};

export const getUserFromDB = async () => {
  try {
    const { data } = await axiosClient.get(`/auth/me`);
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

export const logout = async () => {
  try {
    const { data } = await axios.post(`${envConfig.baseApi}/auth/logout`);

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to logout";

      throw new Error(message);
    }

    throw new Error("Something went wrong");
  }
};
