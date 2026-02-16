import { useForm } from "react-hook-form";
import { useEffect } from "react";
import type { StudyCreate } from "../../types/study.types";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { validateStudyField } from "./validators/study.validator";

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

  const formValues = watch();
  const userName = defaultValues?.userName;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {userName && (
        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-2">
          <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-indigo-600 shadow-sm font-bold text-sm">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Perfil de</span>
            <span className="text-sm font-semibold text-slate-700">{userName}</span>
          </div>
        </div>
      )}

      <Input 
        label="Título / Carrera"
        placeholder="Ej. Licenciatura en Sistemas"
        error={errors.degree?.message}
        {...register("degree", { validate: (v) => validateStudyField("degree", v) || true })} 
      />

      <Input 
        label="Institución"
        placeholder="Ej. Universidad Tecnológica Nacional"
        error={errors.institution?.message}
        {...register("institution", { validate: (v) => validateStudyField("institution", v) || true })} 
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input 
          label="Fecha de Inicio"
          type="date"
          error={errors.startDate?.message}
          {...register("startDate", { validate: (v) => validateStudyField("startDate", v) || true })} 
        />
        <Input 
          label="Fecha de Fin"
          type="date"
          error={errors.endDate?.message}
          {...register("endDate", { validate: (v) => validateStudyField("endDate", v, formValues) || true })} 
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full py-4 shadow-lg shadow-indigo-100">
        {isLoading ? "Procesando..." : isEditing ? "Actualizar Estudio" : "Guardar Estudio"}
      </Button>
    </form>
  );
};
