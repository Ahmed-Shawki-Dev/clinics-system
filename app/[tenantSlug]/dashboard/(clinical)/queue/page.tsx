import { getDoctorsAction } from '@/actions/doctor/get-doctors'
import { getPatientsAction } from '@/actions/patient/getPatients'
import { getQueueBoard } from '@/actions/queue/queue-board'
import { DashboardHeader, DashboardShell } from '@/components/shell'
import { QueueActions } from './queue-actions'
import { QueueView } from './queue-view'

export default async function QueuePage({ params }: { params: Promise<{ tenantSlug: string }> }) {
  const { tenantSlug } = await params

  // 1. جلب الداتا بالتوازي من السيرفر
  const [boardRes, patientsRes, doctorsRes] = await Promise.all([
    getQueueBoard(tenantSlug),
    getPatientsAction(tenantSlug),
    getDoctorsAction(tenantSlug),
  ])

  // 2. تجهيز الداتا لزراير الأكشن
  const activeSessions = (boardRes.data?.sessions || []).filter((s) => s.isActive)
  const patients = patientsRes?.items || []
  const doctors = doctorsRes?.doctors || []

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

      {/* باصينا الداتا الكاملة بتاعت البورد كـ Initial Data */}
      <QueueView tenantSlug={tenantSlug} initialBoardRes={boardRes} doctors={doctors} />
    </DashboardShell>
  )
}
