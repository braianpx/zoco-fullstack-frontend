import { useState } from "react";
import { useUserDetail, useUserGetters } from "../hooks/useUserGetters";
import { useUserMutations } from "../hooks/useUserMutations";
import { UserForm } from "../components/forms/UserForm";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/auth/useAuth";
import { 
  User as UserIcon, Mail, Trash2, Edit3, 
  Plus, X, MapPin, GraduationCap 
} from "lucide-react";
import type { UserResponse, UserCreate, UserUpdate } from "../types/user.types";
import type { UserFormData } from "../components/forms/UserForm";

export const User = () => {
  const { user: currentUser } = useAuth();
  const { users, isLoading: isLoadingList } = useUserGetters();
  const { createMutation, updateMutation, deleteMutation } = useUserMutations();
  
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * CORRECCIÓN CLAVE:
   * El hook se declara una sola vez. 
   * Si selectedUserId es null, no debería hacer nada (esto depende de cómo esté implementado useUserDetail, 
   * usualmente se usa { enabled: !!selectedUserId } dentro del hook).
   */
  const { data: detailedUser, isLoading: isLoadingDetail } = useUserDetail(selectedUserId || 0);
 
  const handleAction = async (data: UserFormData) => {
    if (selectedUserId) {
      await updateMutation.mutateAsync({ 
        data: data as UserUpdate, 
        userId: selectedUserId 
      });
    } else {
      await createMutation.mutateAsync(data as UserCreate);
    }
    closeModal();
  };

  const openEdit = (user: UserResponse) => {
    setSelectedUserId(user.id); // Esto dispara el fetch en useUserDetail automáticamente
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUserId(null);
    setIsModalOpen(false);
  };

  if (isLoadingList) return (
    <div className="p-20 text-center animate-pulse font-black text-slate-400">
      CARGANDO DIRECTORIO...
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">
      <header className="flex justify-between items-end border-b border-slate-100 pb-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Directorio</h1>
          <p className="text-slate-500 mt-1">Gestión de perfiles y formación académica.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="rounded-full shadow-lg">
          <Plus size={20} className="mr-2" /> Nuevo Usuario
        </Button>
      </header>

      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center h-full justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in" onClick={closeModal} />
          
          <div className="relative w-full max-w-2xl bg-white rounded-[3.5rem] shadow-2xl z-50 overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-12 overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-indigo-600 text-white rounded-3xl shadow-lg">
                    <UserIcon size={32} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-900">Ficha de Usuario</h2>
                    <p className="text-slate-400 font-medium">Información detallada del servidor.</p>
                  </div>
                </div>
                <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-2xl">
                  <X size={32} className="text-slate-300" />
                </button>
              </div>

              {/* Lógica de carga del detalle */}
              {selectedUserId && isLoadingDetail ? (
                <div className="py-20 text-center">
                  <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sincronizando datos...</p>
                </div>
              ) : (
                <UserForm 
                  onSubmit={handleAction}
                  isLoading={createMutation.isPending || updateMutation.isPending}
                  isEditing={!!selectedUserId}
                  // defaultValues ahora viene con los datos "frescos" del GET detallado
                  defaultValues={detailedUser || undefined}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- GRILLA DE USUARIOS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {users?.map((u: UserResponse) => (
          <div key={u.id} className="bg-white border border-slate-200 rounded-[2.5rem] p-8 hover:shadow-2xl transition-all duration-500 group">
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-slate-50 text-slate-400 rounded-2xl group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                <UserIcon size={28} />
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(u)} className="p-2 text-slate-400 hover:text-indigo-600 bg-slate-50 rounded-xl"><Edit3 size={18} /></button>
                <button onClick={() => confirm("¿Borrar?") && deleteMutation.mutate(u.id)} className="p-2 text-slate-400 hover:text-red-600 bg-slate-50 rounded-xl"><Trash2 size={18} /></button>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-1">{u.firstName} {u.lastName}</h3>
            <p className="text-indigo-500 font-medium text-sm mb-6 flex items-center gap-2">
                <Mail size={14} /> {u.email}
            </p>

            <div className="bg-slate-50 rounded-3xl p-5 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-slate-400 mt-1" />
                <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Localización</p>
                    <p className="text-sm text-slate-600 font-medium truncate w-40">{(u as any).address || "No registrada"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <GraduationCap size={16} className="text-slate-400 mt-1" />
                <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Estudios</p>
                    <p className="text-sm text-slate-600 font-medium truncate w-40">{(u as any).education || "Sin formación"}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-50">
              <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500">
                {u.roleName || 'User'}
              </span>
              <span className="text-[10px] text-slate-300 font-bold">UID: {u.id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
