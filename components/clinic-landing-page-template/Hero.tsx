import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography' // مسارك المظبوط
import { IPublicClinic } from '@/types/public'
import { CalendarDays, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

export default function Hero({ clinic }: { clinic: IPublicClinic }) {
  return (
    <section className='relative flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden bg-background py-12 md:py-24 lg:py-32'>
      {/* Background Pattern (Modern & Subtle) */}
      <div className='absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]'>
        <div className='absolute left-0 right-0 top-0 -z-10 m-auto h-77.5 w-77.5 rounded-full bg-primary/20 opacity-20 blur-[100px]'></div>
      </div>

      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center space-y-8 text-center'>
          {/* Badge */}
          <div className='inline-flex items-center rounded-full border border-transparent bg-primary/10 px-3 py-1 text-sm font-medium text-primary hover:bg-primary/20 transition-colors'>
            أهلاً بكم في
          </div>

          {/* Main Heading & Description */}
          <div className='space-y-4 max-w-4xl mx-auto'>
            <Typography
              variant='h1'
              className='tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl'
            >
              {clinic.clinicName}
            </Typography>

            <Typography
              variant='lead'
              className='mx-auto max-w-175 text-muted-foreground md:text-xl leading-relaxed'
            >
              رعايتكم مسؤوليتنا. نقدم أفضل الخدمات الطبية بأحدث التقنيات لضمان صحتكم وراحتكم، بخبرة
              تمتد لسنوات.
            </Typography>
          </div>

          {/* Contact Info (Chips) */}
          <div className='flex flex-wrap items-center justify-center gap-4'>
            {clinic.address && (
              <div className='flex items-center gap-2 rounded-lg border bg-card px-4 py-2 shadow-sm transition-colors hover:bg-accent/50'>
                <MapPin className='h-4 w-4 text-primary' />
                <Typography variant='small'>
                  {clinic.city ? `${clinic.city}، ` : ''}
                  {clinic.address}
                </Typography>
              </div>
            )}

            {(clinic.phone || clinic.supportPhoneNumber) && (
              <div className='flex items-center gap-2 rounded-lg border bg-card px-4 py-2 shadow-sm transition-colors hover:bg-accent/50'>
                <Phone className='h-4 w-4 text-primary' />
                <Typography variant='small' className='ltr font-mono'>
                  {clinic.phone || clinic.supportPhoneNumber}
                </Typography>
              </div>
            )}
          </div>

          {/* CTA Actions */}
          {clinic.bookingEnabled && (
            <div className='flex flex-col w-full sm:w-auto sm:flex-row gap-4 pt-4'>
              <Button
                size='lg'
                className='h-12 px-8 text-base shadow-md transition-transform hover:scale-105'
                asChild
              >
                <Link href='#doctors' className='flex items-center gap-2'>
                  <CalendarDays className='h-5 w-5' />
                  احجز موعد الآن
                </Link>
              </Button>
              <Button
                size='lg'
                variant='outline'
                className='h-12 px-8 text-base bg-background/50 backdrop-blur-sm'
                asChild
              >
                <Link href='#services'>عرض الخدمات</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
