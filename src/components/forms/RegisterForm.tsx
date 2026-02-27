// src/components/forms/RegisterForm.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { FormErrorList } from "../ui/FormErrorList";
import { validateUserField, type UserFormType } from "./validators/user.validator";
import { mapErrors } from "./mapErrors";
import { searchErrors } from "./searchErrors";
import { useUserMutations } from "../../hooks/user";
import type { UserCreate } from "../../types/user.types";

const FIELDS = [
  { name: "firstName", label: "Nombre", type: "text", placeholder: "Ej. Juan" },
  { name: "lastName", label: "Apellido", type: "text", placeholder: "Ej. Pérez" },
  { name: "email", label: "Correo Electrónico", type: "email", placeholder: "juan@ejemplo.com" },
  { name: "password", label: "Contraseña", type: "password", placeholder: "••••••••" },
  { name: "confirmPassword", label: "Confirmar Contraseña", type: "password", placeholder: "••••••••" },
] as const;

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { createUserMutation } = useUserMutations();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitErrors, setSubmitErrors] = useState<Record<string, string>>({});

  const handleChange = (key: string, value: string) => {
    const newForm = { ...form, [key]: value };
    setForm(newForm);

    const error = validateUserField(key, value, newForm as unknown as UserFormType);
    setErrors((prev) => ({ ...prev, [key]: error }));

    if (submitErrors[key]) setSubmitErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitErrors({});

    if (form.password !== form.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: "Las contraseñas no coinciden" }));
      return;
    }

    try {
      // CORRECCIÓN: Usamos desestructuración con un alias que empiece con _
      // y configuramos el objeto de salida con el tipo correcto (UserCreate)
      const { ...dataToSubmit } = form;
     
      await createUserMutation.mutateAsync(dataToSubmit as UserCreate);

      navigate("/login");
    } catch (err) {
      setSubmitErrors(mapErrors(err));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FIELDS.slice(0, 2).map((f) => (
          <Input
            key={f.name}
            label={f.label}
            placeholder={f.placeholder}
            value={form[f.name as keyof typeof form]}
            error={errors[f.name] || submitErrors[f.name]}
            onChange={(e) => handleChange(f.name, e.target.value)}
          />
        ))}
      </div>

      {FIELDS.slice(2).map((f) => (
        <Input
          key={f.name}
          label={f.label}
          type={f.type}
          placeholder={f.placeholder}
          value={form[f.name as keyof typeof form]}
          error={errors[f.name] || submitErrors[f.name]}
          onChange={(e) => handleChange(f.name, e.target.value)}
        />
      ))}

      <FormErrorList errors={submitErrors} />

      <Button
        type="submit"
        variant="primary"
        className="w-full py-4 mt-2 shadow-lg shadow-indigo-100"
        disabled={createUserMutation.isPending || searchErrors(errors, createUserMutation)}
      >
        {createUserMutation.isPending ? "Creando cuenta..." : "Registrarse"}
      </Button>
    </form>
  );
};
