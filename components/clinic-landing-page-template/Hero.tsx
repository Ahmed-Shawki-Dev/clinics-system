'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft, Clock, ShieldCheck, Stethoscope } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { IPublicClinic } from '../../types/public'

interface HeroProps {
  clinic: IPublicClinic
  tenantSlug: string
}

export default function Hero({ clinic, tenantSlug }: HeroProps) {
  return (
    <section className='relative w-full pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden' dir='rtl'>
      {/* رجعنا الترتيب الطبيعي للجريد بدون كلاسات order */}
      <div className='w-full max-w-350 mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
        {/* النصف الأيمن: النصوص */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='flex flex-col items-start space-y-8 text-start'
        >
          <div className='space-y-6 w-full'>
            <h1 className='text-5xl md:text-6xl lg:text-[5rem] xl:text-[6rem] font-black leading-[1.1] tracking-tight'>
              رعاية متقدمة
              <br />
              <span className='italic text-transparent bg-clip-text bg-linear-to-r from-primary to-primary/60'>
                يمكنك{' '}
              </span>
              <span>الوثوق بها.</span>
            </h1>

            <p className='text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed font-normal'>
              تشخيص رقمي دقيق، إجراءات طبية متطورة، ونتائج مضمونة في كل مرحلة من مراحل علاجك معنا.
            </p>
          </div>

          <Button
            className='rounded-full h-14 px-8 text-base font-bold transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(var(--primary))] hover:-translate-y-1 gap-2 group'
            asChild
          >
            <Link href={`/${tenantSlug}#booking`}>
              احجز استشارتك
              <ArrowLeft className='w-5 h-5 transition-transform duration-300 group-hover:-translate-x-2' />
            </Link>
          </Button>
        </motion.div>

        {/* النصف الأيسر: الصورة وإطارات الهوفر المودرن */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='relative w-full max-w-2xl mx-auto lg:me-0 lg:max-w-none h-125 lg:h-160 group'
        >
          {/* الإطار المودرن 1: لون أساسي متدرج (بيتحرك للشمال ولأسفل) */}
          <div className='absolute inset-0 rounded-[2.5rem] bg-linear-to-tl from-primary to-primary/40 opacity-80 transition-all duration-700 ease-out group-hover:-translate-x-6 group-hover:translate-y-4 group-hover:-rotate-2 -z-10 shadow-2xl' />

          {/* الإطار المودرن 2: خط خفيف بيتحرك العكس بيدي عمق (بيتحرك لليمين ولأعلى) */}
          <div className='absolute inset-0 rounded-[2.5rem] border border-border/50 bg-muted/20 transition-all duration-700 ease-out group-hover:translate-x-3 group-hover:-translate-y-3 -z-20' />

          {/* الصورة الأساسية (بتتحرك سنة لليمين ولأعلى عشان تبعد عن الإطار) */}
          <div className='relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-xl transition-all duration-700 ease-out group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:shadow-2xl'>
            <Image
              src='https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1632&auto=format&fit=crop'
              alt='رعاية طبية'
              fill
              className='object-cover object-center transition-transform duration-1000 group-hover:scale-110'
              priority
            />
            {/* ضل متدرج عشان الكروت تبان بوضوح فوق الصورة */}
            <div className='absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent transition-opacity duration-500 group-hover:opacity-80' />
          </div>

          {/* صندوق المميزات (Dynamic Dark/Light Mode) */}
          <div className='absolute bottom-6 left-6 right-6 rounded-2xl p-2 md:p-3 flex gap-2 md:gap-3 shadow-2xl backdrop-blur-xl bg-background/60 dark:bg-card/60 border border-border/50 transition-all duration-700 ease-out group-hover:-translate-y-4'>
            {/* الميزة الأولى */}
            <div className='flex-1 bg-card dark:bg-muted/50 rounded-xl p-3 md:p-4 flex flex-col items-center justify-center text-center transition-all duration-300 hover:bg-primary/5 dark:hover:bg-primary/20 hover:-translate-y-1 hover:shadow-lg cursor-pointer border border-border/40'>
              <div className='bg-primary/10 dark:bg-primary/20 p-2 md:p-2.5 rounded-full mb-2 md:mb-3'>
                <ShieldCheck className='w-5 h-5 md:w-6 md:h-6 text-primary' />
              </div>
              <span className='font-bold text-xs md:text-sm text-foreground mb-0.5'>
                أمان وتعقيم
              </span>
            </div>

            {/* الميزة الثانية */}
            <div className='flex-1 bg-card dark:bg-muted/50 rounded-xl p-3 md:p-4 flex flex-col items-center justify-center text-center transition-all duration-300 hover:bg-primary/5 dark:hover:bg-primary/20 hover:-translate-y-1 hover:shadow-lg cursor-pointer border border-border/40'>
              <div className='bg-primary/10 dark:bg-primary/20 p-2 md:p-2.5 rounded-full mb-2 md:mb-3'>
                <Stethoscope className='w-5 h-5 md:w-6 md:h-6 text-primary' />
              </div>
              <span className='font-bold text-xs md:text-sm text-foreground mb-0.5'>
                رعاية شاملة
              </span>
            </div>

            {/* الميزة الثالثة */}
            <div className='flex-1 bg-card dark:bg-muted/50 rounded-xl p-3 md:p-4 flex flex-col items-center justify-center text-center transition-all duration-300 hover:bg-primary/5 dark:hover:bg-primary/20 hover:-translate-y-1 hover:shadow-lg cursor-pointer border border-border/40'>
              <div className='bg-primary/10 dark:bg-primary/20 p-2 md:p-2.5 rounded-full mb-2 md:mb-3'>
                <Clock className='w-5 h-5 md:w-6 md:h-6 text-primary' />
              </div>
              <span className='font-bold text-xs md:text-sm text-foreground mb-0.5'>
                بدون انتظار
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
