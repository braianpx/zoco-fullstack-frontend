// src/pages/Dashboard.tsx
import { type FC, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { useAuth } from "../context/auth/useAuth";
import { Outlet } from "react-router-dom";

export const Dashboard: FC = () => {
  const { role } = useAuth();
  const [selectedSection, setSelectedSection] = useState<string>("Perfil");

  return (
    <div className="flex h-full bg-[#F9FAFB]">
      {/* Sidebar */}
      <Sidebar
        role={role}
        selectedSection={selectedSection}
        onSelectSection={setSelectedSection}
      />

      {/* Main Content */}
      <div className="flex-1 bg-white shadow-inner rounded-l-2xl">
        <Outlet />
      </div>
    </div>
  );
};
