'use server'

import { UpdateDoctorServicesPayload } from '@/types/services'
import { revalidatePath } from 'next/cache'
import { getToken } from '../auth/getToken'

export async function updateDoctorServicesAction({
  doctorId,
  tenantSlug,
  services,
}: UpdateDoctorServicesPayload) {
  const token = await getToken()

  if (!token) {
    return { success: false, message: 'Unauthorized' }
  }

  const payload = {
    Services: services.map((s) => ({
      ServiceName: s.serviceName,
      Price: s.price,
      DurationMinutes: s.durationMinutes || 15,
      IsActive: true,
    })),
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/clinic/doctors/${doctorId}/services`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'X-Tenant': tenantSlug,
        },
        body: JSON.stringify(payload),
      },
    )

    if (!res.ok) {
      const errorData = await res.json()
      return {
        success: false,
        message: errorData.message || 'Failed to update services',
      }
    }

    revalidatePath(`/${tenantSlug}/dashboard/services`)

    return { success: true, message: 'Services updated successfully' }
  } catch (error) {
    console.error('Update Services Error:', error)
    return { success: false, message: 'Internal Server Error' }
  }
}
