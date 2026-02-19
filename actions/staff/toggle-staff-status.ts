'use server'

import { revalidatePath } from 'next/cache'
import { getToken } from '../auth/getToken'

export async function toggleStaffStatusAction(
  staffId: string,
  isEnabled: boolean,
  tenantSlug: string,
) {
  const token = await getToken()
  if (!token) return { success: false, message: 'Unauthorized' }

  //
  // بنحدد الـ Endpoint بناءً على القيمة المطلوبة (enable أو disable)
  const endpoint = isEnabled ? 'enable' : 'disable'

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/clinic/staff/${staffId}/${endpoint}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'X-Tenant': tenantSlug,
        },
        body: JSON.stringify({}),
      },
    )

    if (!res.ok) {
      return { success: false, message: 'فشل تغيير حالة الموظف' }
    }

    revalidatePath(`/${tenantSlug}/dashboard/staff`)
    return { success: true, message: isEnabled ? 'تم تفعيل الموظف' : 'تم تعطيل الموظف' }
  } catch (error) {
    return { success: false, message: 'خطأ في السيرفر' }
  }
}
