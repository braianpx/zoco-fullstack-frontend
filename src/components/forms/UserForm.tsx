import { useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { validateUserField } from "./validators/new.user.validator"; 
import { MapPin, GraduationCap, Shield, History, Calendar, UserCheck } from "lucide-react";
import type { UserCreate, UserResponse, UserUpdate } from "../../types/user.types";
import { useAuth } from "../../context/auth/useAuth";
import type { SessionLogResponse } from "../../types/sessionLogs.types";

// Definimos un tipo que acepte los campos extra de seguridad
export type UserFormType = Partial<UserCreate & UserUpdate> & {
  confirmPassword?: string;
};

interface Props {
  onSubmit: (data: UserFormType) => void;
  defaultValues?: Partial<UserResponse>;
  isEditing?: boolean;
  isLoading: boolean;
}

export const UserForm = ({ onSubmit, defaultValues, isEditing, isLoading }: Props) => {
  const { user: currentUser } = useAuth();
  const isAdmin = currentUser?.roleName === "Admin";
  
  // 1. Casting en defaultValues para evitar el error de asignación
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<UserFormType>({ 
    defaultValues: defaultValues as UserFormType 
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* IDENTIDAD Y ROL */}
      <div className="grid grid-cols-2 gap-4">
        <Input 
          label="Nombre" 
          placeholder="Nombre" 
          error={errors.firstName?.message} 
          {...register("firstName", { 
            // 2. Casting en getValues() para que el validador no chille por tipos
            validate: (v) => validateUserField("firstName", v || "", getValues()) || true 
          })} 
        />
        <Input 
          label="Apellido" 
          placeholder="Apellido" 
          error={errors.lastName?.message} 
          {...register("lastName", { 
            validate: (v) => validateUserField("lastName", v || "", getValues()) || true 
          })} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="md:col-span-2">
          <Input 
            label="Email Institucional" 
            error={errors.email?.message} 
            {...register("email", { 
              validate: (v) => validateUserField("email", v || "", getValues()) || true 
            })} 
          />
        </div>
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase mb-1.5 ml-1 flex items-center gap-1">
            <Shield size={12}/> Rol
          </label>
          <select 
            disabled={!isAdmin} 
            {...register("roleName")} 
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-bold text-slate-700 outline-none"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
      </div>

      {/* SEGURIDAD */}
      <div className="grid grid-cols-2 gap-4 bg-indigo-50/30 p-6 rounded-4xl border border-indigo-100">
        <Input 
          label={isEditing ? "Nueva Clave" : "Clave"} 
          type="password" 
          error={errors.password?.message} 
          {...register("password", { 
            validate: (v) => validateUserField("password", v || "", getValues()) || true 
          })} 
        />
        <Input 
          label="Repetir Clave" 
          type="password" 
          error={errors.confirmPassword?.message} 
          {...register("confirmPassword", { 
            validate: (v) => !v || v === getValues("password") || "No coincide" 
          })} 
        />
      </div>

      {/* DATOS CONCATENADOS (Mantenemos tu lógica de mapeo) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-50 rounded-4xl p-6 border border-slate-100">
          <span className="text-[10px] font-black uppercase text-rose-500 tracking-widest flex items-center gap-2 mb-3"><MapPin size={14}/> Direcciones</span>
          <div className="space-y-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
            {defaultValues?.addresses && defaultValues.addresses.length > 0 ? (
              defaultValues.addresses.map((a, i) => (
                <div key={i} className="text-[11px] font-bold text-slate-600 bg-white p-3 rounded-xl border border-slate-50 shadow-sm leading-tight">
                  {`${a.street || 'S/N'} - ${a.city || 'Sin ciudad'} - ${a.country || 'Sin país'}`}
                </div>
              ))
            ) : <p className="text-xs text-slate-400 italic">No hay direcciones registradas.</p>}
          </div>
        </div>

        <div className="bg-slate-50 rounded-4xl p-6 border border-slate-100">
          <span className="text-[10px] font-black uppercase text-emerald-500 tracking-widest flex items-center gap-2 mb-3"><GraduationCap size={14}/> Estudios</span>
          <div className="space-y-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
             {defaultValues?.studies && defaultValues.studies.length > 0 ? (
               defaultValues.studies.map((s, i) => (
                <div key={i} className="text-[11px] font-bold text-slate-600 bg-white p-3 rounded-xl border border-slate-50 shadow-sm leading-tight">
                  {`${s.degree || 'S/T'} - ${s.institution || 'S/I'} (${s.startDate || 'S/F'})`}
                </div>
              ))
            ) : <p className="text-xs text-slate-400 italic">Sin estudios registrados.</p>}
          </div>
        </div>
      </div>

      {/* SESSION LOGS */}
      <div className="bg-slate-900 rounded-4xl p-6 text-white">
        <div className="flex items-center gap-2 mb-4 text-indigo-300">
          <History size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">Historial de Sesiones</span>
        </div>
        
        <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar-dark">
          {defaultValues?.sessionLogs && defaultValues.sessionLogs.length > 0 ? (
            (defaultValues.sessionLogs as unknown as SessionLogResponse[])
              .sort((a, b) => {
                const dateA = new Date(a.endDate || a.startDate || "").getTime();
                const dateB = new Date(b.endDate || b.startDate || "").getTime();
                return dateB - dateA;
              })
              .map((log, i) => {
                const dateObj = new Date(log.endDate || log.startDate || "");
                const displayDate = !isNaN(dateObj.getTime()) 
                  ? `${dateObj.toLocaleDateString('es-AR')} - ${dateObj.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}`
                  : "Fecha no disponible";

                return (
                  <div key={i} className="flex justify-between items-center text-[10px] bg-slate-800/50 p-3 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-2">
                      <Calendar size={12} className="text-indigo-400" />
                      <span className="font-mono text-slate-300">{displayDate}</span>
                    </div>
                  </div>
                );
              })
          ) : (
            <p className="text-xs text-slate-500 italic">No hay registros de sesión.</p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full py-4 rounded-3xl text-lg font-black shadow-xl">
        {isLoading ? "Procesando..." : (isEditing ? "Actualizar Ficha" : "Crear Usuario")}
      </Button>
    </form>
  );
};
