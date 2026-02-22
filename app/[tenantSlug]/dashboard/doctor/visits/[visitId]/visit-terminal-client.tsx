'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ILabRequest, IPrescription, IVisit } from '@/types/visit'
import { Printer, Save } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { completeVisitAction } from '../../../../../../actions/visit/complete-visit'
import { IDoctor } from '../../../../../../types/doctor'
import { ClinicalTab } from './clinical-tab'
import { LabsTab } from './lab-tab'
import { PrescriptionTab } from './prescription-tab'

export function VisitTerminalClient({
  visit,
  tenantSlug,
  defaultTab,
  doctor,
}: {
  visit: IVisit
  tenantSlug: string
  defaultTab: string
  doctor?: IDoctor
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [isCompleting, setIsCompleting] = useState(false)

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

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', value)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className='flex flex-col gap-4 relative w-full'>
      {/* ========================================= */}
      {/* ستايل الطباعة المركزي للزيارة كلها */}
      {/* ========================================= */}
      <style type='text/css' media='print'>
        {`
          @page { size: A4 portrait; margin: 0 !important; }
          body * { visibility: hidden !important; }
          #visit-print-area, #visit-print-area * { visibility: visible !important; }
          
          #visit-print-area {
            position: fixed !important;
            inset: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            padding: 2cm !important;
            background-color: white !important;
            color: black !important;
            display: flex !important;
            flex-direction: column !important;
            box-sizing: border-box !important;
            font-family: system-ui, -apple-system, sans-serif !important;
            z-index: 9999 !important;
          }
        `}
      </style>

      {/* ========================================= */}
      {/* واجهة المستخدم (تختفي وقت الطباعة) */}
      {/* ========================================= */}
      <div className='print:hidden flex flex-col gap-4'>
        {/* Header الزيارة */}
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card p-4 rounded-xl border shadow-sm'>
          <div className='flex items-center gap-4 w-full sm:w-auto'>
            <div className='space-y-1.5'>
              <h2 className='text-xl font-bold leading-none text-right'>{visit.patientName}</h2>
              <div className='flex flex-wrap gap-2 pt-1 justify-start'>
                <Badge variant='outline' className='whitespace-nowrap'>
                  زيارة كشف
                </Badge>
                <Badge
                  variant={visit.status === 'Open' ? 'default' : 'secondary'}
                  className='whitespace-nowrap'
                >
                  {visit.status === 'Open' ? 'حالة مفتوحة' : 'مكتملة'}
                </Badge>
              </div>
            </div>
          </div>

          <div className='flex w-full sm:w-auto gap-2 mt-2 sm:mt-0'>
            {/* زرار الطباعة الجديد */}
            <Button variant='outline' onClick={() => window.print()}>
              <Printer className='w-4 h-4 ml-2' /> طباعة الروشتة
            </Button>

            {!visit.completedAt && (
              <Button onClick={handleCompleteVisit} disabled={isCompleting} variant={'destructive'}>
                <Save className='w-4 h-4 ml-2' />
                {isCompleting ? 'جاري الإنهاء...' : 'إنهاء الزيارة'}
              </Button>
            )}
          </div>
        </div>

        {/* التابات */}
        <Tabs defaultValue={defaultTab} onValueChange={handleTabChange} className='w-full'>
          <TabsList className='flex w-full h-12 overflow-x-auto justify-start sm:justify-center bg-muted/50 p-1 mb-4'>
            <TabsTrigger value='clinical' className='px-4 sm:px-8 text-sm'>
              التشخيص والشكوى
            </TabsTrigger>
            <TabsTrigger value='prescription' className='px-4 sm:px-8 text-sm'>
              الروشتة
            </TabsTrigger>
            <TabsTrigger value='labs' className='px-4 sm:px-8 text-sm'>
              التحاليل والأشعة
            </TabsTrigger>
          </TabsList>

          <TabsContent value='clinical' className='focus-visible:outline-none mt-2'>
            <ClinicalTab visit={visit} tenantSlug={tenantSlug} doctor={doctor} />
          </TabsContent>

          <TabsContent value='prescription' className='focus-visible:outline-none mt-2'>
            <PrescriptionTab visit={visit} tenantSlug={tenantSlug} />
          </TabsContent>

          <TabsContent value='labs' className='focus-visible:outline-none mt-2'>
            <LabsTab tenantSlug={tenantSlug} visit={visit} />
          </TabsContent>
        </Tabs>
      </div>

      {/* ========================================= */}
      {/* منطقة الطباعة - الروشتة + التحاليل والأشعة */}
      {/* ========================================= */}
      <div
        id='visit-print-area'
        className='hidden print:flex flex-col w-full h-full z-9999'
        dir='rtl'
      >
        {/* Header - Compact */}
        <div className='flex justify-between items-end border-b border-gray-300 pb-4 mb-6'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight mb-1'>
              د. {visit.doctorName || 'ــــــــــــــ'}
            </h1>
            <p className='text-lg text-gray-600 font-medium'>{doctor?.specialty || 'ممارس عام'}</p>
          </div>
          <div className='text-left text-gray-500 space-y-1 text-xs'>
            <p>
              التاريخ:{' '}
              <span className='text-black font-medium'>
                {new Date().toLocaleDateString('ar-EG')}
              </span>
            </p>
            <p>
              رقم الكشف:{' '}
              <span className='text-black font-medium'>#{visit.id.slice(0, 8).toUpperCase()}</span>
            </p>
          </div>
        </div>

        {/* Patient Info - Compact */}
        <div className='flex gap-8 mb-6 text-base'>
          <div>
            <span className='text-gray-500 mr-2'>المريض:</span>
            <span className='font-bold'>{visit.patientName}</span>
          </div>
          {visit.weight && (
            <div>
              <span className='text-gray-500 mr-2'>الوزن:</span>
              <span className='font-bold'>{visit.weight} كجم</span>
            </div>
          )}
        </div>

        {/* المحتوى الرئيسي للورقة (يتمدد للأسفل) */}
        <div className='flex-1'>
          {/* 1. قسم الأدوية */}
          {visit.prescriptions && visit.prescriptions.length > 0 && (
            <div className='mb-6'>
              <div className='text-4xl font-serif font-bold italic mb-4 opacity-80'>
                R<span className='text-2xl'>x</span>
              </div>
              <ul className='space-y-4 pl-4'>
                {visit.prescriptions.map((p: IPrescription, index: number) => (
                  <li key={p.id} className='relative border-b border-gray-100 pb-3'>
                    <div className='flex items-baseline gap-3 mb-1'>
                      <span className='text-base font-bold'>{index + 1}.</span>
                      <h3 className='text-lg font-bold'>{p.medicationName}</h3>
                      <span className='text-sm text-gray-500 mr-auto'>({p.duration})</span>
                    </div>
                    <div className='pr-6 text-sm text-gray-700 flex items-center gap-2'>
                      <span>
                        الجرعة: <span className='font-semibold'>{p.dosage}</span>
                      </span>
                      <span className='text-gray-300'>•</span>
                      <span>
                        التكرار: <span className='font-semibold'>{p.frequency}</span>
                      </span>
                    </div>
                    {p.instructions && (
                      <p className='pr-6 mt-1 text-xs text-gray-600'>
                        <span className='text-gray-400'>ملاحظات:</span> {p.instructions}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 2. قسم التحاليل والأشعة */}
          {visit.labRequests && visit.labRequests.length > 0 && (
            <div
              className={`pt-4 ${visit.prescriptions?.length ? 'border-t border-dashed border-gray-300 mt-4' : ''}`}
            >
              <h3 className='text-lg font-bold mb-3 flex items-center gap-2'>
                <span className='w-1.5 h-5 bg-black rounded-sm inline-block'></span>
                مطلوب إجراء الفحوصات التالية:
              </h3>
              <ul className='list-disc pr-6 space-y-2'>
                {visit.labRequests.map((req: ILabRequest, index: number) => (
                  <li key={req.id || index} className='text-sm font-semibold text-black'>
                    {req.testName}
                    {req.notes && (
                      <span className='text-gray-500 mr-2 font-normal'>({req.notes})</span>
                    )}
                    {req.isUrgent && (
                      <span className='border border-black px-1 mr-2 text-xs rounded'>عاجل</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* رسالة لو الزيارة فاضية */}
          {!visit.prescriptions?.length && (!visit.labRequests || !visit.labRequests.length) && (
            <p className='text-gray-400 italic mt-4 text-base'>لا توجد طلبات طبية مسجلة.</p>
          )}
        </div>

        {/* Footer - Compact */}
        <div className='mt-auto pt-4 border-t border-gray-300 flex justify-between items-end'>
          <div>
            <p className='text-gray-800 font-bold mb-1 text-sm'>{tenantSlug.replace(/-/g, ' ')}</p>
          </div>

          <div className='text-center'>
            {visit.followUpDate ? (
              <>
                <p className='text-xs text-gray-500 mb-1'>الاستشارة القادمة</p>
                <p className='font-bold text-sm border border-gray-800 rounded px-3 py-1'>
                  {new Date(visit.followUpDate).toLocaleDateString('ar-EG')}
                </p>
              </>
            ) : (
              <div className='w-32 border-b border-gray-400 mt-6 mb-1'></div>
            )}
            {!visit.followUpDate && <p className='text-xs text-gray-500'>توقيع الطبيب</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
