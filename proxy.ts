import { type NextRequest, NextResponse } from 'next/server'

// 1. فك التوكن
function decodeJwt(token: string) {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    )
    return JSON.parse(jsonPayload)
  } catch (e) {
    return null
  }
}

// 2. فحص صلاحية التوكن (لو فاضل 15 ثانية أو أقل يعتبر منتهي)
function isTokenExpired(token: string) {
  const payload = decodeJwt(token)
  if (!payload || !payload.exp) return true
  return payload.exp * 1000 <= Date.now() + 15000
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // تجاهل ملفات النظام والـ APIs
  if (pathname.includes('.') || pathname.startsWith('/api') || pathname.startsWith('/_next')) {
    return NextResponse.next()
  }

  const segments = pathname.split('/').filter(Boolean)
  if (segments.length === 0) return NextResponse.next()

  const firstSegment = segments[0]
  const tenantSlug = firstSegment
  let staffToken = request.cookies.get('token')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value
  const patientToken = request.cookies.get('patient_token')?.value

  let tokensRefreshed = false
  let newTokens: { token: string; refreshToken: string } | null = null
  const requestHeaders = new Headers(request.headers)

  // ==========================================
  // منطقة الريفرش: بتشتغل بس لو التوكن بيموت
  // ==========================================
  if (staffToken && refreshToken && isTokenExpired(staffToken)) {
    try {
      const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Auth/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(tenantSlug && tenantSlug !== 'admin' && { 'X-Tenant': tenantSlug }),
        },
        body: JSON.stringify({ token: staffToken, refreshToken }),
      })

      if (refreshRes.ok) {
        const result = await refreshRes.json()
        if (result.success && result.data) {
          newTokens = result.data
          staffToken = newTokens!.token // تحديث التوكن في الذاكرة عشان باقي اللوجيك يشتغل صح
          tokensRefreshed = true

          // حقن التوكن الجديد في الهيدر للـ Server Components
          const currentCookies = request.cookies.getAll()
          const updatedCookies = currentCookies
            .map((c) => {
              if (c.name === 'token') return `token=${newTokens!.token}`
              if (c.name === 'refreshToken') return `refreshToken=${newTokens!.refreshToken}`
              return `${c.name}=${c.value}`
            })
            .join('; ')
          requestHeaders.set('cookie', updatedCookies)
        } else throw new Error('Refresh failed')
      } else throw new Error('Refresh failed')
    } catch (error) {
      // لو فشل تماماً، اطرده على شاشة تسجيل الدخول
      const redirectUrl = new URL(
        `/${tenantSlug === 'admin' ? 'admin' : tenantSlug}/login`,
        request.url,
      )
      const redirectRes = NextResponse.redirect(redirectUrl)
      redirectRes.cookies.delete('token')
      redirectRes.cookies.delete('refreshToken')
      return redirectRes
    }
  }

  // ==========================================
  // مسار الأدمن (Platform Admin)
  // ==========================================
  let response: NextResponse | null = null

  if (firstSegment === 'admin') {
    const isAdminAuthPage = pathname === '/admin/login'
    if (!staffToken && !isAdminAuthPage) {
      response = NextResponse.redirect(new URL('/admin/login', request.url))
    } else {
      response = NextResponse.next({ request: { headers: requestHeaders } })
    }
  }
  // ==========================================
  // مسارات العيادات (Tenants)
  // ==========================================
  else if (['404', 'suspended'].includes(tenantSlug)) {
    response = NextResponse.next({ request: { headers: requestHeaders } })
  } else {
    // 🔥 الحارس الحديدي: فحص اختراق العيادات (Cross-Tenant Access Prevention)
    if (staffToken && !response) {
      const payload = decodeJwt(staffToken)
      if (payload?.tenantSlug && payload.tenantSlug !== tenantSlug) {
        response = NextResponse.redirect(new URL(`/${payload.tenantSlug}/dashboard`, request.url))
      }
    }

    if (patientToken && !response) {
      const payload = decodeJwt(patientToken)
      if (payload?.tenantSlug && payload.tenantSlug !== tenantSlug) {
        response = NextResponse.redirect(new URL(`/${payload.tenantSlug}/patient`, request.url))
      }
    }

    // منطق التوجيه العادي لو معداش في أي سكة من اللي فوق
    if (!response) {
      const isLandingPage = segments.length === 1
      const isAuthPage = pathname.endsWith('/login') || pathname.endsWith('/register')
      const isPatientSection = segments[1] === 'patient'

      if (isLandingPage) {
        if (staffToken)
          response = NextResponse.redirect(new URL(`/${tenantSlug}/dashboard`, request.url))
        else if (patientToken)
          response = NextResponse.redirect(new URL(`/${tenantSlug}/patient`, request.url))
        else response = NextResponse.next({ request: { headers: requestHeaders } })
      } else if (isPatientSection) {
        if (patientToken && isAuthPage)
          response = NextResponse.redirect(new URL(`/${tenantSlug}/patient`, request.url))
        else if (!patientToken && !isAuthPage)
          response = NextResponse.redirect(new URL(`/${tenantSlug}/patient/login`, request.url))
        else response = NextResponse.next({ request: { headers: requestHeaders } })
      } else {
        if (staffToken && isAuthPage)
          response = NextResponse.redirect(new URL(`/${tenantSlug}/dashboard`, request.url))
        else if (!staffToken && !isAuthPage)
          response = NextResponse.redirect(new URL(`/${tenantSlug}/login`, request.url))
        else response = NextResponse.next({ request: { headers: requestHeaders } })
      }
    }
  }

  // Fallback آمن عشان التايبسكريبت ميعيطش
  if (!response) response = NextResponse.next({ request: { headers: requestHeaders } })

  // ==========================================
  // زراعة الكوكيز الجديدة في المتصفح بعد ما التوجيه يخلص
  // ==========================================
  if (tokensRefreshed && newTokens) {
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
      maxAge: 30 * 24 * 60 * 60,
    }
    response.cookies.set('token', newTokens.token, cookieOptions)
    response.cookies.set('refreshToken', newTokens.refreshToken, cookieOptions)
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|404|suspended).*)'],
}
