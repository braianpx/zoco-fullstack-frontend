import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register, updateUser, deleteOneUser } from "../api/user.api"; // Ajusta la ruta a tu API
import type { UserCreate, UserUpdate } from "../types/user.types";
import { useNotification } from "../context/notification/useNotification";
import type { AxiosError } from "axios";
import type { ApiResponse } from "../types/apiResponse.types";

export const useUserMutations = () => {
  const queryClient = useQueryClient();
  const notify = useNotification();

  const createMutation = useMutation({
    mutationFn: (data: UserCreate) => register(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      notify(response.message || "session actualizada", "success")
    },
      onError: (err: AxiosError<ApiResponse<null>>) => {
      const msgError = err?.response?.data?.message ?? err?.response?.data?.title;
      notify(msgError ?? "Error al eliminar estudio", "error");
    },
  });  
 ;

  const updateMutation = useMutation({
    mutationFn: ({ data, userId }: { data: UserUpdate; userId: number }) => 
      updateUser(data, userId),
    onSuccess: (response) => {
      notify(response.message || "usuario actualizado", "success")
      queryClient.invalidateQueries({ queryKey: ["users"] });
      // También invalidamos el detalle por si el usuario está viendo su propio perfil
      queryClient.invalidateQueries({ queryKey: ["userDetail"] });
      },  
      onError: (err: AxiosError<ApiResponse<null>>) => {
        const msgError = err?.response?.data?.message ?? err?.response?.data?.title;
        notify(msgError ?? "Error al eliminar estudio", "error");
      },
  });

  const deleteMutation = useMutation({
    mutationFn: (userId: number) => deleteOneUser(userId),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      notify(response.message || "usuario borrado con exito", "success")
    },  onError: (err: AxiosError<ApiResponse<null>>) => {
          const msgError = err?.response?.data?.message ?? err?.response?.data?.title;
          notify(msgError ?? "Error al eliminar estudio", "error");
        },
  });

  return { 
    createMutation, 
    updateMutation, 
    deleteMutation 
  };
};
