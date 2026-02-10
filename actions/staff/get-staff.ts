'use server'

import { IStaffResponse } from '../../types/staff'
import { getToken } from '../auth/getToken'

export async function getStaffAction(tenantSlug: string, page = 1, limit = 10, search = '') {
  const token = await getToken()

  if (!token) return { items: [], totalCount: 0 }

  try {
    const query = new URLSearchParams({
      pageNumber: page.toString(),
      pageSize: limit.toString(),
      searchTerm: search,
    })

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clinic/staff?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Tenant': tenantSlug,
      },
      next: { tags: ['staff'] },
    })

    const data = await res.json()
    return (data.data as IStaffResponse) || { items: [], totalCount: 0 }
  } catch (error) {
    console.error('Fetch Staff Error:', error)
    return { items: [], totalCount: 0 }
  }
}
