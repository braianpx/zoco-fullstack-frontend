import { useStandardMutation } from "../../utils/mutationHelpers";
import { login, logout } from "../../api/auth.api";
import { useAuth } from "../../context/auth/useAuth";
import type { AuthResponse } from "../../types/auth.types";
import type { ApiResponse } from "../../types/apiResponse.types";

export const useAuthMutations = () => {
  const { login: loginContext, logout: logoutContext } = useAuth();

  const loginMutation = useStandardMutation<{ email: string; password: string }, ApiResponse<AuthResponse>>({
    mutationFn: login,
    successMsg: "",
  });

  // wrap to perform context updates after success
  const loginAsync = async (vars: { email: string; password: string }) => {
    const res = await loginMutation.mutateAsync(vars);
    if (res.data) {
      loginContext(res.data.token, res.data.user, res.data.role);
    }
    return res;
  };

  const logoutMutation = useStandardMutation<void, import("../../types/apiResponse.types").ApiResponse<unknown>>({
    mutationFn: logout,
    successMsg: "Se deslogueó correctamente",
  });
  const logoutAsync = async () => {
    const res = await logoutMutation.mutateAsync();
    logoutContext();
    return res;
  };

  return {
    loginMutation: { ...loginMutation, mutateAsync: loginAsync },
    logoutMutation: { ...logoutMutation, mutateAsync: logoutAsync },
    isPending: loginMutation.isPending || logoutMutation.isPending,
  };
};
