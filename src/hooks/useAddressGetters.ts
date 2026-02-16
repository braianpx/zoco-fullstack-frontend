// src/hooks/address/useAddressGetters.ts
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getAddressesUser, getAllAddress } from "../api/address.api";
import { useNotification } from "../context/notification/useNotification";
import type { AddressResponse } from "../types/address.types";

export const useAddressGetters = (userId: number | null, isAdmin: boolean) => {
  const notify = useNotification();

  const addressesQuery = useQuery({
    queryKey: ["addresses", isAdmin ? "all" : userId],
    queryFn: async () => {
      if (isAdmin) {
        const res = await getAllAddress();
        return res.data;
      }
      if (!userId) throw new Error("ID de usuario no definido");
      const res = await getAddressesUser(userId);
      return res.data;
    },
    enabled: isAdmin || !!userId,
    retry: false,
  });

  // IMPORTANTE: El notify debe estar dentro de un useEffect
  useEffect(() => {
    if (addressesQuery.isError) {
      notify("No se pudieron cargar las direcciones", "error");
    }
  }, [addressesQuery.isError, notify]); 

  return {
    addressesQuery,
    addresses: (addressesQuery.data as AddressResponse[]) || [],
    isLoading: addressesQuery.isLoading
  };
};
