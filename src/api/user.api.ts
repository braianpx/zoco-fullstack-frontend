import type { ApiResponse } from "../types/apiResponse.types";
import type { UserCreate, UserResponse, UserUpdate } from "../types/user.types";
import { api } from "./axios";

export const register = async (data: UserCreate) => {
  const res = await api.post<ApiResponse<UserResponse>>("users", data);
  return res.data;
};

export const getUserDetail = async (userId: number) => {
  const res = await api.get<ApiResponse<UserResponse>>("users/"+ userId);
  return res.data;
};

export const updateUser = async (data: UserUpdate, userId: number) => {
  const res = await api.put<ApiResponse<UserResponse>>("users/"+ userId, data);
  return res.data;
};

export const getAllUser = async () => {
  const res = await api.get<ApiResponse<UserResponse[]>>("users/");
  return res.data;
};

export const deleteOneUser = async (userId: number) => {
  const res = await api.put<ApiResponse<UserResponse>>("users/"+ userId);
  return res.data;
};