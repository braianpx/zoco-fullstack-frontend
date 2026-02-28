import { useState } from "react";
import { useSessionLogGetters, useSessionLogMutations } from "../hooks/sessionLog";
import { useAuth } from "../context/auth/useAuth";
import { SessionLogForm } from "../components/forms/SessionLogForm";
import { Card } from "../components/ui/Card";
import { Trash2, Clock, Calendar, User as UserIcon, Edit3 } from "lucide-react";
import type { SessionLogResponse } from "../types/sessionLogs.types";
import { AsyncBoundary } from "../components/ui/AsyncBoundary";
import { HeaderSection } from "../components/ui/HeaderSection";
import { IconAdminControll } from "../components/ui/IconAdminControll";

export const SessionLog = () => {
  const { user } = useAuth();
  const { logs, isLoading, isError: listError } = useSessionLogGetters(user);
  const {
    deleteSessionLogMutation,
    updateSessionLogMutation,
    isPending,
    isError: mutationError,
  } = useSessionLogMutations();

  const isError = listError ?? mutationError;
  const [editingLog, setEditingLog] = useState<SessionLogResponse | null>(null);

  const handleUpdateSession = async (formData: { endDate: Date }) => {
    if (!editingLog) return;

    await updateSessionLogMutation.mutateAsync({
      data: { endDate: formData.endDate },
      sessionId: editingLog.id,
    });
    setEditingLog(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10 animate-in fade-in duration-300">
      <HeaderSection
        title="Logs de Sesion"
        subtitle="Gestion de tiempos de conexion y auditoria."
        badge={
          <IconAdminControll />
        }
      />

      <AsyncBoundary
        isLoading={isLoading}
        isError={!!isError}
        data={logs}
        loadingMessage="Auditando accesos..."
        errorMessage={isError ?? "No pudimos obtener la informacion de los logs de sesion."}
        emptyMessage="Todavia no hay logs de sesion registrados."
      />

      {editingLog && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300 max-w-lg mx-auto w-full mb-10">
          <Card title={`Cerrar sesion: ${editingLog.userName}`}>
            <SessionLogForm
              startDate={editingLog.startDate}
              isLoading={isPending}
              onCancel={() => setEditingLog(null)}
              onSubmit={handleUpdateSession}
            />
          </Card>
        </div>
      )}

      <div className="grid gap-4">
        {logs.map((log) => (
          <div
            key={log.id}
            className="group bg-white border border-slate-200 rounded-4xl p-6 hover:shadow-xl transition-all duration-500"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-slate-50 text-slate-400 rounded-2xl group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors duration-300">
                  <UserIcon size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{log.userName}</h3>
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-400 text-[10px] font-black rounded uppercase tracking-tighter">UID: {log.userId}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-8">
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
                    <Clock size={12} /> Inicio
                  </span>
                  <p className="text-sm font-semibold text-slate-600">{new Date(log.startDate).toLocaleString()}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
                    <Calendar size={12} /> Fin
                  </span>
                  <p className={`text-sm font-semibold ${log.endDate ? "text-slate-600" : "text-emerald-500 animate-pulse"}`}>
                    {log.endDate ? new Date(log.endDate).toLocaleString() : "Sesion Activa"}
                  </p>
                </div>

                <div className="flex gap-2 ml-auto">
                  {!log.endDate && (
                    <button
                      onClick={() => {
                        setEditingLog(log);
                      }}
                      className="p-3 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors duration-200"
                    >
                      <Edit3 size={20} />
                    </button>
                  )}
                  <button
                    onClick={() => confirm("Eliminar registro?") && deleteSessionLogMutation.mutate(log.id)}
                    className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors duration-200"
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
