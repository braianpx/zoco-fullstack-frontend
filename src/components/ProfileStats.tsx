interface ProfileStatsProps {
  roleName?: string;
  createdAt?: Date;
}

export const ProfileStats = ({ roleName, createdAt }: ProfileStatsProps) => (
  <aside className="space-y-6">
    <div className="bg-indigo-600 p-6 rounded-3xl text-white shadow-xl shadow-indigo-200">
      <h3 className="text-lg font-bold mb-2">Estado de la cuenta</h3>
      <p className="text-indigo-100 text-sm mb-6">
        Tu cuenta está activa y bajo el rol de <span className="font-bold underline">{roleName || 'Usuario'}</span>.
      </p>
      <div className="bg-white/10 border border-white/20 p-4 rounded-xl">
        <p className="text-xs text-indigo-200 uppercase tracking-widest font-bold">Miembro desde</p>
        <p className="text-white font-medium">
          {createdAt ? new Date(createdAt).toLocaleDateString() : 'Enero 2024'}
        </p>
      </div>
    </div>

    <div className="p-6 rounded-3xl border border-slate-200 bg-slate-50/50">
      <h4 className="font-bold text-slate-900 mb-2 italic text-sm">¿Necesitas ayuda?</h4>
      <p className="text-xs text-slate-500 leading-relaxed">
        Si tienes problemas para cambiar tu email, por favor contacta al equipo de soporte técnico.
      </p>
    </div>
  </aside>
);
