import { getBookingsAction } from '@/actions/booking/get-booking'
import { getDoctorsAction } from '@/actions/doctor/get-doctors'
import { getPatientsAction } from '@/actions/patient/getPatients'
import { DashboardHeader, DashboardShell } from '@/components/shell'
import { Loader2 } from 'lucide-react'
import { Suspense } from 'react'
import { AppointmentsView } from './appointments-view'
import { BookingModal } from './booking-modal'

interface PageProps {
  params: Promise<{ tenantSlug: string }>
}

export default async function AppointmentsPage({ params }: PageProps) {
  const { tenantSlug } = await params

  const [doctorsData, patientsData, bookingsData] = await Promise.all([
    getDoctorsAction(tenantSlug),
    getPatientsAction(tenantSlug),
    getBookingsAction(tenantSlug),
  ])

  const doctorsList = doctorsData?.data?.items || []
  const patientsList = patientsData?.items || []
  const bookingsList = bookingsData?.items || []

  return (
    <DashboardShell>
      <DashboardHeader heading='إدارة الحجوزات' text='عرض وجدولة المواعيد الخاصة بالعيادة.'>
        <BookingModal doctors={doctorsList} patients={patientsList} />
      </DashboardHeader>

      <Suspense
        fallback={
          <div className='flex justify-center p-10'>
            <Loader2 className='animate-spin' />
          </div>
        }
      >
        <AppointmentsView bookingsList={bookingsList} />
      </Suspense>
    </DashboardShell>
  )
}
