import { Badge } from '@/components/ui/badge'
import { Typography } from '@/components/ui/typography'
import { IPublicDoctor } from '@/types/public'
import { Award, Stethoscope, UserRound } from 'lucide-react'
import Image from 'next/image'

export default function AboutDoctorSection({ doctor }: { doctor: IPublicDoctor }) {
  if (!doctor) return null

  return (
    <section
      id='about-doctor'
      className='relative pt-12 md:pt-24 pb-20 md:pb-36 overflow-hidden bg-background w-full '
      dir='rtl'
    >
      {/* Container مبني بـ Grid زي الهيرو بالظبط (50/50) */}
      <div className='container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 md:gap-16 items-center relative z-10'>
        {/* 1. الكلام الأول في الكود (يعني هيظهر يمين في الـ RTL) */}
        <div className='flex flex-col space-y-8 text-center lg:text-right items-center lg:items-start  order-1'>
          <div className='space-y-5 flex flex-col items-center lg:items-start w-full '>
            <Badge
              variant='outline'
              className='bg-primary/5 text-primary border-primary/20 px-4 py-1.5 text-sm w-fit mx-auto lg:mx-0'
            >
              <UserRound className='ml-2 h-4 w-4' />
              عن الطبيب
            </Badge>

            <Typography
              variant='h2'
              className='text-4xl md:text-5xl lg:text-6xl font-black text-foreground w-full'
            >
              {doctor.name}
            </Typography>

            <div className='prose prose-lg dark:prose-invert text-muted-foreground leading-relaxed mx-auto lg:mx-0 max-w-xl'>
              {doctor.bio ? (
                <p>{doctor.bio}</p>
              ) : (
                <p className='italic opacity-70'>لم يتم إضافة نبذة تعريفية بعد.</p>
              )}
            </div>
          </div>

          {/* نقاط الثقة */}
          <div className='flex flex-col sm:flex-row gap-4 pt-6 border-t border-border/50 '>
            <div className='flex-1 flex flex-col lg:flex-row items-center lg:items-start gap-3 p-4 rounded-xl bg-muted/20 border border-border/50 text-center lg:text-right'>
              <div className='bg-primary/10 p-2 rounded-lg shrink-0'>
                <Award className='h-5 w-5 text-primary' />
              </div>
              <div>
                <p className='font-bold text-foreground text-sm'>خبرة معتمدة</p>
                <p className='text-xs text-muted-foreground mt-1'>
                  تشخيص دقيق مبني على أحدث المعايير الطبية.
                </p>
              </div>
            </div>

            <div className='flex-1 flex flex-col lg:flex-row items-center lg:items-start gap-3 p-4 rounded-xl bg-muted/20 border border-border/50 text-center lg:text-right'>
              <div className='bg-primary/10 p-2 rounded-lg shrink-0'>
                <Stethoscope className='h-5 w-5 text-primary' />
              </div>
              <div>
                <p className='font-bold text-foreground text-sm'>رعاية متكاملة</p>
                <p className='text-xs text-muted-foreground mt-1'>
                  متابعة مستمرة لحالتك الصحية خطوة بخطوة.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. الصورة التانية في الكود (يعني هتظهر شمال في الـ RTL) */}
        <div className='relative flex justify-center lg:justify-start mt-8 lg:mt-0 '>
          <div className='relative w-full max-w-125 aspect-4/5 rounded-4xl overflow-hidden shadow-2xl border-8 border-muted/50 bg-muted flex items-center justify-center'>
            {doctor.photoUrl ? (
              <Image
                src={doctor.photoUrl}
                alt={doctor.name}
                fill
                className='object-cover hover:scale-105 transition-transform duration-1000'
                priority
              />
            ) : (
              <UserRound className='h-32 w-32 text-muted-foreground/30' />
            )}

            <Badge className='absolute bottom-6 left-1/2 -translate-x-1/2 bg-background/80 border p-2 '>
              <Typography variant='h4' className='font-black text-foreground mb-1'>
                {doctor.specialty}
              </Typography>
            </Badge>
          </div>
        </div>
      </div>
    </section>
  )
}
