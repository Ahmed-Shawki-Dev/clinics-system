import { getVisitAction } from '@/actions/visit/get-visit'
import { DashboardHeader, DashboardShell } from '@/components/shell'
import { AlertCircle } from 'lucide-react'
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
  const response = await getVisitAction(tenantSlug, visitId)
  if (!response.success || !response.data) {
    return (
      <DashboardShell>
        <DashboardHeader heading='تفاصيل الزيارة' text='' />
        <div className='flex flex-col items-center justify-center h-[60vh] space-y-4 border-2 border-dashed rounded-lg border-muted bg-muted/10'>
          <AlertCircle className='w-16 h-16 text-muted-foreground' />
          <h2 className='text-2xl font-bold text-destructive'>خطأ في تحميل الزيارة</h2>
          <p className='text-muted-foreground'>تعذّر العثور على الزيارة أو ليس لديك صلاحية الوصول إليها.</p>
        </div>
      </DashboardShell>
    )
  }

  return (
    <VisitTerminalClient
      visit={response.data}
      tenantSlug={tenantSlug}
      defaultTab={(tab as string) || 'clinical'}
    />
  )
}
