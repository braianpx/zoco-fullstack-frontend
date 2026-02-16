import { useForm } from "react-hook-form";
import { useEffect } from "react";
import type { StudyCreate } from "../../types/study.types";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

interface Props {
  onSubmit: (data: StudyCreate) => void;
  defaultValues?: Partial<StudyCreate & { userName?: string }>;
  isLoading: boolean;
  isEditing?: boolean;
}

export const StudyForm = ({ onSubmit, defaultValues, isLoading, isEditing }: Props) => {
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<StudyCreate>({
    defaultValues
  });

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const startDate = watch("startDate");
  const userName = defaultValues?.userName;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Header del Usuario Informativo */}
      {userName && (
        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-indigo-600 shadow-sm font-bold text-sm">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Estudiante</span>
            <span className="text-sm font-semibold text-slate-700">{userName}</span>
          </div>
        </div>
      )}

      <Input 
        label="Título / Carrera"
        placeholder="Ej. Licenciatura en Sistemas"
        error={errors.degree?.message}
        {...register("degree", { required: "El título es obligatorio", minLength: { value: 3, message: "Mínimo 3 caracteres" }})} 
      />

      <Input 
        label="Institución"
        placeholder="Ej. Universidad Tecnológica Nacional"
        error={errors.institution?.message}
        {...register("institution", { required: "La institución es obligatoria" })} 
      />

      <div className="grid grid-cols-2 gap-4">
        <Input 
          label="Fecha de Inicio"
          type="date"
          error={errors.startDate?.message}
          {...register("startDate", { 
            required: "La fecha de inicio es requerida",
            validate: value => new Date(value) <= new Date() || "La fecha no puede ser futura"
          })} 
        />
        <Input 
          label="Fecha de Fin"
          type="date"
          error={errors.endDate?.message}
          {...register("endDate", {
            validate: value => {
              if (!value || !startDate) return true;
              return new Date(value) >= new Date(startDate) || "Debe ser posterior al inicio";
            }
          })} 
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full py-4 shadow-lg shadow-indigo-100">
        {isLoading ? "Procesando..." : isEditing ? "Actualizar Estudio" : "Guardar Estudio"}
      </Button>
    </form>
  );
};
