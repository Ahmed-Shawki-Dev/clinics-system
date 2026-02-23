'use server'

import { fetchApi } from '@/lib/fetchApi'
import { cookies } from 'next/headers'
import { LoginInput } from '../../validation/login'
import { BaseApiResponse } from '../../types/api'
import { ILogin } from '../../types/auth'

export async function superAdminLoginAction(data: LoginInput): Promise<BaseApiResponse<ILogin>> {
  const res = await fetchApi<ILogin>('/api/Auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  })

  if (!res.success || !res.data) {
    return res
  }

  const cookieStore = await cookies()
  cookieStore.set('token', res.data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })

  // شيلنا الـ redirect من هنا ورجعنا الاستجابة كاملة للكلاينت
  return res
}
