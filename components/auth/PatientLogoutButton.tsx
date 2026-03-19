'use client'

import { useParams } from 'next/navigation'
import { usePatientAuthStore } from '@/store/usePatientAuthStore'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { LogOut } from 'lucide-react'
import { patientLogoutAction } from '../../actions/auth/patient-logout'

export function PatientLogoutButton() {
  const { tenantSlug } = useParams()
  const logoutFromStore = usePatientAuthStore((state) => state.logout)

  const handleLogout = async () => {
    const slug = typeof tenantSlug === 'string' ? tenantSlug : ''

    // 🔴 التعديل هنا: بنحددله يمسح داتا العيادة دي بس
    logoutFromStore(slug)

    await patientLogoutAction(slug)
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
