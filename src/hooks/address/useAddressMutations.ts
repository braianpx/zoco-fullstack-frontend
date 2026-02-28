import { useStandardMutation } from "../../utils/mutationHelpers";
import { createAddress, updateAddress, deleteAddress } from "../../api/address.api";
import type { AddressCreate, AddressUpdate, AddressResponse } from "../../types/address.types";
import type { ApiResponse } from "../../types/apiResponse.types";
import { useApiHelpers } from "../../utils/apiHelpers";

export const useAddressMutations = () => {
  const { getErrorMessage } = useApiHelpers();

  const createAddressMutation = useStandardMutation<AddressCreate, ApiResponse<AddressResponse>>({
    mutationFn: createAddress,
    successMsg: "Direccion creada",
    invalidateKey: "addresses",
  });

  const updateAddressMutation = useStandardMutation<
    { data: AddressUpdate; addressId: number },
    ApiResponse<AddressResponse>
  >({
    mutationFn: ({ data, addressId }) => updateAddress(data, addressId),
    successMsg: "Se actualizo correctamente",
    invalidateKey: "addresses",
  });

  const deleteAddressMutation = useStandardMutation<number, ApiResponse<null>>({
    mutationFn: addressId => deleteAddress(addressId),
    successMsg: "Eliminado con exito",
    invalidateKey: "addresses",
  });

  const firstError =
    createAddressMutation.error ??
    updateAddressMutation.error ??
    deleteAddressMutation.error ??
    null;

  return {
    createAddressMutation,
    updateAddressMutation,
    deleteAddressMutation,
    isPending:
      createAddressMutation.isPending ||
      updateAddressMutation.isPending ||
      deleteAddressMutation.isPending,
    isError: firstError ? getErrorMessage(firstError, "Error al gestionar direcciones") : null,
  };
};
