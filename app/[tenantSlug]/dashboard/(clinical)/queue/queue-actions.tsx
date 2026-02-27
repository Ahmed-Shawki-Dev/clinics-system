'use client'

import { IDoctor } from '@/types/doctor'
import { IPatient } from '@/types/patient'
import { IQueueBoardSession } from '@/types/queue'
import { CutTicketDialog } from './cut-ticket-dialog'
import { AddPatientModal } from '../patients/add-patient-modal'

interface QueueActionsProps {
  tenantSlug: string
  doctors: IDoctor[]
  patients: IPatient[]
  activeSessions: IQueueBoardSession[]
}

export function QueueActions({ tenantSlug, doctors, patients, activeSessions }: QueueActionsProps) {
  // بما إننا في كلاينت كومبوننت، نقدر نتحكم في مودال المريض هنا لو حبينا زرار منفصل

  return (
    <div className='flex w-full flex-col-reverse gap-2 sm:w-auto sm:flex-row sm:items-center'>
      {/* 1. زرار فتح عيادة (ثانوي) */}

      <AddPatientModal />

      {/* 3. زرار قطع التذكرة (أساسي - Primary) */}
      <CutTicketDialog
        tenantSlug={tenantSlug}
        patients={patients}
        activeSessions={activeSessions}
        doctors={doctors}
      />
    </div>
  )
}
