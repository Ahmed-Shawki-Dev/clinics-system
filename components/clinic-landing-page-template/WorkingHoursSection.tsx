import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { DAY_ORDER, DAYS_AR, IPublicWorkingHour } from '@/types/public'
import { Clock, CalendarClock } from 'lucide-react'
import { formatTime } from '../../lib/formatTime'





export default function WorkingHoursSection({
  workingHours,
}: {
  workingHours: IPublicWorkingHour[]
}) {
  if (!workingHours || workingHours.length === 0) return null

  // 4. ترتيب الأيام قبل العرض
  const sortedHours = [...workingHours].sort((a, b) => {
    return (DAY_ORDER[a.dayOfWeek] || 0) - (DAY_ORDER[b.dayOfWeek] || 0)
  })

  return (
    <section
      id='working-hours'
      className='py-24 bg-background flex justify-center items-center text-primary-foreground relative overflow-hidden'
    >
      {/* Background Decor (Optional Subtle Pattern) */}
      <div className='absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white/20 to-transparent' />

      <div className='container px-4 md:px-6 relative z-10'>
        {/* --- Header Centered with Flex --- */}
        <div className='flex flex-col items-center justify-center text-center space-y-6 mb-12'>
          <div className='inline-flex items-center justify-center rounded-full bg-white/10 p-4 shadow-lg backdrop-blur-sm'>
            <CalendarClock className='h-8 w-8 text-white' />
          </div>

          <div className='space-y-2'>
            <Typography variant='h2' className='text-white text-3xl md:text-4xl'>
              مواعيد العمل
            </Typography>
            <Typography variant='lead' className='text-primary-foreground/80 max-w-150'>
              نحن متواجدون لخدمتكم طوال أيام الأسبوع وفق الجدول التالي.
            </Typography>
          </div>
        </div>

        {/* --- Schedule Card --- */}
        <div className='flex justify-center'>
          <Card className='w-full max-w-3xl bg-background/95 backdrop-blur shadow-2xl border-0 overflow-hidden'>
            <div className='flex flex-col'>
              {/* Table Header (Hidden on mobile, visible on desktop) */}
              <div className='hidden md:flex bg-muted/50 p-4 text-sm font-medium text-muted-foreground border-b'>
                <div className='flex-1 text-right pr-4'>اليوم</div>
                <div className='flex-1 text-center'>من</div>
                <div className='flex-1 text-center'>إلى</div>
                <div className='flex-1 text-left pl-4'>الحالة</div>
              </div>

              {/* Rows */}
              <div className='divide-y divide-border'>
                {sortedHours.map((wh, index) => (
                  <div
                    key={index}
                    className='flex flex-col md:flex-row items-center justify-between p-5 hover:bg-muted/30 transition-colors gap-4 md:gap-0'
                  >
                    {/* Day Name */}
                    <div className='flex-1 w-full md:w-auto text-right md:pr-4 flex items-center justify-between md:justify-start'>
                      <Typography variant='large' className='font-bold text-foreground'>
                        {DAYS_AR[wh.dayOfWeek] || wh.dayOfWeek}
                      </Typography>
                      {/* Mobile Only Label */}
                      <span className='md:hidden text-xs text-muted-foreground bg-muted px-2 py-1 rounded'>
                        {wh.isActive ? 'متاح' : 'مغلق'}
                      </span>
                    </div>

                    {/* Start Time */}
                    <div className='flex-1 w-full md:w-auto flex items-center justify-between md:justify-center bg-muted/20 md:bg-transparent p-2 md:p-0 rounded md:rounded-none'>
                      <span className='md:hidden text-muted-foreground text-sm'>من:</span>
                      <div className='flex items-center gap-2'>
                        <Clock className='w-4 h-4 text-primary' />
                        <Typography variant='p' className='font-mono m-0 ltr'>
                          {formatTime(wh.startTime)}
                        </Typography>
                      </div>
                    </div>

                    {/* End Time */}
                    <div className='flex-1 w-full md:w-auto flex items-center justify-between md:justify-center bg-muted/20 md:bg-transparent p-2 md:p-0 rounded md:rounded-none'>
                      <span className='md:hidden text-muted-foreground text-sm'>إلى:</span>
                      <div className='flex items-center gap-2'>
                        <Clock className='w-4 h-4 text-muted-foreground' />
                        <Typography variant='p' className='font-mono m-0 ltr'>
                          {formatTime(wh.endTime)}
                        </Typography>
                      </div>
                    </div>

                    {/* Status Badge (Desktop) */}
                    <div className='hidden md:flex flex-1 justify-end pl-4'>
                      {wh.isActive ? (
                        <div className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-green-500/15 text-green-700 dark:text-green-400'>
                          متاح للعمل
                        </div>
                      ) : (
                        <div className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-destructive/15 text-destructive'>
                          مغلق
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
