'use client'

import { useParams } from 'next/navigation'
import { usePatientAuthStore } from '@/store/usePatientAuthStore' // 👈 ستور المريض
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { LogOut } from 'lucide-react'
import { patientLogoutAction } from '../../actions/auth/patient-logout'

export function PatientLogoutButton() {
  const { tenantSlug } = useParams()
  const logoutFromStore = usePatientAuthStore((state) => state.logout)

  const handleLogout = async () => {
    logoutFromStore() // امسح من Zustand

    const slug = typeof tenantSlug === 'string' ? tenantSlug : ''
    await patientLogoutAction(slug) // امسح الكوكيز ووجه لصفحة دخول المرضى
  }

  return (
    <DropdownMenuItem
      className='text-destructive focus:text-destructive cursor-pointer'
      onClick={handleLogout}
    >
      <LogOut className='mr-2 h-4 w-4 ml-2' />
      <span>تسجيل الخروج</span>
    </DropdownMenuItem>
  )
}
