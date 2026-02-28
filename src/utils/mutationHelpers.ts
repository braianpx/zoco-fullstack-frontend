import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiResponse } from "../types/apiResponse.types";
import { useApiHelpers } from "./apiHelpers";

export interface StandardMutationOptions<TVars, TRes extends { message?: string }> {
  mutationFn: (vars: TVars) => Promise<TRes>;
  successMsg?: string;
  invalidateKey?: string | string[];
}

export function useStandardMutation<TVars, TRes extends { message?: string }>(
  opts: StandardMutationOptions<TVars, TRes>
) {
  const { notify, getErrorMessage, invalidate } = useApiHelpers();

  return useMutation<TRes, AxiosError<ApiResponse<null>>, TVars>({
    mutationFn: opts.mutationFn,
    retry: false,
    onSuccess: async (res: TRes) => {
      if (opts.invalidateKey) await invalidate(opts.invalidateKey);
      notify(res.message ?? opts.successMsg ?? "Operacion exitosa", "success");
    },
    onError: (err) => {
      notify(getErrorMessage(err, "Error en la operacion"), "error");
    },
  });
}
