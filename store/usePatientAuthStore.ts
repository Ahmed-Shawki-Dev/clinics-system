import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ILogin } from '../types/auth'

// فصلنا الداتا بتاعة المريض لوحدها
interface TenantAuthData {
  user: ILogin['user'] | null
  token: string | null
  activeProfileId: string | null
  isAuthenticated: boolean
}

interface PatientAuthState {
  // 🔴 الستيت بقت عبارة عن سجل (Record) مفتاحه هو الـ tenantSlug
  tenants: Record<string, TenantAuthData>
  setPatientAuth: (tenantSlug: string, data: ILogin) => void
  setActiveProfile: (tenantSlug: string, profileId: string) => void
  logout: (tenantSlug: string) => void
}

export const usePatientAuthStore = create<PatientAuthState>()(
  persist(
    (set) => ({
      tenants: {}, // الستيت الابتدائية فاضية

      setPatientAuth: (tenantSlug, data) => {
        const defaultProfile = data.user.profiles?.find((p) => p.isDefault)
        set((state) => ({
          tenants: {
            ...state.tenants,
            [tenantSlug]: {
              // بنحفظ الداتا جوه مفتاح العيادة
              user: data.user,
              token: data.token,
              activeProfileId: defaultProfile?.id || data.user.profiles?.[0]?.id || null,
              isAuthenticated: true,
            },
          },
        }))
      },

      setActiveProfile: (tenantSlug, profileId) =>
        set((state) => ({
          tenants: {
            ...state.tenants,
            [tenantSlug]: {
              ...state.tenants[tenantSlug],
              activeProfileId: profileId,
            },
          },
        })),

      logout: (tenantSlug) =>
        set((state) => {
          const newTenants = { ...state.tenants }
          delete newTenants[tenantSlug] // بنمسح داتا العيادة دي بس من اللوكال ستوريدج
          return { tenants: newTenants }
        }),
    }),
    { name: 'patient-auth-storage' },
  ),
)
