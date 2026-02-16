// src/hooks/address/useAddressMutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAddress, updateAddress, deleteAddress } from "../api/address.api";
import type { AddressCreate, AddressUpdate } from "../types/address.types";
import { useNotification } from "../context/notification/useNotification";
import type { ApiResponse } from "../types/apiResponse.types";
import type { AxiosError } from "axios";

export const useAddressMutations = () => {
  const queryClient = useQueryClient();
  const notify = useNotification();

  const createAddressMutation = useMutation({
    mutationFn: (data: AddressCreate) => createAddress(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] }); 
      notify(response.message || "Dirección creada", "success");
    },
    onError: (err: AxiosError<ApiResponse<null>>) => {
      const msgError = err?.response?.data?.message ?? err?.response?.data?.title;
      notify(msgError ?? "Error al crear", "error");
    },
  });

  const updateAddressMutation = useMutation({
    mutationFn: ({ data, addressId }: { data: AddressUpdate; addressId: number }) => 
      updateAddress(data, addressId),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      notify(response.message ?? "Se actualizó correctamente", "success");
    },
    onError: (err: AxiosError<ApiResponse<null>>) => {
      const msgError = err?.response?.data?.message ?? err?.response?.data?.title;
      notify(msgError ?? "Error al actualizar", "error");
    },
  });

  const deleteAddressMutation = useMutation({
    mutationFn: (addressId: number) => deleteAddress(addressId),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      notify(response.message ?? "Eliminado con éxito", "success");
    },
    onError: (err: AxiosError<ApiResponse<null>>) => {
      const msgError = err?.response?.data?.message ?? err?.response?.data?.title;
      notify(msgError ?? "Error al eliminar", "error");
    },
  });

  return {
    createAddressMutation,
    updateAddressMutation,
    deleteAddressMutation,
    isPending: createAddressMutation.isPending || updateAddressMutation.isPending || deleteAddressMutation.isPending
  };
};
