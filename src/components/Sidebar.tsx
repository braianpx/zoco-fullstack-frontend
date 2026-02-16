// src/components/dashboard/Sidebar.tsx
import type { FC } from "react";

interface SidebarProps {
  role: "Admin" | "User" | null;
  selectedSection: string;
  onSelectSection: (section: string) => void;
}

export const Sidebar: FC<SidebarProps> = ({
  role,
  selectedSection,
  onSelectSection,
}) => {
  // Secciones visibles según rol
  const sections = ["Perfil", "Direcciones", "Estudios"];
  if (role === "Admin") {
    sections.push("SessionLogs", "Usuarios");
  }

  return (
    <div className="w-64 min-h-full bg-white border-r border-[#E5E7EB] flex flex-col py-6 px-4 shadow-sm">
      <nav className="flex-1">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => onSelectSection(section)}
            className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors duration-200
              ${
                selectedSection === section
                  ? "bg-[#6366F1] text-white font-semibold"
                  : "text-[#111827] hover:bg-[#EEF2FF]"
              }`}
          >
            {section}
          </button>
        ))}
      </nav>
    </div>
  );
};
