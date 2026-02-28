export const DASHBOARD_SECTIONS = [
  "Perfil",
  "Direcciones",
  "Estudios",
  "Usuarios",
  "SessionLogs",
] as const;

export type DashboardSection = (typeof DASHBOARD_SECTIONS)[number];

export const SECTION_ROUTES: Record<DashboardSection, string> = {
  Perfil: "/dashboard/profile",
  Direcciones: "/dashboard/addresses",
  Estudios: "/dashboard/studies",
  Usuarios: "/dashboard/users",
  SessionLogs: "/dashboard/logs",
};