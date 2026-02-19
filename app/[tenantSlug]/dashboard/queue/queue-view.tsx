'use client'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
// import { ScrollArea } from '@/components/ui/scroll-area' // هنستغنى عنه هنا عشان الموبايل
import { cn } from '@/lib/utils'
import { IQueueBoardSession } from '@/types/queue'
import { LayoutGrid } from 'lucide-react'
import * as React from 'react'
import { DoctorQueueCard } from './doctor-queue-card'

interface QueueViewProps {
  tenantSlug: string
  activeSessions: IQueueBoardSession[]
}

export function QueueView({ tenantSlug, activeSessions }: QueueViewProps) {
  const [selectedSessionId, setSelectedSessionId] = React.useState<string | null>(
    activeSessions.length > 0 ? activeSessions[0].sessionId : null,
  )

  React.useEffect(() => {
    if (
      activeSessions.length > 0 &&
      !activeSessions.find((s) => s.sessionId === selectedSessionId)
    ) {
      setSelectedSessionId(activeSessions[0].sessionId)
    }
  }, [activeSessions, selectedSessionId])

  const selectedSession = activeSessions.find((s) => s.sessionId === selectedSessionId)

  return (
    <div className='flex flex-col h-[calc(100vh-220px)] md:h-[calc(100vh-200px)] gap-6'>
      {activeSessions.length > 0 ? (
        <div className='flex flex-col md:flex-row flex-1 gap-4 md:gap-6 overflow-hidden'>
          {/* Sidebar List (Fixed for Mobile & Desktop) */}
          <Card className='w-full md:w-72 shrink-0 flex flex-col overflow-hidden border bg-muted/20'>
            <div className='p-3 border-b bg-background/50'>
              <h3 className='text-xs font-medium text-muted-foreground uppercase tracking-wider'>
                قائمة العيادات
              </h3>
            </div>

            {/* التعديل الهندسي هنا:
                1. شلنا ScrollArea واستخدمنا div عادي.
                2. overflow-x-auto: عشان يسكرول بالعرض في الموبايل.
                3. md:overflow-y-auto: عشان يسكرول بالطول في الديسك توب.
                4. md:overflow-x-hidden: عشان نمنع السكرول العرضي في الديسك توب.
            */}
            <div className='flex-1 overflow-x-auto md:overflow-x-hidden md:overflow-y-auto'>
              <div className='flex md:flex-col p-2 gap-2 min-w-max md:min-w-0'>
                {activeSessions.map((session) => {
                  const isSelected = session.sessionId === selectedSessionId
                  return (
                    <button
                      key={session.sessionId}
                      onClick={() => setSelectedSessionId(session.sessionId)}
                      className={cn(
                        'flex items-center justify-between p-3 rounded-md text-sm transition-colors border text-right',
                        // min-w-[200px]: مهمة جداً في الموبايل عشان الزرار ياخد راحته ومينفعصش
                        'min-w-50 md:min-w-0',
                        isSelected
                          ? 'bg-background border-primary shadow-sm text-primary font-medium'
                          : 'bg-transparent border-transparent hover:bg-background/50 text-muted-foreground hover:text-foreground',
                      )}
                    >
                      <div className='flex items-center gap-2 truncate max-w-30 md:max-w-full'>
                        <div
                          className={cn(
                            'w-2 h-2 rounded-full shrink-0',
                            session.currentTicket ? 'bg-orange-500' : 'bg-green-500',
                          )}
                        />
                        <span className='truncate'>د. {session.doctorName}</span>
                      </div>
                      <Badge variant='secondary' className='mr-2 text-xs h-5 px-1.5 font-normal'>
                        {session.waitingCount}
                      </Badge>
                    </button>
                  )
                })}
              </div>
            </div>
          </Card>

          {/* Main Detail View */}
          <div className='flex-1 h-full overflow-hidden rounded-lg border bg-background shadow-sm'>
            {selectedSession ? (
              <div className='h-full overflow-y-auto'>
                <DoctorQueueCard
                  key={selectedSession.sessionId}
                  tenantSlug={tenantSlug}
                  session={selectedSession}
                />
              </div>
            ) : (
              <div className='h-full flex flex-col items-center justify-center text-muted-foreground'>
                <p>اختر عيادة لعرض التفاصيل</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className='flex flex-col items-center justify-center flex-1 border border-dashed rounded-lg bg-muted/10 p-8 text-center'>
          <div className='p-4 rounded-full bg-muted/30 mb-4'>
            <LayoutGrid className='h-8 w-8 text-muted-foreground' />
          </div>
          <h3 className='text-lg font-medium'>لا توجد عيادات نشطة</h3>
          <p className='text-sm text-muted-foreground mt-1'>شغل عيادة</p>
        </div>
      )}
    </div>
  )
}
