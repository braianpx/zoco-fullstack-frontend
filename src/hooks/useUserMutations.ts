import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register, updateUser, deleteOneUser } from "../api/user.api"; // Ajusta la ruta a tu API
import type { UserCreate, UserUpdate } from "../types/user.types";

export const useUserMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: UserCreate) => register(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ data, userId }: { data: UserUpdate; userId: number }) => 
      updateUser(data, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      // También invalidamos el detalle por si el usuario está viendo su propio perfil
      queryClient.invalidateQueries({ queryKey: ["userDetail"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (userId: number) => deleteOneUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return { 
    createMutation, 
    updateMutation, 
    deleteMutation 
  };
};
