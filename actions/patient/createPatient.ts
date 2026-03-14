'use server'

import { fetchApi } from '@/lib/fetchApi'
import { ICreatePatientResponse } from '@/types/patient'
import { CreatePatientInput } from '@/validation/patient'

export async function createPatientAction(data: CreatePatientInput, tenantSlug: string) {
  return await fetchApi<ICreatePatientResponse>('/api/clinic/patients', {
    method: 'POST',
    tenantSlug,
    authType: 'staff',
    body: JSON.stringify(data),
  })
}
