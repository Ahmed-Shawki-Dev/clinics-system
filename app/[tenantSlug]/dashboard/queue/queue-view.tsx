'use client'

import { IDoctor } from '@/types/doctor'
import { IPatient } from '@/types/patient'
import { IQueueBoard } from '@/types/queue'
import { LayoutGrid } from 'lucide-react'
import { CutTicketDialog } from './cut-ticket-dialog'
import { DoctorQueueCard } from './doctor-queue-card'
import { OpenSessionDialog } from './open-session-dialog'

interface QueueViewProps {
  tenantSlug: string
  initialBoard: IQueueBoard
  patients: IPatient[]
  doctors: IDoctor[]
}

export function QueueView({ tenantSlug, initialBoard, patients, doctors }: QueueViewProps) {

  const activeSessions = (initialBoard.sessions || []).filter((s) => s.isActive)

  return (
    <div className='space-y-8 p-6'>
      {/* 1. Header الأكشنز السريعة */}
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card p-6 rounded-xl border shadow-sm'>
        <div>
          <h1 className='text-3xl font-black tracking-tight'>إدارة الطابور المباشر</h1>
          <p className='text-muted-foreground'>مراقبة العيادات وإصدار تذاكر المرضى لحظياً.</p>
        </div>
        <div className='flex items-center gap-3'>
          <OpenSessionDialog
            tenantSlug={tenantSlug}
            doctors={doctors}
            activeSessions={activeSessions}
          />
          <CutTicketDialog
            tenantSlug={tenantSlug}
            patients={patients}
            activeSessions={activeSessions}
            doctors={doctors}
          />
        </div>
      </div>

      {/* 2. الـ Grid بتاع العيادات المفتوحة */}
      {activeSessions.length > 0 ? (
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
          {activeSessions.map((session) => (
            <DoctorQueueCard key={session.sessionId} tenantSlug={tenantSlug} session={session} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className='flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-2xl bg-muted/20'>
          <LayoutGrid className='h-16 w-16 text-muted-foreground/30 mb-4' />
          <h3 className='text-xl font-bold'>لا توجد عيادات نشطة حالياً</h3>
          <p className='text-muted-foreground max-w-sm text-center mt-2'>
            ابدأ بفتح شفت جديد لأحد الأطباء لتتمكن من إصدار التذاكر ومراقبة الطابور.
          </p>
        </div>
      )}
    </div>
  )
}
