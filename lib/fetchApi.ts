import { getToken } from '../actions/auth/getToken'
import { refreshAccessToken } from '../actions/auth/refresh-token'
import { BaseApiResponse } from '../types/api'

interface FetchOptions extends RequestInit {
  tenantSlug?: string
  authType?: 'staff' | 'patient'
}

const FETCH_TIMEOUT_MS = 15000 // 15 seconds

export async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<BaseApiResponse<T>> {
  const {
    tenantSlug,
    authType = 'staff',
    headers: customHeaders,
    signal: externalSignal,
    ...restOptions
  } = options

  const token = await getToken(authType)
  const headers = new Headers(customHeaders)

  headers.set('Content-Type', 'application/json')

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  if (tenantSlug) {
    headers.set('X-Tenant', tenantSlug)
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

  const onExternalAbort = () => controller.abort()
  if (externalSignal) {
    externalSignal.addEventListener('abort', onExternalAbort)
  }

  try {
    // 🔥 الريكويست الأول (الأصلي)
    let response = await fetch(url, {
      headers,
      signal: controller.signal,
      ...restOptions,
    })

    // 🔴 منطقة الـ Interceptor: لو التوكن خلص وهو ستاف مش مريض
    if (response.status === 401 && authType === 'staff') {
      const newToken = await refreshAccessToken(tenantSlug)

      // لو قدرنا نجيب توكن جديد من الباك إند
      if (newToken) {
        // نحدث الهيدر بالتوكن الجديد
        headers.set('Authorization', `Bearer ${newToken}`)

        // 🔥 نعيد الريكويست مرة كمان بالتوكن الجديد (صاحب العيادة مش هيحس بحاجة)
        response = await fetch(url, {
          headers,
          signal: controller.signal,
          ...restOptions,
        })
      }
    }

    clearTimeout(timeoutId)
    externalSignal?.removeEventListener('abort', onExternalAbort)

    // بعد ما الريكويست خلص (سواء الأولاني نجح، أو التاني بعد الريفرش)
    // لو لسه 401 يبقى الريفرش فشل واليوزر لازم يعمل لوجين تاني
    if (response.status === 401) {
      return {
        success: false,
        message: 'حدث خطأ ما',
        data: null as unknown as T,
        errors: [{ field: 'auth', message: 'Unauthorized' }],
        meta: { timestamp: new Date().toISOString(), requestId: '' },
      }
    }

    // لو الباك إند رجع 403
    if (response.status === 403) {
      return {
        success: false,
        message: 'ليس لديك صلاحية للقيام بهذا الإجراء',
        data: null as unknown as T,
        errors: [{ field: 'auth', message: 'Forbidden' }],
        meta: { timestamp: new Date().toISOString(), requestId: '' },
      }
    }

    const data = await response.json()
    return data as BaseApiResponse<T>
  } catch (error) {
    clearTimeout(timeoutId)
    externalSignal?.removeEventListener('abort', onExternalAbort)

    const isTimeout = error instanceof Error && error.name === 'AbortError'

    return {
      success: false,
      message: isTimeout
        ? 'انتهت مهلة الاتصال بالخادم، يرجى المحاولة مرة أخرى'
        : 'فشل في الاتصال بالخادم',
      data: null as unknown as T,
      errors: [
        {
          field: 'server',
          message: isTimeout ? 'Request timeout' : 'Network error or server down',
        },
      ],
      meta: { timestamp: new Date().toISOString(), requestId: '' },
    }
  }
}
