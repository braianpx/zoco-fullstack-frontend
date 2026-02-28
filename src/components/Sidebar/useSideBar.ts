import { useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth/useAuth";
import { sectionsRole } from "./sidebar.types";
import { SECTION_ROUTES, type DashboardSection } from "../../utils/routes";

export const useSidebar = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const sections = useMemo(() => {
    return isAdmin ? sectionsRole.admin : sectionsRole.user;
  }, [isAdmin]);

  const selectedSection = useMemo<DashboardSection | undefined>(() => {
    const current = (
      Object.entries(SECTION_ROUTES) as [DashboardSection, string][]
    ).find(([, route]) => route === location.pathname);

    return current?.[0];
  }, [location.pathname]);

  const handleSelectSection = (section: DashboardSection) => {
    setIsOpen(false);
    navigate(SECTION_ROUTES[section]);
  };

  const hideSidebar = location.pathname === "/";

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    sections,
    selectedSection,
    handleSelectSection,
    hideSidebar,
  };
};