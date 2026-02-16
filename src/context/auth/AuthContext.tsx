import { createContext } from "react";
import type { UserResponse } from "../../types/user.types";
import type { Role } from "../../types/auth.types";

export interface AuthContextType {
  user: UserResponse | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: UserResponse, role: Role) => void;
  logout: () => void;
  role: Role;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);
