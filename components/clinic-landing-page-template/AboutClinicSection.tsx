'use client'

import { fadeInUp, staggerContainer } from '@/animation'
import { Typography } from '@/components/ui/typography'
import { ArrowUpLeft, MapPin, MessageCircle, PhoneCall } from 'lucide-react'
import { motion } from 'motion/react'
import { IPublicClinic } from '../../types/public'

interface ExtendedClinic extends IPublicClinic {
  aboutDescription?: string
}

export default function AboutClinicSection({ clinic }: { clinic: ExtendedClinic }) {
  if (!clinic) return null

  const displayAddress = [clinic.city, clinic.address].filter(Boolean).join('، ')
  const displayPhone = clinic.phone || clinic.supportWhatsAppNumber
  const description =
    clinic.aboutDescription ||
    'نلتزم بتقديم رعاية طبية استثنائية تعتمد على أحدث التقنيات وأفضل الكفاءات. نضع صحتك وصحة أسرتك في قمة أولوياتنا لضمان تجربة علاجية آمنة ومريحة.'

  // 1. حساب عدد الكروت المفعلة برمجياً
  const activeCardsCount = [displayPhone, clinic.supportWhatsAppNumber, displayAddress].filter(
    Boolean,
  ).length

  // 2. التحكم في مقاس الجريد بناءً على العدد لضمان التوسيط
  const gridClass =
    activeCardsCount === 1
      ? 'grid-cols-1 max-w-sm mx-auto'
      : activeCardsCount === 2
        ? 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto'
        : 'grid-cols-1 md:grid-cols-3'

  return (
    <section id='about' className='py-24 md:py-32 relative overflow-hidden ' dir='rtl'>
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-linear-to-r   ' />

      <motion.div
        className='container max-w-5xl mx-auto px-4 md:px-6 flex flex-col items-center text-center space-y-16 relative z-10'
        variants={staggerContainer}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className='space-y-6 flex flex-col items-center w-full max-w-3xl'>
          <motion.div variants={fadeInUp}>
            <Typography
              variant='h2'
              className='text-3xl md:text-4xl lg:text-5xl font-normal text-foreground w-full leading-[1.2]'
            >
              لماذا تختار <span className='text-primary font-bold'>{clinic.clinicName}</span> ؟
            </Typography>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Typography
              variant='lead'
              className='text-muted-foreground leading-relaxed text-lg md:text-xl'
            >
              {description}
            </Typography>
          </motion.div>
        </div>

        {/* 3. تطبيق الكلاس الديناميكي هنا */}
        <div className={`grid gap-6 w-full ${gridClass}`}>
          {displayPhone && (
            <motion.a
              href={`tel:${displayPhone}`}
              variants={fadeInUp}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='group flex flex-col items-center justify-center gap-5 p-8 rounded-4xl bg-background border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all relative overflow-hidden'
            >
              <div className='absolute top-4 left-4 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all'>
                <ArrowUpLeft className='w-5 h-5 text-muted-foreground' />
              </div>
              <div className='bg-primary/10 p-4 rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300'>
                <PhoneCall className='h-8 w-8 text-primary group-hover:text-primary-foreground' />
              </div>
              <div className='text-center space-y-1.5'>
                <p className='text-sm text-muted-foreground font-bold uppercase tracking-wider'>
                  اتصل بنا
                </p>
                <p className='font-black text-foreground text-xl' dir='ltr'>
                  {displayPhone}
                </p>
              </div>
            </motion.a>
          )}

          {clinic.supportWhatsAppNumber && (
            <motion.a
              href={`https://wa.me/${clinic.supportWhatsAppNumber.replace(/\D/g, '')}`}
              target='_blank'
              rel='noopener noreferrer'
              variants={fadeInUp}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='group flex flex-col items-center justify-center gap-5 p-8 rounded-[2rem] bg-background border border-border/50 shadow-sm hover:shadow-xl hover:border-[#25D366]/30 transition-all relative overflow-hidden'
            >
              <div className='absolute top-4 left-4 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all'>
                <ArrowUpLeft className='w-5 h-5 text-muted-foreground' />
              </div>
              <div className='bg-[#25D366]/10 p-4 rounded-2xl group-hover:bg-[#25D366] transition-colors duration-300'>
                <MessageCircle className='h-8 w-8 text-[#25D366] group-hover:text-white' />
              </div>
              <div className='text-center space-y-1.5'>
                <p className='text-sm text-muted-foreground font-bold uppercase tracking-wider'>
                  دعم واتساب
                </p>
                <p className='font-black text-foreground text-xl' dir='ltr'>
                  {clinic.supportWhatsAppNumber}
                </p>
              </div>
            </motion.a>
          )}

          {displayAddress && (
            <motion.a
              href={`https://maps.google.com/?q=${encodeURIComponent(displayAddress)}`}
              target='_blank'
              rel='noopener noreferrer'
              variants={fadeInUp}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='group flex flex-col items-center justify-center gap-5 p-8 rounded-[2rem] bg-background border border-border/50 shadow-sm hover:shadow-xl hover:border-destructive/30 transition-all relative overflow-hidden'
            >
              <div className='absolute top-4 left-4 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all'>
                <ArrowUpLeft className='w-5 h-5 text-muted-foreground' />
              </div>
              <div className='bg-destructive/10 p-4 rounded-2xl group-hover:bg-destructive transition-colors duration-300'>
                <MapPin className='h-8 w-8 text-destructive group-hover:text-white' />
              </div>
              <div className='text-center space-y-1.5'>
                <p className='text-sm text-muted-foreground font-bold uppercase tracking-wider'>
                  موقعنا
                </p>
                <p className='font-bold text-foreground text-base leading-snug line-clamp-2'>
                  {displayAddress}
                </p>
              </div>
            </motion.a>
          )}
        </div>
      </motion.div>
    </section>
  )
}
