// src/components/profile/validators/profile.validator.ts

export const validateProfileField = (key: string, value: string, form: any) => {
  // Validaciones comunes (Nombre, Apellido, Email)
  if (key === "firstName" || key === "lastName") {
    if (!value.trim()) return "Campo obligatorio";
    if (/\d/.test(value)) return "No puede contener números";
    return "";
  }

  if (key === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(value) ? "Email inválido" : "";
  }

  // VALIDACIÓN CLAVE: Contraseña opcional en Perfil
  if (key === "password") {
    if (!value) return ""; // Si está vacío, no hay error (es opcional)
    return value.length < 6 ? "Mínimo 6 caracteres" : "";
  }

  if (key === "confirmPassword") {
    if (!form.password) return ""; // Si no hay password, no validamos confirmación
    return value !== form.password ? "Las contraseñas no coinciden" : "";
  }

  return "";
};

export const validateProfileForm = (form: any) => {
  const errors: Record<string, string> = {};
  // Solo validamos los campos que existen en el form
  Object.keys(form).forEach((key) => {
    const error = validateProfileField(key, form[key], form);
    if (error) errors[key] = error;
  });
  return errors;
};
