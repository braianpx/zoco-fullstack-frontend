// src/components/addresses/AddressForm.tsx
import { useState, useMemo } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { FormErrorList } from "../ui/FormErrorList";
import { validateAddressField, validateAddressForm, type AddressFormType } from "./validators/address.validator";
import type { AddressCreate } from "../../types/address.types";

interface Props {
  initialData?: AddressCreate;
  onSubmit: (data: AddressCreate) => Promise<void>;
  onCancel: () => void;
  isPending: boolean;
  externalErrors?: Record<string, string>;
}

export const AddressForm = ({ initialData, onSubmit, onCancel, isPending, externalErrors }: Props) => {
  const [form, setForm] = useState<AddressCreate>({
    street: initialData?.street || "",
    city: initialData?.city || "",
    country: initialData?.country || "",
    postalCode: initialData?.postalCode || null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const allErrors = useMemo(() => ({ ...errors, ...externalErrors }), [errors, externalErrors]);

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: validateAddressField(key, value) }));
  };

  const handleLocalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const localErrors = validateAddressForm(form as unknown as AddressFormType);
    if (Object.keys(localErrors).length > 0) return setErrors(localErrors);
    onSubmit(form);
  };

  return (
    <form 
      onSubmit={handleLocalSubmit} 
      className="w-full max-w-2xl mx-auto p-6 sm:p-8 bg-white rounded-[2rem] border border-slate-200 shadow-2xl shadow-slate-200/50 space-y-8 animate-in fade-in zoom-in-95 duration-500"
    >
      {/* Header simplificado sin paquetes externos */}
      <div className="border-b border-slate-50 pb-6">
        <div className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full mb-3">
          <span className="text-[10px] font-bold uppercase tracking-widest">Direccion</span>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Detalles de la ubicación</h3>
        <p className="text-sm text-slate-500 mt-1">Ingresa la dirección exacta.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
        <div className="col-span-full">
          <Input 
            label="Calle y Número"
            placeholder="Ej: Av. Siempre Viva 742"
            value={form.street}
            error={allErrors.street}
            onChange={(e) => handleChange("street", e.target.value)}
            className="bg-slate-50/30 focus:bg-white"
          />
        </div>
        
        <Input 
          label="Ciudad"
          placeholder="Ej: Springfield"
          value={form.city}
          error={allErrors.city}
          onChange={(e) => handleChange("city", e.target.value)}
          className="bg-slate-50/30 focus:bg-white"
        />

        <Input 
          label="País"
          placeholder="Ej: Estados Unidos"
          value={form.country}
          error={allErrors.country}
          onChange={(e) => handleChange("country", e.target.value)}
          className="bg-slate-50/30 focus:bg-white"
        />

        <div className="col-span-full sm:col-span-1">
          <Input 
            label="Código Postal"
            placeholder="Ej: 10001"
            value={form.postalCode || ""}
            error={allErrors.postalCode}
            onChange={(e) => handleChange("postalCode", e.target.value)}
            className="bg-slate-50/30 focus:bg-white"
          />
        </div>
      </div>

      {Object.keys(externalErrors || {}).length > 0 && (
        <div className="p-4 bg-red-50 rounded-2xl">
          <FormErrorList errors={externalErrors || {}} />
        </div>
      )}

      {/* Footer con botones alineados al estilo de Estudios */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
        <Button 
          type="button" 
          variant="ghost" 
          onClick={onCancel} 
          disabled={isPending}
          className="w-full sm:w-auto"
        >
          Cancelar
        </Button>
        <Button 
          type="submit" 
          variant="primary" 
          disabled={isPending}
          className="w-full sm:w-auto min-w-[160px] py-4 shadow-lg shadow-indigo-100"
        >
          {isPending ? "Guardando..." : "Guardar Dirección"}
        </Button>
      </div>
    </form>
  );
};
