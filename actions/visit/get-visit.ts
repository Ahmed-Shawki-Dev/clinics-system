'use server'

import { fetchApi } from '@/lib/fetchApi'
import { BaseApiResponse } from '@/types/api'
import { IVisit } from '@/types/visit'

// لازم الأكشن يعرف إحنا في أنهي عيادة!
export async function getVisitAction(
  tenantSlug: string,
  visitId: string,
): Promise<BaseApiResponse<IVisit | null>> {
  if (!visitId) {
    return {
      success: false,
      message: 'معرف الزيارة مطلوب',
      data: null,
      errors: [],
      meta: {
        timestamp: new Date().toISOString(),

        requestId: '',
      },
    }
  }

  try {
    const response = await fetchApi<IVisit>(`/api/clinic/visits/${visitId}`, {
      method: 'GET',
      tenantSlug, // <--- وباصيها هنا عشان الـ fetchApi تحط الهيدر
    })

    return response
  } catch (error) {
    console.error('[GET_VISIT_ACTION_ERROR]:', error)
    return {
      success: false,
      message: 'حدث خطأ غير متوقع أثناء جلب بيانات الزيارة',
      data: null,
      errors: [],
      meta: {
        timestamp: new Date().toISOString(),

        requestId: '',
      },
    }
  }
}
