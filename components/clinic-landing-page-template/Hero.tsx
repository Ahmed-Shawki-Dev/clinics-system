import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { ArrowLeft, Rocket, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { IPublicClinic } from '../../types/public'

export default function Hero({ clinic }: { clinic: IPublicClinic }) {
  const {
    clinicName,
    phone,
    supportWhatsAppNumber,
    supportPhoneNumber,
    address,
    city,
    bookingEnabled,
    isActive,
  } = clinic

  const displayPhone = phone || supportPhoneNumber || supportWhatsAppNumber
  const displayAddress = [city, address].filter(Boolean).join('، ')

  return (
    <section className='relative flex flex-col  items-center justify-start  pt-16 md:pt-32  text-center overflow-hidden'>
      {/* Pattern Background */}
      <div className='absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] opacity-30'></div>

      {/* Ambient Glow */}

      <div className='container px-4 md:px-6 z-10 flex flex-col items-center'>
        {/* 1. Micro-copy / Badge */}
        <div className='mb-8 flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary transition-colors'>
          <Sparkles className='h-4 w-4' />
          <span>احجز موعدك الآن</span>
        </div>

        {/* 2. Massive Typography */}
        <Typography
          variant='h1'
          className='mb-6 max-w-4xl text-5xl md:text-7xl lg:text-8xl leading-snug tracking-tighter'
        >
          أهلا بكم في <br />
          <span className='text-transparent tracking-wide bg-clip-text bg-linear-to-r from-primary to-cyan-400 uppercase'>
            {clinicName}
          </span>
        </Typography>

        <Typography
          variant='lead'
          className='mx-auto mb-10 max-w-2xl text-lg md:text-xl leading-relaxed'
        >
          نسعى لتقديم أفضل خدمة مطلقة لكل عملائنا بأفضل سعر وأفضل جودة
        </Typography>

        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-16'>
          <Button size='lg' className='w-full sm:w-auto h-12 px-8 text-base gap-2' asChild>
            <Link href='/login'>
              سجل الدخول <ArrowLeft className='h-5 w-5' />
            </Link>
          </Button>
          <Button
            size='lg'
            variant='outline'
            className='w-full sm:w-auto h-12 px-8 text-base gap-2'
            asChild
          >
            <Link href='#features'>
              <Rocket className='h-5 w-5' /> احجز موعدك
            </Link>
          </Button>
        </div>
      </div>
      <div className='bg-background h-20 w-full blur-xl'/>
    </section>
  )
}
