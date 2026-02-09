import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  const segments = pathname.split('/')
  const tenantSlug = segments[1]

  if (!tenantSlug || pathname.includes('.') || pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  try {
    const response = await fetch(`https://eliteclinic.runasp.net/api/public/${tenantSlug}/clinic`)

    if (response.status === 404) {
      return NextResponse.rewrite(new URL('/404', request.url))
    }

    const result = await response.json()

    if (!result.data?.isActive) {
      return NextResponse.rewrite(new URL('/suspended', request.url))
    }

    return NextResponse.next()
  } catch (error) {
    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
