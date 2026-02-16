// src/hooks/user/useUserGetters.ts
import { useQuery } from "@tanstack/react-query";
import { getUserDetail } from "../api/user.api"; // Ajusta la ruta si es necesario
import type { UserResponse } from "../types/user.types";

export const useUserGetters = (userId: number | null) => {
  
  // El Hook se llama en el nivel superior del componente/hook
  const userQuery = useQuery<UserResponse>({
    queryKey: ["userDetail", userId],
    queryFn: async () => {
      if (!userId) throw new Error("El ID del usuario no está definido");
      const res = await getUserDetail(userId);
      return res.data;
    },
    enabled: !!userId, 
    retry: false,
  });

  return {
    userQuery, // Retornas el objeto de la consulta directamente
  };
};
