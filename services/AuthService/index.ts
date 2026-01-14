"use server";
import { isAxiosError } from "axios";
import { FieldValues } from "react-hook-form";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "@/lib/Axios/axiosInstance";

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    return {
      id: decodedToken.id,
      email: decodedToken.email,
      role: decodedToken.role,
    };
  }

  return decodedToken;
};

export const registerUserIntoDB = async (userData: FormData) => {
  try {
    const { data } = await axiosInstance.post("/auth/register", userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const cookie = await cookies();
    if (data.success) {
      cookie.set("accessToken", data?.data?.accessToken);
      cookie.set("refreshToken", data?.data?.refreshToken);
    }

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
    const { data } = await axiosInstance.post("/auth/login", userData);

    const cookie = await cookies();
    if (data.success) {
      cookie.set("accessToken", data?.data?.accessToken);
      cookie.set("refreshToken", data?.data?.refreshToken);
    }

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

export const logout = async () => {
  const cookie = await cookies();
  cookie.delete("accessToken");
  cookie.delete("refreshToken");
};
