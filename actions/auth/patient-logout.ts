'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// أكشن خروج المريض
export async function patientLogoutAction(tenantSlug: string) {
  const cookieStore = await cookies()

  cookieStore.delete('patient_token')

  redirect(`/${tenantSlug}/patient/login`)
}
