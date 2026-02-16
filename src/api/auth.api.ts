import { api } from "./axios";
import type { AuthResponse } from "../types/auth.types";
import type { ApiResponse } from "../types/apiResponse.types";

export const login = async (data: { email: string; password: string }) => {
  const res = await api.post<ApiResponse<AuthResponse>>("auth/login", data);
  return res.data;
};

export const logout = async () => {
  const res = await api.post("auth/logout");
  return res.data;
};


