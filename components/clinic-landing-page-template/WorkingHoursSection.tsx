import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { DAY_ORDER, DAYS_AR, IPublicWorkingHour } from '@/types/public'
import { Clock, CalendarClock, Ban } from 'lucide-react'
import { formatTime } from '../../lib/formatTime'
import { cn } from '@/lib/utils'

export default function WorkingHoursSection({
  workingHours,
}: {
  workingHours: IPublicWorkingHour[]
}) {
  if (!workingHours || workingHours.length === 0) return null

  const sortedHours = [...workingHours].sort((a, b) => {
    return (DAY_ORDER[a.dayOfWeek] || 0) - (DAY_ORDER[b.dayOfWeek] || 0)
  })

  return (
    <section id='working-hours' className='py-24 bg-muted/30 relative overflow-hidden flex justify-center'>
      {/* عناصر ديكورية في الخلفية */}
      <div className='absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl' />
      <div className='absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl' />

      <div className='container px-4 md:px-6 relative z-10'>
        <div className='text-center space-y-4 mb-16'>
          <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium'>
            <Clock className='w-4 h-4' />
            <span>متواجدون دائماً لأجلكم</span>
          </div>
          <Typography variant='h2' className='text-3xl md:text-5xl font-bold tracking-tight'>
            مواعيد العمل الرسمية
          </Typography>
          <Typography variant='lead' className='text-muted-foreground max-w-175 mx-auto'>
            نستقبلكم في عيادتنا طوال أيام الأسبوع في المواعيد المحددة أدناه. يمكنك دائماً حجز موعد
            مسبق لتجنب الانتظار.
          </Typography>
        </div>

        {/* Grid Layout بدلاً من الجدول */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {sortedHours.map((wh, index) => (
            <Card
              key={index}
              className={cn(
                'group relative p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2',
                wh.isActive
                  ? 'bg-background border-transparent hover:border-primary/20'
                  : 'bg-muted/50 border-transparent opacity-75 grayscale-[0.5]',
              )}
            >
              {/* أيقونة الحالة */}
              <div
                className={cn(
                  'absolute top-4 left-4 w-2 h-2 rounded-full',
                  wh.isActive ? 'bg-green-500 animate-pulse' : 'bg-muted-foreground/30',
                )}
              />

              <div className='space-y-4'>
                <div className='flex items-center gap-3 border-b pb-3 border-muted'>
                  <div
                    className={cn(
                      'p-2 rounded-lg transition-colors',
                      wh.isActive ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground',
                    )}
                  >
                    <CalendarClock className='w-5 h-5' />
                  </div>
                  <Typography variant='h4' className='font-bold text-xl'>
                    {DAYS_AR[wh.dayOfWeek] || wh.dayOfWeek}
                  </Typography>
                </div>

                {wh.isActive ? (
                  <div className='space-y-3 pt-2'>
                    <div className='flex items-center justify-between text-sm'>
                      <span className='text-muted-foreground'>الفترة الصباحية</span>
                      <span className='font-bold text-primary bg-primary/5 px-2 py-0.5 rounded'>
                        متاح
                      </span>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <div className='flex items-center justify-between font-mono text-lg tracking-tight ltr'>
                        <span>{formatTime(wh.startTime)}</span>
                        <span className='text-muted-foreground text-xs mx-2 italic'>إلى</span>
                        <span>{formatTime(wh.endTime)}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='flex flex-col items-center justify-center py-4 text-muted-foreground space-y-2 italic'>
                    <Ban className='w-8 h-8 opacity-20' />
                    <span className='text-sm'>مغلق (عطلة رسمية)</span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className='mt-16 text-center'>
          <div className='inline-block p-px rounded-full bg-linear-to-r from-transparent via-primary/50 to-transparent w-full max-w-md mb-6' />
          <p className='text-muted-foreground text-sm'>
            * جميع المواعيد قد تخضع لتعديلات بسيطة في أيام العطلات الرسمية والأعياد.
          </p>
        </div>
      </div>
    </section>
  )
}
