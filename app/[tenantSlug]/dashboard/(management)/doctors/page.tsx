import { getDoctorsAction } from '@/actions/doctor/get-doctors'
import { DashboardHeader, DashboardShell } from '@/components/shell'
import { DataTable } from '@/components/ui/data-table'
import { AddDoctorDialog } from './add-doctor-dialog'
import { columns } from './columns' // استدعاء المصفوفة العادية

interface Props {
  params: Promise<{ tenantSlug: string }>
}

export default async function DoctorsPage({ params }: Props) {
  const { tenantSlug } = await params
  const response = await getDoctorsAction(tenantSlug)

  const doctors = response.data?.items || []
  const specialties = Array.from(new Set(doctors.map((d) => d.specialty))).filter(
    Boolean,
  ) as string[]

  return (
    <DashboardShell>
      <DashboardHeader heading='الأطباء' text='إدارة قائمة الأطباء المسجلين بالعيادة'>
        <AddDoctorDialog tenantSlug={tenantSlug} />
      </DashboardHeader>

      <DataTable
        data={doctors}
        columns={columns} // تمرير مباشر
        searchKey='name'
        filterColumn='specialty'
        filterOptions={specialties}
      />
    </DashboardShell>
  )
}
