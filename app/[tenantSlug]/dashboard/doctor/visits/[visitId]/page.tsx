import { getVisitAction } from '@/actions/visit/get-visit'
import { getPatientSummaryAction } from '@/actions/patient/get-patient-summary'
import { getMyVisitFieldsAction } from '@/actions/doctor/get-my-visit-fields'
import { VisitTerminalClient } from './visit-terminal-client'
import { IDoctor } from '@/types/doctor'

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

  // جلب إعدادات حقول الكشف الخاصة بالدكتور الحالي مباشرة
  const fieldsResponse = await getMyVisitFieldsAction(tenantSlug)

  // بناء أوبجيكت وهمي للدكتور عشان الـ Component بتاعك ميضربش (لأنه متوقع IDoctor)
  // لو الـ Client Component محتاج داتا تانية للدكتور غير الـ fields، هتحتاج تعمل Endpoint لـ /api/clinic/doctors/me
  const doctorMock = {
    visitFieldConfig: fieldsResponse.success ? fieldsResponse.data : null,
  } as unknown as IDoctor

  const summaryResponse = await getPatientSummaryAction(tenantSlug, visit.patientId)
  const summary = summaryResponse.success ? summaryResponse.data : null

  return (
    <VisitTerminalClient
      visit={visit}
      tenantSlug={tenantSlug}
      defaultTab={(tab as string) || 'clinical'}
      doctor={doctorMock}
      summary={summary}
    />
  )
}
