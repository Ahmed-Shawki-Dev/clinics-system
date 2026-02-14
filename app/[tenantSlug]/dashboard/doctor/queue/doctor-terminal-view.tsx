'use client'

import { Card, CardContent } from '@/components/ui/card'
import { IQueueBoardSession, IQueueTicket } from '@/types/queue'
import { AlertCircle } from 'lucide-react'
import { useTransition } from 'react'
import { BaseApiResponse } from '../../../../../types/api'
import { CurrentPatientCard } from './current-patient-card'
import { WaitingQueueList } from './waiting-queue-list'


interface Props {
  initialData: IQueueBoardSession
  tenantSlug: string
}

export function DoctorTerminalView({ initialData, tenantSlug }: Props) {
  const [isPending, startTransition] = useTransition()
  const { currentTicket, waitingTickets, isActive, waitingCount } = initialData

  const handleAction = (
    actionFn: (tenantSlug: string, ticketId: string) => Promise<BaseApiResponse<IQueueTicket>>,
    ticketId: string,
  ) => {
    startTransition(async () => {
      await actionFn(tenantSlug, ticketId)
    })
  }

  if (!isActive) {
    return (
      <Card className='border-dashed border-2 shadow-sm'>
        <CardContent className='flex flex-col items-center justify-center h-64 space-y-4'>
          <AlertCircle className='w-12 h-12 text-muted-foreground' />
          <h2 className='text-xl font-bold'>العيادة مغلقة</h2>
          <p className='text-muted-foreground'>
            يجب فتح جلسة عمل (Shift) من الإعدادات لاستقبال المرضى.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className='space-y-8'>
      <CurrentPatientCard
        currentTicket={currentTicket}
        waitingTickets={waitingTickets}
        isPending={isPending}
        onAction={handleAction}
      />

      <WaitingQueueList waitingTickets={waitingTickets} waitingCount={waitingCount} />
    </div>
  )
}
