'use server'

import { DoctorsResponse } from '../../types/doctor'
import { getToken } from '../auth/getToken'

export async function getDoctorsAction(tenantSlug: string) {
  const token = await getToken()

  if (!token) {
    return { success: false, data: { items: [] }, message: 'غير مصرح (No Token)' }
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL
    if (!baseUrl) console.error('❌ NEXT_PUBLIC_API_URL is missing!')

    const url = `${baseUrl}/api/clinic/doctors`

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Tenant': tenantSlug,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })

    const text = await res.text()

    if (!text) {
      console.error(`❌ [GetDoctors] Empty Response! Status: ${res.status}`)
      return { success: false, data: { items: [] }, message: 'لا توجد بيانات من السيرفر' }
    }

    if (!res.ok) {
      console.error(`❌ [GetDoctors] Server Error (${res.status}):`, text)
      return { success: false, data: { items: [] }, message: `خطأ ${res.status}: فشل الجلب` }
    }

    try {
      const result = JSON.parse(text)
      const doctorsData = result.data || { items: [] }

      return {
        success: true,
        data: doctorsData as DoctorsResponse,
        message: result.message,
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (jsonError) {
      console.error(`❌ [GetDoctors] Invalid JSON received:`, text)
      return { success: false, data: { items: [] }, message: 'بيانات غير صالحة من السيرفر' }
    }
  } catch (error) {
    console.error('[GetDoctors] Network Error:', error)
    return { success: false, data: { items: [] }, message: 'فشل الاتصال بالخادم' }
  }
}
