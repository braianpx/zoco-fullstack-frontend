// src/hooks/sessionLog/useSessionLogGetters.ts
import type { SessionLogResponse } from "../../types/sessionLogs.types";
import type { UserResponse } from "../../types/user.types";
import { getAllSessionLogs } from "../../api/sessionLogs.api";
import { useUserBasedList } from "../../utils/getterHelpers";

// HOOK PARA LOGS DE SESION - usa useUserBasedList igual que useStudyGetters
export const useSessionLogGetters = (user: UserResponse | null) => {
  const { items, isLoading, isAdmin, query } =
    useUserBasedList<SessionLogResponse>({
      user,
      fetchAll: getAllSessionLogs,
      fetchByUser: async () => {
        // Session logs are admin-only, non-admins see nothing
        return { data: [] as SessionLogResponse[] };
      },
      queryKey: "sessionLogs",
      errorMessage: "No se pudieron cargar los logs de sesión",
    });

  return {
    logsQuery: query,
    logs: items,
    isLoading,
    isAdmin,
  };
};


