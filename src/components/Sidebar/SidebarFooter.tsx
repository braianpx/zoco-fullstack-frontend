import type { FC } from "react";

interface SidebarFooterProps {
  creatorName?: string;
}

export const SidebarFooter: FC<SidebarFooterProps> = ({
  creatorName = "braianpx",
}) => (
  <div className="p-6 border-t border-slate-50 mt-auto">
    <div className="flex items-center gap-3 px-1">
      <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs border border-indigo-100">
        B
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
          Creador
        </span>
        <span className="text-sm font-semibold text-slate-700 tracking-tight leading-none">
          {creatorName}
        </span>
      </div>
    </div>
  </div>
);
