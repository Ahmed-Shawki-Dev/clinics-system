import { type NextRequest, NextResponse } from 'next/server'

// دالة سريعة وخفيفة لفك التوكن في بيئة الـ Edge بدون مكتبات خارجية تقيلة
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

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.includes('.') || pathname.startsWith('/api') || pathname.startsWith('/_next')) {
    return NextResponse.next()
  }

  const segments = pathname.split('/').filter(Boolean)
  if (segments.length === 0) return NextResponse.next()

  const firstSegment = segments[0]
  const staffToken = request.cookies.get('token')?.value
  const patientToken = request.cookies.get('patient_token')?.value

  // ==========================================
  // مسار الأدمن (Platform Admin)
  // ==========================================
  if (firstSegment === 'admin') {
    const isAdminAuthPage = pathname === '/admin/login'

    // التدخل الوحيد للميدلوير: لو ممعهوش توكن خالص وبيحاول يفتح الداشبورد، ارميه بره ووفر ريكويست السيرفر
    if (!staffToken && !isAdminAuthPage) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // أي حالة تانية سيبه يعدي.. واللايوت بتاعك هو اللي هيحكم
    return NextResponse.next()
  }
  // ==========================================
  // مسارات العيادات (Tenants)
  // ==========================================
  const tenantSlug = firstSegment

  if (['404', 'suspended'].includes(tenantSlug)) {
    return NextResponse.next()
  }

  // 🔥 الحارس الحديدي: فحص اختراق العيادات (Cross-Tenant Access Prevention)
  if (staffToken) {
    const payload = decodeJwt(staffToken)
    // لو معاه توكن لعيادة تانية، ارميه على الداشبورد بتاعة عيادته الأصلية
    if (payload?.tenantSlug && payload.tenantSlug !== tenantSlug) {
      return NextResponse.redirect(new URL(`/${payload.tenantSlug}/dashboard`, request.url))
    }
  }

  if (patientToken) {
    const payload = decodeJwt(patientToken)
    if (payload?.tenantSlug && payload.tenantSlug !== tenantSlug) {
      return NextResponse.redirect(new URL(`/${payload.tenantSlug}/patient`, request.url))
    }
  }

  const isLandingPage = segments.length === 1
  const isAuthPage = pathname.endsWith('/login') || pathname.endsWith('/register')
  const isPatientSection = segments[1] === 'patient'

  // 3. منع المتسجلين من رؤية صفحة الهبوط
  if (isLandingPage) {
    if (staffToken) return NextResponse.redirect(new URL(`/${tenantSlug}/dashboard`, request.url))
    if (patientToken) return NextResponse.redirect(new URL(`/${tenantSlug}/patient`, request.url))
    return NextResponse.next()
  }

  // 4. منطقة المريض
  if (isPatientSection) {
    if (patientToken && isAuthPage)
      return NextResponse.redirect(new URL(`/${tenantSlug}/patient`, request.url))
    if (!patientToken && !isAuthPage)
      return NextResponse.redirect(new URL(`/${tenantSlug}/patient/login`, request.url))
    return NextResponse.next()
  }

  // 5. منطقة الموظفين
  if (staffToken && isAuthPage)
    return NextResponse.redirect(new URL(`/${tenantSlug}/dashboard`, request.url))
  if (!staffToken && !isAuthPage)
    return NextResponse.redirect(new URL(`/${tenantSlug}/login`, request.url))

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|404|suspended).*)'],
}
