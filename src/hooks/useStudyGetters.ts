import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getStudiesUser, getAllStudies } from "../api/study.api"; // Ajusta la ruta
import { useNotification } from "../context/notification/useNotification";
import type { StudyResponse } from "../types/study.types";

export const useStudyGetters = (userId: number | null, isAdmin: boolean) => {
  const notify = useNotification();

  const studiesQuery = useQuery({
    queryKey: ["studies", isAdmin ? "all" : userId],
    queryFn: async () => {
      if (isAdmin) {
        const res = await getAllStudies();
        return res.data;
      }
      if (!userId) throw new Error("ID de usuario no definido");
      const res = await getStudiesUser(userId);
      return res.data;
    },
    enabled: isAdmin || !!userId,
    retry: false,
  });

  useEffect(() => {
    if (studiesQuery.isError) {
      notify("No se pudieron cargar los estudios", "error");
    }
  }, [studiesQuery.isError, notify]); 

  return {
    studiesQuery,
    studies: (studiesQuery.data as StudyResponse[]) || [],
    isLoading: studiesQuery.isLoading
  };
};
