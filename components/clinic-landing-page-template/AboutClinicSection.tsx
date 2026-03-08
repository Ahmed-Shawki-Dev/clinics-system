'use client'

import { fadeInUp, staggerContainer } from '@/animation'
import { Typography } from '@/components/ui/typography'
import { ArrowUpLeft, MapPin, MessageCircle, PhoneCall } from 'lucide-react'
import { motion } from 'framer-motion' // تأكد إن الاستيراد من framer-motion لو بتستخدم الإصدار الجديد
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

  // 2. التحكم في مقاس الجريد لضمان التوسيط وشكل متناسق
  const gridClass =
    activeCardsCount === 1
      ? 'grid-cols-1 max-w-sm mx-auto'
      : activeCardsCount === 2
        ? 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto'
        : 'grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto'

  return (
    <section id='about' className='py-24 md:py-32 relative overflow-hidden ' >



      <motion.div
        className='container mx-auto px-4 md:px-6 flex flex-col items-center text-center space-y-16 relative z-10'
        variants={staggerContainer}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* العناوين */}
        <div className='space-y-6 flex flex-col items-center w-full max-w-3xl'>
          <motion.div variants={fadeInUp}>
            <Typography
              variant='h2'
              className='text-3xl md:text-5xl lg:text-6xl font-black text-foreground w-full leading-[1.3] md:leading-[1.2]'
            >
              لماذا تختار{' '}
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60'>
                {clinic.clinicName}
              </span>{' '}
              ؟
            </Typography>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Typography
              variant='lead'
              className='text-muted-foreground leading-relaxed text-lg md:text-xl max-w-2xl mx-auto'
            >
              {description}
            </Typography>
          </motion.div>
        </div>

        {/* الكروت */}
        <div className={`grid gap-6 md:gap-8 w-full ${gridClass}`}>
          {/* كارت رقم الهاتف */}
          {displayPhone && (
            <motion.a
              href={`tel:${displayPhone}`}
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='group flex flex-col items-center justify-center gap-5 p-8 md:p-10 rounded-[2.5rem] bg-card/60 backdrop-blur-xl border border-border/50 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 relative overflow-hidden'
            >
              {/* شريط علوي يظهر في الهوفر */}
              <div className='absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right' />

              <div className='absolute top-6 left-6 opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500'>
                <ArrowUpLeft className='w-6 h-6 text-primary' />
              </div>

              <div className='bg-primary/10 p-5 rounded-2xl group-hover:bg-primary transition-colors duration-500'>
                <PhoneCall className='h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors duration-500' />
              </div>

              <div className='text-center space-y-2 mt-2'>
                <p className='text-sm text-muted-foreground font-bold uppercase tracking-wider'>
                  اتصل بنا
                </p>
                <p
                  className='font-black text-foreground text-2xl tracking-wide transition-colors group-hover:text-primary'
                  dir='ltr'
                >
                  {displayPhone}
                </p>
              </div>
            </motion.a>
          )}

          {/* كارت الواتساب */}
          {clinic.supportWhatsAppNumber && (
            <motion.a
              href={`https://wa.me/${clinic.supportWhatsAppNumber.replace(/\D/g, '')}`}
              target='_blank'
              rel='noopener noreferrer'
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='group flex flex-col items-center justify-center gap-5 p-8 md:p-10 rounded-[2.5rem] bg-card/60 backdrop-blur-xl border border-border/50 shadow-sm hover:shadow-2xl hover:shadow-[#25D366]/10 transition-all duration-500 relative overflow-hidden'
            >
              <div className='absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#25D366] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right' />

              <div className='absolute top-6 left-6 opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500'>
                <ArrowUpLeft className='w-6 h-6 text-[#25D366]' />
              </div>

              <div className='bg-[#25D366]/10 p-5 rounded-2xl group-hover:bg-[#25D366] transition-colors duration-500'>
                <MessageCircle className='h-8 w-8 text-[#25D366] group-hover:text-white transition-colors duration-500' />
              </div>

              <div className='text-center space-y-2 mt-2'>
                <p className='text-sm text-muted-foreground font-bold uppercase tracking-wider'>
                  دعم واتساب
                </p>
                <p
                  className='font-black text-foreground text-2xl tracking-wide transition-colors group-hover:text-[#25D366]'
                  dir='ltr'
                >
                  {clinic.supportWhatsAppNumber}
                </p>
              </div>
            </motion.a>
          )}

          {/* كارت العنوان */}
          {displayAddress && (
            <motion.a
              // تم تعديل الرابط ليعمل بشكل صحيح على خرائط جوجل
              href={`https://maps.google.com/?q=${encodeURIComponent(displayAddress)}`}
              target='_blank'
              rel='noopener noreferrer'
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='group flex flex-col items-center justify-center gap-5 p-8 md:p-10 rounded-[2.5rem] bg-card/60 backdrop-blur-xl border border-border/50 shadow-sm hover:shadow-2xl hover:shadow-foreground/10 transition-all duration-500 relative overflow-hidden'
            >
              <div className='absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-foreground to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right' />

              <div className='absolute top-6 left-6 opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500'>
                <ArrowUpLeft className='w-6 h-6 text-foreground' />
              </div>

              <div className='bg-muted p-5 rounded-2xl group-hover:bg-foreground transition-colors duration-500'>
                <MapPin className='h-8 w-8 text-foreground group-hover:text-background transition-colors duration-500' />
              </div>

              <div className='text-center space-y-2 mt-2'>
                <p className='text-sm text-muted-foreground font-bold uppercase tracking-wider'>
                  موقعنا
                </p>
                <p className='font-bold text-foreground text-base md:text-lg leading-snug line-clamp-2'>
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
