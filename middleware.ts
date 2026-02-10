import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const segments = pathname.split('/').filter(Boolean)
  const tenantSlug = segments[0]

  // 1. استثناءات الملفات والـ API
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

  // أي صفحة جوه الداشبورد أو العيادة تعتبر محمية
  const isProtectedPage =
    segments[1] === 'dashboard' || segments[1] === 'doctor' || segments[1] === 'patient'

  const token = request.cookies.get('token')?.value


  // 2. توجيهات الحماية (Guards)

  // لو رايح صفحة لوجن وهو معاه توكين -> وذيه الداشبورد
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL(`/${tenantSlug}/dashboard`, request.url))
  }

  // لو رايح صفحة محمية ومعهوش توكين -> اطرده على اللوجن
  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL(`/${tenantSlug}/login`, request.url))
  }

  // 3. التحقق من حالة العيادة (اختياري بس مفيد)
  try {
    // ممكن تخفف الحمل وتلغي الفتش ده لو واثق، بس خليه للأمان
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/public/${tenantSlug}/clinic`,
      { next: { revalidate: 60 } }, // Cache عشان السرعة
    )

    if (response.status === 404) {
      return NextResponse.rewrite(new URL('/404', request.url))
    }

    const result = await response.json()
    if (!result.data?.isActive && !pathname.includes('/suspended')) {
      return NextResponse.rewrite(new URL('/suspended', request.url))
    }
  } catch (error) {
    // لو السيرفر وقع كمل عادي عشان منوقفش الدنيا
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|404|suspended).*)'],
}
