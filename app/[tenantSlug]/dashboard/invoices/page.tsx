import { getInvoicesAction } from '@/actions/finance/invoices'
import { DashboardHeader, DashboardShell } from '../../../../components/shell'
import { InvoicesClient } from './invoices-client'
import { PeriodFilter } from '../../../../components/shared/period-filter'
// import { StatusFilter } from './status-filter' // لو عملتها زي ما اتفقنا فك الكومنت

export default async function InvoicesPage({
  params,
  searchParams,
}: {
  params: Promise<{ tenantSlug: string }>
  searchParams: Promise<{ page?: string; from?: string; to?: string }>
}) {
  const { tenantSlug } = await params
  const { page, from, to } = await searchParams
  const currentPage = Number(page) || 1

  const response = await getInvoicesAction(tenantSlug, currentPage, 10, from, to)
  const invoices = response?.data?.items || []

  const pagination = {
    pageNumber: response?.data?.pageNumber || 1,
    totalPages: response?.data?.totalPages || 1,
    hasNextPage: response?.data?.hasNextPage || false,
    hasPreviousPage: response?.data?.hasPreviousPage || false,
  }

  return (
    <DashboardShell>
      <DashboardHeader heading='الفواتير والمدفوعات' text='إدارة مستحقات العيادة والتحصيلات'>
        <PeriodFilter />
      </DashboardHeader>

      <InvoicesClient initialInvoices={invoices} tenantSlug={tenantSlug} pagination={pagination} />
    </DashboardShell>
  )
}
