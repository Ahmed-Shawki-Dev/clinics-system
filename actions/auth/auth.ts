'use server'

import { cookies } from 'next/headers'
import { LoginInput } from '../validation/login'
import { AuthResponseData, BaseApiResponse } from '../types/auth'

export async function loginAction(values: LoginInput, tenantSlug: string) {
  try {
    // 1. السيرفر بتاع Next.js هو اللي بيكلم الباك اند
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Tenant': tenantSlug,
      },
      body: JSON.stringify(values),
      cache: 'no-store',
    })

    const result: BaseApiResponse<AuthResponseData> = await response.json()

    if (!response.ok || !result.success) {
      return { success: false, message: result.message || 'فشل تسجيل الدخول' }
    }

    const { data } = result
    const cookieStore = await cookies()

    const maxAge = data.user.role === 'Patient' ? 31536000 : 28800

    cookieStore.set('token', data.token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict', 
      path: '/',
      maxAge: maxAge,
    })

    return { success: true, data: data }
  } catch (error) {
    console.error('Login Action Error:', error)
    return { success: false, message: 'حدث خطأ في الاتصال بالخادم' }
  }
}
