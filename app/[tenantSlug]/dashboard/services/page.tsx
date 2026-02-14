import { getDoctorsAction } from '@/actions/doctor/get-doctors'
import { ServicesView } from './services-view'
import { DashboardHeader, DashboardShell } from '../../../../components/shell'

interface Props {
  params: Promise<{ tenantSlug: string }>
}

export default async function ServicesPage({ params }: Props) {
  const { tenantSlug } = await params

  // استلام الـ response اللي الـ data بتاعته { items: IDoctor[] }
  const response = await getDoctorsAction(tenantSlug)

  return (
    <DashboardShell>
      <DashboardHeader
        heading='الخدمات'
        text='إدارة قائمة الخدمات وتعيين الأسعار الخاصة بكل طبيب.'
      />

      {/* بنباصي الـ data (الأوبجيكت) مباشرة للـ View */}
      <ServicesView doctors={response.data} tenantSlug={tenantSlug} />
    </DashboardShell>
  )
}
