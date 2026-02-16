// src/components/dashboard/Sidebar.tsx
import type { FC } from "react";

interface SidebarProps {
  role: string | null;
  selectedSection: string;
  onSelectSection: (section: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: FC<SidebarProps> = ({
  role,
  selectedSection,
  onSelectSection,
  isOpen,
  onClose,
}) => {
  const sections = ["Perfil", "Direcciones", "Estudios"];
  if (role === "Admin") sections.push("SessionLogs", "Usuarios");

  return (
    <>
      {/* Overlay: Solo oscurece el fondo en móvil cuando se abre */}
      <div 
        className={`fixed inset-0 bg-black/10 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar: Estático en LG, Flotante en Móvil */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#E5E7EB] flex flex-col transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:z-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Espacio superior limpio */}
        <div className="py-6" />

        <nav className="flex-1 px-4 pt-12 space-y-1">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => onSelectSection(section)}
              className={`w-full text-left px-5 py-3 rounded-xl transition-all duration-200
                ${selectedSection === section
                  ? "bg-[#6366F1] text-white font-semibold shadow-md shadow-indigo-100"
                  : "text-[#111827] hover:bg-[#EEF2FF] hover:text-[#6366F1]"
                }`}
            >
              {section}
            </button>
          ))}
        </nav>

        {/* Footer del Sidebar Personalizado */}
        <div className="p-6 border-t border-slate-50 mt-auto">
          <div className="flex items-center gap-3 px-1">
            <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs border border-indigo-100">
              B
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Creador</span>
              <span className="text-sm font-semibold text-slate-700 tracking-tight leading-none">
                braianpx
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
