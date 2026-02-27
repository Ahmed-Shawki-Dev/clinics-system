import { DashboardHeader, DashboardShell } from '@/components/shell'
import { DataTable } from '@/components/ui/data-table'
import { AddStaffDialog } from './add-staff-dialog' 
import { columns } from './columns'
import { getStaffAction } from '../../../../../actions/staff/get-staff'

interface Props {
  params: Promise<{ tenantSlug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function StaffPage({ params, searchParams }: Props) {
  const { tenantSlug } = await params
  const queryParams = await searchParams

  const page = Number(queryParams.page) || 1
  const limit = 10
  const search = (queryParams.search as string) || ''

  const { items, totalCount } = await getStaffAction(tenantSlug, page, limit, search)

  return (
    <DashboardShell>
      <DashboardHeader
        heading='فريق العمل'
        text={`إدارة حسابات الموظفين وصلاحيات الوصول (الإجمالي: ${totalCount})`}
      >
        <AddStaffDialog tenantSlug={tenantSlug} />
      </DashboardHeader>

        <DataTable
          data={items}
          columns={columns}
          searchKey='name'
          filterColumn='role' 
        />
    </DashboardShell>
  )
}
