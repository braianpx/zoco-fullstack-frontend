import { useState } from "react";
import { useSessionLogGetters } from "../hooks/useSessionLogGetters";
import { useSessionLogMutations } from "../hooks/useSessionLogMutations";
import { SessionLogForm } from "../components/forms/SessionLogForm";
import { Card } from "../components/ui/Card";
import { ShieldAlert, Trash2, Clock, Calendar, User as UserIcon, Edit3 } from "lucide-react";
import { useAuth } from "../context/auth/useAuth";
import { Navigate } from "react-router-dom";
import type { SessionLogResponse } from "../types/sessionLogs.types";

export const SessionLog = () => {
  const { role } = useAuth();
  const { logs, isLoading } = useSessionLogGetters();
  const { deleteMutation, updateMutation } = useSessionLogMutations();
  
  // CORRECCIÓN: Tipado correcto en lugar de 'any'
  const [editingLog, setEditingLog] = useState<SessionLogResponse | null>(null);

  if (role !== "Admin") return <Navigate to="/dashboard/profile" replace />;

  if (isLoading) return (
    <div className="p-20 text-center animate-pulse text-slate-400 font-bold uppercase tracking-widest">
      Auditando accesos...
    </div>
  );

  const handleUpdateSession = async (formData: { endDate: Date }) => {
    if (!editingLog) return;
    
    try {
      await updateMutation.mutateAsync({ 
        data: { endDate: formData.endDate }, 
        sessionId: editingLog.id 
      });
      setEditingLog(null);
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-100 pb-8 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-600 rounded-full mb-3 border border-amber-100">
            <ShieldAlert size={14} />
            <span className="text-xs font-bold uppercase tracking-widest">Admin Control</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Logs de Sesión</h1>
          <p className="text-slate-500 mt-1">Gestión de tiempos de conexión y auditoría.</p>
        </div>
      </header>

      {editingLog && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500 max-w-lg mx-auto w-full mb-10">
          <Card title={`Cerrar sesión: ${editingLog.userName}`}>
            <SessionLogForm
              startDate={editingLog.startDate}
              isLoading={updateMutation.isPending}
              onCancel={() => setEditingLog(null)}
              onSubmit={handleUpdateSession}
            />
          </Card>
        </div>
      )}

      <div className="grid gap-4">
        {logs.map((log) => (
          <div key={log.id} className="group bg-white border border-slate-200 rounded-4xl p-6 hover:shadow-2xl transition-all duration-500">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-slate-50 text-slate-400 rounded-2xl group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors duration-500">
                  <UserIcon size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{log.userName}</h3>
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-400 text-[10px] font-black rounded uppercase tracking-tighter">UID: {log.userId}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-8">
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-1.5"><Clock size={12}/> Inicio</span>
                  <p className="text-sm font-semibold text-slate-600">{new Date(log.startDate).toLocaleString()}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-1.5"><Calendar size={12}/> Fin</span>
                  <p className={`text-sm font-semibold ${log.endDate ? "text-slate-600" : "text-emerald-500 animate-pulse"}`}>
                    {log.endDate ? new Date(log.endDate).toLocaleString() : "Sesión Activa"}
                  </p>
                </div>

                <div className="flex gap-2 ml-auto">
                  {!log.endDate && (
                    <button 
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setEditingLog(log);
                      }} 
                      className="p-3 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                    >
                      <Edit3 size={20} />
                    </button>
                  )}
                  <button 
                    onClick={() => confirm("¿Eliminar registro?") && deleteMutation.mutate(log.id)}
                    className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
