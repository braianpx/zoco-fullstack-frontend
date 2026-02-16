import { useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { validateUserField } from "./validators/new.user.validator"; 
import type { UserResponse } from "../../types/user.types";

type UserFormData = Partial<UserResponse> & {
  password?: string;
  roleName?: string;
};

interface Props {
  onSubmit: (data: UserFormData) => void; // Tipado corregido
  defaultValues?: Partial<UserResponse>;
  isEditing?: boolean;
  isLoading: boolean;
}

export const UserForm = ({ onSubmit, defaultValues, isEditing, isLoading }: Props) => {
  // Eliminamos 'watch' y usamos 'getValues'
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<UserFormData>({ 
    defaultValues 
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input 
          label="Nombre" 
          placeholder="Ej: Carlos"
          error={errors.firstName?.message as string}
          {...register("firstName", { 
            // Usamos getValues() directamente aquí para evitar el error del linter
            validate: (v) => validateUserField("firstName", v || "", getValues()) || true 
          })} 
        />
        <Input 
          label="Apellido" 
          placeholder="Ej: García"
          error={errors.lastName?.message as string}
          {...register("lastName", { 
            validate: (v) => validateUserField("lastName", v || "", getValues()) || true 
          })} 
        />
      </div>

      <Input 
        label="Correo Electrónico" 
        placeholder="carlos@ejemplo.com"
        error={errors.email?.message as string}
        {...register("email", { 
          validate: (v) => validateUserField("email", v || "", getValues()) || true 
        })} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input 
          label={isEditing ? "Nueva Contraseña (Opcional)" : "Contraseña"} 
          type="password"
          placeholder="••••••••"
          error={errors.password?.message as string}
          {...register("password", { 
            validate: (v) => validateUserField("password", v || "", getValues()) || true 
          })} 
        />
        
        {isEditing && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 ml-1 font-sans">Rol de Usuario</label>
            <select 
              {...register("roleName", {
                validate: (v) => validateUserField("roleName", v || "", getValues()) || true 
              })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all text-sm font-medium outline-none"
            >
              <option value="User">Usuario Estándar</option>
              <option value="Admin">Administrador</option>
            </select>
          </div>
        )}
      </div>

      <Button type="submit" disabled={isLoading} className="w-full py-4 shadow-lg shadow-indigo-100">
        {isLoading ? "Procesando..." : isEditing ? "Actualizar Perfil" : "Crear Usuario"}
      </Button>
    </form>
  );
};
