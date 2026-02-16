import { useMutation } from "@tanstack/react-query";
import { login, logout } from "../api/auth.api";
import { useAuth } from "../context/auth/useAuth";
import { useNotification } from "../context/notification/useNotification";
import type { AxiosError } from "axios";
import type { ApiResponse } from "../types/apiResponse.types";

export const useAuthMutations = () => {
  const { login: loginContext, logout: logoutContext } = useAuth();
  const notify = useNotification();


  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      notify(response.message, "success")
      loginContext(response.data.token, response.data.user, response.data.role);
    },
    onError: (err: AxiosError<ApiResponse<null>>) => {
      const msgError = err?.response?.data?.message ?? err?.response?.data?.title
      notify(
        msgError ?? "Error inesperado",
        "error"
      );
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      notify("Se deslogueó correctamente", "success")
      logoutContext();
    },
    onError: (err: AxiosError<ApiResponse<null>>) => {
      const msgError = err?.response?.data?.message ?? err?.response?.data?.title;
      notify(
        msgError ?? "Error inesperado",
        "error"
      );
     
    },
  });

  return {
    loginMutation,
    logoutMutation,
  };
};
