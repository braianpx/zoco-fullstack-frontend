import { useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { validateSessionLogField } from "./validators/sessionLog.validator";

interface Props {
  startDate: Date;
  onSubmit: (data: { endDate: Date }) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export const SessionLogForm = ({ startDate, onSubmit, onCancel, isLoading }: Props) => {
  const now = new Date();
  const localIsoString = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);

  console.log(startDate)
  // Tipamos el formulario internamente como string
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<{ endDate: string }>({
    defaultValues: { endDate: localIsoString }
  });

  // Función intermedia para convertir el string del input a Date
  const handleInternalSubmit = (data: { endDate: string }) => {
    onSubmit({
      endDate: new Date(data.endDate)
    });
  };

  return (
    <form 
      onSubmit={handleSubmit(handleInternalSubmit)} 
      className="space-y-6"
    >
      <Input
        label="Fecha y Hora de Cierre"
        type="datetime-local"
        error={errors.endDate?.message}
        {...register("endDate", { 
          required: "La fecha es obligatoria",
          validate: (v) => {
            const errorMsg = validateSessionLogField("endDate", v, startDate);
            return errorMsg || true; 
          }
        })}
      />
      
      <div className="flex gap-3 justify-end pt-2">
        <Button 
            variant="ghost" 
            onClick={onCancel} 
            type="button"
        >
          Cancelar
        </Button>
        <Button 
            variant="primary" 
            type="submit" 
            disabled={isLoading} 
            className="px-8 shadow-lg shadow-indigo-100"
        >
          {isLoading ? "Cerrando..." : "Confirmar Cierre"}
        </Button>
      </div>
    </form>
  );
};
