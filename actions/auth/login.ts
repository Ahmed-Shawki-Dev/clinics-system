'use server'
import { cookies } from 'next/headers'
import { LoginInput } from '../../validation/login'

export async function loginAction(values: LoginInput, tenantSlug: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Tenant': tenantSlug,
      },
      body: JSON.stringify(values),
    })

    const result = await response.json()
    if (!response.ok || !result.success) return { success: false, message: result.message }

    const { token } = result.data // مش محتاجين ناخد refreshToken هنا خلاص
    const cookieStore = await cookies()

    // تخزين الـ Access Token لمدة طويلة (30 يوم)
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 30 * 24 * 60 * 60, // 30 يوم (بالثواني)
    })

    // ❌ مسحنا الجزء بتاع تخزين الـ RefreshToken

    return { success: true, data: result.data }
  } catch (error) {
    return { success: false, message: 'حدث خطأ في الاتصال بالسيرفر' }
  }
}
