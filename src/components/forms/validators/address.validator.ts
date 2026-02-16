// src/components/addresses/validators/address.validator.ts
import type { AddressCreate } from "../../../types/address.types";

export type AddressFormType = AddressCreate & Record<string, unknown>;

const validationRules: Record<string, (value: string) => string> = {
  street: (v) => (!v.trim() ? "La calle es obligatoria" : v.length < 5 ? "Dirección muy corta" : ""),
  city: (v) => (!v.trim() ? "La ciudad es obligatoria" : /\d/.test(v) ? "No debe contener números" : ""),
  country: (v) => (!v.trim() ? "El país es obligatorio" : ""),
  postalCode: (v) => (v && (v.length < 3 || v.length > 10) ? "C.P. inválido" : "")
};

export const validateAddressField = (key: string, value: string): string => {
  return validationRules[key] ? validationRules[key](value) : "";
};

export const validateAddressForm = (form: AddressFormType) => {
  const errors: Record<string, string> = {};
  Object.keys(validationRules).forEach((key) => {
    const value = String(form[key as keyof AddressCreate] || "");
    const error = validateAddressField(key, value);
    if (error) errors[key] = error;
  });
  return errors;
};
