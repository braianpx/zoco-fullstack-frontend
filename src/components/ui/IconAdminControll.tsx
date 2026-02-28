import { ShieldAlert } from "lucide-react";

export const IconAdminControll = () => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-600 rounded-full mb-3 border border-amber-100">
      <ShieldAlert size={14} />
      <span className="text-xs font-bold uppercase tracking-widest">Admin Control</span>
    </div>
  ); 
};