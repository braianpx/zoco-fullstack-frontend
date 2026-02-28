import { useStandardMutation } from "../../utils/mutationHelpers";
import { createStudy, updateStudies, deleteStudies } from "../../api/study.api";
import type { StudyCreate, StudyUpdate, StudyResponse } from "../../types/study.types";
import type { ApiResponse } from "../../types/apiResponse.types";
import { useApiHelpers } from "../../utils/apiHelpers";

export const useStudyMutations = () => {
  const { getErrorMessage } = useApiHelpers();

  const createStudyMutation = useStandardMutation<StudyCreate, ApiResponse<StudyResponse>>({
    mutationFn: createStudy,
    successMsg: "Estudio creado",
    invalidateKey: "studies",
  });

  const updateStudyMutation = useStandardMutation<
    { data: StudyUpdate; studyId: number },
    ApiResponse<StudyResponse>
  >({
    mutationFn: ({ data, studyId }) => updateStudies(data, studyId),
    successMsg: "Estudio actualizado correctamente",
    invalidateKey: "studies",
  });

  const deleteStudyMutation = useStandardMutation<number, ApiResponse<null>>({
    mutationFn: studyId => deleteStudies(studyId),
    successMsg: "Estudio eliminado con exito",
    invalidateKey: "studies",
  });

  const firstError =
    createStudyMutation.error ??
    updateStudyMutation.error ??
    deleteStudyMutation.error ??
    null;

  return {
    createStudyMutation,
    updateStudyMutation,
    deleteStudyMutation,
    isPending:
      createStudyMutation.isPending ||
      updateStudyMutation.isPending ||
      deleteStudyMutation.isPending,
    isError: firstError ? getErrorMessage(firstError, "Error al gestionar estudios") : null,
  };
};
