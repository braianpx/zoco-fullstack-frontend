import { useState, useMemo } from "react";
import { AuthContext } from "./AuthContext";
import type { UserResponse } from "../../types/user.types";
import type { Role } from "../../types/auth.types";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // 1. Centralizamos el usuario (el role ya debería venir dentro o guardarse junto)
  const [user, setUser] = useState<UserResponse | null>(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // 2. El token lo manejamos en estado para que el useMemo reaccione al cambio
  const [token, setToken] = useState<string | null>(() => {
    return sessionStorage.getItem("token");
  });

  const login = (newToken: string, userData: UserResponse, role: Role) => {
    // Sincronizamos el rol dentro del objeto usuario para tener una sola fuente de verdad
    const userWithRole = { ...userData, roleName: role };

    sessionStorage.setItem("token", newToken);
    sessionStorage.setItem("user", JSON.stringify(userWithRole));
    
    setToken(newToken);
    setUser(userWithRole);
  };

  const logout = () => {
    sessionStorage.clear(); // Más limpio que remover uno por uno
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!token,
      login,
      logout,
      // Forzamos el tipo Role para que coincida con AuthContextType
      role: (user?.roleName || "User") as Role, 
    }),
    [user, token]
  );


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
