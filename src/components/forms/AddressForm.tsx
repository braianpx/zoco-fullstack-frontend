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
      // Agregamos w-full y max-w-2xl para que ocupe buen espacio pero no se deforme
      className="w-full max-w-2xl mx-auto p-2 sm:p-4 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 space-y-6 animate-in fade-in zoom-in-95 duration-500"
    >
      <div className="space-y-1 mb-4">
        <h3 className="text-xl font-bold text-slate-800">Detalles de la ubicación</h3>
        <p className="text-sm text-slate-500">Ingresa la dirección exacta para tus entregas.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="col-span-full">
          <Input 
            label="Calle y Número"
            placeholder="Ej: Av. Siempre Viva 742"
            value={form.street}
            error={allErrors.street}
            onChange={(e) => handleChange("street", e.target.value)}
          />
        </div>
        
        <Input 
          label="Ciudad"
          placeholder="Ej: Springfield"
          value={form.city}
          error={allErrors.city}
          onChange={(e) => handleChange("city", e.target.value)}
        />

        <Input 
          label="País"
          placeholder="Ej: Estados Unidos"
          value={form.country}
          error={allErrors.country}
          onChange={(e) => handleChange("country", e.target.value)}
        />

        <div className="col-span-full sm:col-span-1">
          <Input 
            label="Código Postal"
            placeholder="Ej: 10001"
            value={form.postalCode || ""}
            error={allErrors.postalCode}
            onChange={(e) => handleChange("postalCode", e.target.value)}
          />
        </div>
      </div>

      <FormErrorList errors={externalErrors || {}} />

      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t border-slate-50">
        <Button 
          type="button" 
          variant="secondary" 
          onClick={onCancel} 
          disabled={isPending}
          className="hover:bg-slate-100 transition-colors"
        >
          Cancelar
        </Button>
        <Button 
          type="submit" 
          variant="primary" 
          disabled={isPending}
          className="px-8 shadow-lg shadow-indigo-200 active:scale-95 transition-all"
        >
          {isPending ? "Guardando..." : "Confirmar Dirección"}
        </Button>
      </div>
    </form>
  );
};
