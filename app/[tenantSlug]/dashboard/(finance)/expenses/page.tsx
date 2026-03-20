import { getExpensesAction } from '@/actions/finance/expenses'
import { PeriodFilter } from '../../../../../components/shared/period-filter'
import { DashboardHeader, DashboardShell } from '../../../../../components/shell'
import { ExpensesClient } from './expenses-client'

export default async function ExpensesPage({
  params,
  searchParams,
}: {
  params: Promise<{ tenantSlug: string }>
  searchParams: Promise<{ page?: string; from?: string; to?: string; category?: string }>
}) {
  const { tenantSlug } = await params
  const { page, from, to, category } = await searchParams
  const currentPage = Number(page) || 1

  const response = await getExpensesAction(tenantSlug, currentPage, 10, from, to, category)
  const expenses = response?.data?.items || []

  const pagination = {
    pageNumber: response?.data?.pageNumber || 1,
    totalPages: response?.data?.totalPages || 1,
    hasNextPage: response?.data?.hasNextPage || false,
    hasPreviousPage: response?.data?.hasPreviousPage || false,
  }

  // 🔴 الحسبة الصح: بنجيب الإجمالي من الـ API مباشرة لو باعت Meta
  // لو مش باعت، هنحسب اللي راجع في الصفحة (بس الأفضل الـ Total من الباك إند)
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)

  return (
    <DashboardShell>
      <DashboardHeader heading='المصروفات' text='إدارة النفقات والمدفوعات الخارجية للعيادة'>
        <div className='flex items-center gap-3'>
          <span>المصروفات</span>
          <span className='text-xs font-medium bg-destructive/10 text-destructive px-2 py-0.5 rounded-full border border-destructive/20'>
            {new Intl.NumberFormat('ar-EG-u-nu-latn').format(totalExpenses)} ج.م
          </span>
        </div>
        <PeriodFilter />
      </DashboardHeader>

      <ExpensesClient initialExpenses={expenses} tenantSlug={tenantSlug} pagination={pagination} />
    </DashboardShell>
  )
}
