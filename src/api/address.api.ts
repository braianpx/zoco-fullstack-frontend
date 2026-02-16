import type { AddressCreate, AddressResponse, AddressUpdate } from "../types/address.types";
import type { ApiResponse } from "../types/apiResponse.types";
import { api } from "./axios";

export const createAddress = async (data: AddressCreate) => {
  const res = await api.post<ApiResponse<AddressResponse>>("Addresses", data);
  return res.data;
};

export const getAddressesUser = async (userId: number) => {
  const res = await api.get<ApiResponse<AddressResponse>>("Addresses/user/"+ userId);
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