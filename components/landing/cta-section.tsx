import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { ArrowLeft, PhoneCall } from 'lucide-react'
import Link from 'next/link'

export function CTASection() {
  return (
    <section className='relative py-24 overflow-hidden '>
      {/* <div className='absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl' />
      <div className='absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl' /> */}

      <div className='container mx-auto relative z-10 px-4 md:px-6'>
        <div className='mx-auto max-w-4xl text-center flex flex-col items-center'>
          <Typography variant='h2' className='text-4xl md:text-5xl font-bold mb-6 leading-18'>
            جاهز لتحويل عيادتك لبيئة عمل رقمية بالكامل؟
          </Typography>

          <Typography variant='lead' className='mb-10 max-w-2xl text-muted-foreground'>
            انضم لمئات الأطباء الذين يعتمدون على Beta Clinic لإدارة عياداتهم بكفاءة. ابدأ اليوم ولا
            تدع المنافسة تسبقك.
          </Typography>

          <div className='flex flex-col sm:flex-row gap-4 w-full sm:w-auto'>
            <Button size='lg' className='h-14 px-8 text-lg gap-2' asChild>
              <Link href='/login'>
                ابدأ تجربتك الآن <ArrowLeft className='h-5 w-5' />
              </Link>
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='h-14 px-8 text-lg gap-2 bg-background'
              asChild
            >
              <Link href='#contact'>
                <PhoneCall className='h-5 w-5' /> تواصل مع المبيعات
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
