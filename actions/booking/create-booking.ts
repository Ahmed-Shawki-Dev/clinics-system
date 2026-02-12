'use server'

import { CreateBookingInput } from '@/validation/booking'
import { format } from 'date-fns'
import { revalidatePath } from 'next/cache'
import { getToken } from '../auth/getToken'

export async function createBookingAction(data: CreateBookingInput, tenantSlug: string) {
  const token = await getToken()
  if (!token) return { success: false, message: 'غير مصرح لك' }

  const payload = {
    patientId: data.patientId,
    doctorId: data.doctorId,
    doctorServiceId: data.doctorServiceId || null,
    bookingDate: format(data.bookingDate, 'yyyy-MM-dd'),
    bookingTime: data.bookingTime,
    notes: data.notes,
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clinic/bookings`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Tenant': tenantSlug,
      },
      body: JSON.stringify(payload),
    })

    const result = await res.json()

    if (!res.ok) {
      return { success: false, message: result.message || 'فشل حجز الموعد' }
    }

    revalidatePath(`/${tenantSlug}/dashboard/appointments`)
    return { success: true, message: 'تم تأكيد الحجز بنجاح' }
  } catch (error) {
    console.error('Booking Error:', error)
    return { success: false, message: 'خطأ في الاتصال بالسيرفر' }
  }
}
