// actions/auth/getToken.ts
'use server'

import { cookies } from 'next/headers'

// حددنا النوع إجباري عشان مفيش دالة تندهها وتنسى هي بتكلم مين
export async function getToken(role: 'staff' | 'patient' = 'staff') {
  const cookieStore = await cookies()

  if (role === 'patient') {
    return cookieStore.get('patient_token')?.value
  }

  if (role === 'staff') {
    return cookieStore.get('token')?.value
  }

  return undefined
}
