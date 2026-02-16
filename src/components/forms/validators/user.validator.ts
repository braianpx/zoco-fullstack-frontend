// Definimos las reglas de validación
const validationRules: Record<string, (value: string, form: any) => string> = {
  firstName: (v) => {
    if (!v.trim()) return "El nombre es obligatorio";
    if (v.length > 100) return "Máximo 100 caracteres";
    if (/\d/.test(v)) return "El nombre no puede contener números"; // Validación de números
    return "";
  },
  lastName: (v) => {
    if (!v.trim()) return "El apellido es obligatorio";
    if (v.length > 100) return "Máximo 100 caracteres";
    if (/\d/.test(v)) return "El apellido no puede contener números"; // Validación de números
    return "";
  },
  email: (v) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!v) return "El email es obligatorio";
    return !emailRegex.test(v) ? "El email no tiene un formato válido" : "";
  },
  password: (v) => !v ? "La contraseña es obligatoria" : v.length < 6 ? "Mínimo 6 caracteres" : "",
  confirmPassword: (v, form) => v !== form.password ? "Las contraseñas no coinciden" : "",
};

// Valida un solo campo
export const validateRegisterField = (key: string, value: string, form: any) => {
  const rule = validationRules[key];
  return rule ? rule(value, form) : "";
};

// Valida todo el objeto (para el submit)
export const validateRegisterForm = (form: any) => {
  const errors: Record<string, string> = {};
  Object.keys(form).forEach((key) => {
    const error = validateRegisterField(key, form[key], form);
    if (error) errors[key] = error;
  });
  return errors;
};
