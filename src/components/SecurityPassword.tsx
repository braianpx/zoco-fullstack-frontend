// src/components/profile/sections/SecuritySection.tsx
import { Input } from "./ui/Input";

interface Props {
  form: any;
  errors: Record<string, string>;
  isPending: boolean;
  onChange: (key: string, value: string) => void;
}

export const SecurityPassword = ({ form, errors, isPending, onChange }: Props) => (
  <div className="pt-6 border-t border-slate-50 space-y-4">
    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Seguridad</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Input
        label="Nueva Contraseña"
        type="password"
        placeholder="Mínimo 6 caracteres"
        value={form.password || ""}
        error={errors.password}
        disabled={isPending}
        onChange={(e) => onChange("password", e.target.value)}
      />
      <Input
        label="Confirmar Contraseña"
        type="password"
        value={form.confirmPassword || ""}
        error={errors.confirmPassword}
        disabled={isPending}
        onChange={(e) => onChange("confirmPassword", e.target.value)}
      />
    </div>
  </div>
);
