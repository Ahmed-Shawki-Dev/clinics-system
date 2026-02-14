import { PermissionGate } from '@/components/auth/permission-gate'
import { Typography } from '@/components/ui/typography'
import { ROLES } from '@/config/roles'
import { getPatientsAction } from '../../../../actions/patient/getPatients'
import { DashboardHeader, DashboardShell } from '../../../../components/shell'
import { AddPatientModal } from './add-patient-modal'
import { PatientSearch } from './patient-search'
import { PatientsList } from './patient-list'
import { PatientPagination } from './patient-pagination'


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

  // 1. استلام الـ Response كامل بالعقد الجديد (BaseApiResponse)
  const response = await getPatientsAction(tenantSlug, page, limit, search)

  // 2. استخراج البيانات بأمان باستخدام Optional Chaining
  // لاحظ إننا بندخل جوه response ثم data ثم items
  const patients = response.data?.items || []
  const totalCount = response.data?.totalCount || 0

  return (
    <DashboardShell>
      <DashboardHeader heading='سجل المرضى' text='إدارة بيانات المرضى والبحث المتقدم داخل العيادة'>
        <PermissionGate
          allowedRoles={[ROLES.CLINIC_OWNER, ROLES.CLINIC_MANAGER, ROLES.SUPER_ADMIN]}
        >
          <AddPatientModal />
        </PermissionGate>
      </DashboardHeader>

      <div className='space-y-4'>
        <div className='flex w-full max-w-sm items-center space-x-2'>
          <PatientSearch />
        </div>

        <PermissionGate
          allowedRoles={[ROLES.CLINIC_OWNER, ROLES.CLINIC_MANAGER, ROLES.SUPER_ADMIN, ROLES.DOCTOR]}
          fallback={
            <div className='flex h-100 shrink-0 items-center justify-center rounded-md border border-dashed bg-muted/20'>
              <Typography variant='muted'>عذراً، لا تملك صلاحية عرض السجلات.</Typography>
            </div>
          }
        >
          {/* 3. باصينا المصفوفة الصافية للـ List */}
          <PatientsList data={patients} />

          <div className='mt-4 flex justify-end'>
            {/* 4. باصينا الـ totalCount اللي طلعناه من الـ data */}
            <PatientPagination totalCount={totalCount} pageSize={limit} />
          </div>
        </PermissionGate>
      </div>
    </DashboardShell>
  )
}
