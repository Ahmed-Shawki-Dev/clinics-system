import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const segments = pathname.split('/').filter(Boolean)
  const tenantSlug = segments[0]

  const token = request.cookies.get('token')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value

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
  const isDashboardPage = segments[1] === 'dashboard'

  if (!token && refreshToken && isDashboardPage) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Tenant': tenantSlug,
        },
        body: JSON.stringify({ refreshToken }),
      })

      if (res.ok) {
        const result = await res.json()
        const response = NextResponse.next()

        response.cookies.set('token', result.data.token, {
          httpOnly: true,
          path: '/',
          maxAge: 900, // 15 min
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        })

        response.cookies.set('refreshToken', result.data.refreshToken, {
          httpOnly: true,
          path: '/',
          maxAge: 30 * 24 * 60 * 60, 
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        })

        return response
      }
    } catch (e) {
      const response = NextResponse.redirect(new URL(`/${tenantSlug}/login`, request.url))
      response.cookies.delete('token')
      response.cookies.delete('refreshToken')
      return response
    }
  }

  if (isAuthPage && (token || refreshToken)) {
    return NextResponse.redirect(new URL(`/${tenantSlug}/dashboard`, request.url))
  }

  if (isDashboardPage && !token && !refreshToken) {
    return NextResponse.redirect(new URL(`/${tenantSlug}/login`, request.url))
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/public/${tenantSlug}/clinic`,
    )

    if (response.status === 404) {
      return NextResponse.rewrite(new URL('/404', request.url))
    }

    const result = await response.json()
    if (!result.data?.isActive) {
      return NextResponse.rewrite(new URL('/suspended', request.url))
    }
  } catch (error) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|404|suspended).*)'],
}
