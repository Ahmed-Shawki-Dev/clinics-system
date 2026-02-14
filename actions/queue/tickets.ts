'use server'
import { revalidatePath } from 'next/cache' // استيراد الـ Revalidate
import { fetchApi } from '../../lib/fetchApi'
import { BaseApiResponse } from '../../types/api'
import { IQueueTicket } from '../../types/queue'
import { CutTicketInput } from '../../validation/queue'

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

  // لو العملية نجحت، نحدث المسار فوراً
  if (response.success) {
    revalidatePath(`/${tenantSlug}/dashboard/queue`)
  }

  return response
}

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
  }

  return response
}

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
  }

  return response
}
