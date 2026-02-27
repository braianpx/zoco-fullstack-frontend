// src/hooks/address/useAddressGetters.ts
import type { AddressResponse } from "../../types/address.types";
import type { UserResponse } from "../../types/user.types";
import { getAddressesUser, getAllAddress } from "../../api/address.api";
import { useUserBasedList } from "../../utils/getterHelpers";

export const useAddressGetters = (user: UserResponse | null) => {
  const { items, isLoading, isAdmin, query } =
    useUserBasedList<AddressResponse>({
      user,
      fetchAll: getAllAddress,
      fetchByUser: getAddressesUser,
      queryKey: "addresses",
      errorMessage: "No se pudieron cargar las direcciones",
    });

  return {
    addressesQuery: query,
    addresses: items,
    isLoading,
    isAdmin,
  };
};
