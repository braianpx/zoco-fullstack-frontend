import type { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth/useAuth";

interface PublicRouteProps {
  children: ReactNode;
}

export const PublicRoute: FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // Si ya está logeado, redirige al dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // Si no está logeado, puede ver la ruta
  return <>{children}</>;
};
