import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiResponse } from "../types/apiResponse.types";
import { useApiHelpers } from "./apiHelpers";

export interface StandardMutationOptions<TVars, TRes extends { message?: string }> {
  mutationFn: (vars: TVars) => Promise<TRes>;
  successMsg?: string;
  invalidateKey?: string | string[];
}

/**
 * Wrapper around react-query useMutation that applies the project's
 * standard notification and invalidation behavior.  All hooks in the
 * repo can use this to avoid repeating the same `onSuccess`/`onError`
 * boilerplate.
 */
export function useStandardMutation<TVars, TRes extends { message?: string }>(
  opts: StandardMutationOptions<TVars, TRes>
) {
  const { notify, getErrorMessage, invalidate } = useApiHelpers();

  return useMutation<TRes, AxiosError<ApiResponse<null>>, TVars>({
    mutationFn: opts.mutationFn,
    onSuccess: async (res: TRes) => {
      // IMPORTANT: await the invalidation so react-query completes the refetch
      // before we show the success notification. this ensures UI is updated
      // synchronously with the notification.
      if (opts.invalidateKey) await invalidate(opts.invalidateKey);
      notify(res.message ?? opts.successMsg ?? "Operación exitosa", "success");
    },
    onError: err => {
      notify(
        getErrorMessage(err, "Error en la operación"),
        "error"
      );
    },
  });
}
