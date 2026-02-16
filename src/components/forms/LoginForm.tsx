import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useAuthMutations } from "../../hooks/useAuthMutations";
import { validateRegisterField } from "./user.validator"; 
import { mapErrors } from "./mapErrors";
import { searchErrors } from "./searchErrors";

const FIELDS = [
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Contraseña", type: "password" },
] as const;

export const LoginForm = () => {
  const { loginMutation } = useAuthMutations();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitErrors, setSubmitErrors] = useState<Record<string, string>>({});

  const handleChange = (key: string, value: string) => {
    const newForm = { ...form, [key]: value };
    setForm(newForm);

    // Validación local en tiempo real
    const error = validateRegisterField(key, value, newForm);
    setErrors((prev) => ({ ...prev, [key]: error }));
    
    // Limpiamos el error del back de ese campo al empezar a escribir
    if (submitErrors[key]) setSubmitErrors(prev => ({ ...prev, [key]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitErrors({});

    try {
      await loginMutation.mutateAsync(form);
      // Éxito: El hook se encarga del notify, tú podrías redirigir aquí
    } catch (err) {
      // Usamos tu función mapErrors
      setSubmitErrors(mapErrors(err));
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
          // Prioridad al error local, luego al del back
          error={errors[f.name] || submitErrors[f.name]}
          onChange={(e) => handleChange(f.name, e.target.value)}
        />
      ))}

      {/* Lista de errores combinada */}
      <div className="flex flex-col gap-1">
        {Object.entries(submitErrors).map(([key, msg]) => 
          msg && <span key={key} className="text-red-500 text-xs font-medium">• {msg}</span>
        )}
      </div>

      <Button 
        type="submit" 
        // Usamos tu función searchErrors
        disabled={searchErrors(errors, submitErrors, loginMutation)}
      >
        {loginMutation.isPending ? "Iniciando..." : "Ingresar"}
      </Button>
    </form>
  );
};
