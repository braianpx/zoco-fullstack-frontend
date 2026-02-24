import { useForm } from "react-hook-form";
import { useEffect } from "react";
import type { StudyCreate } from "../../types/study.types";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { validateStudyField } from "./validators/study.validator";
import { UserCheck } from "lucide-react";

interface Props {
  onSubmit: (data: StudyCreate) => void;
  defaultValues?: StudyCreate;
  isLoading: boolean;
  isEditing?: boolean;
  isAdmin: boolean;
}

export const StudyForm = ({ onSubmit, defaultValues, isLoading, isEditing, isAdmin }: Props) => {
  // Reemplazamos 'watch' por 'getValues'
  const { register, handleSubmit, getValues, reset, formState: { errors } } = useForm<StudyCreate>({
    defaultValues
  });

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const userName = defaultValues?.userName;
 

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
    {userName && isAdmin && (
      <div className="flex items-center gap-3 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 mb-6 group transition-all hover:bg-indigo-50">
        {/* Avatar con inicial y un badge de verificación */}
        <div className="relative">
          <div className="w-11 h-11 rounded-full bg-white border-2 border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm font-bold text-base transition-transform group-hover:scale-105">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-white rounded-full p-1 border-2 border-white shadow-sm">
            <UserCheck size={10} strokeWidth={3} />
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-[0.1em] leading-none mb-1">
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

      <Input 
        label="Título / Carrera"
        placeholder="Ej. Licenciatura en Sistemas"
        error={errors.degree?.message}
        {...register("degree", { 
          validate: (v) => validateStudyField("degree", v) || true 
        })} 
      />

      <Input 
        label="Institución"
        placeholder="Ej. Universidad Tecnológica Nacional"
        error={errors.institution?.message}
        {...register("institution", { 
          validate: (v) => validateStudyField("institution", v) || true 
        })} 
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input 
          label="Fecha de Inicio"
          type="date"
          error={errors.startDate?.message}
          {...register("startDate", { 
            validate: (v) => validateStudyField("startDate", v) || true 
          })} 
        />
        <Input 
          label="Fecha de Fin"
          type="date"
          error={errors.endDate?.message}
          {...register("endDate", { 
            // Inyectamos getValues() directamente para comparar las fechas sin causar re-renders
            validate: (v) => validateStudyField("endDate", v, getValues()) || true 
          })} 
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full py-4 shadow-lg shadow-indigo-100">
        {isLoading ? "Procesando..." : isEditing ? "Actualizar Estudio" : "Guardar Estudio"}
      </Button>
    </form>
  );
};
