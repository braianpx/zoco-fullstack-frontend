import type { UserResponse } from "./user.types";

export type Role = "Admin" | "User";

export interface AuthResponse {
  token: string
  user: UserResponse
  role: Role
  expiration: Date
}
