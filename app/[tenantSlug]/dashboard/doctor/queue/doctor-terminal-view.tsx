'use client'

import { Card, CardContent } from '@/components/ui/card'
import { ICreateTicketResponse, IQueueBoardSession, IQueueTicket } from '@/types/queue'
import { AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import useSWR from 'swr' // <-- الاستيراد الجديد
import { BaseApiResponse } from '../../../../../types/api'
import { CurrentPatientCard } from './current-patient-card'
import { WaitingQueueList } from './waiting-queue-list'
import { getMyQueueAction } from '@/actions/doctor/get-my-queue' // استيراد الأكشن بتاعك

interface Props {
  initialData: IQueueBoardSession
  tenantSlug: string
}

export function DoctorTerminalView({ initialData, tenantSlug }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // 🔥 تجهيز الـ SWR للـ Polling كل 10 ثواني
  const { data: queueData, mutate } = useSWR(
    ['doctorQueue', tenantSlug],
    async ([, slug]) => {
      const res = await getMyQueueAction(slug)
      if (!res.success) throw new Error(res.message)
      return res.data // بنرجع الداتا الصافية عشان تطابق الـ initialData
    },
    {
      fallbackData: initialData, // الداتا اللي جات من السيرفر كبداية
      refreshInterval: 10000, // 10 ثواني
      revalidateOnFocus: true,
      keepPreviousData: true, // عشان ميحصلش فلاشينج وقت التحميل
    },
  )

  // بنعتمد دايماً على أحدث داتا (سواء من السيرفر أول مرة أو من الـ SWR)
  const currentData = queueData || initialData
  const { currentTicket, waitingTickets, isActive, waitingCount } = currentData

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
        // 🔥 السر هنا: أول ما الأكشن ينجح، بنجبر SWR يجيب الداتا الجديدة فوراً
        // ده بيمنع إن الدكتور يحس بأي ديلاي بعد ما يضغط على الزرار
        await mutate()

        if (result.data && 'visitId' in result.data) {
          const visitId = (result.data as ICreateTicketResponse).visitId
          router.push(`/${tenantSlug}/dashboard/doctor/visits/${visitId}`)
        }
      }
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
