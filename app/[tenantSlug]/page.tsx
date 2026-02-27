import { notFound } from 'next/navigation'
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

  // الريكويست بتاع clinic ده هيجي من الكاش فوراً لأن اللايوت لسه جايبه
  const [clinicRes, doctorsRes, workingHoursRes] = await Promise.all([
    fetchApi<IPublicClinic>(`/api/public/${tenantSlug}/clinic`),
    fetchApi<IPublicDoctor[]>(`/api/public/${tenantSlug}/doctors`),
    fetchApi<IPublicWorkingHour[]>(`/api/public/${tenantSlug}/working-hours`),
  ])

  // الحماية الصارمة: لو مفيش عيادة، ارميه 404 فوراً وماتكملش
  if (!clinicRes.success || !clinicRes.data) {
    return notFound()
  }

  const clinic = clinicRes.data

  // حماية المصفوفات من الـ undefined لو الـ API فشل
  const enabledDoctors = doctorsRes.data?.filter((d) => d.isEnabled) || []
  const activeWorkingHours = workingHoursRes.data?.filter((w) => w.isActive) || []

  return (
    <main className='flex min-h-screen w-full flex-col'>
      {/* دلوقتي التايب سكريبت مطمن، ومفيش ولا علامة ! واحدة */}
      <Navbar clinic={clinic} />
      <Hero clinic={clinic} />

      {/* ماترسمش السكاشن لو مفيش داتا جواها */}
      {enabledDoctors.length > 0 && <DoctorsSection doctors={enabledDoctors} />}
      {activeWorkingHours.length > 0 && <WorkingHoursSection workingHours={activeWorkingHours} />}

      <Footer clinic={clinic} />
    </main>
  )
}
