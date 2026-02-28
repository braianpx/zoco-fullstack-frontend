import { useStandardMutation } from "../../utils/mutationHelpers";
import { updateSessionLog, deleteSessionLog } from "../../api/sessionLogs.api";
import type { SessionLogUpdate, SessionLogResponse } from "../../types/sessionLogs.types";
import type { ApiResponse } from "../../types/apiResponse.types";
import { useApiHelpers } from "../../utils/apiHelpers";

export const useSessionLogMutations = () => {
  const { getErrorMessage } = useApiHelpers();

  const updateSessionLogMutation = useStandardMutation<
    { data: SessionLogUpdate; sessionId: number },
    ApiResponse<SessionLogResponse>
  >({
    mutationFn: ({ data, sessionId }) => updateSessionLog(data, sessionId),
    successMsg: "session actualizada",
    invalidateKey: "sessionLogs",
  });

  const deleteSessionLogMutation = useStandardMutation<number, ApiResponse<null>>({
    mutationFn: deleteSessionLog,
    successMsg: "session eliminada",
    invalidateKey: "sessionLogs",
  });

  const firstError = updateSessionLogMutation.error ?? deleteSessionLogMutation.error ?? null;

  return {
    updateSessionLogMutation,
    deleteSessionLogMutation,
    isPending: updateSessionLogMutation.isPending || deleteSessionLogMutation.isPending,
    isError: firstError ? getErrorMessage(firstError, "Error al gestionar logs de sesion") : null,
  };
};
