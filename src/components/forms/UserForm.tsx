import { useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { validateUserField } from "./validators/new.user.validator"; 
import { MapPin, GraduationCap, Lock, Shield, History, Calendar } from "lucide-react";
import type { UserResponse } from "../../types/user.types";
import { useAuth } from "../../context/auth/useAuth";

export type UserFormData = Partial<UserResponse> & {
  password?: string;
  confirmPassword?: string;
};

interface Props {
  onSubmit: (data: UserFormData) => void;
  defaultValues?: Partial<UserResponse>;
  isEditing?: boolean;
  isLoading: boolean;
}

export const UserForm = ({ onSubmit, defaultValues, isEditing, isLoading }: Props) => {
  const { user: currentUser } = useAuth();
  const isAdmin = currentUser?.roleName === "Admin";
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<UserFormData>({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 1. IDENTIDAD Y ROL */}
      <div className="grid grid-cols-2 gap-4">
        <Input label="Nombre" placeholder="Nombre" error={errors.firstName?.message} {...register("firstName", { validate: (v) => validateUserField("firstName", v || "", getValues() as any) || true })} />
        <Input label="Apellido" placeholder="Apellido" error={errors.lastName?.message} {...register("lastName", { validate: (v) => validateUserField("lastName", v || "", getValues() as any) || true })} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="md:col-span-2">
          <Input label="Email Institucional" error={errors.email?.message} {...register("email", { validate: (v) => validateUserField("email", v || "", getValues() as any) || true })} />
        </div>
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase mb-1.5 ml-1 flex items-center gap-1"><Shield size={12}/> Rol</label>
          <select disabled={!isAdmin} {...register("roleName")} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-bold text-slate-700 outline-none">
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
      </div>
        {/* 2. SEGURIDAD */}
      <div className="grid grid-cols-2 gap-4 bg-indigo-50/30 p-6 rounded-[2rem] border border-indigo-100">
        <Input label={isEditing ? "Nueva Clave" : "Clave"} type="password" error={errors.password?.message} {...register("password", { validate: (v) => validateUserField("password", v || "", getValues() as any) || true })} />
        <Input label="Repetir Clave" type="password" error={errors.confirmPassword?.message} {...register("confirmPassword", { validate: (v) => !v || v === getValues("password") || "No coincide" })} />
      </div>

      {/* 3. DATOS CONCATENADOS (DIRECCIONES Y ESTUDIOS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100">
          <span className="text-[10px] font-black uppercase text-rose-500 tracking-widest flex items-center gap-2 mb-3"><MapPin size={14}/> Direcciones</span>
          <div className="space-y-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
            {(defaultValues as any)?.addresses?.length > 0 ? (defaultValues as any).addresses.map((a: any, i: number) => (
              <div key={i} className="text-[11px] font-bold text-slate-600 bg-white p-3 rounded-xl border border-slate-50 shadow-sm leading-tight">
                {/* CONCATENACIÓN: Calle - Ciudad - País */}
                {`${a.street || 'S/N'} - ${a.city || 'Sin ciudad'} - ${a.country || 'Sin país'}`}
              </div>
            )) : <p className="text-xs text-slate-400 italic">No hay direcciones registradas.</p>}
          </div>
        </div>

        <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100">
          <span className="text-[10px] font-black uppercase text-emerald-500 tracking-widest flex items-center gap-2 mb-3"><GraduationCap size={14}/> Estudios</span>
          <div className="space-y-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
             {(defaultValues as any)?.studies?.length > 0 ? (defaultValues as any).studies.map((s: any, i: number) => (
              <div key={i} className="text-[11px] font-bold text-slate-600 bg-white p-3 rounded-xl border border-slate-50 shadow-sm leading-tight">
                {/* CONCATENACIÓN: Título - Instituto - Inicio */}
                {`${s.degree || 'S/T'} - ${s.institution || 'S/I'} (${s.startDate || 'S/F'})`}
              </div>
            )) : <p className="text-xs text-slate-400 italic">Sin estudios registrados.</p>}
          </div>
        </div>
      </div>


      {/* 4. SESSION LOGS (Estilo Original Corregido) */}
      <div className="bg-slate-900 rounded-[2rem] p-6 text-white">
        <div className="flex items-center gap-2 mb-4 text-indigo-300">
          <History size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">Historial de Sesiones</span>
        </div>
        
        <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar-dark">
          {(defaultValues as any)?.sessionLogs?.length > 0 ? (
            [...(defaultValues as any).sessionLogs]
              .sort((a, b) => {
                const dateA = new Date(a.loginTime || a.startDate || a).getTime();
                const dateB = new Date(b.loginTime || b.startDate || b).getTime();
                return dateB - dateA;
              })
              .map((log: any, i: number) => {
                // Extraemos la fecha de forma segura
                const rawDate = log.loginTime || log.startDate || (typeof log === 'string' ? log : null);
                const dateObj = new Date(rawDate);
                
                // Formateo simple para el span
                const displayDate = !isNaN(dateObj.getTime()) 
                  ? `${dateObj.toLocaleDateString('es-AR')} - ${dateObj.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}`
                  : "Fecha no disponible";

                return (
                  <div key={i} className="flex justify-between items-center text-[10px] bg-slate-800/50 p-3 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-2">
                      <Calendar size={12} className="text-indigo-400" />
                      <span className="font-mono text-slate-300">{displayDate}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-md font-black uppercase ${log.status === 'Success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {log.status || 'Active'}
                    </span>
                  </div>
                );
              })
          ) : (
            <p className="text-xs text-slate-500 italic">No hay logs de actividad.</p>
          )}
        </div>
      </div>



      <Button type="submit" variant="primary" className="w-full py-4 mt-2 shadow-2xl" disabled={isLoading}>
        {isLoading ? "Enviando..." : isEditing ? "Actualizar Perfil" : "Crear Perfil"}
      </Button>
    </form>
  );
};
