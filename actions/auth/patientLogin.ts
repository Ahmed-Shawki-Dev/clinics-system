'use server'

import { cookies } from 'next/headers'
import { fetchApi } from '../../lib/fetchApi'
import { BaseApiResponse } from '../../types/api'
import { ILogin } from '../../types/auth'
import { LoginInput } from '../../validation/login'

export async function patientLoginAction(
  data: LoginInput,
  tenantSlug: string,
): Promise<BaseApiResponse<ILogin>> {
  const result = await fetchApi<ILogin>('/api/Auth/patient/login', {
    method: 'POST',
    body: JSON.stringify(data),
    tenantSlug,
  })

  if (result.success && result.data) {
    const { token } = result.data
    const cookieStore = await cookies()

    cookieStore.set('patient_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 24 * 60 * 60 * 365,
    })
  }

  return result
}
