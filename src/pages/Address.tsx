// src/pages/AddressesPage.tsx
import { useState } from "react";
import { useAuth } from "../context/auth/useAuth";
import { useAddressGetters } from "../hooks/useAddressGetters";
import { useAddressMutations } from "../hooks/useAddressMutations";
import { AddressForm } from "../components/forms/AddressForm";
import { Button } from "../components/ui/Button";
import { mapErrors } from "../components/forms/mapErrors";
import type { AddressResponse, AddressCreate } from "../types/address.types";

export const Address = () => {
  const { user, role } = useAuth();
  const isAdmin = role === "Admin";

  const { addresses, isLoading } = useAddressGetters(user?.id || null, isAdmin);
  const { createAddressMutation, updateAddressMutation, deleteAddressMutation, isPending } = useAddressMutations();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [backendErrors, setBackendErrors] = useState<Record<string, string>>({});

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
      <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-400 font-medium animate-pulse">Cargando direcciones...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Direcciones</h1>
          <p className="text-slate-500 text-sm italic">Tus puntos de entrega seguros</p>
        </div>
        {!isAdding && (
          <Button variant="primary" onClick={() => setIsAdding(true)} className="w-full sm:w-auto active:scale-95 transition-transform">
            + Nueva Dirección
          </Button>
        )}
      </header>

      {isAdding && (
        <div className="max-w-2xl mx-auto w-full ">
          <AddressForm 
            onSubmit={(data) => handleAction(data)} 
            onCancel={() => setIsAdding(false)} 
            isPending={isPending} 
            externalErrors={backendErrors}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {addresses.map((address: AddressResponse) => (
          <div 
            key={address.id} 
            className="group bg-white p-2 sm:p-2 rounded-[2rem] border border-slate-100 shadow-sm 
                       hover:shadow-xl hover:border-indigo-100 transition-all duration-300 
                       animate-in fade-in slide-in-from-bottom-2"
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
                <div className="flex justify-between items-start mb-4">
                   <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:text-indigo-500 group-hover:bg-indigo-50 transition-colors duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                   </div>
                   {isAdmin && (
                    <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full uppercase tracking-tighter">
                      Admin: {address.userName}
                    </span>
                   )}
                </div>

                <div className="flex-1">
                  <h4 className="text-lg sm:text-xl font-bold text-slate-800 line-clamp-1">{address.street}</h4>
                  <p className="text-slate-500 font-medium text-sm sm:text-base">{address.city}, {address.country}</p>
                  <p className="text-xs text-slate-300 mt-1 font-mono tracking-widest uppercase">CP {address.postalCode || 'S/N'}</p>
                </div>

                {/* Acciones: Siempre visibles en Mobile, Hover en Desktop */}
                <div className="flex justify-end gap-6 mt-6 pt-4 border-t border-slate-50 
                                opacity-100 lg:opacity-0 lg:group-hover:opacity-100 
                                transition-all duration-300 transform lg:translate-y-2 lg:group-hover:translate-y-0">
                  <button 
                    onClick={() => { setEditingId(address.id); setBackendErrors({}); }} 
                    className="text-xs font-black text-slate-400 hover:text-indigo-600 active:text-indigo-700"
                  >
                    EDITAR
                  </button>
                  <button 
                    onClick={() => { if(confirm("¿Eliminar dirección?")) deleteAddressMutation.mutate(address.id); }} 
                    className="text-xs font-black text-slate-400 hover:text-red-500 active:text-red-600"
                  >
                    ELIMINAR
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {addresses.length === 0 && !isAdding && (
        <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-[3rem] bg-slate-50/50">
           <p className="text-slate-300 font-bold tracking-widest text-sm uppercase">Sin direcciones registradas</p>
        </div>
      )}
    </div>
  );
};
