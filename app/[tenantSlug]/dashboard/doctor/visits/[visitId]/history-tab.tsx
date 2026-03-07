'use client'

import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { ar } from 'date-fns/locale'
import { Activity, Calendar, Eye, Stethoscope } from 'lucide-react'
import Link from 'next/link'
import { IPatientSummary } from '../../../../../../actions/patient/get-patient-summary'

interface HistoryTabProps {
  summary: IPatientSummary | null
  tenantSlug: string
  currentVisitId: string // 🔥 ضفنا دي عشان نعرف إحنا واقفين فين
}

export function HistoryTab({ summary, tenantSlug, currentVisitId }: HistoryTabProps) {
  if (!summary) {
    return (
      <div className='flex flex-col items-center justify-center p-8 text-muted-foreground border rounded-xl bg-muted/10 mt-4'>
        <p>تعذر تحميل السجل الطبي للمريض.</p>
      </div>
    )
  }

  // 🔥 السحر هنا: فلترة الزيارة الحالية من القائمة عشان متظهرش
  const previousVisits = summary.recentVisits?.filter((v) => v.id !== currentVisitId) || []

  return (
    <div className='space-y-6 mt-4'>
      <div className='flex items-center gap-4 bg-primary/5 text-primary p-4 rounded-xl border border-primary/10'>
        <Activity className='w-8 h-8 opacity-70' />
        <div>
          <h3 className='font-bold text-lg'>إجمالي الزيارات السابقة</h3>
          {/* نقصنا 1 عشان منعدش الزيارة الحالية ضمن "السوابق" لو حابب الدقة */}
          <p className='text-sm opacity-90'>
            {Math.max(0, summary.totalVisits - 1)} زيارات مسجلة سابقة في العيادة.
          </p>
        </div>
      </div>

      <div className='bg-card p-6 rounded-xl border shadow-sm'>
        <h3 className='text-lg font-bold mb-6 border-b pb-2 flex items-center gap-2'>
          <Calendar className='w-5 h-5 text-muted-foreground' />
          الزيارات السابقة
        </h3>

        {/* بنشيك على المصفوفة المفلترة مش الأصلية */}
        {previousVisits.length === 0 ? (
          <p className='text-muted-foreground text-center py-4'>هذه هي الزيارة الأولى للمريض.</p>
        ) : (
          <div className='space-y-6 border-r-2 border-muted pr-4 mr-2'>
            {previousVisits.map((v) => (
              <div key={v.id} className='relative'>
                <div className='absolute w-3 h-3 bg-primary rounded-full -right-5.75 top-1.5 ring-4 ring-background' />

                <div className='bg-muted/30 p-4 rounded-lg border hover:bg-muted/50 transition-colors duration-200'>
                  <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2'>
                    <div className='flex items-center gap-2 font-bold text-foreground'>
                      <Stethoscope className='w-4 h-4 text-primary' />
                      د. {v.doctorName}
                    </div>
                    <span className='text-xs text-muted-foreground bg-background px-2 py-1 rounded-md border w-fit'>
                      {format(new Date(v.startedAt), 'dd MMMM yyyy', { locale: ar })}
                    </span>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-sm'>
                    <div>
                      <span className='text-muted-foreground block mb-1 text-xs'>الشكوى:</span>
                      <p className='font-medium'>{v.complaint || 'لم تسجل'}</p>
                    </div>
                    <div>
                      <span className='text-muted-foreground block mb-1 text-xs'>التشخيص:</span>
                      <p className='font-medium text-primary'>{v.diagnosis || 'لم يسجل'}</p>
                    </div>
                  </div>

                  <div className='mt-4 pt-3 border-t flex justify-end'>
                    <Link
                      href={`/${tenantSlug}/dashboard/doctor/visits/${v.id}?tab=prescription`}
                      target='_blank'
                    >
                      <Button
                        variant='outline'
                        size='sm'
                        className='gap-2 text-muted-foreground hover:text-foreground'
                      >
                        <Eye className='w-4 h-4' /> عرض الروشتة والتفاصيل
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
