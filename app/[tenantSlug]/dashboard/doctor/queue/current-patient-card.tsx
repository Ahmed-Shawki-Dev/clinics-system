'use client'

import { getPatientSummaryAction } from '@/actions/patient/get-patient-summary' // استيراد الأكشن اللي عملناه
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
  ArrowLeftRight,
  CheckCircle2,
  FastForward,
  Loader2,
  PlayCircle,
  Stethoscope,
  User,
  UserPlus,
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

  // السحر الهندسي لحل مشكلة نقص الـ visitId
  const handleReturnToVisit = async () => {
    if (!currentTicket) return

    // لو الباك إند ضافها في المستقبل، هنستخدمها مباشرة ونوفر الريكويست
    if ('visitId' in currentTicket && currentTicket.visitId) {
      router.push(`/${tenantSlug}/dashboard/doctor/visits/${currentTicket.visitId}`)
      return
    }

    // الخطة البديلة: البحث عن الزيارة المفتوحة في سجل المريض
    setIsReturning(true)
    try {
      const summaryRes = await getPatientSummaryAction(tenantSlug, currentTicket.patientId)

      if (summaryRes.success && summaryRes.data) {
        // بندور على الزيارة اللي لسه مخلصتش (مفتوحة حالياً)
        const activeVisit = summaryRes.data.recentVisits?.find(
          (v) => v.completedAt === null && v.doctorName === currentTicket.doctorName,
        )
        if (activeVisit) {
          router.push(`/${tenantSlug}/dashboard/doctor/visits/${activeVisit.id}`)
        } else {
          toast.error('لم يتم العثور على سجل زيارة مفتوح لهذا المريض.')
        }
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
    <Card>
      <CardContent className='p-8'>
        {currentTicket ? (
          <div className='flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8'>
            <div className='flex items-center gap-5'>
              <div className='w-16 h-16 rounded-full bg-muted flex items-center justify-center shrink-0'>
                <User className='w-8 h-8 text-muted-foreground' />
              </div>

              <div className='space-y-1'>
                <div className='flex items-center gap-3'>
                  <h3 className='text-3xl font-bold tracking-tight text-foreground'>
                    {currentTicket.patientName}
                  </h3>
                  {currentTicket?.isUrgent && (
                    <Badge
                      variant='destructive'
                      className='px-2.5 py-0.5 rounded-sm font-semibold text-xs uppercase tracking-wider'
                    >
                      طارئ
                    </Badge>
                  )}
                  {currentTicket.status === 'InVisit' && (
                    <Badge className='bg-emerald-500/10 text-emerald-600 shadow-none border-0 px-2.5 py-0.5 rounded-sm font-semibold text-xs'>
                      قيد الكشف
                    </Badge>
                  )}
                </div>

                <div className='flex items-center gap-3 text-sm text-muted-foreground'>
                  <span className='font-mono font-medium'>#{currentTicket.ticketNumber}</span>
                  <span className='text-muted/50'>•</span>
                  <span className='flex items-center gap-1.5'>
                    <Stethoscope className='w-3.5 h-3.5' /> {currentTicket.serviceName || 'كشف عام'}
                  </span>
                </div>
              </div>
            </div>

            {currentTicket.notes && (
              <div className='w-full xl:w-auto xl:max-w-md p-3.5 bg-muted rounded-xl text-muted-foreground text-sm'>
                {currentTicket.notes}
              </div>
            )}

            <div className='flex flex-col sm:flex-row gap-3 w-full xl:w-auto mt-6 xl:mt-0'>
              {currentTicket.status === 'Called' && (
                <>
                  <Button
                    variant='ghost'
                    className='h-12 px-6 font-medium text-muted-foreground hover:bg-muted/50 transition-colors'
                    disabled={isPending}
                    onClick={() => onAction(skipTicketAction, currentTicket.id)}
                  >
                    <FastForward className='w-4 h-4 ml-2 opacity-70' /> تخطي
                  </Button>

                  <Button
                    className='h-12 px-8 font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors'
                    disabled={isPending}
                    onClick={() => onAction(startVisitAction, currentTicket.id)}
                  >
                    <PlayCircle className='w-4 h-4 ml-2 opacity-90' /> بدء الكشف
                  </Button>
                </>
              )}

              {currentTicket.status === 'InVisit' && (
                <>
                  <Button
                    variant='outline'
                    className='h-12 px-6 font-medium text-primary border-primary hover:bg-primary/10 transition-colors'
                    disabled={isPending || isReturning}
                    onClick={handleReturnToVisit}
                  >
                    {isReturning ? (
                      <Loader2 className='w-4 h-4 ml-2 animate-spin' />
                    ) : (
                      <ArrowLeftRight className='w-4 h-4 ml-2' />
                    )}
                    {isReturning ? 'جاري التحميل...' : 'العودة للكشف'}
                  </Button>

                  <Button
                    variant='default'
                    className='h-12 px-6 font-semibold'
                    disabled={isPending || isReturning}
                    onClick={() => onAction(finishTicketAction, currentTicket.id)}
                  >
                    <CheckCircle2 className='w-4 h-4 ml-2 opacity-90' /> إنهاء الكشف
                  </Button>
                </>
              )}
            </div>
          </div>
        ) : (
          /* حالة الفراغ */
          <div className='flex flex-col items-center justify-center space-y-6'>
            <div className='w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center'>
              <UserPlus className='w-8 h-8 text-muted-foreground/60' />
            </div>
            <div className='text-center space-y-1.5'>
              <h3 className='text-xl font-semibold text-foreground'>الغرفة فارغة</h3>
              <p className='text-sm text-muted-foreground'>
                اضغط لنداء المريض التالي من قائمة الانتظار.
              </p>
            </div>
            <Button
              variant={waitingTickets.length > 0 ? 'default' : 'secondary'}
              className='h-12 px-8 font-semibold rounded-md transition-colors'
              disabled={waitingTickets.length === 0 || isPending}
              onClick={() => onAction(callTicketAction, waitingTickets[0]?.id)}
            >
              {waitingTickets.length > 0 ? 'نداء المريض التالي' : 'الطابور فارغ'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
