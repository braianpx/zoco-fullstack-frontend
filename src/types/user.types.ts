import type { AddressResponse } from "./address.types"
import type { SessionLogResponse } from "./sessionLogs.types"
import type { StudyResponse } from "./study.types"

export interface UserResponse {
  id: number
  email: string
  firstName: string
  lastName: string
  roleId?: number
  roleName?: string
  studies?: Array<StudyResponse>
  addresses?: Array<AddressResponse>
  sessionLogs?: Array<SessionLogResponse>
  createdAt?: Date
}

export interface UserCreate {
  email: string
  firstName: string
  lastName: string
  password: string
}