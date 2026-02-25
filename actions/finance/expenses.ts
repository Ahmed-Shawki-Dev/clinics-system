'use server'

import { fetchApi } from '@/lib/fetchApi'
import { BaseApiResponse, IPaginatedData } from '@/types/api'
import { revalidatePath } from 'next/cache'
import { IExpense } from '../../types/expense'
import { ExpenseInput } from '../../validation/expense'

export async function getExpensesAction(
  tenantSlug: string,
  pageNumber: number = 1,
  pageSize: number = 10,
  from?: string,
  to?: string,
  category?: string,
): Promise<BaseApiResponse<IPaginatedData<IExpense>>> {
  let url = `/api/clinic/expenses?pageNumber=${pageNumber}&pageSize=${pageSize}`
  if (from) url += `&from=${from}`
  if (to) url += `&to=${to}`
  if (category) url += `&category=${encodeURIComponent(category)}`

  return await fetchApi<IPaginatedData<IExpense>>(url, {
    tenantSlug,
    authType: 'staff',
    cache: 'no-store',
  })
}

export async function addExpenseAction(
  tenantSlug: string,
  payload: ExpenseInput, 
): Promise<BaseApiResponse<IExpense>> {
  const result = await fetchApi<IExpense>('/api/clinic/expenses', {
    method: 'POST',
    tenantSlug,
    authType: 'staff',
    body: JSON.stringify(payload),
  })

  if (result.success) {
    revalidatePath(`/${tenantSlug}/dashboard/expenses`)
  }
  return result
}
