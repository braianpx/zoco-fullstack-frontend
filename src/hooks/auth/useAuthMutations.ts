import { useStandardMutation } from "../../utils/mutationHelpers";
import { login, logout } from "../../api/auth.api";
import { useAuth } from "../../context/auth/useAuth";
import type { AuthResponse } from "../../types/auth.types";
import type { ApiResponse } from "../../types/apiResponse.types";
import { useApiHelpers } from "../../utils/apiHelpers";

export const useAuthMutations = () => {
  const { login: loginContext, logout: logoutContext } = useAuth();
  const { getErrorMessage } = useApiHelpers();

  const loginMutation = useStandardMutation<{ email: string; password: string }, ApiResponse<AuthResponse>>({
    mutationFn: login,
    successMsg: "",
  });

  const loginAsync = async (vars: { email: string; password: string }) => {
    const res = await loginMutation.mutateAsync(vars);
    if (res.data) {
      loginContext(res.data.token, res.data.user, res.data.role);
    }
    return res;
  };

  const logoutMutation = useStandardMutation<void, ApiResponse<unknown>>({
    mutationFn: logout,
    successMsg: "Se deslogueo correctamente",
  });

  const logoutAsync = async () => {
    const res = await logoutMutation.mutateAsync();
    logoutContext();
    return res;
  };

  const firstError = loginMutation.error ?? logoutMutation.error ?? null;

  return {
    loginMutation: { ...loginMutation, mutateAsync: loginAsync },
    logoutMutation: { ...logoutMutation, mutateAsync: logoutAsync },
    isPending: loginMutation.isPending || logoutMutation.isPending,
    isError: firstError ? getErrorMessage(firstError, "Error de autenticacion") : null,
  };
};
