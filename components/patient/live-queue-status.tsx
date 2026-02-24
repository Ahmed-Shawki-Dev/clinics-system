'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CalendarPlus, Clock, Stethoscope, User } from 'lucide-react'
import useSWR from 'swr'
import { getMyTicketAction } from '../../actions/patient-app/get-my-ticket'

export function LiveQueueStatus({ tenantSlug }: { tenantSlug: string }) {
  const { data: response, isLoading } = useSWR(
    'live-patient-ticket',
    () => getMyTicketAction(tenantSlug),
    { refreshInterval: 10000 },
  )

  // 1. Professional Skeleton Loading (بدل الـ Spinner)
  if (isLoading) {
    return (
      <div className='flex flex-col gap-4 animate-pulse'>
        <div className='h-8 w-1/3 bg-muted rounded-md'></div>
        <div className='h-36 w-full bg-muted/50 rounded-2xl border'></div>
      </div>
    )
  }

  const ticket = response?.data

  // 2. Empty State (تصميم هادي ونظيف)
  if (!response?.success || !ticket) {
    return (
      <div className='space-y-4'>
        <h2 className='text-lg font-semibold px-1'>حالة الطابور</h2>
        <Card className='border-none shadow-sm bg-linear-to-br from-card to-muted/30 rounded-2xl overflow-hidden'>
          <CardContent className='p-8 flex flex-col items-center text-center space-y-5'>
            <div className='bg-background p-4 rounded-full shadow-sm'>
              <CalendarPlus className='h-8 w-8 text-muted-foreground/60' />
            </div>
            <div className='space-y-1.5'>
              <h3 className='font-bold text-lg text-foreground'>لا يوجد دور نشط</h3>
              <p className='text-sm text-muted-foreground leading-relaxed'>
                ليس لديك أي تذاكر في طابور الانتظار حالياً. يمكنك حجز موعد جديد لبدء المتابعة.
              </p>
            </div>
            <Button className='w-full rounded-xl h-12 text-md font-medium mt-2 shadow-sm'>
              حجز موعد جديد
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // 3. Active Ticket State (Digital Pass Style)
  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between px-1'>
        <h2 className='text-lg font-semibold flex items-center gap-2'>
          <Clock className='h-5 w-5 text-primary' />
          دورك الحالي
        </h2>
        {ticket.status === 'Waiting' && (
          <span className='flex items-center gap-1.5 text-xs font-medium text-muted-foreground'>
            <span className='relative flex h-2 w-2'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75'></span>
              <span className='relative inline-flex rounded-full h-2 w-2 bg-primary'></span>
            </span>
            تحديث حي
          </span>
        )}
      </div>

      <Card className='relative border-none shadow-md rounded-2xl overflow-hidden bg-linear-to-br from-primary/5 via-background to-background'>
        {/* شريط جانبي لوني حسب الحالة */}
        <div
          className={`absolute top-0 right-0 w-1.5 h-full ${
            ticket.status === 'Called'
              ? 'bg-green-500'
              : ticket.status === 'InVisit'
                ? 'bg-blue-500'
                : 'bg-primary'
          }`}
        />

        <CardContent className='p-6'>
          <div className='flex items-start justify-between border-b pb-6 mb-6'>
            <div className='space-y-2'>
              <p className='text-sm font-medium text-muted-foreground uppercase tracking-wider'>
                رقم التذكرة
              </p>
              <p className='text-6xl font-black text-foreground tracking-tighter'>
                {ticket.ticketNumber}
              </p>
            </div>

            <div className='text-left'>
              <span
                className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full text-sm font-bold shadow-sm ${
                  ticket.status === 'Called'
                    ? 'bg-green-100 text-green-700 ring-1 ring-green-600/20'
                    : ticket.status === 'InVisit'
                      ? 'bg-blue-100 text-blue-700 ring-1 ring-blue-600/20'
                      : 'bg-primary/10 text-primary ring-1 ring-primary/20'
                }`}
              >
                {ticket.status === 'Waiting'
                  ? 'في الانتظار'
                  : ticket.status === 'Called'
                    ? 'تفضل بالدخول'
                    : ticket.status === 'InVisit'
                      ? 'داخل العيادة'
                      : ticket.status}
              </span>
            </div>
          </div>

          <div className='space-y-4'>
            <div className='flex items-center gap-3'>
              <div className='bg-primary/10 p-2.5 rounded-xl'>
                <User className='h-5 w-5 text-primary' />
              </div>
              <div>
                <p className='text-xs text-muted-foreground mb-0.5'>الطبيب المعالج</p>
                <p className='font-semibold text-sm'>{ticket.doctorName}</p>
              </div>
            </div>

            <div className='flex items-center gap-3'>
              <div className='bg-muted p-2.5 rounded-xl'>
                <Stethoscope className='h-5 w-5 text-muted-foreground' />
              </div>
              <div>
                <p className='text-xs text-muted-foreground mb-0.5'>الخدمة</p>
                <p className='font-semibold text-sm'>{ticket.serviceName || 'كشف عام'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
