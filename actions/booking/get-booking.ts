'use server'

import { fetchApi } from '../../lib/fetchApi'
import { BaseApiResponse } from '../../types/api'
import { IBooking } from '../../types/booking'

export async function getBookingsAction(
  tenantSlug: string,
): Promise<BaseApiResponse<{ items: IBooking[]; totalCount: number }>> {
  return await fetchApi<{ items: IBooking[]; totalCount: number }>('/api/clinic/bookings', {
    tenantSlug,
    cache: 'no-store',
  })
}
