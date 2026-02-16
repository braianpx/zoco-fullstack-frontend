// src/components/profile/validators/user.validator.ts
import type { UserCreate } from "../../../types/user.types";

export type RegisterForm = Partial<UserCreate> & Record<string, unknown>;

const validationRules: Record<string, (value: string, form: RegisterForm) => string> = {
  firstName: (v) => {
    if (!v.trim()) return "El nombre es obligatorio";
    if (v.length > 100) return "Máximo 100 caracteres";
    if (/\d/.test(v)) return "El nombre no puede contener números";
    return "";
  },
  lastName: (v) => {
    if (!v.trim()) return "El apellido es obligatorio";
    if (v.length > 100) return "Máximo 100 caracteres";
    if (/\d/.test(v)) return "El apellido no puede contener números";
    return "";
  },
  email: (v) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!v) return "El email es obligatorio";
    return !emailRegex.test(v) ? "El email no tiene un formato válido" : "";
  },
  password: (v) => (!v ? "La contraseña es obligatoria" : v.length < 6 ? "Mínimo 6 caracteres" : ""),
  confirmPassword: (v, form) => 
    v !== String(form.password ?? "") ? "Las contraseñas no coinciden" : "",
};

export const validateRegisterField = (key: string, value: string, form: RegisterForm): string => {
  const rule = validationRules[key];
  return rule ? rule(value, form) : "";
};

export const validateRegisterForm = (form: RegisterForm) => {
  const errors: Record<string, string> = {};
  (Object.keys(form) as Array<keyof RegisterForm>).forEach((key) => {
    if (key in validationRules) {
      const value = String(form[key] || "");
      const error = validateRegisterField(key as string, value, form);
      if (error) errors[key as string] = error;
    }
  });
  return errors;
};
