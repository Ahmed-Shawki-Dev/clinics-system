'use server'

import { revalidatePath } from 'next/cache'
import { CreatePatientInput } from '../../validation/patient'
import { getToken } from '../auth/getToken'

export async function updatePatientAction(
  id: string,
  data: CreatePatientInput,
  tenantSlug: string,
) {
  const token = await getToken()
  if (!token) return { success: false, message: 'غير مصرح لك' }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clinic/patients/${id}`, {
      method: 'PUT', 
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Tenant': tenantSlug,
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) return { success: false, message: 'فشل تحديث البيانات' }

    revalidatePath(`/${tenantSlug}/dashboard/patients`)
    return { success: true, message: 'تم تحديث بيانات المريض بنجاح' }
  } catch (error) {
    return { success: false, message: 'حدث خطأ في السيرفر' }
  }
}
