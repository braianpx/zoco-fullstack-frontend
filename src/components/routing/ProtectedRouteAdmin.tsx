import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth/useAuth";

interface Props {
  children: React.ReactNode;
}

export const ProtectedRouteAdmin = ({ children }: Props) => {
  const { token, isAdmin } = useAuth();
  if (token && isAdmin) {
      return <>{children}</>;
  }
  return <Navigate to="/" replace />;
};
