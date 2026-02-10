import { getDoctorsAction } from '@/actions/doctor/get-doctors'
import { DashboardHeader, DashboardShell } from '@/components/shell'
import { DataTable } from '@/components/ui/data-table'
import { AddDoctorDialog } from './add-doctor-dialog'
import { columns } from './columns'

interface Props {
  params: Promise<{ tenantSlug: string }>
}

export default async function DoctorsPage({ params }: Props) {
  const { tenantSlug } = await params
  const { data } = await getDoctorsAction(tenantSlug)

  const specialties = Array.from(new Set(data.items.map((d) => d.specialty))).filter(
    Boolean,
  ) as string[]

  return (
    <DashboardShell>
      <DashboardHeader
        heading='الأطباء'
        text={`إدارة قائمة الأطباء المسجلين بالعيادة`}
      >
        <AddDoctorDialog tenantSlug={tenantSlug} />
      </DashboardHeader>

        <DataTable
          data={data.items}
          columns={columns}
          searchKey='name'
          filterColumn='specialty'
          filterOptions={specialties}
        />
    </DashboardShell>
  )
}
