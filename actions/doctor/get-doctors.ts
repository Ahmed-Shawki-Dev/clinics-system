'use server'

import { BaseApiResponse } from '@/types/api'
import { IDoctor } from '@/types/doctor'
import { getToken } from '../auth/getToken'

// التعديل هنا: الـ data نوعها أوبجيكت جواه items
export async function getDoctorsAction(
  tenantSlug: string,
): Promise<BaseApiResponse<{ items: IDoctor[]; totalCount: number }>> {
  const token = await getToken()

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clinic/doctors`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Tenant': tenantSlug,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })

    const result = await res.json()
    // السيرفر بيرجع { success, data: { items: [], totalCount: 0 }, ... }
    return result as BaseApiResponse<{ items: IDoctor[]; totalCount: number }>
  } catch (error) {
    return {
      success: false,
      message: 'فشل جلب قائمة الأطباء',
      data: { items: [], totalCount: 0 },
      errors: [],
      meta: { timestamp: new Date().toISOString(), requestId: '' },
    }
  }
}
