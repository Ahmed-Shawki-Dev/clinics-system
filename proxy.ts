import { type NextRequest, NextResponse } from 'next/server'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. استخراج الـ Tenant Slug
  const segments = pathname.split('/').filter(Boolean)
  const tenantSlug = segments[0]

  // 2. اقرأ التوكنز صح! (توكن الموظفين وتوكن المرضى)
  const staffToken = request.cookies.get('token')?.value
  const patientToken = request.cookies.get('patient_token')?.value

  // 3. استثناء مسارات النظام
  if (
    !tenantSlug ||
    pathname.includes('.') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    ['404', 'suspended', 'admin'].includes(tenantSlug)
  ) {
    return NextResponse.next()
  }

  // 4. تحديد نوع الصفحة
  const isAuthPage = pathname.endsWith('/login') || pathname.endsWith('/register')
  const isPatientRoute = segments[1] === 'patient'
  const isProtectedSection = [
    'dashboard',
    'doctor',
    'patient',
    'queue',
    'staff',
    'billing',
    'services',
    'labs',
  ].includes(segments[1])
  const isProtectedPage = isProtectedSection && !isAuthPage

  // 5. التوجيه لو داخل يعمل لوجن وهو معاه توكن أصلاً
  if (isAuthPage) {
    if (isPatientRoute && patientToken) {
      // المريض معاه توكن وداخل صفحة لوجن المريض -> وديه بروفايله
      return NextResponse.redirect(new URL(`/${tenantSlug}/patient`, request.url))
    }
    if (!isPatientRoute && staffToken) {
      // الموظف معاه توكن وداخل لوجن العيادة -> وديه الداشبورد
      return NextResponse.redirect(new URL(`/${tenantSlug}/dashboard`, request.url))
    }
    return NextResponse.next()
  }

  // 6. حماية الصفحات (لو بيحاول يدخل صفحة محمية وممعهوش التوكن الصح)
  if (isProtectedPage) {
    if (isPatientRoute && !patientToken) {
      // بيحاول يفتح صفحة تخص المريض وممعهوش patient_token
      return NextResponse.redirect(new URL(`/${tenantSlug}/patient/login`, request.url))
    }
    if (!isPatientRoute && !staffToken) {
      // بيحاول يفتح صفحة تخص العيادة وممعهوش token
      return NextResponse.redirect(new URL(`/${tenantSlug}/login`, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|404|suspended).*)'],
}
