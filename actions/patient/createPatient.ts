'use server'

import { revalidatePath } from 'next/cache'
import { CreatePatientInput } from '../../validation/patient'
import { getToken } from '../auth/getToken'

export async function createPatientAction(data: CreatePatientInput, tenantSlug: string) {
  const token = await getToken()

  if (!token) {
    return { success: false, message: 'غير مصرح لك بإتمام العملية' }
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clinic/patients`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Tenant': tenantSlug,
      },
      body: JSON.stringify(data),
    })

    const result = await res.json()

    if (!res.ok) {
      const errorMessage = result.message || 'فشل في إضافة المريض'
      return { success: false, message: errorMessage }
    }

    revalidatePath(`/${tenantSlug}/dashboard/patients`)

    return { success: true, message: 'تم إضافة المريض بنجاح' }
  } catch (error) {
    console.error('Create Patient Error:', error)
    return { success: false, message: 'حدث خطأ في النظام' }
  }
}
