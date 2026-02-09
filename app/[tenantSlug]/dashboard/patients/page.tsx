import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { getPatients } from '../../../../actions/patient/getPatients'
import { PatientsList } from './patient-list'
import { PatientPagination } from './patient-pagination'
import { PatientSearch } from './patient-search'

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
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>سجل المرضى</h1>
          <p className='text-muted-foreground mt-1'>إدارة بيانات المرضى والبحث المتقدم</p>
        </div>
        <Button>
          <Plus className='mr-2 h-4 w-4' /> مريض جديد
        </Button>
      </div>

      <div className='flex items-center gap-2'>
        <PatientSearch />
      </div>

      <PatientsList data={items} />

      <div className='mt-auto border-t pt-4'>
        <PatientPagination totalCount={totalCount} pageSize={limit} />
      </div>
    </div>
  )
}
