// 1. Define las secciones válidas
export type DashboardSection = "Perfil" | "Direcciones" | "Estudios" | "Usuarios" | "SessionLogs";

// 2. Tipa el objeto explícitamente
export const SECTION_ROUTES: Record<DashboardSection, string> = {
  Perfil: "/dashboard/profile",
  Direcciones: "/dashboard/addresses",
  Estudios: "/dashboard/studies",
  Usuarios: "/dashboard/users",
  SessionLogs: "/dashboard/logs",
};