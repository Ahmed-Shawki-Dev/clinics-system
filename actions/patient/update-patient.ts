'use server'

import { revalidatePath } from 'next/cache'
import { BaseApiResponse } from '@/types/api'
import { IPatient } from '@/types/patient'
import { CreatePatientInput } from '../../validation/patient'
import { getToken } from '../auth/getToken'

export async function updatePatientAction(
  id: string,
  data: CreatePatientInput,
  tenantSlug: string,
): Promise<BaseApiResponse<IPatient>> {
  const token = await getToken()

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clinic/patients/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Tenant': tenantSlug,
      },
      body: JSON.stringify(data),
    })

    const result = await res.json()

    if (result.success) {
      revalidatePath(`/${tenantSlug}/dashboard/patients`)
    }

    return result as BaseApiResponse<IPatient>
  } catch (error) {
    return {
      success: false,
      message: 'حدث خطأ أثناء تحديث بيانات المريض',
      data: {} as IPatient,
      errors: [],
      meta: { timestamp: new Date().toISOString(), requestId: '' },
    }
  }
}
