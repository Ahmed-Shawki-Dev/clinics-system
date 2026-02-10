'use server'

import { revalidatePath } from 'next/cache'
import * as v from 'valibot'
import { getToken } from '../auth/getToken'
import { UpdateStaffInput, updateStaffSchema } from '../../validation/staff'

export async function updateStaffAction(data: UpdateStaffInput, tenantSlug: string) {
  // 1. Validation
  const validationResult = v.safeParse(updateStaffSchema, data)
  if (!validationResult.success) {
    return { success: false, message: 'بيانات غير صحيحة' }
  }

  const token = await getToken()

  if (!token) return { success: false, message: 'Unauthorized' }

  const payload = { ...data }
  if (!payload.password) delete payload.password

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clinic/staff/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Tenant': tenantSlug,
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const errorData = await res.json()
      return { success: false, message: errorData.message || 'فشل التعديل' }
    }

    revalidatePath(`/${tenantSlug}/dashboard/staff`)
    return { success: true, message: 'تم تحديث البيانات بنجاح' }
  } catch (error) {
    return { success: false, message: 'خطأ في السيرفر' }
  }
}
