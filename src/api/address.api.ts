import type { AddressCreate, AddressResponse, AddressUpdate } from "../types/address.types";
import type { ApiResponse } from "../types/apiResponse.types";
import { api } from "./axios";

export const createAddress = async (data: AddressCreate) => {
  const res = await api.post<ApiResponse<AddressResponse>>("Addresses", data);
  return res.data;
};

// the user lookup returns a list of addresses (one per user may have many)
// older implementation mistakenly typed it as a single AddressResponse which
// caused our generic helpers to treat the result as an object instead of an
// array and led to runtime/typing errors when the query attempted to iterate
// over the data. correcting the return type to an array fixes the problem.
export const getAddressesUser = async (userId: number) => {
  const res = await api.get<ApiResponse<AddressResponse[]>>("Addresses/user/" + userId);
  return res.data;
};

export const getAllAddress = async () => {
  const res = await api.get<ApiResponse<AddressResponse[]>>("addresses");
  return res.data;
};

export const updateAddress = async (data: AddressUpdate, userId: number) => {
  const res = await api.put<ApiResponse<AddressResponse>>("addresses/"+ userId, data);
  return res.data;
};

export const deleteAddress = async ( userId: number) => {
  const res = await api.delete<ApiResponse<null>>("addresses/"+ userId);
  return res.data;
};