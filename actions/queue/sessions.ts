'use server'

import { fetchApi } from '../../lib/fetchApi'
import { BaseApiResponse } from '../../types/api'
import { IQueueSession } from '../../types/queue'
import { OpenSessionInput } from '../../validation/queue'

export async function openQueueSession(
  tenantSlug: string,
  data: OpenSessionInput,
): Promise<BaseApiResponse<IQueueSession>> {
  return await fetchApi<IQueueSession>('/api/clinic/queue/sessions', {
    method: 'POST',
    tenantSlug,
    body: JSON.stringify(data), // هنا الصح
  })
}

// الدالة اللي إنت كسلت تكتبها
export async function closeQueueSession(
  tenantSlug: string,
  sessionId: string,
): Promise<BaseApiResponse<IQueueSession>> {
  return await fetchApi<IQueueSession>(`/api/clinic/queue/sessions/${sessionId}/close`, {
    method: 'POST',
    tenantSlug,
  })
}
