import axios, { AxiosError } from "axios";
import { message } from "antd";
import Cookies from "js-cookie";

// Set base URL from environment
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL as string;

// Request interceptor
axios.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("token");
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    (config.headers)["x-api-key"] = "reqres-free-v1";

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Setup Axios response interceptor
export const setupAxiosInterceptor = (navigate: any): void => {
  axios.interceptors.response.use(
    (response: any) => response,
    (error: AxiosError) => {
      const statusCode = error?.response?.status;
      if (statusCode) {
        switch (statusCode) {
          case 401:
            message.error("Your session has expired. Please log in again.");
            navigate("/login");
            break;

          default:
            message.error(error?.message);
            break;
        }
      }

      return Promise.reject(error);
    }
  );
};
