"use server";
import envConfig from "@/config/envConfig";
import { isAuthRoute } from "@/constant";
import { logout } from "@/services/AuthService";
import axios from "axios";
import { cookies, headers } from "next/headers";

const axiosInstance = axios.create({
  baseURL: envConfig.baseApi,
});

axiosInstance.interceptors.request.use(
  async function (config) {
    const cookieStore = cookies();
    const accessToken = (await cookieStore).get("accessToken")?.value;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    // Token expired, attempt refresh
    if (
      error.response.status === 401 &&
      error.response.data.message === "jwt expired" &&
      !config?.sent
    ) {
      config.sent = true;
      try {
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get("refreshToken")?.value;

        const { data } = await axios.post(
          `${envConfig.baseApi}/auth/refresh-token`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        const accessToken = data.data.accessToken;
        config.headers["Authorization"] = `Bearer ${accessToken}`;
        cookieStore.set("accessToken", accessToken);

        // Retry original request
        return axiosInstance(config);
      } catch (refreshError) {
        const url = typeof window !== "undefined" ? window.location.href : "";
        await logout();
        if (!isAuthRoute(url)) {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
