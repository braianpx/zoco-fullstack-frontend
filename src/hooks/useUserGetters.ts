// src/hooks/user/useUserGetters.ts
import { useQuery } from "@tanstack/react-query";
import { getUserDetail } from "../api/user.api";
import type { UserResponse } from "../types/user.types";

export const useUserGetters = () => {
  
  const getUser = (userId: number | null) => {
    return useQuery<UserResponse>({
      queryKey: ["userDetail", userId],
      queryFn: async () => {
        if (!userId) throw new Error("El ID del usuario no está definido");
        const res = await getUserDetail(userId);
        return res.data;
      },
      enabled: !!userId, // Solo se ejecuta si hay un ID
      retry: false,
    });
  };


  return {
    getUser, 
  };
};
