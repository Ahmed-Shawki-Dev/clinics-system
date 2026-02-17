// app/[tenantSlug]/page.tsx

import { IPublicClinic, IPublicDoctor, IPublicService, IPublicWorkingHour } from '@/types/public'
import DoctorsSection from '../../components/clinic-landing-page-template/DoctorsSection'
import Footer from '../../components/clinic-landing-page-template/Footer'
import Hero from '../../components/clinic-landing-page-template/Hero'
import Navbar from '../../components/clinic-landing-page-template/Navbar'
import ServicesSection from '../../components/clinic-landing-page-template/ServicesSection'
import WorkingHoursSection from '../../components/clinic-landing-page-template/WorkingHoursSection'
import { fetchApi } from '../../lib/fetchApi'

interface PageProps {
  params: Promise<{ tenantSlug: string }>
}

export default async function Page({ params }: PageProps) {
  const { tenantSlug } = await params

  const [clinic, doctors, services, workingHours] = await Promise.all([
    fetchApi<IPublicClinic>(`/api/public/${tenantSlug}/clinic`),
    fetchApi<IPublicDoctor[]>(`/api/public/${tenantSlug}/doctors`),
    fetchApi<IPublicService[]>(`/api/public/${tenantSlug}/services`),
    fetchApi<IPublicWorkingHour[]>(`/api/public/${tenantSlug}/working-hours`),
  ])

  const enabledDoctors = doctors.data?.filter((d) => d.isEnabled)
  const activeWorkingHours = workingHours.data?.filter((w) => w.isActive)

  return (
    <>
      <Navbar clinic={clinic.data!} />
      <Hero clinic={clinic.data!} />
      <DoctorsSection doctors={enabledDoctors!} />
      <ServicesSection services={services.data!} />
      <WorkingHoursSection workingHours={activeWorkingHours!} />
      <Footer clinic={clinic.data!} />
    </>
  )
}
