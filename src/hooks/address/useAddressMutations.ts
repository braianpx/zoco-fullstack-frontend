// src/hooks/address/useAddressMutations.ts
import { useStandardMutation } from "../../utils/mutationHelpers";
import { createAddress, updateAddress, deleteAddress } from "../../api/address.api";
import type { AddressCreate, AddressUpdate, AddressResponse } from "../../types/address.types";
import type { ApiResponse } from "../../types/apiResponse.types";

export const useAddressMutations = () => {
  const createAddressMutation = useStandardMutation<AddressCreate, ApiResponse<AddressResponse>>({
    mutationFn: createAddress,
    successMsg: "Dirección creada",
    invalidateKey: "addresses",
  });

  const updateAddressMutation = useStandardMutation<
    { data: AddressUpdate; addressId: number },
    ApiResponse<AddressResponse>
  >({
    mutationFn: ({ data, addressId }) => updateAddress(data, addressId),
    successMsg: "Se actualizó correctamente",
    invalidateKey: "addresses",
  });

  const deleteAddressMutation = useStandardMutation<number, ApiResponse<null>>({
    mutationFn: addressId => deleteAddress(addressId),
    successMsg: "Eliminado con éxito",
    invalidateKey: "addresses",
  });

  return {
    createAddressMutation,
    updateAddressMutation,
    deleteAddressMutation,
    isPending:
      createAddressMutation.isPending ||
      updateAddressMutation.isPending ||
      deleteAddressMutation.isPending,
  };
};
