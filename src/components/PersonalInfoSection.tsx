// src/components/profile/sections/PersonalInfoSection.tsx
import { Input } from "./ui/Input";
import type { UserUpdate } from "../types/user.types";

interface Props {
  fields: Array<{name: string, label:string, type:string, disabled?: boolean}>;
  form: UserUpdate;
  errors: Record<string, string>;
  isPending: boolean;
  onChange: (key: string, value: string) => void;
}

export const PersonalInfoSection = ({ fields, form, errors, isPending, onChange }: Props) => (
  <div className="space-y-4">
    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Información de Perfil</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      {fields.map((f) => (
        <div key={f.name} className={f.name === "email" || f.name === "roleName" ? "md:col-span-2" : ""}>
          <Input
            label={f.label}
            type={f.type}
            value={(form[f.name as keyof UserUpdate] as string) || ""}
            error={errors[f.name]}
            disabled={f.disabled || isPending}
            onChange={(e) => onChange(f.name, e.target.value)}
          />
        </div>
      ))}
    </div>
  </div>
);
