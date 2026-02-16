import { useState } from "react";
import { useUserGetters } from "../hooks/useUserGetters";
import { useUserMutations } from "../hooks/useUserMutations";
import { UserForm } from "../components/forms/UserForm";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/auth/useAuth";
import { User as UserIcon, Mail, Shield, Trash2, Edit3, Plus, X } from "lucide-react";
import type { UserResponse, UserCreate, UserUpdate } from "../types/user.types";
import type { UserFormType } from "../components/forms/validators/user.validator";

export const User = () => {
  const { user: currentUser } = useAuth();
  
  const { users, isLoading } = useUserGetters();
  const { createMutation, updateMutation, deleteMutation } = useUserMutations();
  
  const [isAdding, setIsAdding] = useState(false);
  const [editingUser, setEditingUser] = useState<UserResponse | null>(null);

  // Eliminamos el 'any' y usamos la unión de tipos de creación y edición
  const handleAction = async (data: UserFormType) => {
    if (editingUser) {
      await updateMutation.mutateAsync({ 
        // Usamos "as any" o "as UserUpdate" tras validar que los datos son correctos
        data: data as UserUpdate, 
        userId: editingUser.id 
      });
    } else {
      await createMutation.mutateAsync(data as UserCreate);
    }
    setEditingUser(null);
    setIsAdding(false);
  };

  if (isLoading) return (
    <div className="p-20 text-center animate-pulse">
      <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="font-black text-slate-400 tracking-widest uppercase text-xs">Sincronizando Directorio...</p>
    </div>
  );
 console.log(users)
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-100 pb-8 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full mb-3 border border-indigo-100">
            <Shield size={14} />
            <span className="text-xs font-bold uppercase tracking-widest">Gestión de Personal</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Directorio</h1>
          <p className="text-slate-500 mt-1">Administración de perfiles y permisos de usuario.</p>
        </div>
        <Button 
          variant={isAdding || editingUser ? "ghost" : "primary"}
          onClick={() => { setIsAdding(!isAdding); setEditingUser(null); }}
          className="shadow-xl shadow-indigo-100"
        >
          {isAdding || editingUser ? <X size={20} /> : <Plus size={20} />}
          {isAdding || editingUser ? "Cancelar" : "Añadir Usuario"}
        </Button>
      </header>

      {(isAdding || editingUser) && (
        <div className="max-w-2xl mx-auto animate-in slide-in-from-top-4 duration-500">
          <Card title={editingUser ? "Modificar Perfil" : "Nuevo Registro"}>
            <UserForm 
              onSubmit={handleAction}
              isLoading={createMutation.isPending || updateMutation.isPending}
              isEditing={!!editingUser}
              defaultValues={editingUser || undefined}
            />
          </Card>
        </div>
      )}
   
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users?.map((u: UserResponse) => (
          <div key={u.id} className="group bg-white border border-slate-200 rounded-[2.5rem] p-8 hover:shadow-2xl transition-all duration-500">
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-slate-50 text-slate-400 rounded-2xl group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors duration-500">
                <UserIcon size={24} />
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                    onClick={() => { setEditingUser(u); setIsAdding(false); window.scrollTo({top: 0, behavior: 'smooth'}); }} 
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                >
                    <Edit3 size={18} />
                </button>
                <button 
                    onClick={() => confirm("¿Eliminar usuario?") && deleteMutation.mutate(u.id)} 
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                    <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">{u.firstName} {u.lastName}</h3>
              <div className="flex items-center gap-2 text-slate-500 text-sm truncate">
                <Mail size={14} className="text-slate-300" />
                <span className="truncate">{u.email}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-50">
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.15em] ${u.roleName === 'Admin' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-slate-100 text-slate-500'}`}>
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
