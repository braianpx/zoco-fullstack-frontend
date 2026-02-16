import { useQuery } from "@tanstack/react-query";
import { getAllUser, getUserDetail } from "../api/user.api"; // Ajusta la ruta si es necesario
import type { UserResponse } from "../types/user.types";

// HOOK PARA PERFIL (Detalle de UN solo usuario)
export const useUserDetail = (userId: number | null) => {
  return useQuery({
    queryKey: ["userDetail", userId],
    queryFn: async () => {
      if (!userId) throw new Error("ID no definido");
      const res = await getUserDetail(userId);
      return res.data; // Retorna UserResponse
    },
    enabled: !!userId,
  });
};

// HOOK PARA DIRECTORIO (Lista de TODOS los usuarios - Admin)
export const useUserGetters = () => {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUser(),
  });

  return {
    users: (query.data?.data as UserResponse[]) || [],
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
