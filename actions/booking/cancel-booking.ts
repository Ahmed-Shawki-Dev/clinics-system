'use server'

import { getToken } from '@/actions/auth/getToken'
import { revalidatePath } from 'next/cache'

export async function cancelBookingAction(bookingId: string, reason: string, tenantSlug: string) {
  const token = await getToken()

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/clinic/bookings/${bookingId}/cancel`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-Tenant': tenantSlug,
        },
        body: JSON.stringify({ cancellationReason: reason }),
      },
    )

    if (!res.ok) {
      const error = await res.json()
      return { success: false, message: error.message || 'فشل إلغاء الحجز' }
    }

    revalidatePath(`/dashboard/${tenantSlug}/appointments`)
    return { success: true, message: 'تم إلغاء الحجز بنجاح' }
  } catch (error) {
    return { success: false, message: 'خطأ في الاتصال بالسيرفر' }
  }
}
