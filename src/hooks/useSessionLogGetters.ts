// src/hooks/useSessionLogGetters.ts
import { useQuery } from "@tanstack/react-query";
import { getAllSessionLogs } from "../api/sessionLogs.api";

export const useSessionLogGetters = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["sessionLogs"],
    queryFn: getAllSessionLogs,
  });

  return {
    logs: data?.data || [],
    isLoading,
  };
};


