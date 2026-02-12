'use server'

import { getToken } from '@/actions/auth/getToken'
import { revalidatePath } from 'next/cache'

export async function rescheduleBookingAction(
  bookingId: string,
  date: string,
  time: string,
  tenantSlug: string,
) {
  const token = await getToken()

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/clinic/bookings/${bookingId}/reschedule`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-Tenant': tenantSlug,
        },
        body: JSON.stringify({ bookingDate: date, bookingTime: time }),
      },
    )

    if (!res.ok) {
      const error = await res.json()
      return { success: false, message: error.message || 'فشل تأجيل الحجز' }
    }

    revalidatePath(`/dashboard/${tenantSlug}/appointments`)
    return { success: true, message: 'تم تعديل الموعد بنجاح' }
  } catch (error) {
    return { success: false, message: 'خطأ في الاتصال بالسيرفر' }
  }
}
