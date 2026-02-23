'use server'

import { fetchApi } from '@/lib/fetchApi'
import { BaseApiResponse, IPaginatedData } from '@/types/api'
import { IDoctor } from '@/types/doctor'

export async function getDoctorsAction(
  tenantSlug: string,
): Promise<BaseApiResponse<IPaginatedData<IDoctor>>> {
  return await fetchApi<IPaginatedData<IDoctor>>(`/api/clinic/doctors?pageNumber=1&pageSize=1000`, {
    method: 'GET',
    tenantSlug,
    cache: 'no-store',
  })
}
