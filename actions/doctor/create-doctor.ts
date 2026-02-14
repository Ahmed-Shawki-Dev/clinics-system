'use server'

import { revalidatePath } from 'next/cache'
import { BaseApiResponse } from '@/types/api'
import { IDoctor } from '@/types/doctor'
import { CreateDoctorInput } from '../../validation/doctor'
import { getToken } from '../auth/getToken'

export async function createDoctorAction(
  data: CreateDoctorInput,
  tenantSlug: string,
): Promise<BaseApiResponse<IDoctor>> {
  const token = await getToken()

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clinic/doctors`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Tenant': tenantSlug,
      },
      body: JSON.stringify(data),
    })

    const result = await res.json()

    if (result.success) {
      revalidatePath(`/${tenantSlug}/dashboard/doctors`)
    }

    return result as BaseApiResponse<IDoctor>
  } catch (error) {
    return {
      success: false,
      message: 'خطأ في الاتصال بالسيرفر',
      data: {} as IDoctor,
      errors: [],
      meta: { timestamp: new Date().toISOString(), requestId: '' },
    }
  }
}
