import { getDoctorsAction } from '@/actions/doctor/get-doctors'
import { DashboardHeader, DashboardShell } from '@/components/shell'
import { ServicesView } from './services-view'

interface Props {
  params: Promise<{ tenantSlug: string }>
}

export default async function ServicesPage({ params }: Props) {
  const { tenantSlug } = await params

  const { data } = await getDoctorsAction(tenantSlug)

  return (
    <DashboardShell>
      <DashboardHeader
        heading='الخدمات'
        text='إدارة قائمة الخدمات وتعيين الأسعار الخاصة بكل طبيب.'
      />

      <ServicesView doctors={data.items} tenantSlug={tenantSlug} />
    </DashboardShell>
  )
}
