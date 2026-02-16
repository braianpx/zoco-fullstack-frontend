// src/hooks/useSessionLogMutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSessionLog, deleteSessionLog } from "../api/sessionLogs.api";
import { useNotification } from "../context/notification/useNotification";
import type { ApiResponse } from "../types/apiResponse.types";
import type { AxiosError } from "axios";

export const useSessionLogMutations = () => {
  const queryClient = useQueryClient();
  const notify = useNotification();

  const updateMutation = useMutation({
    mutationFn: ({ data, sessionId }: { data: any, sessionId: number }) => updateSessionLog(data, sessionId),
    onSuccess: (response) => {
      console.log("entro")
      notify(response.message || "session actualizada", "success");
      queryClient.invalidateQueries({ queryKey: ["sessionLogs"] })
    },   
    onError: (err: AxiosError<ApiResponse<null>>) => {
      const msgError = err?.response?.data?.message ?? err?.response?.data?.title;
      notify(msgError ?? "Error al crear estudio", "error");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSessionLog,
    onSuccess: (response) => {
      notify(response.message || "session actualizada", "success");
    queryClient.invalidateQueries({ queryKey: ["sessionLogs"] })
    },
    onError: (err: AxiosError<ApiResponse<null>>) => {
      const msgError = err?.response?.data?.message ?? err?.response?.data?.title;
      notify(msgError ?? "Error al crear session", "error");
    },
  });

  return { updateMutation, deleteMutation };
};