import { getDoctorsAction } from '../../../../actions/doctor/get-doctors'
import { getPatientsAction } from '../../../../actions/patient/getPatients'
import { getQueueBoard } from '../../../../actions/queue/queue-board'
import { QueueView } from './queue-view'

export default async function QueuePage({ params }: { params: Promise<{ tenantSlug: string }> }) {
  const { tenantSlug } = await params
  // هندسة: جلب الداتا بالتوازي لضمان أقصى سرعة (Parallel Fetching)
  const [boardRes, patientsRes, doctorsRes] = await Promise.all([
    getQueueBoard(tenantSlug),
    getPatientsAction(tenantSlug), // بنجيب المرضى للبحث اللحظي
    getDoctorsAction(tenantSlug),
  ])
  console.log(tenantSlug)
  console.log(doctorsRes)

  return (
    <QueueView
      tenantSlug={tenantSlug}
      initialBoard={boardRes.data || { sessions: [] }}
      patients={patientsRes.data?.items || []}
      doctors={doctorsRes.data?.items || []}
    />
  )
}
