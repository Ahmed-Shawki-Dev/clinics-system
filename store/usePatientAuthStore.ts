import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ILogin } from '../types/auth' // التايب بتاعك

interface PatientAuthState {
  user: ILogin['user'] | null
  activeProfileId: string | null
  isAuthenticated: boolean
  setPatientAuth: (data: ILogin) => void
  setActiveProfile: (profileId: string) => void
  logout: () => void
}

export const usePatientAuthStore = create<PatientAuthState>()(
  persist(
    (set) => ({
      user: null,
      activeProfileId: null,
      isAuthenticated: false,

      setPatientAuth: (data) => {
        const defaultProfile = data.user.profiles?.find((p) => p.isDefault)
        set({
          user: data.user,
          activeProfileId: defaultProfile?.id || data.user.profiles?.[0]?.id || null,
          isAuthenticated: true,
        })
      },

      setActiveProfile: (profileId) => set({ activeProfileId: profileId }),

      logout: () =>
        set({
          user: null,
          activeProfileId: null,
          isAuthenticated: false,
        }),
    }),
    { name: 'patient-auth-storage' },
  ),
)
