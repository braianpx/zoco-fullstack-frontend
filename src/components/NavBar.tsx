import type { FC } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";
import { UserMenu } from "./UserMenu";

export const Navbar: FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo / Nombre App */}
      <Link to="/" >
        <span className="text-2xl font-bold text-indigo-600 hover:text-indigo-500">
          ZocoApp
        </span>
      </Link>

      {isAuthenticated ? (
        <div className="flex items-center gap-6">
          {/* Menú de usuario */}
          <UserMenu username={(user?.firstName + " " +  user?.lastName) || "undefined"} onLogout={logout} />
        </div>
      ) : (
        // Si no hay sesión, navbar vacío o minimalista
        <div />
      )}
    </nav>
  );
};
