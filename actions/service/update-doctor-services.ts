'use server'

import { BaseApiResponse } from '@/types/api'
import { IDoctorService } from '@/types/doctor'
import { revalidatePath } from 'next/cache'
import { getToken } from '../auth/getToken'

interface UpdateServicesParams {
  doctorId: string
  tenantSlug: string
  services: IDoctorService[]
}

// actions/service/update-doctor-services.ts

export async function updateDoctorServicesAction({
  doctorId,
  tenantSlug,
  services,
}: UpdateServicesParams): Promise<BaseApiResponse<IDoctorService[]>> {
  const token = await getToken()

  // السيرفر عايز أوبجيكت جواه مصفوفة اسمها services
  const payload = {
    services: services.map((s) => ({
      serviceName: s.serviceName,
      price: s.price,
      durationMinutes: s.durationMinutes || 15,
      isActive: s.isActive ?? true,
    })),
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/clinic/doctors/${doctorId}/services`,
      {
        method: 'PUT', // تأكيد الـ PUT
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'X-Tenant': tenantSlug,
        },
        body: JSON.stringify(payload), // بعت الـ Payload بالشكل اللي السيرفر طالبه
      },
    )

    const result = await res.json()

    if (result.success) {
      revalidatePath(`/${tenantSlug}/dashboard/services`)
    }

    return result as BaseApiResponse<IDoctorService[]>
  } catch (error) {
    return {
      success: false,
      data: [],
      message: 'Network Error',
      errors: [],
      meta: { timestamp: '', requestId: '' },
    }
  }
}
