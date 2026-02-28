import axios from "axios";
import { AUTH_TOKEN_EXPIRED_EVENT } from "../utils/configConst";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");

      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event(AUTH_TOKEN_EXPIRED_EVENT));
      }
    }

    return Promise.reject(error);
  }
);
