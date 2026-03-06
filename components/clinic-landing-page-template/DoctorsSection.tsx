'use client'

import { fadeInUp, staggerContainer } from '@/animation'
import { Badge } from '@/components/ui/badge'
import { Typography } from '@/components/ui/typography'
import { Stethoscope, UserRound } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import { IPublicDoctor } from '../../types/public' // تأكد من مسارك

export default function DoctorsSection({ doctors }: { doctors: IPublicDoctor[] }) {
  // 1. لو مفيش دكاترة، أو لو دكتور واحد (بناءً على طلبك هتهندلها بره)
  if (!doctors || doctors.length <= 1) return null

  const count = doctors.length

  // 2. هندلة التوزيع الذكي للكروت (Dynamic Width & Centering)
  // لو العدد 2 أو 4 -> أقصى حاجة عمودين
  // لو أي رقم تاني (3، 5، 6) -> أقصى حاجة 3 عواميد مع توسيط اليتيم
  const isTwoColumnLimit = count === 2 || count === 4
  const cardWidthClass = isTwoColumnLimit
    ? 'w-full md:w-[calc(50%-1.5rem)] max-w-md' // عمودين
    : 'w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] max-w-md lg:max-w-none' // تلات عواميد

  return (
    <section
      id='doctors'
      className='py-24 md:py-32 relative overflow-hidden bg-background'
    >

      <motion.div
        className='container mx-auto px-4 md:px-6'
        variants={staggerContainer}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* --- Header --- */}
        <div className='flex flex-col items-center justify-center text-center space-y-4 mb-16'>

          <motion.div variants={fadeInUp}>
            <Typography
              variant='h2'
              className='text-3xl md:text-5xl font-normal tracking-tight text-foreground'
            >
              أطباء العيادة
            </Typography>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Typography variant='lead' className='max-w-2xl text-muted-foreground'>
              فريق طبي متميز بتخصصات دقيقة لضمان أفضل تشخيص وعلاج. نجمع بين الخبرة العالية والرعاية
              الإنسانية.
            </Typography>
          </motion.div>
        </div>

        {/* --- Doctors Flex Grid --- 
            استخدمنا flex-wrap و justify-center عشان لو فيه كروت يتيمة (زي رقم 5) تتسنتر في النص
        */}
        <div className={`flex flex-wrap justify-center gap-6 max-w-7xl mx-auto`}>
          {doctors.map((doctor) => (
            <motion.div
              key={doctor.id}
              variants={fadeInUp}
              className={`group flex flex-col rounded-4xl border border-border/50 bg-card hover:bg-muted/20 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden ${cardWidthClass}`}
            >
              {/* Image Container */}
              <div className='relative w-full aspect-square md:aspect-4/3 overflow-hidden bg-muted/50'>
                {doctor.photoUrl ? (
                  <Image
                    src={doctor.photoUrl}
                    alt={doctor.name}
                    fill
                    className='object-cover object-top transition-transform duration-700 group-hover:scale-110'
                  />
                ) : (
                  <div className='absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/30'>
                    <UserRound className='h-24 w-24' />
                  </div>
                )}

                {/* Gradient Overlay for better contrast */}
                <div className='absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

                {/* Floating Specialty Badge (Overlapping the image edge) */}
                <div className='absolute bottom-4 start-4 z-10'>
                  <Badge className='bg-background/95 text-foreground shadow-lg backdrop-blur-md border-border/50 px-3 py-1 font-bold text-sm'>
                    {doctor.specialty || 'طبيب متخصص'}
                  </Badge>
                </div>
              </div>

              {/* Card Body */}
              <div className='flex flex-col flex-1 p-6 text-start'>
                <Typography
                  variant='h4'
                  className='font-black text-xl mb-3 text-foreground group-hover:text-primary transition-colors'
                >
                  {doctor.name}
                </Typography>

                {doctor.bio ? (
                  <Typography
                    variant='muted'
                    className='line-clamp-3 leading-relaxed text-sm mb-4 flex-1'
                  >
                    {doctor.bio}
                  </Typography>
                ) : (
                  <Typography variant='muted' className='italic opacity-50 text-sm mb-4 flex-1'>
                    لا توجد نبذة مختصرة.
                  </Typography>
                )}

                {/* الزرار بيدي إحساس إن الكارت ده Actionable */}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
