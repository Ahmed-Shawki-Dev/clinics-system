import { getDoctorAction } from '@/actions/doctor/get-doctor' // تأكد إنك عامل الأكشن ده
import { getVisitAction } from '@/actions/visit/get-visit'
import { VisitTerminalClient } from './visit-terminal-client'

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ visitId: string; tenantSlug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { tab } = await searchParams
  const { visitId, tenantSlug } = await params

  const visitResponse = await getVisitAction(tenantSlug, visitId)
  if (!visitResponse.success || !visitResponse.data) return <div>الزيارة غير موجودة</div>
  const visit = visitResponse.data

  const doctorResponse = await getDoctorAction(tenantSlug, visit.doctorId)
  const doctorConfig = doctorResponse.data?.visitFieldConfig

  return (
    <VisitTerminalClient
      visit={visit}
      tenantSlug={tenantSlug}
      defaultTab={(tab as string) || 'clinical'}
      doctorConfig={doctorConfig} // بنمرر الإعدادات هنا
    />
  )
}
