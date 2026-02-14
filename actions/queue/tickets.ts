'use server'

import { revalidatePath } from 'next/cache'
import { fetchApi } from '../../lib/fetchApi'
import { BaseApiResponse } from '../../types/api'
import { IQueueTicket } from '../../types/queue'
import { CutTicketInput } from '../../validation/queue'

// 1. إنشاء تذكرة (الريسبشن)
export async function createTicket(
  tenantSlug: string,
  data: CutTicketInput,
): Promise<BaseApiResponse<IQueueTicket>> {
  const response = await fetchApi<IQueueTicket>('/api/clinic/queue/tickets', {
    method: 'POST',
    tenantSlug,
    body: JSON.stringify({
      sessionId: data.sessionId,
      patientId: data.patientId,
      doctorId: data.doctorId,
      doctorServiceId: data.doctorServiceId,
      notes: data.notes,
    }),
  })

  if (response.success) {
    revalidatePath(`/${tenantSlug}/dashboard/queue`)
    revalidatePath(`/${tenantSlug}/dashboard/doctor/queue`)
  }
  return response
}

// 2. تعليم كحالة طارئة
export async function markTicketUrgent(
  tenantSlug: string,
  ticketId: string,
): Promise<BaseApiResponse<IQueueTicket>> {
  const response = await fetchApi<IQueueTicket>(`/api/clinic/queue/tickets/${ticketId}/urgent`, {
    method: 'POST',
    tenantSlug,
  })

  if (response.success) {
    revalidatePath(`/${tenantSlug}/dashboard/queue`)
    revalidatePath(`/${tenantSlug}/dashboard/doctor/queue`)
  }
  return response
}

// 3. إلغاء التذكرة
export async function cancelTicket(
  tenantSlug: string,
  ticketId: string,
): Promise<BaseApiResponse<IQueueTicket>> {
  const response = await fetchApi<IQueueTicket>(`/api/clinic/queue/tickets/${ticketId}/cancel`, {
    method: 'POST',
    tenantSlug,
  })

  if (response.success) {
    revalidatePath(`/${tenantSlug}/dashboard/queue`)
    revalidatePath(`/${tenantSlug}/dashboard/doctor/queue`)
  }
  return response
}

// 4. نداء المريض (Waiting -> Called)
export async function callTicketAction(
  tenantSlug: string,
  ticketId: string,
): Promise<BaseApiResponse<IQueueTicket>> {
  const result = await fetchApi<IQueueTicket>(`/api/clinic/queue/tickets/${ticketId}/call`, {
    method: 'POST',
    tenantSlug,
  })

  if (result.success) {
    revalidatePath(`/${tenantSlug}/dashboard/queue`)
    revalidatePath(`/${tenantSlug}/dashboard/doctor/queue`)
  }
  return result
}

// 5. بدء الكشف (Called -> InVisit)
export async function startVisitAction(
  tenantSlug: string,
  ticketId: string,
): Promise<BaseApiResponse<IQueueTicket>> {
  const result = await fetchApi<IQueueTicket>(`/api/clinic/queue/tickets/${ticketId}/start-visit`, {
    method: 'POST',
    tenantSlug,
  })

  if (result.success) {
    revalidatePath(`/${tenantSlug}/dashboard/queue`)
    revalidatePath(`/${tenantSlug}/dashboard/doctor/queue`)
  }
  return result
}

// 6. إنهاء الكشف (InVisit -> Completed)
export async function finishTicketAction(
  tenantSlug: string,
  ticketId: string,
): Promise<BaseApiResponse<IQueueTicket>> {
  const result = await fetchApi<IQueueTicket>(`/api/clinic/queue/tickets/${ticketId}/finish`, {
    method: 'POST',
    tenantSlug,
  })

  if (result.success) {
    revalidatePath(`/${tenantSlug}/dashboard/queue`)
    revalidatePath(`/${tenantSlug}/dashboard/doctor/queue`)
  }
  return result
}


// 7. تخطي المريض (Called -> Skipped)
export async function skipTicketAction(
  tenantSlug: string,
  ticketId: string,
): Promise<BaseApiResponse<IQueueTicket>> {
  const result = await fetchApi<IQueueTicket>(`/api/clinic/queue/tickets/${ticketId}/skip`, {
    method: 'POST',
    tenantSlug,
  })

  if (result.success) {
    revalidatePath(`/${tenantSlug}/dashboard/queue`)
    revalidatePath(`/${tenantSlug}/dashboard/doctor/queue`) // أو my-queue حسب ما سميتها
  }
  return result
}