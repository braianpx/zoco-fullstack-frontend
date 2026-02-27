// src/hooks/useSessionLogMutations.ts
import { useStandardMutation } from "../../utils/mutationHelpers";
import { updateSessionLog, deleteSessionLog } from "../../api/sessionLogs.api";
import type { SessionLogUpdate, SessionLogResponse } from "../../types/sessionLogs.types";
import type { ApiResponse } from "../../types/apiResponse.types";

export const useSessionLogMutations = () => {
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

  return {
    updateSessionLogMutation,
    deleteSessionLogMutation,
    isPending: updateSessionLogMutation.isPending || deleteSessionLogMutation.isPending,
  };
};