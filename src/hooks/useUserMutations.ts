import { useMutation } from "@tanstack/react-query";
import { register } from "../api/user.api";
import { useNotification } from "../context/notification/useNotification";
import type { AxiosError } from "axios";
import type { ApiResponse } from "../types/apiResponse.types";

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

  return {
    registerMutation,
  };
};
