'use server'

import { revalidatePath } from 'next/cache'
import { CreateDoctorInput } from '../../validation/doctor'
import { getToken } from '../auth/getToken' // هات التوكين بتاعك

export async function createDoctorAction(data: CreateDoctorInput, tenantSlug: string) {
  const token = await getToken()
  if (!token) return { success: false, message: 'غير مصرح لك' }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clinic/doctors`, {
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
      return { success: false, message: result.message || 'فشل إنشاء الطبيب' }
    }

    revalidatePath(`/${tenantSlug}/dashboard/doctors`)
    return { success: true, message: 'تم إضافة الطبيب بنجاح' }
  } catch (error) {
    return { success: false, message: 'خطأ في الاتصال بالسيرفر' }
  }
}
