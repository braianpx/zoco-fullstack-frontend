import type { SessionLogResponse } from "../../types/sessionLogs.types";
import type { UserResponse } from "../../types/user.types";
import { getAllSessionLogs } from "../../api/sessionLogs.api";
import { useUserBasedList } from "../../utils/getterHelpers";

export const useSessionLogGetters = (user: UserResponse | null) => {
  const { items, isLoading, isAdmin, isError, query } =
    useUserBasedList<SessionLogResponse>({
      user,
      fetchAll: getAllSessionLogs,
      fetchByUser: async () => {
        return { data: [] as SessionLogResponse[] };
      },
      queryKey: "sessionLogs",
      errorMessage: "No se pudieron cargar los logs de sesion",
    });

  return {
    logsQuery: query,
    logs: items,
    isLoading,
    isAdmin,
    isError,
  };
};
