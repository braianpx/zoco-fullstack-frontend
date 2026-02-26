// src/pages/AddressesPage.tsx
import { useState } from "react";
import { useAuth } from "../context/auth/useAuth";
import { useAddressGetters } from "../hooks/useAddressGetters";
import { useAddressMutations } from "../hooks/useAddressMutations";
import { AddressForm } from "../components/forms/AddressForm";
import { Button } from "../components/ui/Button";
// Usamos los mismos iconos que en Study
import { Trash2, Edit3, MapPin, Plus, X } from "lucide-react"; 
import type { AddressResponse, AddressCreate } from "../types/address.types";
import { Card } from "../components/ui/Card";

export const Address = () => {
  const { user, role } = useAuth();
  const isAdmin = role === "Admin";

  const { addresses, isLoading } = useAddressGetters(user?.id || null, isAdmin);
  const { createAddressMutation, updateAddressMutation, deleteAddressMutation, isPending } = useAddressMutations();

  const [isAdding, setIsAdding] = useState(false);
  const [editing, setEditing] = useState<AddressResponse | null>(null);

  const handleAction = async (data: AddressCreate, id?: number) => {
      if (id) {
        await updateAddressMutation.mutateAsync({ data, addressId: id });
        setEditing(null);
      } else {
        await createAddressMutation.mutateAsync(data);
        setIsAdding(false);
      }
      closeForm();
  };

  const closeForm = () => {
    setIsAdding(false)
    setEditing(null)
  };

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center p-20 space-y-4">
      <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-400 font-bold tracking-widest text-xs uppercase animate-pulse">Sincronizando...</p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10 animate-in fade-in duration-700">
      
      {/* Header Estilo Study */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-100 pb-8 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Direcciones</h1>
          <p className="text-slate-500 mt-1">Gestiona tus direcciones y ubicaciones</p>
        </div>
        
        <Button 
          variant={isAdding ? "ghost" : "primary"}
          onClick={() => { setIsAdding(!isAdding); setEditing(null); }} 
          className="w-full md:w-auto shadow-xl shadow-indigo-100"
        >
          <Plus size={20} />
          Nueva Dirección
        </Button>
      </header>

      {/* Form Section - Direcciones */}
      {(isAdding || editing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 h-full">
          {/* Backdrop - Cierra al hacer click fuera */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" 
            onClick={closeForm} 
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl z-50 overflow-hidden animate-in zoom-in-95 duration-300">
            
            {/* Botón Cerrar (X) - Estilo idéntico a Estudios */}
            <button 
              onClick={closeForm}
              className="absolute top-4 right-4 z-50 p-2 rounded-full transition-colors hover:bg-red-100 text-slate-300 hover:text-red-500"
            >
              <X size={20} />
            </button>

            <div className="animate-in fade-in slide-in-from-top-4 duration-500">
              <Card title={editing ? "Editar Dirección" : "Registrar Nueva Dirección"}>
                <AddressForm 
                  onSubmit={handleAction} // Simplificado: ya recibe los datos del form
                  isLoading={isPending}   // Cambiado de isPending a isLoading (nombre en Estudios)
                  isEditing={!!editing} // Pasamos el booleano si existe ID
                  isAdmin={user?.roleName === "Admin"} // Para activar el banner de Admin
                  defaultValues={editing?? undefined}
                />
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Grid de Direcciones con botones de icono */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {addresses.map((address: AddressResponse) => (
          <div 
            key={address.id} 
            className="group relative bg-white border border-slate-200 rounded-[2.5rem] p-8 hover:shadow-2xl transition-all duration-500"
          >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                   <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl">
                      <MapPin size={24} strokeWidth={2.5} />
                   </div>
                   
                   {/* BOTONES IGUALES A STUDY (Aparecen al hacer hover en desktop) */}
                   <div className="flex gap-2 transition-opacity duration-300">
                     <button 
                       onClick={() =>  setEditing(address) } 
                       className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                     >
                       <Edit3 size={20} />
                     </button>
                     <button 
                       onClick={() => { if(confirm("¿Eliminar?")) deleteAddressMutation.mutate(address.id); }} 
                       className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
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
                  { isAdmin &&
                      <div className="flex items-center justify-between mt-3 border-t border-slate-50">
                        <span className="max-w-[85%] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500">
                          Propiedad de: {address?.userName || 'indefinido'}
                        </span>
                        <span className="text-[10px] text-slate-300 font-bold">UID: {address?.id}</span>
                      </div>
                  }
                </div>
              </div>
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
