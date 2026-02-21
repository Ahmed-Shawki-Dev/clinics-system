import { IPublicClinic, IPublicDoctor, IPublicWorkingHour } from '@/types/public'
import DoctorsSection from '../../components/clinic-landing-page-template/DoctorsSection'
import Footer from '../../components/clinic-landing-page-template/Footer'
import { Navbar } from '../../components/clinic-landing-page-template/navbar'
import WorkingHoursSection from '../../components/clinic-landing-page-template/WorkingHoursSection'
import { fetchApi } from '../../lib/fetchApi'
import Hero from '../../components/clinic-landing-page-template/Hero'

interface PageProps {
  params: Promise<{ tenantSlug: string }>
}

export default async function Page({ params }: PageProps) {
  const { tenantSlug } = await params

  const [clinic, doctors, workingHours] = await Promise.all([
    fetchApi<IPublicClinic>(`/api/public/${tenantSlug}/clinic`),
    fetchApi<IPublicDoctor[]>(`/api/public/${tenantSlug}/doctors`),
    fetchApi<IPublicWorkingHour[]>(`/api/public/${tenantSlug}/working-hours`),
  ])

  const enabledDoctors = doctors.data?.filter((d) => d.isEnabled)
  const activeWorkingHours = workingHours.data?.filter((w) => w.isActive)

  return (
    <main className='w-full flex flex-col min-h-screen'>
      <Navbar clinic={clinic.data!} />
      <Hero clinic={clinic.data!} />
      <DoctorsSection doctors={enabledDoctors!} />
      <WorkingHoursSection workingHours={activeWorkingHours!} />
      <Footer clinic={clinic.data!} />
    </main>
  )
}
