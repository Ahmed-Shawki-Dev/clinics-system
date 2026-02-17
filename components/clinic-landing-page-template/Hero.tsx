'use client'
import { IPublicClinic } from '@/types/public'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { Typography } from '../ui/typography'

interface HeroProps {
  clinic: IPublicClinic
}

export default function Hero({ clinic }: HeroProps) {
  const router = useRouter()
  return (
    <section className='w-full'>
      <div className='container  mx-auto px-4 py-16 text-center'>
        <h1 className='text-3xl md:text-5xl font-bold tracking-tight'>{clinic.clinicName}</h1>

        {clinic.address && (
          <Typography variant={'p'} className='mt-4 text-lg'>
            {clinic.address}
            {clinic.city ? ` - ${clinic.city}` : ''}
          </Typography>
        )}

        {clinic.phone && <Typography variant={'muted'}>{clinic.phone}</Typography>}

        <div className='mt-8 flex justify-center gap-4 flex-wrap'>
          {clinic.bookingEnabled && (
            <Button onClick={() => router.push(`tel:${clinic.phone}`)}>احجز موعدك الآن</Button>
          )}

          {clinic.phone && (
            <Button variant={'outline'} onClick={() => router.push(`tel:${clinic.phone}`)}>
              اتصل بنا
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
