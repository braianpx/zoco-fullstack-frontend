import { useNotification } from "../context/notification/useNotification";
import { useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiResponse } from "../types/apiResponse.types";

/**
 * Hook that centralizes common helpers used across API-related hooks.
 * - `notify` + `getErrorMessage` wrap notification logic
 * - `invalidate` invalidates a given query key
 */
export const useApiHelpers = () => {
  const notify = useNotification();
  const queryClient = useQueryClient();

  const getErrorMessage = (
    err: AxiosError<ApiResponse<null>> | null,
    defaultMsg: string
  ) => {
    const msgError = err?.response?.data?.message ?? err?.response?.data?.title;
    return msgError ?? defaultMsg;
  };

  const invalidate = async (key: string | string[]) => {
    // handle both single keys and arrays of keys.
    // if the key is an array of strings (like ["users", "userDetail"]), 
    // treat it as multiple separate invalidation operations.
    // if it's a single string, wrap it in an array for consistency.
    const keys = Array.isArray(key) && key.every(k => typeof k === "string")
      ? key
      : Array.isArray(key)
      ? [key]
      : [key];

    // Invalidate by prefix, but refetch only active observers.
    // This prevents replaying stale/inactive detail queries (e.g. old user ids)
    // when mutations run in sequence.
    for (const k of keys) {
      await queryClient.invalidateQueries({
        queryKey: [k],
        exact: false,
        refetchType: "active",
      });
    }
  };

  return {
    notify,
    getErrorMessage,
    invalidate,
  };
};
