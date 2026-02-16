import type { UserCreate, UserUpdate } from "../../../types/user.types";

export type UserFormType = Partial<UserCreate & UserUpdate> & Record<string, unknown>;

const validationRules: Record<string, (value: string, form: UserFormType) => string> = {
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
    return !emailRegex.test(v) ? "Formato de email inválido" : "";
  },
  password: (v, form) => {
    // Si hay un ID en el form, estamos editando -> password opcional
    if (form.id && !v) return ""; 
    if (!v) return "La contraseña es obligatoria";
    return v.length < 6 ? "Mínimo 6 caracteres" : "";
  },
  roleName: (v) => (!v ? "El rol es obligatorio" : ""),
};

export const validateUserField = (key: string, value: string, form: UserFormType): string => {
  const rule = validationRules[key];
  return rule ? rule(value, form) : "";
};
