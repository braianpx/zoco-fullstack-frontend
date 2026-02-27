import { useStandardMutation } from "../../utils/mutationHelpers";
import { createStudy, updateStudies, deleteStudies } from "../../api/study.api";
import type { StudyCreate, StudyUpdate, StudyResponse } from "../../types/study.types";
import type { ApiResponse } from "../../types/apiResponse.types";

export const useStudyMutations = () => {
  const createStudyMutation = useStandardMutation< StudyCreate, ApiResponse<StudyResponse>>({
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
    successMsg: "Estudio eliminado con éxito",
    invalidateKey: "studies",
  });

  return {
    createStudyMutation,
    updateStudyMutation,
    deleteStudyMutation,
    isPending:
      createStudyMutation.isPending ||
      updateStudyMutation.isPending ||
      deleteStudyMutation.isPending,
  };
};
