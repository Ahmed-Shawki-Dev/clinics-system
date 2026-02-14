'use server'

import { BaseApiResponse, IPaginatedData } from '@/types/api'
import { IPatient } from '@/types/patient'
import { getToken } from '../auth/getToken'

export async function getPatientsAction(
  tenantSlug: string,
  page: number = 1,
  limit: number = 999999,
  search: string = '',
): Promise<BaseApiResponse<IPaginatedData<IPatient>>> {
  // هنا الـ Magic
  const token = await getToken()

  const queryParams = new URLSearchParams({
    pageNumber: page.toString(),
    pageSize: limit.toString(),
  })
  if (search) queryParams.append('search', search)

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/clinic/patients?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Tenant': tenantSlug,
        },
        cache: 'no-store',
      },
    )

    const result = await res.json()
    // بنعمل كاست للداتا كـ PaginatedData شايلة IPatient
    return result as BaseApiResponse<IPaginatedData<IPatient>>
  } catch (error) {
    return {
      success: false,
      message: 'فشل جلب قائمة المرضى',
      data: {
        items: [],
        totalCount: 0,
        pageNumber: 0,
        pageSize: 0,
        totalPages: 0,
        hasPreviousPage: false,
        hasNextPage: false,
      },
      errors: [],
      meta: { timestamp: new Date().toISOString(), requestId: '' },
    }
  }
}
