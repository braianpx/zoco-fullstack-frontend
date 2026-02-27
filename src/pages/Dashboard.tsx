// src/pages/Dashboard.tsx
import { type FC, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { SECTION_ROUTES, type DashboardSection } from "../utils/routes";
import { useEffect } from "react";

export const Dashboard: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentSection: DashboardSection = (Object.keys(SECTION_ROUTES).find(
  (key) => SECTION_ROUTES[key as DashboardSection] === location.pathname
) as DashboardSection) ?? "";

  const [selectedSection, setSelectedSection] = useState<DashboardSection>(currentSection);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSelectSection = (section: string) => {
    if (section in SECTION_ROUTES) {
      const sectionKey = section as DashboardSection;
      setSelectedSection(sectionKey);
      navigate(SECTION_ROUTES[sectionKey]);
      setIsSidebarOpen(false); 
    }
  };
  
    useEffect(() => {
      if (location.pathname == "/dashboard" || location.pathname == "/dashboard/") {
        navigate("/dashboard/profile", { replace: true });
      }
    }, [location.pathname, navigate]);

  return (
    <div className="flex h-[calc(100vh-10px)] w-full overflow-hidden bg-[#F9FAFB] relative">
      
      {/* Botón flotante para abrir el menú en Móvil */}
      <button 
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden fixed bottom-6 left-6 z-40 p-4 bg-[#6366F1] text-white rounded-full shadow-xl"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      <Sidebar
        selectedSection={selectedSection}
        onSelectSection={handleSelectSection}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
    <main className="flex-1 bg-white lg:shadow-inner lg:rounded-tl-[2.5rem] overflow-y-auto scroll-smooth p-4 mt-12 md:p-10 md:mt-6">
      <Outlet />
    </main>
    </div>
  );
};
