import { useQuery } from "@tanstack/react-query";
import type { UserResponse } from "../../types/user.types";
import { getAllUser, getUserDetail } from "../../api/user.api";
import { useUserBasedList } from "../../utils/getterHelpers";

// HOOK PARA DETALLE DE UN USUARIO
export const useUserDetail = (userId: number | null) => {
  return useQuery({
    queryKey: ["userDetail", userId],
    queryFn: async () => {
      if (!userId) throw new Error("ID no definido");
      const res = await getUserDetail(userId);
      return res.data;
    },
    enabled: !!userId,
    staleTime: 0,
  });
};

// HOOK PARA LISTA DE USUARIOS - usa useUserBasedList igual que useStudyGetters
export const useUserGetters = (user: UserResponse | null) => {
  const { items, isLoading, isAdmin, query } =
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
  };
};
