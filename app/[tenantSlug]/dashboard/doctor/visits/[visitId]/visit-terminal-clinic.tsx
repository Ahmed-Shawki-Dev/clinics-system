'use client'

import { Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { completeVisitAction } from '../../../../../../actions/visit/complete-visit'
import { Button } from '../../../../../../components/ui/button'
import { calculateAge, getChronicDiseases } from '../../../../../../lib/patient-utils'
import { useTenantStore } from '../../../../../../store/useTenantStore'
import { IDoctor } from '../../../../../../types/doctor'
import { IPatientSummary } from '../../../../../../types/patient-app'
import { IVisit } from '../../../../../../types/visit'
import { ClinicalTab } from './clinical-tab'
import { LabsTab } from './lab-tab'
import { PrescriptionTab } from './prescription-tab'
import PrintablePrescription from './printable-prescription'
import { TerminalHeader } from './terminal-header'

export function VisitTerminalClient({
  visit,
  tenantSlug,
  doctor,
  summary,
}: {
  visit: IVisit
  tenantSlug: string
  defaultTab?: string
  doctor?: IDoctor
  summary: IPatientSummary | null
}) {
  const router = useRouter()
  const [isCompleting, setIsCompleting] = useState(false)
  const tenantConfig = useTenantStore((state) => state.config)
  const isClosed = visit.status === 'Completed' || visit.completedAt !== null

  // تجهيز الداتا عشان نمررها للهيدر والطباعة
  const patientAge = calculateAge(visit.patientDateOfBirth)
  const chronicDiseases = getChronicDiseases(visit.chronicProfile)

  const handleCompleteVisit = async () => {
    setIsCompleting(true)
    const res = await completeVisitAction(tenantSlug, visit.id)
    setIsCompleting(false)

    if (res.success) {
      toast.success('تم إنهاء الزيارة بنجاح')
      router.push(`/${tenantSlug}/dashboard/doctor/queue`)
    } else {
      toast.error(res.message || 'حدث خطأ أثناء إنهاء الزيارة')
    }
  }

  return (
    <div className='flex flex-col gap-4 relative w-full'>
      {/* منطقة الشاشة العادية */}
      <div className='print:hidden flex flex-col gap-6 w-full max-w-6xl mx-auto'>
        <TerminalHeader
          visit={visit}
          isClosed={isClosed}
          patientAge={patientAge.toString()} 
          chronicDiseases={chronicDiseases}
          tenantSlug={tenantSlug}
          summary={summary}
          isCompleting={isCompleting}
          onComplete={handleCompleteVisit}
        />

        {!isClosed && (
          <div className='fixed bottom-8 left-8 z-50 print:hidden'>
            <Button
              form='clinical-form'
              type='submit'
              size='lg'
              className='bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full px-8 py-6 shadow-[0_10px_40px_-10px_rgba(5,150,105,0.7)] transition-transform hover:scale-105'
            >
              <Save className='w-5 h-5 ml-2' />
              حفظ التعديلات
            </Button>
          </div>
        )}

        <div className='flex flex-col gap-6 w-full pb-10'>
          <ClinicalTab visit={visit} tenantSlug={tenantSlug} doctor={doctor} isClosed={isClosed} />
          <PrescriptionTab visit={visit} tenantSlug={tenantSlug} isClosed={isClosed} />
          <LabsTab visit={visit} tenantSlug={tenantSlug} isClosed={isClosed} />
        </div>
      </div>

      <PrintablePrescription
        visit={visit}
        tenantConfig={tenantConfig}
        doctor={doctor}
        patientAge={patientAge.toString()}
        tenantSlug={tenantSlug}
      />
    </div>
  )
}
