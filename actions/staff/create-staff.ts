'use server'

import { revalidatePath } from 'next/cache'
import * as v from 'valibot'
import { CreateStaffInput, createStaffSchema } from '../../validation/staff'
import { getToken } from '../auth/getToken'

export async function createStaffAction(data: CreateStaffInput, tenantSlug: string) {
  const validationResult = v.safeParse(createStaffSchema, data)
  if (!validationResult.success) {
    return { success: false, message: 'بيانات غير صحيحة' }
  }

  const token = await getToken()

  if (!token) return { success: false, message: 'غير مصرح لك (Unauthorized)' }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clinic/staff`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Tenant': tenantSlug,
      },
      body: JSON.stringify(data),
    })

    const result = await res.json()

    if (!res.ok) {
      return { success: false, message: result.message || 'فشل إنشاء الموظف' }
    }

    revalidatePath(`/${tenantSlug}/dashboard/staff`)
    return { success: true, message: 'تم إضافة الموظف بنجاح' }
  } catch (error) {
    return { success: false, message: 'خطأ في الاتصال بالسيرفر' }
  }
}
