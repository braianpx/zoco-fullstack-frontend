import { QueryClient, useMutation } from "@tanstack/react-query";
import { register, updateUser } from "../api/user.api";
import { useNotification } from "../context/notification/useNotification";
import type { AxiosError } from "axios";
import type { ApiResponse } from "../types/apiResponse.types";
import type { UserResponse, UserUpdate } from "../types/user.types";

export const useUserMutations = () => {

  const notify = useNotification();

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (response) => {
      notify(response.message, "success")
    },
    onError: (err: AxiosError<ApiResponse<null>>) => {
      const msgError = err?.response?.data?.message ?? err?.response?.data?.title;
      notify(
         msgError ?? "Error inesperado",
        "error"
      );
    },
  });
  
  const updateUserMutation = useMutation({
    mutationFn: ({ data, userId }: { data: UserUpdate; userId: number }) => {
      return updateUser(data, userId);
    },
    onSuccess: (response) => {
      notify(response.message?? "Se actualizo el usuario" , "success");
      return(response.data)
    },
    onError: (err: AxiosError<ApiResponse<null>>) => {
      const msgError = err?.response?.data?.message ?? err?.response?.data?.title;
      notify(msgError ?? "Error inesperado", "error");
    },
  });

  return {
    registerMutation,
    updateUserMutation,
  };
};