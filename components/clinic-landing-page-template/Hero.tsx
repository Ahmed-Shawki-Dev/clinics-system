'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft, Clock, ShieldCheck, Stethoscope } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { IPublicClinic } from '../../types/public'

interface HeroProps {
  clinic: IPublicClinic
  tenantSlug: string
}

export default function Hero({ clinic, tenantSlug }: HeroProps) {
  // const clinicName = clinic?.clinicName || 'عيادتنا'

  return (
    <section className='relative w-full  pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden'>
      <div className='w-full max-w-400 mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
        {/* النصف الأيمن: النصوص */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='flex flex-col items-start space-y-8 text-start'
        >
          <div className='space-y-6 w-full'>
            <h1 className='text-5xl md:text-6xl lg:text-[5rem] xl:text-[6rem] font-medium leading-[1.1] tracking-tight'>
              رعاية متقدمة
              <br />
              <span className='font-bold italic text-primary'>يمكنك </span>
              <span>الوثوق بها.</span>
            </h1>

            <p className='text-lg md:text-xl text-slate-500 max-w-lg leading-relaxed font-normal'>
              تشخيص رقمي دقيق، إجراءات طبية متطورة، ونتائج مضمونة في كل مرحلة من مراحل علاجك معنا.
            </p>
          </div>

          <Button
            className='rounded-full h-14 px-8 text-base font-medium transition-colors gap-2'
            asChild
          >
            <Link href={`/${tenantSlug}#booking`}>
              احجز استشارتك <ArrowLeft className='w-5 h-5' />
            </Link>
          </Button>
        </motion.div>

        {/* النصف الأيسر: الصورة وصندوق الإحصائيات */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          // كبرنا العرض الأقصى للصورة عشان تملى المساحة الواسعة الجديدة
          className='relative w-full max-w-2xl mx-auto lg:me-0 lg:max-w-none h-125 lg:h-160 rounded-[2.5rem] overflow-hidden shadow-2xl'
        >
          <Image
            src='https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='رعاية طبية'
            fill
            className='object-cover object-center '
            priority
          />
          {/* صندوق المميزات (بديل الإحصائيات الوهمية) */}
          <div className='absolute bottom-4 md:bottom-6 left-4 right-4 md:left-6 md:right-6  rounded-2xl p-3 flex gap-2 md:gap-3 '>
            {/* الميزة الأولى: التعقيم والأمان */}
            <div className='flex-1 bg-slate-50 rounded-xl p-3 md:p-4 flex flex-col items-center justify-center text-center transition-colors hover:bg-blue-50 group'>
              <div className='bg-blue-100/50 p-2 rounded-full mb-2'>
                <ShieldCheck className='w-5 h-5 md:w-6 md:h-6' />
              </div>
              <span className='font-bold text-sm md:text-base text-slate-900 mb-0.5'>
                أمان وتعقيم
              </span>
            </div>

            {/* الميزة الثانية: الرعاية */}
            <div className='flex-1 bg-slate-50 rounded-xl p-3 md:p-4 flex flex-col items-center justify-center text-center transition-colors hover:bg-blue-50 group'>
              <div className='bg-blue-100/50 p-2 rounded-full mb-2'>
                <Stethoscope className='w-5 h-5 md:w-6 md:h-6' />
              </div>
              <span className='font-bold text-sm md:text-base text-slate-900 mb-0.5'>
                رعاية شاملة
              </span>
            </div>

            {/* الميزة الثالثة: الوقت */}
            <div className='flex-1 bg-slate-50 rounded-xl p-3 md:p-4 flex flex-col items-center justify-center text-center transition-colors group'>
              <div className='bg-blue-100/50 p-2 rounded-full mb-2  transition-colors'>
                <Clock className='w-5 h-5 md:w-6 md:h-6 transition-colors' />
              </div>
              <span className='font-bold text-sm md:text-base text-slate-900 mb-0.5'>
                بدون انتظار
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
