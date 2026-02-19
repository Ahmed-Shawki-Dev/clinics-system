import { getDoctorsAction } from '@/actions/doctor/get-doctors'
import { getPatientsAction } from '@/actions/patient/getPatients'
import { getQueueBoard } from '@/actions/queue/queue-board'
import { DashboardHeader, DashboardShell } from '@/components/shell'
import { QueueActions } from './queue-actions' // استيراد الكومبوننت الجديد
import { QueueView } from './queue-view'

export default async function QueuePage({ params }: { params: Promise<{ tenantSlug: string }> }) {
  const { tenantSlug } = await params

  // 1. جلب الداتا بالتوازي
  const [boardRes, patientsRes, doctorsRes] = await Promise.all([
    getQueueBoard(tenantSlug),
    getPatientsAction(tenantSlug),
    getDoctorsAction(tenantSlug),
  ])

  // 2. تجهيز الداتا
  const activeSessions = (boardRes.data?.sessions || []).filter((s) => s.isActive)
  const patients = patientsRes.data?.items || []
  const doctors = doctorsRes.data?.items || []

  return (
    <DashboardShell>
      <DashboardHeader
        heading='إدارة الطابور'
        text={`مراقبة العيادات وإصدار التذاكر. يوجد ${activeSessions.length} عيادات نشطة حالياً.`}
      >
        <QueueActions
          tenantSlug={tenantSlug}
          doctors={doctors}
          patients={patients}
          activeSessions={activeSessions}
        />
      </DashboardHeader>

      <QueueView tenantSlug={tenantSlug} activeSessions={activeSessions} />
    </DashboardShell>
  )
}
