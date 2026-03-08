import { CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

export default function LandingFinanceSection() {
  return (
    <section className='py-24 bg-background overflow-hidden'>
      <div className='container px-6 mx-auto'>
        <div className=' flex flex-col lg:flex-row-reverse items-center   justify-between  gap-12 lg:gap-20 '>
          <div>
            <div className='space-y-4 w-full'>
              <h2 className='text-4xl md:text-6xl font-black tracking-tighter leading-[1.1] w-full '>
                إدارة مالية <br />
                <span className='text-primary'>بأعلى دقة</span>
              </h2>

              <p className='text-lg text-muted-foreground leading-relaxed font-medium max-w-[95%] md:max-w-lg'>
                وداعاً للحسابات اليدوية المعقدة. احصل على رؤية شاملة لأداء عيادتك المالي من خلال
                تقارير ذكية .
              </p>
            </div>

            {/* المميزات: Icons يمين تماماً */}
            <div className='grid gap-5 w-full mt-8'>
              {[
                'تقارير أرباح يومية وشهرية مفصلة',
                'تتبع مستحقات الشركات والتعاقدات بدقة',
                'إدارة كاملة لمصروفات العيادة والنثريات',
              ].map((point, i) => (
                <div
                  key={i}
                  className='flex items-center justify-start gap-3 font-bold text-foreground/80 w-full'
                >
                  <CheckCircle2 className='w-5 h-5 text-primary shrink-0' />
                  <span className='text-base md:text-lg leading-none'>{point}</span>
                </div>
              ))}
            </div>
          </div>
          {/* الجانب البصري: Dashboard Preview داخل إطار نظيف */}
          {/* الجانب البصري: زي ما هو w-1/2 بس ضفنا حماية الـ min-w */}
          <div className='w-1/2 min-w-[90vw] md:min-w-0 relative group'>
            <div className='relative aspect-video rounded-4xl p-3 bg-zinc-950 border border-zinc-200 shadow-2xl overflow-hidden'>
              <div className='relative w-full h-full rounded-xl overflow-hidden'>
                <Image
                  src='/landing/dashboard.webp'
                  fill
                  alt='Medora Finance Dashboard'
                  className='object-cover object-top-right transition-transform duration-700 group-hover:scale-105'
                  priority
                />
              </div>
            </div>

            {/* الجلو الخلفي */}
            <div className='absolute -z-10 -bottom-10 -right-10 w-40 h-40 bg-primary/10 blur-[80px] rounded-full' />
          </div>
        </div>
      </div>
    </section>
  )
}
