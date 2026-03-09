'use client'

import { getMyQueueAction } from '@/actions/doctor/get-my-queue'
import { ICreateTicketResponse, IQueueBoardSession, IQueueTicket } from '@/types/queue'
import { AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import useSWR from 'swr'
import { BaseApiResponse } from '../../../../../types/api'
import { CurrentPatientCard } from './current-patient-card'
import { OpenMySessionButton } from './open-my-session-button'
import { WaitingQueueList } from './waiting-queue-list'

interface Props {
  // عدلنا النوع عشان يقبل null في البداية
  initialData: IQueueBoardSession | null
  tenantSlug: string
}

export function DoctorTerminalView({ initialData, tenantSlug }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // الـ SWR ده بقى شغال 24 ساعة، سواء العيادة مقفولة أو مفتوحة
  const { data: queueData, mutate } = useSWR(
    ['doctorQueue', tenantSlug],
    async ([, slug]) => {
      const res = await getMyQueueAction(slug)
      if (!res.success || !res.data) return null
      return res.data
    },
    {
      fallbackData: initialData,
      refreshInterval: 10000, // كل 10 ثواني هيسأل
      revalidateOnFocus: true,
      keepPreviousData: true,
      refreshWhenHidden: false,
    },
  )

  // بنعتمد على الداتا اللي جاية من SWR (ولو لسه بتحمل، بناخد الـ initial)
  const currentData = queueData !== undefined ? queueData : initialData

  // 🔴 السحر هنا: الشاشة بتتغير أوتوماتيك لو مفيش داتا أو العيادة مش نشطة
  if (!currentData || !currentData.isActive) {
    return (
      <div className='flex flex-col items-center justify-center h-[60vh] space-y-4 border-2 border-dashed rounded-lg border-muted bg-muted/10 animate-in fade-in duration-500'>
        <AlertCircle className='w-16 h-16 text-muted-foreground' />
        <h2 className='text-2xl font-bold text-destructive'>العيادة مغلقة حالياً</h2>
        <p className='text-muted-foreground'>
          لا توجد جلسة عمل (شفت) نشطة. افتح عيادتك الآن لتسمح للاستقبال بحجز المرضى.
        </p>
        <OpenMySessionButton tenantSlug={tenantSlug} />
      </div>
    )
  }

  // 🟢 لو فيه داتا (العيادة اتفتحت)، هنرسم الطابور العادي
  const { currentTicket, waitingTickets, waitingCount } = currentData

  const handleAction = (
    actionFn: (
      tenantSlug: string,
      ticketId: string,
    ) => Promise<BaseApiResponse<IQueueTicket | ICreateTicketResponse>>,
    ticketId: string,
  ) => {
    startTransition(async () => {
      const result = await actionFn(tenantSlug, ticketId)
      if (result.success) {
        await mutate()
        if (result.data && 'visitId' in result.data) {
          const visitId = (result.data as ICreateTicketResponse).visitId
          router.push(`/${tenantSlug}/dashboard/doctor/visits/${visitId}`)
        }
      }
    })
  }

  return (
    <div className='space-y-8 animate-in fade-in duration-500'>
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
