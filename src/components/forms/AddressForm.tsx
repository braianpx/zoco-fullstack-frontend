// src/components/addresses/AddressForm.tsx
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import type { AddressCreate, AddressResponse } from "../../types/address.types";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { validateAddressField } from "./validators/address.validator";
import { UserCheck } from "lucide-react";

interface Props {
  onSubmit: (data: AddressCreate) => void;
  defaultValues?: AddressResponse;
  isLoading: boolean;
  isEditing?: boolean;
  isAdmin: boolean;
}

export const AddressForm = ({ onSubmit, defaultValues, isLoading, isEditing, isAdmin }: Props) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AddressCreate>({
    defaultValues
  });

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const userName = defaultValues?.userName;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
      {/* Banner Informativo para Admin - Idéntico a Estudios */}
      {userName && isAdmin && (
        <div className="flex items-center gap-3 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 mb-6 group transition-all hover:bg-indigo-50">
          <div className="relative">
            <div className="w-11 h-11 rounded-full bg-white border-2 border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm font-bold text-base transition-transform group-hover:scale-105">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-white rounded-full p-1 border-2 border-white shadow-sm">
              <UserCheck size={10} strokeWidth={3} />
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-[0.1em] mb-1">
              Gestión de Usuario (Modo Admin)
            </span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-slate-700">Propiedad de:</span>
              <span className="text-sm font-bold text-indigo-700 underline decoration-indigo-200 underline-offset-4">
                {userName}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Campos del Formulario */}
      <Input 
        label="Calle y Número"
        placeholder="Ej. Av. Siempre Viva 742"
        error={errors.street?.message}
        {...register("street", { 
          validate: (v) => validateAddressField("street", v) || true 
        })} 
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input 
          label="Ciudad"
          placeholder="Ej. Springfield"
          error={errors.city?.message}
          {...register("city", { 
            validate: (v) => validateAddressField("city", v) || true 
          })} 
        />
        <Input 
          label="País"
          placeholder="Ej. Estados Unidos"
          error={errors.country?.message}
          {...register("country", { 
            validate: (v) => validateAddressField("country", v) || true 
          })} 
        />
      </div>

      <Input 
        label="Código Postal"
        placeholder="Ej. 10001"
        error={errors.postalCode?.message}
        {...register("postalCode", { 
          validate: (v) => validateAddressField("postalCode", v || "") || true 
        })} 
      />

      <Button 
        type="submit" 
        disabled={isLoading} 
        className="w-full py-4 shadow-lg shadow-indigo-100 mt-4"
      >
        {isLoading ? "Procesando..." : isEditing ? "Actualizar Dirección" : "Guardar Dirección"}
      </Button>
    </form>
  );
};
