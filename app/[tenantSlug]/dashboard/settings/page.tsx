import { getClinicSettings } from '@/actions/settings/get-settings'
import { notFound } from 'next/navigation'
import { DashboardHeader, DashboardShell } from '../../../../components/shell'
import { SettingsForm } from './settings-form'

interface SettingsPageProps {
  params: Promise<{ tenantSlug: string }>
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  const resolvedParams = await params
  const { tenantSlug } = resolvedParams

  const response = await getClinicSettings(tenantSlug)

  if (!response.data) {
    return notFound()
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading='إعدادات العيادة'
        text='إدارة المعلومات الأساسية، أرقام التواصل، وأوقات العمل.'
      />
      <SettingsForm initialData={response.data} tenantSlug={tenantSlug} />
    </DashboardShell>
  )
}
