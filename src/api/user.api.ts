import type { ApiResponse } from "../types/apiResponse.types";
import type { UserCreate, UserResponse } from "../types/user.types";
import { api } from "./axios";

export const register = async (data: UserCreate) => {
  const res = await api.post<ApiResponse<UserResponse>>("users", data);
  return res.data;
};