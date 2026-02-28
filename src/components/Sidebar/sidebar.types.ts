import type { DashboardSection } from "../../utils/routes";
export const sectionsRole = {
  user: ["Perfil", "Direcciones", "Estudios"] as DashboardSection[],
  admin: ["Perfil", "Direcciones", "Estudios", "SessionLogs", "Usuarios"] as DashboardSection[],
};
