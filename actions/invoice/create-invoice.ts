'use server'

import { fetchApi } from '@/lib/fetchApi'
import { BaseApiResponse } from '@/types/api'
import { IInvoice } from '@/types/visit'
import { revalidatePath } from 'next/cache'
import { CreateInvoiceFormInput } from '../../validation/invoice'

export const createInvoiceAction = async (
  tenantSlug: string,
  visitId: string,
  data: CreateInvoiceFormInput,
): Promise<BaseApiResponse<IInvoice>> => {
  try {
    // الباك إند محتاج الـ visitId مع الـ amount
    const payload = {
      visitId,
      amount: data.amount,
      notes: data.notes || '',
    }

    const result = await fetchApi<IInvoice>(`/api/clinic/invoices`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'X-Tenant': tenantSlug,
      },
    })

    if (result.success) {
      // ريفاليديت عشان تابة الفاتورة تـ Re-render وتقرأ الفاتورة الجديدة
      revalidatePath(`/${tenantSlug}/dashboard/doctor/visits/${visitId}`)
    }

    return result
  } catch (error) {
    console.error('[CREATE_INVOICE_ERROR]:', error)
    return {
      success: false,
      message: 'فشل في إنشاء المطالبة المالية',
      data: null,
      errors: [],
      meta: { timestamp: new Date().toISOString(), requestId: '' },
    }
  }
}
