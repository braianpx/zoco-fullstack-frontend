import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStudy, updateStudies, deleteStudies } from "../api/study.api"; // Ajusta la ruta
import type { StudyCreate, StudyUpdate } from "../types/study.types";
import { useNotification } from "../context/notification/useNotification";
import type { ApiResponse } from "../types/apiResponse.types";
import type { AxiosError } from "axios";

export const useStudyMutations = () => {
  const queryClient = useQueryClient();
  const notify = useNotification();

  const createStudyMutation = useMutation({
    mutationFn: (data: StudyCreate) => createStudy(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["studies"] }); 
      notify(response.message || "Estudio creado", "success");
    },
    onError: (err: AxiosError<ApiResponse<null>>) => {
      const msgError = err?.response?.data?.message ?? err?.response?.data?.title;
      notify(msgError ?? "Error al crear estudio", "error");
    },
  });

  const updateStudyMutation = useMutation({
    mutationFn: ({ data, studyId }: { data: StudyUpdate; studyId: number }) => 
      updateStudies(data, studyId),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["studies"] });
      notify(response.message ?? "Estudio actualizado correctamente", "success");
    },
    onError: (err: AxiosError<ApiResponse<null>>) => {
      const msgError = err?.response?.data?.message ?? err?.response?.data?.title;
      notify(msgError ?? "Error al actualizar estudio", "error");
    },
  });

  const deleteStudyMutation = useMutation({
    mutationFn: (studyId: number) => deleteStudies(studyId),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["studies"] });
      notify(response.message ?? "Estudio eliminado con éxito", "success");
    },
    onError: (err: AxiosError<ApiResponse<null>>) => {
      const msgError = err?.response?.data?.message ?? err?.response?.data?.title;
      notify(msgError ?? "Error al eliminar estudio", "error");
    },
  });

  return {
    createStudyMutation,
    updateStudyMutation,
    deleteStudyMutation,
    isPending: createStudyMutation.isPending || updateStudyMutation.isPending || deleteStudyMutation.isPending
  };
};
