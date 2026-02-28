import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { UserResponse } from "../../types/user.types";
import { getAllUser, getUserDetail } from "../../api/user.api";
import { useUserBasedList } from "../../utils/getterHelpers";
import { useApiHelpers } from "../../utils/apiHelpers";
import type { ApiResponse } from "../../types/apiResponse.types";

// HOOK PARA DETALLE DE UN USUARIO
export const useUserDetail = (userId: number | null) => {
  const { getErrorMessage } = useApiHelpers();

  const query = useQuery<UserResponse, AxiosError<ApiResponse<null>>>({
    queryKey: ["userDetail", userId],
    queryFn: async () => {
      if (!userId) throw new Error("ID no definido");
      const res = await getUserDetail(userId);
      return res.data;
    },
    enabled: !!userId,
    staleTime: 0,
    refetchOnMount: "always",
  });

  return {
    ...query,
    isError: query.isError
      ? getErrorMessage(query.error, "No se pudo cargar el detalle del usuario")
      : null,
  };
};

// HOOK PARA LISTA DE USUARIOS - usa useUserBasedList igual que useStudyGetters
export const useUserGetters = (user: UserResponse | null) => {
  const { items, isLoading, isAdmin, isError, query } =
    useUserBasedList<UserResponse>({
      user,
      fetchAll: getAllUser,
      fetchByUser: async () => {
        // Users can only see their own data, but in practice
        // users don't have a "byUser" endpoint. Only admins see the directory.
        return { data: [] as UserResponse[] };
      },
      queryKey: "users",
      errorMessage: "No se pudieron cargar los usuarios",
    });

  return {
    usersQuery: query,
    users: items,
    isLoading,
    isAdmin,
    isError,
  };
};
