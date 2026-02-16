import { useState, useMemo } from "react";
import { Button } from "../ui/Button";
import { FormErrorList } from "../ui/FormErrorList";
import { PersonalInfoSection } from "../PersonalInfoSection";
import { SecurityPassword } from "../SecurityPassword";
import { useUserMutations } from "../../hooks/useUserMutations";
import { useAuth } from "../../context/auth/useAuth";
import { validateProfileForm, type ProfileFormType } from "./validators/profile.validator";
import { validateRegisterField, type RegisterForm } from "./validators/user.validator";
import { mapErrors } from "./mapErrors";
import { searchErrors } from "./searchErrors";
import type { UserResponse, UserUpdate } from "../../types/user.types";

export const ProfileForm = ({ user }: { user: UserResponse }) => {
  const { role } = useAuth();
  const { updateUserMutation } = useUserMutations();

  const fields = useMemo(() => [
    { name: "firstName", label: "Nombre", type: "text" },
    { name: "lastName", label: "Apellido", type: "text" },
    { name: "email", label: "Correo Electrónico", type: "email" },
    { name: "roleName", label: "Rol de Usuario", type: "text", disabled: role !== "Admin" },
  ], [role]);

  const [form, setForm] = useState<UserUpdate & { confirmPassword?: string }>(() => ({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    roleName: user.roleName || "",
    password: "",
    confirmPassword: ""
  }));

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitErrors, setSubmitErrors] = useState<Record<string, string>>({});

  const handleChange = (key: string, value: string) => {
    const newForm = { ...form, [key]: value };
    setForm(newForm);
    const error = validateRegisterField(key, value, newForm as unknown as RegisterForm);
    setErrors(prev => ({ ...prev, [key]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const localErrors = validateProfileForm(form as unknown as ProfileFormType);
    
    if (form.password && form.password !== form.confirmPassword) {
      localErrors.confirmPassword = "Las contraseñas no coinciden";
    }
    
    if (Object.keys(localErrors).length > 0) return setErrors(localErrors);

    try {
      // 2. Quitamos la extracción de confirmPassword si no la usas, 
      // o simplemente usa el operador rest omitiendo la propiedad.
      const { ...dataToSubmit } = form;
      
      if (!dataToSubmit.password) delete dataToSubmit.password;
      
      await updateUserMutation.mutateAsync({ data: dataToSubmit, userId: user.id });
      setSubmitErrors({});
      setForm(prev => ({ ...prev, password: "", confirmPassword: "" }));
    } catch (err) {
      setSubmitErrors(mapErrors(err));
    }
  };

  const handleCancel = () => {
    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roleName: user.roleName || "",
      password: "",
      confirmPassword: ""
    });
    setSubmitErrors({});
    setErrors({});
  };

  const isDirty = useMemo(() => {
    const isInfoChanged = 
      form.firstName !== user.firstName ||
      form.lastName !== user.lastName ||
      form.email !== user.email ||
      (form.roleName !== (user.roleName || ""));

    const isPasswordChanged = !!form.password && form.password.length > 0;

    return isInfoChanged || isPasswordChanged;
  }, [form, user]);

  return (
     <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-8 animate-in fade-in duration-500">
      
      <PersonalInfoSection 
        fields={fields} 
        form={form} 
        errors={errors} 
        isPending={updateUserMutation.isPending} 
        onChange={handleChange} 
      />

      <SecurityPassword 
        form={form} 
        errors={errors} 
        isPending={updateUserMutation.isPending} 
        onChange={handleChange} 
      />

      <FormErrorList errors={submitErrors} />

      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-slate-50">
        <Button 
          type="button" 
          variant="secondary" 
          onClick={handleCancel} 
          disabled={!isDirty || updateUserMutation.isPending}
        >
          Cancelar
        </Button>
        <Button 
          type="submit" 
          variant="primary" 
          disabled={!isDirty || searchErrors(errors, updateUserMutation)}
        >
          {updateUserMutation.isPending ? "Guardando..." : "Actualizar Perfil"}
        </Button>
      </div>
    </form>
  );
};
