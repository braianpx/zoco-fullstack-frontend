import { useState, useMemo, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import type { UserResponse } from "../../types/user.types";
import type { Role } from "../../types/auth.types";
import { AUTH_TOKEN_EXPIRED_EVENT } from "../../utils/configConst";
import { getTokenExpirationMs } from "../../utils/authelpers";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserResponse | null>(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return sessionStorage.getItem("token");
  });

  const login = useCallback((newToken: string, userData: UserResponse, role: Role) => {
    const userWithRole = { ...userData, roleName: role };

    sessionStorage.setItem("token", newToken);
    sessionStorage.setItem("user", JSON.stringify(userWithRole));

    setToken(newToken);
    setUser(userWithRole);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.clear();
    setToken(null);
    setUser(null);
  }, []);

  // USE EFFECT PARA CONTROLAR LA EXPIRACIÓN DEL TOKEN
  useEffect(() => {
    if (!token) return;

    const expirationMs = getTokenExpirationMs(token);
    if (!expirationMs) return;

    const msUntilExpiration = expirationMs - Date.now();
    if (msUntilExpiration <= 0) {
      const immediateTimerId = window.setTimeout(() => {
        logout();
      }, 0);

      return () => {
        window.clearTimeout(immediateTimerId);
      };
    }

    const timerId = window.setTimeout(() => {
      logout();
    }, msUntilExpiration);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [token, logout]);

  useEffect(() => {
    const handleTokenExpired = () => {
      logout();
    };

    window.addEventListener(AUTH_TOKEN_EXPIRED_EVENT, handleTokenExpired);
    return () => {
      window.removeEventListener(AUTH_TOKEN_EXPIRED_EVENT, handleTokenExpired);
    };
  }, [logout]);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!token,
      login,
      logout,
      isAdmin: user?.roleName === "Admin",
    }),
    [user, token, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
