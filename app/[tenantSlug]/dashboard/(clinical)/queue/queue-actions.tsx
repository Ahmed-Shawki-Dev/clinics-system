'use client'

import { IDoctor } from '@/types/doctor'
import { IPatient } from '@/types/patient'
import { IQueueBoard } from '@/types/queue'
import { BaseApiResponse } from '@/types/api'
import useSWR from 'swr'
import { getQueueBoard } from '@/actions/queue/queue-board'
import { CutTicketDialog } from './cut-ticket-dialog'
import { AddPatientModal } from '../patients/add-patient-modal'

interface QueueActionsProps {
  tenantSlug: string
  doctors: IDoctor[]
  patients: IPatient[]
  initialBoardRes: BaseApiResponse<IQueueBoard> // هنستقبل الداتا المبدئية هنا كمان
}

export function QueueActions({
  tenantSlug,
  doctors,
  patients,
  initialBoardRes,
}: QueueActionsProps) {
  // 🔥 السحر هنا: نفس الـ SWR Key بتاع الـ QueueView.
  // هيسحب نفس الداتا اللايف من الكاش من غير ما يعمل ريكويست إضافي
  const { data: boardRes } = useSWR(['queueBoard', tenantSlug], ([, slug]) => getQueueBoard(slug), {
    fallbackData: initialBoardRes,
    refreshInterval: 10000,
  })

  // بنصلح اسم الدكتور وتفاصيله زي ما عملنا بالظبط
  const activeSessions = (boardRes?.data?.sessions || [])
    .filter((s) => s.isActive)
    .map((session) => {
      let finalDoctorName = session.doctorName
      if (!finalDoctorName && session.doctorId) {
        const matchedDoctor = doctors.find((d) => d.id === session.doctorId)
        finalDoctorName = matchedDoctor?.name || 'غير محدد'
      }
      return {
        ...session,
        doctorName: finalDoctorName || 'غير محدد',
      }
    })

  return (
    <div className='flex w-full flex-col-reverse gap-2 sm:w-auto sm:flex-row sm:items-center'>
      {/* 1. زرار إضافة مريض */}
      <AddPatientModal />

      {/* 2. زرار قطع التذكرة رجع مكانه، وبياخد الداتا اللايف! */}
      <CutTicketDialog
        tenantSlug={tenantSlug}
        patients={patients}
        activeSessions={activeSessions}
        doctors={doctors}
      />
    </div>
  )
}
