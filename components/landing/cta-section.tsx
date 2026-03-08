import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { ArrowLeft, CheckCircle2, PhoneCall, Rocket } from 'lucide-react'
import Link from 'next/link'

export function CTASection() {
  return (
    // التعديل الجذري: السكشن نفسه هو اللي واخد الخلفية ومفرود بالكامل
    <section
      className='relative pt-20 pb-16 md:pt-32 md:pb-20 overflow-hidden bg-muted/20 border-t border-border/50'
    >

      <div
        className='absolute inset-0 opacity-[0.03] pointer-events-none'
        style={{
          backgroundImage:
            'linear-gradient(to right, gray 1px, transparent 1px), linear-gradient(to bottom, gray 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
        }}
      />

      <div className='container mx-auto relative z-10 px-4 md:px-6'>
        <div className='relative z-10 flex flex-col items-center w-full text-center'>

          <Typography
            variant='h2'
            className='text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.3] md:leading-[1.2] max-w-4xl'
          >
            جاهز لتحويل عيادتك لبيئة عمل <br className='hidden md:block' />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60'>
              رقمية بالكامل؟
            </span>
          </Typography>

          <p className='text-base md:text-xl mb-10 max-w-2xl text-muted-foreground leading-relaxed'>
            انضم لمئات الأطباء الذين يعتمدون على{' '}
            <span className='font-bold text-foreground'>ميدورا (Medora)</span> لإدارة عياداتهم
            بكفاءة. وفر وقتك، ضاعف أرباحك، ولا تدع المنافسة تسبقك.
          </p>

          {/* الزراير */}
          <div className='flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto'>
            <Button
              size='lg'
              className='w-full sm:w-auto h-14 px-8 text-base md:text-lg font-bold gap-2 group relative overflow-hidden shadow-[0_0_40px_-10px_rgba(var(--primary))] hover:-translate-y-1 transition-all duration-300'
              asChild
            >
              <Link href='/login'>
                {/* Shimmer Effect */}
                <div className='absolute inset-0 bg-white/20 translate-x-[-100%] skew-x-[-15deg] group-hover:animate-[shimmer_1.5s_infinite]' />
                ابدأ تجربتك الآن
                <ArrowLeft className='h-5 w-5 transition-transform group-hover:-translate-x-1' />
              </Link>
            </Button>

            <Button
              size='lg'
              variant='outline'
              className='w-full sm:w-auto h-14 px-8 text-base md:text-lg font-bold gap-2 bg-background hover:bg-muted transition-all duration-300 hover:-translate-y-1'
              asChild
            >
              <Link href='#contact'>
                <PhoneCall className='h-5 w-5' /> تواصل مع المبيعات
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className='flex flex-wrap items-center justify-center gap-4 md:gap-8 mt-12 w-full max-w-3xl text-sm md:text-base font-bold text-muted-foreground'>
            <div className='flex items-center gap-2'>
              <CheckCircle2 className='h-5 w-5 text-primary' />
              إعداد في أقل من 24 ساعة
            </div>
            <div className='flex items-center gap-2'>
              <CheckCircle2 className='h-5 w-5 text-primary' />
              دعم فني متواصل
            </div>
            <div className='flex items-center gap-2'>
              <CheckCircle2 className='h-5 w-5 text-primary' />
              تدريب مجاني لفريقك
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
