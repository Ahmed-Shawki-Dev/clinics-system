import { type NextRequest, NextResponse } from 'next/server'

// دالة خفيفة لفك التوكن في الـ Edge Middleware
function decodeJwt(token: string) {
  try {
    const payload = token.split('.')[1]
    // atob is available in edge runtime
    return JSON.parse(atob(payload))
  } catch (error) {
    if (error instanceof Error) return null
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const segments = pathname.split('/').filter(Boolean)
  const tenantSlug = segments[0]
  const employeeToken = request.cookies.get('token')?.value
  const patientToken = request.cookies.get('patient_token')?.value

  if (
    !tenantSlug ||
    pathname.includes('.') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    ['404', 'suspended'].includes(tenantSlug)
  ) {
    return NextResponse.next()
  }

  // ==========================================
  // 1. منطق المريض (Patient Logic)
  // ==========================================
  if (segments[1] === 'patient') {
    const isPatientAuthPage = segments[2] === 'login' || segments[2] === 'register'

    if (isPatientAuthPage && patientToken) {
      // يفضل هنا برضه تفك توكن المريض وتتأكد من صلاحيته لو حبيت
      return NextResponse.redirect(new URL(`/${tenantSlug}/patient`, request.url))
    }

    if (!isPatientAuthPage && !patientToken) {
      return NextResponse.redirect(new URL(`/${tenantSlug}/patient/login`, request.url))
    }

    return NextResponse.next()
  }

  // ==========================================
  // 2. منطق الموظف (Employee Logic)
  // ==========================================
  const isAuthPage = segments[1] === 'login' || segments[1] === 'register'
  const isProtectedPage = [
    'dashboard',
    'doctor',
    'queue',
    'staff',
    'billing',
    'services',
    'labs',
  ].includes(segments[1])

  // التحقق الحقيقي من التوكن
  let decodedEmployee = null
  if (employeeToken) {
    decodedEmployee = decodeJwt(employeeToken)
  }

  // لو معاه توكن بس مضروب أو منتهي أو بتاع مريض (ملوش role إداري)
  // نعتبره كأنه مفيش توكن
  const isValidEmployee = decodedEmployee && decodedEmployee.role

  if (isAuthPage && isValidEmployee) {
    return NextResponse.redirect(new URL(`/${tenantSlug}/dashboard`, request.url))
  }

  if (isProtectedPage && !isValidEmployee) {
    // لو التوكن مضروب، امسحه ووجهه للوجين
    const response = NextResponse.redirect(new URL(`/${tenantSlug}/login`, request.url))
    response.cookies.delete('token')
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|404|suspended).*)'],
}
