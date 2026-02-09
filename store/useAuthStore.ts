import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthResponseData, UserProfile } from '../types/auth'

interface AuthState {
  token: string | null
  user: UserProfile | null
  isAuthenticated: boolean
  setAuth: (data: AuthResponseData) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      setAuth: (data) =>
        set({
          token: data.token,
          user: data.user,
          isAuthenticated: true,
        }),
      logout: () =>
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        }),
    }),
    { name: 'auth-storage' },
  ),
)
