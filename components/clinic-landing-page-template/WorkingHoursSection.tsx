'use client'

import { fadeInUp, staggerContainer } from '@/animation'
import { Badge } from '@/components/ui/badge'
import { Typography } from '@/components/ui/typography'
import { DAY_ORDER, DAYS_AR, IPublicWorkingHour } from '@/types/public'
import { formatTime } from '../../lib/formatTime'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { CalendarClock, Clock } from 'lucide-react'

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
    <section className='py-20 md:py-32 relative overflow-hidden bg-background' dir='rtl'>


      <motion.div
        className='container px-4 md:px-6 max-w-4xl mx-auto relative z-10'
        variants={staggerContainer}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* العناوين */}
        <div className='flex flex-col items-center text-center space-y-4 mb-12'>

          <motion.div variants={fadeInUp}>
            <Typography variant='h2' className='text-3xl md:text-5xl font-black text-foreground'>
              مواعيد{' '}
              <span className='text-transparent bg-clip-text bg-linear-to-r from-primary to-primary/60'>
                العيادة
              </span>
            </Typography>
          </motion.div>
        </div>

        {/* كارت المواعيد الزجاجي */}
        <motion.div
          variants={fadeInUp}
          className='rounded-4xl border border-border/50 bg-card/60 backdrop-blur-xl shadow-2xl shadow-primary/5 overflow-hidden p-2 md:p-4'
        >
          <div className='flex flex-col'>
            {sortedHours.map((wh, index) => {
              const isActive = wh.isActive
              const dayName = DAYS_AR[wh.dayOfWeek] ?? wh.dayOfWeek

              return (
                <motion.div
                  key={wh.dayOfWeek}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }} // تأخير متدرج لكل يوم
                  className={cn(
                    'group flex items-center justify-between px-4 md:px-6 py-4 md:py-5 text-base rounded-2xl transition-all duration-300 hover:bg-muted/50',
                    !isActive && 'opacity-70 grayscale-50',
                  )}
                >
                  <div className='flex items-center gap-3 md:gap-4 font-bold'>
                    {/* أيقونة اليوم بتظهر وتختفي في الهوفر */}
                    <div
                      className={cn(
                        'p-2 rounded-lg transition-colors',
                        isActive
                          ? 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'
                          : 'bg-muted text-muted-foreground',
                      )}
                    >
                      <Clock className='w-4 h-4 md:w-5 md:h-5' />
                    </div>
                    <span className='min-w-24 md:min-w-32 text-foreground text-sm md:text-lg'>
                      {dayName}
                    </span>

                    {!isActive && (
                      <Badge
                        variant='outline'
                        className='text-xs border-destructive/30 text-destructive bg-destructive/5 px-3 py-0.5'
                      >
                        مغلق
                      </Badge>
                    )}
                  </div>

                  {isActive ? (
                    <div className='flex items-center gap-3 md:gap-6 font-bold text-foreground bg-background/50 px-4 py-2 rounded-xl border border-border/50 shadow-sm'>
                      <span className='tracking-wide text-sm md:text-base'>
                        {formatTime(wh.startTime)}
                      </span>
                      <span className='text-primary opacity-50'>–</span>
                      <span className='tracking-wide text-sm md:text-base'>
                        {formatTime(wh.endTime)}
                      </span>
                    </div>
                  ) : (
                    <div className='text-muted-foreground text-sm font-medium px-4 py-2 bg-muted/30 rounded-xl'>
                      عطلة أسبوعية
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* نص الملاحظة السفلية */}
        <motion.div variants={fadeInUp}>
          <p className='text-center text-sm text-muted-foreground mt-8 bg-muted/30 border border-border/50 py-3 px-6 rounded-full w-fit mx-auto'>
            المواعيد قابلة للتعديل في الأعياد والمناسبات الرسمية. يُفضَّل الحجز المسبق.
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
