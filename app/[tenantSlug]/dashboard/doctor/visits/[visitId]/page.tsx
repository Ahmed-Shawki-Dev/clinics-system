import { getDoctorAction } from '@/actions/doctor/get-doctor'
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

  // هنجيب بيانات الدكتور
  const doctorResponse = await getDoctorAction(tenantSlug, visit.doctorId)
  const doctor = doctorResponse.data // هنا الداتا كاملة

  return (
    <VisitTerminalClient
      visit={visit}
      tenantSlug={tenantSlug}
      defaultTab={(tab as string) || 'clinical'}
      doctor={doctor!} // تمرير كائن الدكتور بدل الـ Config بس
    />
  )
}
