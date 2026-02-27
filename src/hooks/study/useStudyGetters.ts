import type { StudyResponse } from "../../types/study.types";
import type { UserResponse } from "../../types/user.types";
import { getStudiesUser, getAllStudies } from "../../api/study.api";
import { useUserBasedList } from "../../utils/getterHelpers";

export const useStudyGetters = (user: UserResponse | null) => {
  const { items, isLoading, isAdmin, query } =
    useUserBasedList<StudyResponse>({
      user,
      fetchAll: getAllStudies,
      fetchByUser: getStudiesUser,
      queryKey: "studies",
      errorMessage: "No se pudieron cargar los estudios",
    });

  return {
    studiesQuery: query,
    studies: items,
    isLoading,
    isAdmin,
  };
};
