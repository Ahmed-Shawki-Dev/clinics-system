import { type NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. استثناء الملفات الثابتة، الـ API، والمسارات اللي مفيش داعي نفحصها
  if (pathname.includes('.') || pathname.startsWith('/api') || pathname.startsWith('/_next')) {
    return NextResponse.next()
  }

  const segments = pathname.split('/').filter(Boolean)
  if (segments.length === 0) return NextResponse.next()

  const firstSegment = segments[0]

  // 2. قراءة التوكنز
  const staffToken = request.cookies.get('token')?.value
  const patientToken = request.cookies.get('patient_token')?.value

  // ==========================================
  // مسار الأدمن (Platform Admin) - بدون عيادة
  // ==========================================
  if (firstSegment === 'admin') {
    const isAdminAuthPage = pathname === '/admin/login'

    if (isAdminAuthPage && staffToken) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    if (!isAdminAuthPage && !staffToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    return NextResponse.next()
  }

  // ==========================================
  // مسارات العيادات (Tenants)
  // ==========================================
  const tenantSlug = firstSegment

  // استثناء مسارات النظام الـ Global
  if (['404', 'suspended'].includes(tenantSlug)) {
    return NextResponse.next()
  }

  const isLandingPage = segments.length === 1 // e.g., /nile-dental
  const isAuthPage = pathname.endsWith('/login') || pathname.endsWith('/register')
  const isPatientSection = segments[1] === 'patient'

  // 3. منع المتسجلين من رؤية صفحة الهبوط (Landing Page)
  if (isLandingPage) {
    if (staffToken) return NextResponse.redirect(new URL(`/${tenantSlug}/dashboard`, request.url))
    if (patientToken) return NextResponse.redirect(new URL(`/${tenantSlug}/patient`, request.url))
    return NextResponse.next() // لو يوزر عادي سيبه يشوف اللاندنج
  }

  // 4. منطقة المريض (Patient Space)
  if (isPatientSection) {
    if (patientToken && isAuthPage) {
      // مريض معاه توكن بيحاول يفتح لوجن -> ارميه لبروفايله
      return NextResponse.redirect(new URL(`/${tenantSlug}/patient`, request.url))
    }
    if (!patientToken && !isAuthPage) {
      // مريض ممعهوش توكن بيحاول يفتح صفحة محمية -> ارميه للوجن المريض
      return NextResponse.redirect(new URL(`/${tenantSlug}/patient/login`, request.url))
    }
    return NextResponse.next()
  }

  // 5. منطقة الموظفين (Staff Space)
  // وصلنا هنا معناه: مش أدمن، مش لاندنج، ومش مريض. (أي مسار يخص العيادة)
  if (staffToken && isAuthPage) {
    // موظف معاه توكن وبيفتح لوجن -> ارميه للداشبورد
    return NextResponse.redirect(new URL(`/${tenantSlug}/dashboard`, request.url))
  }
  if (!staffToken && !isAuthPage) {
    // حد ممعهوش توكن بيحاول يفتح أي صفحة جوه السيستم -> ارميه للوجن العيادة
    return NextResponse.redirect(new URL(`/${tenantSlug}/login`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  // الـ Matcher ده بيوفر موارد السيرفر، بيمنع الميدلوير يشتغل على مسارات ملهاش لازمة
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|404|suspended).*)'],
}
