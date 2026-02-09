export type UserRole =
  | 'SuperAdmin'
  | 'ClinicOwner'
  | 'ClinicManager'
  | 'Receptionist'
  | 'Doctor'
  | 'Patient'

export interface UserProfile {
  id: string
  username: string
  displayName: string
  role: UserRole
  tenantId: string | null
  tenantSlug: string | null
  permissions: string[]
  profiles?: Array<{ id: string; name: string; isDefault: boolean }> // للمرضى فقط
}

export interface AuthResponseData {
  token: string
  refreshToken: string
  expiresAt: string
  user: UserProfile
}

export interface BaseApiResponse<T> {
  success: boolean
  message: string
  data: T
  errors: Array<{ field: string; message: string }>
  meta: {
    timestamp: string
    requestId: string
  }
}
