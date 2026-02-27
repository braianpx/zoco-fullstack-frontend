import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useApiHelpers } from "./apiHelpers";
import type { UserResponse } from "../types/user.types";

interface UserBasedListOptions<T> {
  user: UserResponse | null;
  fetchAll: () => Promise<{ data: T[] }>;
  fetchByUser: (userId: number) => Promise<{ data: T[] }>;
  queryKey: string;
  errorMessage: string;
}

/**
 * Common logic for two kinds of getters: admin sees all records, non‑admin
 * sees only their own.  Returns the query plus derived values similar to
 * the existing `useStudyGetters` / `useAddressGetters` implementations.
 */
export function useUserBasedList<T>(opts: UserBasedListOptions<T>) {
  const { notify } = useApiHelpers();
  const userId = opts.user?.id ?? null;
  const isAdmin = opts.user?.roleName === "Admin";

  const query = useQuery({
    queryKey: [opts.queryKey, isAdmin ? "all" : userId],
    queryFn: async () => {
      if (isAdmin) {
        const res = await opts.fetchAll();
        return res.data;
      }
      if (!userId) throw new Error("ID de usuario no definido");
      const res = await opts.fetchByUser(userId);
      return res.data;
    },
    enabled: isAdmin || !!userId,
    retry: false,
    // staleTime: 0 ensures queries are considered stale immediately when
    // invalidated, forcing an automatic refetch without waiting. this gives
    // instant UI updates after mutations.
    staleTime: 0,
  });

  useEffect(() => {
    if (query.isError) notify(opts.errorMessage, "error");
  }, [query.isError, notify, opts.errorMessage]);

  return {
    query,
    items: (query.data as T[]) || [],
    isLoading: query.isLoading,
    isAdmin,
  };
}
