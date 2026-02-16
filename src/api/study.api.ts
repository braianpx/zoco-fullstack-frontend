import type { ApiResponse } from "../types/apiResponse.types";
import type { StudyCreate, StudyResponse, StudyUpdate } from "../types/study.types";
import { api } from "./axios";

export const createStudy = async (data: StudyCreate) => {
  const res = await api.post<ApiResponse<StudyResponse>>("studies", data);
  return res.data;
};

export const getStudiesUser = async (userId: number) => {
  const res = await api.get<ApiResponse<StudyResponse>>("studies/user/"+ userId);
  return res.data;
};

export const getAllStudies = async () => {
  const res = await api.get<ApiResponse<StudyResponse[]>>("studies");
  return res.data;
};

export const updateStudies = async (data: StudyUpdate, userId: number) => {
  const res = await api.put<ApiResponse<StudyResponse>>("studies/"+ userId, data);
  return res.data;
};

export const deleteStudies = async ( userId: number) => {
  const res = await api.delete<ApiResponse<null>>("studies/"+ userId);
  return res.data;
};