import { getToken } from '../actions/auth/getToken' // تأكد من مسارك صح
import { BaseApiResponse } from '../types/api'

// بنوسع الـ RequestInit العادي عشان نقبل الـ tenantSlug و authType
interface FetchOptions extends RequestInit {
  tenantSlug?: string
  authType?: 'staff' | 'patient'
}

const FETCH_TIMEOUT_MS = 15000 // 15 seconds

export async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<BaseApiResponse<T>> {
  // فصلنا الداتا الخاصة بينا عن خيارات الـ fetch، والديفولت staff
  const {
    tenantSlug,
    authType = 'staff',
    headers: customHeaders,
    signal: externalSignal,
    ...restOptions
  } = options

  // بنبعت الـ authType عشان getToken تجيب التوكن بتاع الـ Role ده بس
  const token = await getToken(authType)
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

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

  // دعم أي signal خارجي بجانب timeout الداخلي
  const onExternalAbort = () => controller.abort()
  if (externalSignal) {
    externalSignal.addEventListener('abort', onExternalAbort)
  }

  try {
    const response = await fetch(url, {
      headers,
      signal: controller.signal,
      ...restOptions,
    })

    clearTimeout(timeoutId)
    externalSignal?.removeEventListener('abort', onExternalAbort)

    // لو الباك إند رجع 401، نرجع استجابة موحدة تدل على انتهاء الجلسة
    if (response.status === 401) {
      return {
        success: false,
        message: 'حدث خطأ ما',
        data: null,
        errors: [{ field: 'auth', message: 'Unauthorized' }],
        meta: { timestamp: new Date().toISOString(), requestId: '' },
      }
    }

    // لو الباك إند رجع 403
    if (response.status === 403) {
      return {
        success: false,
        message: 'ليس لديك صلاحية للقيام بهذا الإجراء',
        data: null,
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

    // معالجة السقوط الكامل للشبكة (Network/CORS/Timeout) بنفس الـ Interface
    return {
      success: false,
      message: isTimeout
        ? 'انتهت مهلة الاتصال بالخادم، يرجى المحاولة مرة أخرى'
        : 'فشل في الاتصال بالخادم',
      data: null,
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
