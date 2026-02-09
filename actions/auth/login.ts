'use server'
import { cookies } from 'next/headers'
import { LoginInput } from '../../validation/login'

// actions/auth/auth.ts
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

    const { token, refreshToken, user } = result.data
    const cookieStore = await cookies()

    // تخزين الـ Access Token (قصير)
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 900, // 15 دقيقة
    })

    // تخزين الـ Refresh Token (طويل) [cite: 2026-02-09]
    cookieStore.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 30 * 24 * 60 * 60, // 30 يوم
    })

    return { success: true, data: result.data }
  } catch (error) {
    return { success: false, message: 'حدث خطأ في الاتصال بالسيرفر' }
  }
}
