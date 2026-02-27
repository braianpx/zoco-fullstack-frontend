// src/components/forms/LoginForm.tsx
import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useAuthMutations } from "../../hooks/auth";
// CORRECCIÓN: Cambiado validateRegisterField por validateUserField
import { validateUserField } from "./validators/user.validator"; 
import { mapErrors } from "./mapErrors";
import { searchErrors } from "./searchErrors";

const FIELDS = [
  { 
    name: "email", 
    label: "Correo Electrónico", 
    type: "email", 
    placeholder: "ejemplo@correo.com" 
  },
  { 
    name: "password", 
    label: "Contraseña", 
    type: "password", 
    placeholder: "••••••••" 
  },
] as const;
export const LoginForm = () => {
  const { loginMutation } = useAuthMutations();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitErrors, setSubmitErrors] = useState<Record<string, string>>({});

  const handleChange = (key: string, value: string) => {
    const newForm = { ...form, [key]: value };
    setForm(newForm);

    // CORRECCIÓN: Usamos el nombre correcto de la función y pasamos newForm como 3er argumento
    const error = validateUserField(key, value, newForm);
    setErrors((prev) => ({ ...prev, [key]: error }));
    
    if (submitErrors[key]) setSubmitErrors(prev => ({ ...prev, [key]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitErrors({});

    try {
      await loginMutation.mutateAsync(form);
    } catch (err) {
      setSubmitErrors(mapErrors(err));
    }
  };

  // Definimos si el formulario está incompleto
  const isFormEmpty = !form.email.trim() || !form.password.trim();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {FIELDS.map((f) => (
        <Input
          key={f.name}
          label={f.label}
          type={f.type}
          placeholder={f.placeholder} // <-- Agregamos esta línea
          value={form[f.name]}
          error={errors[f.name] || submitErrors[f.name]}
          onChange={(e) => handleChange(f.name, e.target.value)}
        />
      ))}

      <div className="flex flex-col gap-1">
        {Object.entries(submitErrors).map(([key, msg]) => 
          msg && <span key={key} className="text-red-500 text-xs font-medium">• {msg}</span>
        )}
      </div>

      <Button 
        type="submit" 
        disabled={isFormEmpty || !!searchErrors(errors, loginMutation)}
      >
        {loginMutation.isPending ? "Iniciando..." : "Ingresar"}
      </Button>
    </form>
  );
};
