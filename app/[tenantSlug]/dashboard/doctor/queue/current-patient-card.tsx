'use client'

import { getPatientSummaryAction } from '@/actions/patient/get-patient-summary'
import {
  callTicketAction,
  finishTicketAction,
  skipTicketAction,
  startVisitAction,
} from '@/actions/queue/tickets'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ICreateTicketResponse, IQueueTicket } from '@/types/queue'
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  FastForward,
  Loader2,
  PlayCircle,
  Stethoscope,
  ClipboardList,
} from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { BaseApiResponse } from '../../../../../types/api'

interface Props {
  currentTicket?: IQueueTicket | null
  waitingTickets: IQueueTicket[]
  isPending: boolean
  onAction: (
    actionFn: (
      tenantSlug: string,
      ticketId: string,
    ) => Promise<BaseApiResponse<IQueueTicket | ICreateTicketResponse>>,
    ticketId: string,
  ) => void
}

export function CurrentPatientCard({ currentTicket, waitingTickets, isPending, onAction }: Props) {
  const router = useRouter()
  const params = useParams()
  const tenantSlug = params.tenantSlug as string
  const [isReturning, setIsReturning] = useState(false)

  const handleReturnToVisit = async () => {
    if (!currentTicket) return
    if ('visitId' in currentTicket && currentTicket.visitId) {
      router.push(`/${tenantSlug}/dashboard/doctor/visits/${currentTicket.visitId}`)
      return
    }
    setIsReturning(true)
    try {
      const summaryRes = await getPatientSummaryAction(tenantSlug, currentTicket.patientId)
      if (summaryRes.success && summaryRes.data) {
        const activeVisit = summaryRes.data.recentVisits?.find(
          (v) => v.completedAt === null && v.doctorName === currentTicket.doctorName,
        )
        if (activeVisit) router.push(`/${tenantSlug}/dashboard/doctor/visits/${activeVisit.id}`)
        else toast.error('لم يتم العثور على سجل زيارة مفتوح لهذا المريض.')
      } else {
        toast.error('فشل في جلب بيانات الزيارة.')
      }
    } catch (error) {
      toast.error('حدث خطأ أثناء محاولة العودة للكشف.')
    } finally {
      setIsReturning(false)
    }
  }

  return (
    <Card className='border shadow-sm bg-card'>
      <CardContent className='p-6 sm:p-8'>
        {currentTicket ? (
          <div className='space-y-6'>
            {/* الجزء الأول: بيانات المريض والبادجات */}
            <div className='flex items-start justify-between'>
              <div>
                <h2 className='text-3xl font-bold tracking-tight text-foreground'>
                  {currentTicket.patientName}
                </h2>
                <div className='flex items-center gap-3 mt-2 text-sm text-muted-foreground'>
                  <span className='font-mono font-medium text-foreground bg-muted px-2 py-0.5 rounded'>
                    #{currentTicket.ticketNumber}
                  </span>
                  <span>•</span>
                  <span className='flex items-center gap-1.5'>
                    <Stethoscope className='w-4 h-4' />
                    {currentTicket.serviceName || 'كشف عام'}
                  </span>
                  <span>•</span>
                  <span className='flex items-center gap-1.5'>
                    <Clock className='w-4 h-4' />
                    {new Date(currentTicket.calledAt!).toLocaleTimeString('ar-EG', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>

              <div className='flex gap-2'>
                {currentTicket.isUrgent && (
                  <Badge variant='destructive' className='px-3 py-1'>
                    طارئ
                  </Badge>
                )}
                {currentTicket.status === 'InVisit' && (
                  <Badge className='bg-emerald-600 hover:bg-emerald-700 px-3 py-1'>قيد الكشف</Badge>
                )}
              </div>
            </div>

            {/* الجزء المفقود اللي رجعناه: ملاحظات الاستقبال (الفحص المبدئي) */}
            {currentTicket.notes && (
              <div className='bg-muted/30 border-r-4 border-primary/50 p-4 rounded-l-lg'>
                <div className='flex items-center gap-2 mb-1.5'>
                  <ClipboardList className='w-4 h-4 text-primary/70' />
                  <span className='text-sm font-semibold text-foreground'>
                    ملاحظات الاستقبال / الفحص:
                  </span>
                </div>
                <p className='text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed'>
                  {currentTicket.notes}
                </p>
              </div>
            )}

            {/* الإجراءات (الأزرار بحجم احترافي مش مبالغ فيه) */}
            <div className='flex items-center gap-3 pt-4 border-t'>
              {currentTicket.status === 'Called' && (
                <>
                  <Button
                    variant='outline'
                    className='h-11 px-6 font-medium'
                    disabled={isPending}
                    onClick={() => onAction(skipTicketAction, currentTicket.id)}
                  >
                    <FastForward className='w-4 h-4 ml-2 opacity-70' /> تخطي
                  </Button>

                  <Button
                    className='h-11 px-8 font-medium bg-primary'
                    disabled={isPending}
                    onClick={() => onAction(startVisitAction, currentTicket.id)}
                  >
                    <PlayCircle className='w-5 h-5 ml-2' /> بدء الكشف
                  </Button>
                </>
              )}

              {currentTicket.status === 'InVisit' && (
                <>
                  <Button
                    variant='outline'
                    className='h-11 px-6 font-medium text-primary border-primary/30 hover:bg-primary/5'
                    disabled={isPending || isReturning}
                    onClick={handleReturnToVisit}
                  >
                    {isReturning ? (
                      <Loader2 className='w-4 h-4 ml-2 animate-spin' />
                    ) : (
                      <ArrowRight className='w-4 h-4 ml-2' />
                    )}
                    {isReturning ? 'جاري التحميل...' : 'العودة لصفحة الكشف'}
                  </Button>

                  <Button
                    className='h-11 px-8 font-medium bg-emerald-600 hover:bg-emerald-700'
                    disabled={isPending || isReturning}
                    onClick={() => onAction(finishTicketAction, currentTicket.id)}
                  >
                    <CheckCircle2 className='w-5 h-5 ml-2' /> إنهاء الكشف
                  </Button>
                </>
              )}
            </div>
          </div>
        ) : (
          /* حالة الفراغ - ملمومة وصغيرة جداً */
          <div className='flex flex-col items-center justify-center py-12 text-center'>
            <h3 className='text-xl font-bold text-foreground mb-1'>الغرفة فارغة</h3>
            <p className='text-sm text-muted-foreground mb-6'>
              لا يوجد مريض حالياً. يمكنك نداء المريض التالي.
            </p>
            <Button
              className='h-11 px-8'
              variant={waitingTickets.length > 0 ? 'default' : 'secondary'}
              disabled={waitingTickets.length === 0 || isPending}
              onClick={() => onAction(callTicketAction, waitingTickets[0]?.id)}
            >
              {waitingTickets.length > 0 ? 'نداء المريض التالي' : 'قائمة الانتظار فارغة'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
