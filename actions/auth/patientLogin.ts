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
    cache: 'no-store', // أمان إضافي لمنع Next.js من كاش الريكويست ده
  })

  if (!result.success || !result.data) {
    return result
  }

  // 🔴 الحماية الهندسية: فحص ما بداخل التوكن قبل اعتماده
  try {
    const token = result.data.token
    const payloadBase64 = token.split('.')[1]
    const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString())

    const role =
      payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || payload.role

    // لو الباك إند اداله صلاحية موظف وهو داخل من شاشة المريض، ارفضه!
    if (role !== 'Patient') {
      return {
        success: false,
        message: 'بيانات الدخول لا تخص حساب مريض',
        data: null,
        errors: [{ field: 'auth', message: 'Invalid Role' }],
        meta: result.meta,
      }
    }
  } catch (error) {
    return {
      success: false,
      message: 'توكن غير صالح من الخادم',
      data: null,
      errors: [{ field: 'token', message: 'Invalid JWT structure' }],
      meta: result.meta,
    }
  }

  // ✅ التوكن سليم وموثوق أنه مريض
  const cookieStore = await cookies()

  // 🔴 تنظيف احترافي: مسح توكن الموظف من الـ Root ومن مسار العيادة عشان نضمن تدميره
  cookieStore.delete('token')
  cookieStore.delete({ name: 'token', path: `/${tenantSlug}` })

  cookieStore.set('patient_token', result.data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: `/`, // عزل صارم
    maxAge: 24 * 60 * 60 * 365,
  })

  return result
}
