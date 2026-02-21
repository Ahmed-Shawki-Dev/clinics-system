import { Typography } from '@/components/ui/typography'
import { Badge } from '@/components/ui/badge'
import { DAY_ORDER, DAYS_AR, IPublicWorkingHour } from '@/types/public'
import { formatTime } from '../../lib/formatTime'
import { cn } from '@/lib/utils'

export default function WorkingHoursSection({
  workingHours,
}: {
  workingHours: IPublicWorkingHour[]
}) {
  if (!workingHours?.length) return null

  const sortedHours = [...workingHours].sort(
    (a, b) => (DAY_ORDER[a.dayOfWeek] ?? 99) - (DAY_ORDER[b.dayOfWeek] ?? 99),
  )

  return (
    <section className='py-16 md:py-20 bg-background'>
      <div className='container px-4 md:px-6 max-w-3xl mx-auto'>
        <Typography variant='h2' className='text-3xl md:text-4xl font-bold text-center mb-10'>
          مواعيد العمل
        </Typography>

        <div className='divide-y divide-border/60 rounded-lg border border-border/40 bg-card'>
          {sortedHours.map((wh) => {
            const isActive = wh.isActive
            const dayName = DAYS_AR[wh.dayOfWeek] ?? wh.dayOfWeek

            return (
              <div
                key={wh.dayOfWeek}
                className={cn(
                  'flex items-center justify-between px-5 py-4 text-base',
                  !isActive && 'opacity-70',
                )}
              >
                <div className='flex items-center gap-3 font-medium'>
                  <span className='min-w-25 md:min-w-35'>{dayName}</span>

                  {!isActive && (
                    <Badge
                      variant='outline'
                      className='text-xs border-destructive/30 text-destructive/80'
                    >
                      مغلق
                    </Badge>
                  )}
                </div>

                {isActive ? (
                  <div className='flex items-center gap-4  font-medium text-right'>
                    <span>{formatTime(wh.startTime)}</span>
                    <span className='text-muted-foreground/70'>–</span>
                    <span>{formatTime(wh.endTime)}</span>
                  </div>
                ) : (
                  <div className='text-muted-foreground text-sm font-medium'>العيادة مغلقة</div>
                )}
              </div>
            )
          })}
        </div>

        <p className='text-center text-sm text-muted-foreground mt-8'>
          المواعيد قابلة للتعديل في الأعياد والمناسبات الرسمية. يُفضَّل الحجز المسبق.
        </p>
      </div>
    </section>
  )
}
