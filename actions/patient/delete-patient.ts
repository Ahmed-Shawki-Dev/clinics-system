'use server'

import { revalidatePath } from 'next/cache'
import { getToken } from '../auth/getToken'

export async function deletePatientAction(id: string, tenantSlug: string) {
  const token = await getToken()

  if (!token) {
    return { success: false, message: 'غير مصرح لك بإتمام العملية' }
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clinic/patients/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Tenant': tenantSlug,
      },
    })

    let result
    try {
      result = await res.json()
    } catch {
      result = { message: 'تمت العملية' }
    }

    if (!res.ok) {
      return { success: false, message: result.message || 'فشل حذف المريض' }
    }

    revalidatePath(`/${tenantSlug}/dashboard/patients`)
    return { success: true, message: 'تم حذف المريض بنجاح' }
  } catch (error) {
    console.error('Delete Error:', error)
    return { success: false, message: 'حدث خطأ في الاتصال بالسيرفر' }
  }
}
