import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { CalendarCheck, Sparkles, UserRound } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { IPublicClinic } from '../../types/public'

interface HeroProps {
  clinic: IPublicClinic
  tenantSlug: string
}

export default function Hero({ clinic, tenantSlug }: HeroProps) {
  const { clinicName, bookingEnabled } = clinic

  return (
    <section className='relative pt-12 md:pt-24 pb-20 md:pb-36 overflow-hidden' dir='rtl'>
      <div
        className='absolute inset-0 z-0 pointer-events-none opacity-[0.05] dark:opacity-[0.05]'
        style={{
          backgroundImage: `
            linear-gradient(to right, gray 1px, transparent 1px),
            linear-gradient(to bottom, gray 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
          // الـ Fade السحري اللي بيخليها تختفي تحت
          maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
        }}
      />
      <div className='absolute bottom-0 left-0 w-full h-32 md:h-48 bg-linear-to-t from-background to-transparent z-1' />

      <div className='container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 md:gap-16 items-center relative z-10'>
        {/* الجزء اليمين: متسنتر في الموبايل، يمين في الديسكتوب */}
        <div className='flex flex-col space-y-8 text-center lg:text-right items-center lg:items-start'>
          <div className='space-y-5 flex flex-col items-center lg:items-start'>
            <div className='inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary w-fit shadow-sm mx-auto lg:mx-0'>
              <Sparkles className='ml-2 h-4 w-4' />
              رعاية طبية بمقاييس عالمية
            </div>

            <Typography
              variant='h1'
              className='text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-[1.2] w-full'
            >
              {clinicName}
            </Typography>

            <Typography
              variant='lead'
              className='text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mx-auto lg:mx-0'
            >
              نقدم لك ولأسرتك رعاية طبية متكاملة على يد نخبة من أفضل الأطباء. دقة في التشخيص، أحدث
              الأجهزة، وبدون أوقات انتظار.
            </Typography>
          </div>

          <div className='flex flex-col space-y-4 pt-2 w-full'>
            <div className='flex flex-wrap items-center justify-center lg:justify-start gap-3'>
              {bookingEnabled && (
                <Button
                  className='h-11 px-6 text-base font-bold shadow-md hover:-translate-y-1 transition-transform gap-2'
                  asChild
                >
                  <Link href={`/${tenantSlug}#booking`}>
                    <CalendarCheck className='h-5 w-5' /> احجز كشفك
                  </Link>
                </Button>
              )}

              <Button variant='secondary' className='h-11 px-6 text-base font-bold gap-2' asChild>
                <Link href={`/${tenantSlug}/patient/login`}>
                  <UserRound className='h-5 w-5' /> بوابة المرضى
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* الجزء الشمال: مخفي في الموبايل، ظاهر في الديسكتوب */}
        <div className='hidden lg:flex relative justify-end mt-8 lg:mt-0'>
          <div className='relative w-full max-w-125 aspect-4/5 rounded-4xl overflow-hidden shadow-2xl border-8 border-muted/50 bg-muted'>
            <Image
              src='https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2070&auto=format&fit=crop'
              alt='صورة العيادة'
              fill
              className='object-cover hover:scale-105 transition-transform duration-1000'
              priority
            />
          </div>

          <div className='absolute -bottom-8 -left-8 bg-card border border-border/50 p-5 rounded-2xl shadow-xl flex items-center gap-4 z-20 backdrop-blur-sm'>
            <div className='bg-primary/10 p-3 rounded-xl'>
              <CalendarCheck className='h-8 w-8 text-primary' />
            </div>
            <div className='text-right'>
              <p className='font-black text-foreground text-sm'>حجز فوري</p>
              <p className='text-xs text-primary font-bold mt-1'>بدون قائمة انتظار</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
