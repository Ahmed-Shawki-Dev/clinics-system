'use server'

import { DoctorsResponse } from '../../types/doctor'
import { getToken } from '../auth/getToken'

export async function getDoctorsAction(tenantSlug: string) {
  const token = await getToken()

  if (!token) {
    return { success: false, data: { items: [] }, message: 'غير مصرح (No Token)' }
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/clinic/doctors?pageNumber=1&pageSize=50`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Tenant': tenantSlug,
          'Content-Type': 'application/json',
        },
      },
    )

    const result = await res.json()

    if (!res.ok) {
      console.error('[GetDoctors] API Error:', result)
      return { success: false, data: { items: [] }, message: result.message || 'خطأ من السيرفر' }
    }

    const doctorsData = result.data || { items: [] }

    return {
      success: true,
      data: doctorsData as DoctorsResponse,
      message: result.message,
    }
  } catch (error) {
    console.error('[GetDoctors] Network Error:', error)
    return { success: false, data: { items: [] }, message: 'فشل الاتصال بالخادم' }
  }
}
