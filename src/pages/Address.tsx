// src/pages/AddressesPage.tsx
import { useState } from "react";
import { useAuth } from "../context/auth/useAuth";
import { useAddressGetters } from "../hooks/useAddressGetters";
import { useAddressMutations } from "../hooks/useAddressMutations";
import { AddressForm } from "../components/forms/AddressForm";
import { Button } from "../components/ui/Button";
import { mapErrors } from "../components/forms/mapErrors";
// Usamos los mismos iconos que en Study
import { Trash2, Edit3, MapPin, Plus, X } from "lucide-react"; 
import type { AddressResponse, AddressCreate } from "../types/address.types";

export const Address = () => {
  const { user, role } = useAuth();
  const isAdmin = role === "Admin";

  const { addresses, isLoading } = useAddressGetters(user?.id || null, isAdmin);
  const { createAddressMutation, updateAddressMutation, deleteAddressMutation, isPending } = useAddressMutations();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [backendErrors, setBackendErrors] = useState<Record<string, string>>({});

  const displayUserName = addresses.length > 0 ? addresses[0].userName : ((user?.firstName+" "+user?.lastName) || "Usuario");

  const handleAction = async (data: AddressCreate, id?: number) => {
    try {
      setBackendErrors({});
      if (id) {
        await updateAddressMutation.mutateAsync({ data, addressId: id });
        setEditingId(null);
      } else {
        await createAddressMutation.mutateAsync(data);
        setIsAdding(false);
      }
    } catch (err) {
      setBackendErrors(mapErrors(err));
    }
  };

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center p-20 space-y-4">
      <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-400 font-bold tracking-widest text-xs uppercase animate-pulse">Sincronizando...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10 animate-in fade-in duration-700">
      
      {/* Header Estilo Study */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-100 pb-8 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Direcciones</h1>
          <p className="text-slate-500 mt-1">Gestiona tus direcciones y ubicaciones</p>
        </div>
        
        <Button 
          variant={isAdding ? "ghost" : "primary"}
          onClick={() => { setIsAdding(!isAdding); setEditingId(null); }} 
          className="w-full md:w-auto shadow-xl shadow-indigo-100"
        >
          {isAdding ? <X size={20} /> : <Plus size={20} />}
          {isAdding ? "Cancelar" : "Nueva Dirección"}
        </Button>
      </header>

      {isAdding && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
          <AddressForm 
            onSubmit={(data) => handleAction(data)} 
            onCancel={() => setIsAdding(false)} 
            isPending={isPending} 
            externalErrors={backendErrors}
          />
        </div>
      )}

      {/* Grid de Direcciones con botones de icono */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {addresses.map((address: AddressResponse) => (
          <div 
            key={address.id} 
            className="group relative bg-white border border-slate-200 rounded-[2.5rem] p-8 hover:shadow-2xl transition-all duration-500"
          >
            {editingId === address.id ? (
              <AddressForm 
                initialData={address}
                onSubmit={(data) => handleAction(data, address.id)}
                onCancel={() => setEditingId(null)}
                isPending={isPending}
                externalErrors={backendErrors}
              />
            ) : (
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                   <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl">
                      <MapPin size={24} strokeWidth={2.5} />
                   </div>
                   
                   {/* BOTONES IGUALES A STUDY (Aparecen al hacer hover en desktop) */}
                   <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <button 
                       onClick={() => { setEditingId(address.id); setBackendErrors({}); }} 
                       className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                     >
                       <Edit3 size={20} />
                     </button>
                     <button 
                       onClick={() => { if(confirm("¿Eliminar?")) deleteAddressMutation.mutate(address.id); }} 
                       className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                     >
                       <Trash2 size={20} />
                     </button>
                   </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {address.street}
                  </h4>
                  <p className="text-slate-500 font-medium">{address.city}, {address.country}</p>
                  
                  <div className="pt-4">
                    <span className="px-3 py-1.5 bg-slate-50 text-slate-400 text-[13px] font-mono font-bold rounded-lg border border-slate-100">
                      CP: {address.postalCode || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {addresses.length === 0 && !isAdding && (
        <div className="py-24 text-center border-2 border-dashed border-slate-200 rounded-[3rem] bg-slate-50/50">
           <p className="text-slate-400 font-bold tracking-widest text-xs uppercase">No hay direcciones guardadas</p>
        </div>
      )}
    </div>
  );
};
