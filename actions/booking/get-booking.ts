'use server'

import { getToken } from '../auth/getToken'

export async function getBookingsAction(tenantSlug: string) {
  const token = await getToken()
  if (!token) return { items: [], totalCount: 0 }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clinic/bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Tenant': tenantSlug,
      },
      cache: 'no-store',
    })

    if (!res.ok) return { items: [], totalCount: 0 }

    const data = await res.json()
    return data.data || { items: [], totalCount: 0 }
  } catch (error) {
    console.error(error)
    return { items: [], totalCount: 0 }
  }
}
