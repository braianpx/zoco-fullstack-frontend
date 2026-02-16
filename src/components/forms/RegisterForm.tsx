import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useUserMutations } from "../../hooks/useUserMutations";
import { validateRegisterField, validateRegisterForm } from "./user.validator";
import { mapErrors } from "./mapErrors";
import { searchErrors } from "./searchErrors";

// Configuración para iterar los campos
const FIELDS = [
  { name: "firstName", label: "Nombre", type: "text" },
  { name: "lastName", label: "Apellido", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Contraseña", type: "password" },
  { name: "confirmPassword", label: "Confirmar Contraseña", type: "password" },
] as const;

export const RegisterForm = () => {
  const { registerMutation } = useUserMutations();
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: "", confirmPassword: "" 
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitErrors, setSubmitErrors] = useState<Record<string, string>>({});

  const handleChange = (key: string, value: string) => {
    const newForm = { ...form, [key]: value };
    setForm(newForm);
    
    // Validación inmediata del campo actual
    const error = validateRegisterField(key, value, newForm);
    setErrors(prev => ({ ...prev, [key]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Validar todo el front antes de intentar la petición
    const localErrors = validateRegisterForm(form);
    if (Object.keys(localErrors).length > 0) {
      setErrors(localErrors);
      return;
    }

    try {
      await registerMutation.mutateAsync(form);
      // Reset si sale bien
      setForm({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
      setErrors({});
    } catch (err) {
        const newErrors = mapErrors(err); // Ahora newErrors es un Record<string, string>
        setSubmitErrors(newErrors); // ¡Funciona!
      }
    };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {FIELDS.map((f) => (
        <Input
          key={f.name}
          label={f.label}
          type={f.type}
          value={form[f.name]}
          error={errors[f.name]} // El Input ya recibe el error individual
          onChange={(e) => handleChange(f.name, e.target.value)}
        />
      ))}

      {/* SECCIÓN DE ERRORES: Muestra todos los errores del objeto uno tras otro */}
      {Object.keys(submitErrors).length > 0 && (
        <div className="flex flex-col gap-1 mt-2">
          {Object.entries(submitErrors).map(([key, message]) => (
            message && (
              <span key={key} className="text-red-500 text-sm font-medium">
                • {message}
              </span>
            )
          ))}
        </div>
      )}

      <Button type="submit" disabled={searchErrors(errors, submitErrors, registerMutation)} className="mt-2">
        {registerMutation.isPending ? "Creando cuenta..." : "Registrarse"}
      </Button>
    </form>
  );
};
