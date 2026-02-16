import type { ApiResponse } from "../types/apiResponse.types";
import type { SessionLogResponse, SessionLogUpdate } from "../types/sessionLogs.types";

import { api } from "./axios";

export const getSessionLog = async (sessionId: number) => {
  const res = await api.get<ApiResponse<SessionLogResponse>>("sessionlogs/"+ sessionId);
  return res.data;
};

export const getAllSessionLogs = async () => {
  const res = await api.get<ApiResponse<SessionLogResponse[]>>("sessionlogs");
  return res.data;
};

export const updateSessionLog = async (data: SessionLogUpdate, sessionId: number) => {
  const res = await api.put<ApiResponse<SessionLogResponse>>("sessionlogs/end?sessionId="+sessionId, data);
  return res.data;
};

export const deleteSessionLog = async ( sessionId: number) => {
  const res = await api.delete<ApiResponse<null>>("sessionlogs/"+ sessionId);
  return res.data;
};