'use server'

import { cookies } from 'next/headers'
import { PatientsListResponse } from '../../types/patient'

export async function getPatients(
  tenantSlug: string,
  page: number = 1,
  limit: number = 10,
  search: string = '',
) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) return { items: [], totalCount: 0 }

  const queryParams = new URLSearchParams({
    pageNumber: page.toString(),
    pageSize: limit.toString(),
  })

  if (search) {
    queryParams.append('search', search)
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/clinic/patients?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-Tenant': tenantSlug,
        },
        cache: 'no-store',
      },
    )

    if (!res.ok) {
      return { items: [], totalCount: 0 }
    }

    const json = await res.json()
    return (json.data || json) as PatientsListResponse
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching patients:', error.message)
    }
    return { items: [], totalCount: 0 }
  }
}
