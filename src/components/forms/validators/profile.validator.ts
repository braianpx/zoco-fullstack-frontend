// src/components/profile/validators/profile.validator.ts

export type ProfileFormType = Record<string, unknown>;

export const validateProfileField = (key: string, value: string, form: ProfileFormType): string => {
  if (key === "firstName" || key === "lastName") {
    if (!value.trim()) return "Campo obligatorio";
    if (/\d/.test(value)) return "No puede contener números";
    return "";
  }

  if (key === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(value) ? "Email inválido" : "";
  }

  if (key === "password") {
    if (!value) return ""; 
    return value.length < 6 ? "Mínimo 6 caracteres" : "";
  }

  if (key === "confirmPassword") {
    const password = String(form.password ?? "");
    if (!password) return ""; 
    return value !== password ? "Las contraseñas no coinciden" : "";
  }

  return "";
};

export const validateProfileForm = (form: ProfileFormType) => {
  const errors: Record<string, string> = {};
  Object.keys(form).forEach((key) => {
    const value = String(form[key] || "");
    const error = validateProfileField(key, value, form);
    if (error) errors[key] = error;
  });
  return errors;
};
