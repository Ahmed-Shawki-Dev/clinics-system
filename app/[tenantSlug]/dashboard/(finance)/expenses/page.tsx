import { getExpensesAction } from '@/actions/finance/expenses'
import { ExpensesClient } from './expenses-client'
import { DashboardHeader, DashboardShell } from '../../../../../components/shell';
import { PeriodFilter } from '../../../../../components/shared/period-filter';


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

  // بنباصي الفلاتر للأكشن هنا
  const response = await getExpensesAction(tenantSlug, currentPage, 10, from, to, category)
  const expenses = response?.data?.items || []

  const pagination = {
    pageNumber: response?.data?.pageNumber || 1,
    totalPages: response?.data?.totalPages || 1,
    hasNextPage: response?.data?.hasNextPage || false,
    hasPreviousPage: response?.data?.hasPreviousPage || false,
  }

  // نحسب إجمالي المصروفات في الفترة دي عشان نعرضه للمدير
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)

  return (
    <DashboardShell>
      <DashboardHeader heading='المصروفات' text='إدارة النفقات والمدفوعات الخارجية للعيادة'>
        <div className='flex items-center gap-4'>
          {/* دي لقطة بيزنس: بنعرض الإجمالي بتاع الفترة المختارة */}
          <div className='text-sm font-bold bg-muted px-4 py-2 rounded-md'>
            إجمالي المصروفات: <span className='text-destructive'>{totalExpenses} ج.م</span>
          </div>

          {/* فلتر التواريخ الجينيريك بتاعنا */}
          <PeriodFilter />
        </div>
      </DashboardHeader>

      <ExpensesClient initialExpenses={expenses} tenantSlug={tenantSlug} pagination={pagination} />
    </DashboardShell>
  )
}
