import { LiveQueueStatus } from '@/components/patient/live-queue-status'

export default async function PatientDashboardPage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>
}) {
  const { tenantSlug } = await params

  return (
    <div className='space-y-6 pt-2'>
      <div className='space-y-1'>
        <h1 className='text-2xl font-bold tracking-tight'>مرحباً بك،</h1>
        <p className='text-sm text-muted-foreground'>تابع دورك أو احجز موعدك القادم بسهولة.</p>
      </div>

      {/* الكومبوننت اللي شغال SWR ومبيخليش الصفحة ترعش */}
      <LiveQueueStatus tenantSlug={tenantSlug} />

      {/* ممكن تحط هنا بعدين كروت سريعة زي (آخر روشتة، الموعد القادم) */}
    </div>
  )
}
