'use server'

import { fetchApi } from '@/lib/fetchApi'
import { BaseApiResponse, IPaginatedData } from '@/types/api'
import { IInvoice, IPayment } from '@/types/visit' // التايبس بتاعتك
import { revalidatePath } from 'next/cache'

export async function getInvoicesAction(
  tenantSlug: string,
  pageNumber: number = 1,
  pageSize: number = 10,
  from?: string, // 👈 ضفنا دول
  to?: string,
) {
  let url = `/api/clinic/invoices?pageNumber=${pageNumber}&pageSize=${pageSize}`

  if (from) url += `&from=${from}`
  if (to) url += `&to=${to}`

  return await fetchApi<IPaginatedData<IInvoice>>(url, {
    tenantSlug,
    authType: 'staff',
    cache: 'no-store',
  })
}

export async function addPaymentAction(
  tenantSlug: string,
  payload: { invoiceId: string; amount: number; paymentMethod: string; notes?: string },
): Promise<BaseApiResponse<IPayment>> {
  const result = await fetchApi<IPayment>('/api/clinic/payments', {
    method: 'POST',
    tenantSlug,
    authType: 'staff',
    body: JSON.stringify(payload),
  })

  if (result.success) {
    revalidatePath(`/${tenantSlug}/dashboard/invoices`)
  }
  return result
}

export async function editInvoiceAction(
  tenantSlug: string,
  invoiceId: string,
  payload: { amount: number },
) {
  const result = await fetchApi<IInvoice>(`/api/clinic/invoices/${invoiceId}`, {
    method: 'PATCH',
    tenantSlug,
    authType: 'staff',
    body: JSON.stringify(payload),
  })

  if (result.success) {
    revalidatePath(`/${tenantSlug}/dashboard/invoices`)
  }
  return result
}
