import { getToken } from '../actions/auth/getToken' // تأكد من مسارك صح
import { BaseApiResponse } from '../types/api'

// بنوسع الـ RequestInit العادي عشان نقبل الـ tenantSlug
interface FetchOptions extends RequestInit {
  tenantSlug?: string
}

export async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<BaseApiResponse<T>> {
  // فصلنا الـ tenantSlug عن باقي خيارات الـ fetch
  const { tenantSlug, headers: customHeaders, ...restOptions } = options

  const token = await getToken()
  const headers = new Headers(customHeaders)

  // الـ Headers الأساسية
  headers.set('Content-Type', 'application/json')

  // حقن التوكن لو متاح
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  // حقن الـ Tenant لو متاح للـ Clinic Routes
  if (tenantSlug) {
    headers.set('X-Tenant', tenantSlug)
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`

  try {
    const response = await fetch(url, {
      headers,
      ...restOptions,
    })

    // لو الباك إند رجع 401 أو 403 أو 500، الداتا ستظل بصيغة BaseApiResponse
    const data = await response.json()
    return data as BaseApiResponse<T>
  } catch (error) {
    // معالجة السقوط الكامل للشبكة (Network/CORS) بنفس الـ Interface
    return {
      success: false,
      message: 'فشل في الاتصال بالخادم',
      data: {} as T, // Type Assertion لمنع أخطاء الـ TS
      errors: [{ field: 'server', message: 'Network error or server down' }],
      meta: { timestamp: new Date().toISOString(), requestId: '' },
    }
  }
}
