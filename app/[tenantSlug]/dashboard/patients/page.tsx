import { getPatients } from '../../../../actions/patient/getPatients'
import { Typography } from '../../../../components/ui/typography'
import { AddPatientModal } from './add-patient-modal'
import { PatientsList } from './patient-list'
import { PatientPagination } from './patient-pagination'
import { PatientSearch } from './patient-search'
// 1. استدعاء البوابة والأدوار
import { PermissionGate } from '@/components/auth/permission-gate'
import { ROLES } from '@/config/roles'

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
    <div className='flex flex-col gap-6 p-6 h-full'>
      <div className='flex items-center justify-between'>
        <div className='space-y-2'>
          <Typography variant='h3' className='text-4xl'>
            سجل المرضى
          </Typography>
          <Typography variant='muted'>إدارة بيانات المرضى والبحث المتقدم</Typography>
        </div>

        <PermissionGate
          allowedRoles={[ROLES.CLINIC_OWNER, ROLES.CLINIC_MANAGER, ROLES.SUPER_ADMIN]}
        >
          <AddPatientModal />
        </PermissionGate>
      </div>

      <div className='flex items-center gap-2'>
        <PatientSearch />
      </div>

      <PermissionGate
        allowedRoles={[ROLES.CLINIC_OWNER, ROLES.CLINIC_MANAGER, ROLES.SUPER_ADMIN, ROLES.DOCTOR]}
        fallback={
          <div className='p-10 text-center border rounded-lg bg-muted/20'>
            عذراً، لا تملك صلاحية عرض سجلات المرضى.
          </div>
        }
      >
        <PatientsList data={items} />

        <div className='mt-auto border-t pt-4'>
          <PatientPagination totalCount={totalCount} pageSize={limit} />
        </div>
      </PermissionGate>
    </div>
  )
}
