import { type NextRequest, NextResponse } from 'next/server'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. استخراج الـ Tenant Slug والـ Token
  const segments = pathname.split('/').filter(Boolean)
  const tenantSlug = segments[0]
  const token = request.cookies.get('token')?.value

  // 2. حماية المسارات (Exclude static files & API)
  if (
    !tenantSlug ||
    pathname.includes('.') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    ['404', 'suspended'].includes(tenantSlug)
  ) {
    return NextResponse.next()
  }

  const isAuthPage = segments[1] === 'login' || segments[1] === 'register'
  const isProtectedPage = ['dashboard', 'doctor', 'patient', 'queue', 'staff', 'billing', 'services', 'labs'].includes(segments[1])

  // 3. منطق التوجيه (Auth Logic)
  // لو معاه توكن وداخل صفحة لوجن، ابعته للداشبورد
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL(`/${tenantSlug}/dashboard`, request.url))
  }

  // لو ممعهوش توكن وداخل صفحة محمية، ارجع للوجن
  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL(`/${tenantSlug}/login`, request.url))
  }

  // ✅ شيلنا الـ Fetch من هنا عشان ده "خنق" للمشروع
  // التأكد من الـ Clinic Active خليه في الـ Root Layout بتاع الداشبورد

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|404|suspended).*)'],
}
