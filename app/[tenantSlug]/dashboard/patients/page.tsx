import { getPatients } from '../../../../actions/patient/getPatients'
import { AddPatientModal } from './add-patient-modal'
import { PatientsList } from './patient-list'
import { PatientPagination } from './patient-pagination'
import { PatientSearch } from './patient-search'
import { PermissionGate } from '@/components/auth/permission-gate'
import { ROLES } from '@/config/roles'
// تأكد إن المسار ده صح
import { Typography } from '@/components/ui/typography'

interface PageProps {
  params: Promise<{ tenantSlug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function PatientsPage({ params, searchParams }: PageProps) {
  const { tenantSlug } = await params
  const queryParams = await searchParams

  const page = Number(queryParams.page) || 1
  const limit = 10
  const search = (queryParams.search as string) || ''

  const { items, totalCount } = await getPatients(tenantSlug, page, limit, search)

  return (
    <div className='h-full flex  flex-col space-y-4 '>
      {/* Header Section */}
      <div className='flex items-center justify-between space-y-2'>
        <div>
          <Typography variant='h2'>سجل المرضى</Typography>
          <Typography variant='muted'>إدارة بيانات المرضى والبحث المتقدم داخل العيادة</Typography>
        </div>
        <div className='flex items-center space-x-2'>
          <PermissionGate
            allowedRoles={[ROLES.CLINIC_OWNER, ROLES.CLINIC_MANAGER, ROLES.SUPER_ADMIN]}
          >
            <AddPatientModal />
          </PermissionGate>
        </div>
      </div>

      {/* Content Section */}
      <div className='space-y-4'>
        {/* Search Bar */}
        <div className='flex w-full max-w-sm items-center space-x-2'>
          <PatientSearch />
        </div>

        {/* List & Pagination */}
        <PermissionGate
          allowedRoles={[ROLES.CLINIC_OWNER, ROLES.CLINIC_MANAGER, ROLES.SUPER_ADMIN, ROLES.DOCTOR]}
          fallback={
            <div className='flex h-100 shrink-0 items-center justify-center rounded-md border border-dashed bg-muted/20'>
              <Typography variant='muted'>عذراً، لا تملك صلاحية عرض السجلات.</Typography>
            </div>
          }
        >
          <div >
            <PatientsList data={items} />
          </div>

          <div className='mt-4 flex justify-end'>
            <PatientPagination totalCount={totalCount} pageSize={limit} />
          </div>
        </PermissionGate>
      </div>
    </div>
  )
}
