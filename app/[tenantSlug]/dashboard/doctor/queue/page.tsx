import { getMyQueueAction } from '@/actions/doctor/get-my-queue'
import { AlertCircle } from 'lucide-react'
import { DashboardHeader, DashboardShell } from '../../../../../components/shell' // راجع مسارك
import { DoctorTerminalView } from './doctor-terminal-view'

export default async function DoctorQueuePage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>
}) {
  const { tenantSlug } = await params

  const queueRes = await getMyQueueAction(tenantSlug)
  if (!queueRes.success || !queueRes.data) {
    return (
      <DashboardShell>
        <DashboardHeader heading='إدارة العيادة' text='طابور المرضى الحالي' />
        <div className='flex flex-col items-center justify-center h-[60vh] space-y-4 border-2 border-dashed rounded-lg border-muted bg-muted/10'>
          <AlertCircle className='w-16 h-16 text-muted-foreground' />
          <h2 className='text-2xl font-bold text-destructive'>خطأ في تحميل الطابور</h2>
          <p className='text-muted-foreground'>
            { 'يرجى التأكد من فتح جلسة عمل (شفت) لاستقبال المرضى.'}
          </p>
        </div>
      </DashboardShell>
    )
  }

  // 2. حالة النجاح الطبيعية
  return (
    <DashboardShell>
      <DashboardHeader heading='إدارة العيادة' text='طابور المرضى الحالي' />
      <DoctorTerminalView initialData={queueRes.data} tenantSlug={tenantSlug} />
    </DashboardShell>
  )
}
