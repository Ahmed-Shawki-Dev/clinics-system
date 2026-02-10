import { getDoctorsAction } from '@/actions/doctor/get-doctors'
import { DataTable } from '@/components/ui/data-table'
// تأكد إن المسار ده صح حسب مكان ملف الـ Typography بتاعك
import { Typography } from '@/components/ui/typography'
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
    <div className=' h-full flex-1 flex-col space-y-4 flex'>
      <div className='flex items-center justify-between space-y-2'>
        <div>
          <Typography variant='h2'>الأطباء</Typography>
          <Typography variant='muted'>
            إدارة قائمة الأطباء المسجلين بالعيادة ({data.items.length})
          </Typography>
        </div>
        <div className='flex items-center space-x-2'>
          <AddDoctorDialog tenantSlug={tenantSlug} />
        </div>
      </div>

      {/* Table Section */}
      <div className='flex-1 '>
        <DataTable
          data={data.items}
          columns={columns}
          searchKey='name'
          filterColumn='specialty'
          filterOptions={specialties}
        />
      </div>
    </div>
  )
}
