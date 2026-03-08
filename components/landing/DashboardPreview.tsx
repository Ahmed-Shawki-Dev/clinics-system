import { CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

export function DashboardPreview() {
  return (
    <section className='py-20 overflow-hidden '>
      <div className='container px-6 mx-auto '>
        <div className='flex flex-col lg:flex-row items-center gap-16'>
          {/* الجانب النصي */}
          <div className='flex-1 space-y-8  text-right'>
            <div className='space-y-4 '>
              <h2 className='text-4xl md:text-6xl font-black tracking-tighter leading-tight '>
                نظّم كشوفاتك <br />
                <span className='text-primary'>بمنتهى البساطة</span>
              </h2>
              <p className='text-lg text-muted-foreground leading-relaxed max-w-xl font-medium'>
                واجهة ذكية بتعرض لك الحالة الحالية، وقائمة الانتظار، مع إمكانية نقل الدور بضغطة زر.
                ركز في تشخيصك وسيب تنظيم الحالات علينا.
              </p>
            </div>

            {/* نقاط القوة - لغة بروفشنال */}
            <div className='grid gap-4'>
              {[
                'متابعة حية لترتيب الكشوفات',
                'كتابة الروشتة وحفظها في ثوانٍ',
                'ربط فوري بين الدكتور وسكرتارية العيادة',
              ].map((point, i) => (
                <div key={i} className='flex items-center gap-3 font-bold text-foreground/80'>
                  <CheckCircle2 className='w-5 h-5 text-primary' />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* جانب الموبايل */}
          <div className='flex-1 relative flex justify-center w-full '>
            <div className='relative w-70 h-145 md:w-[320px] md:h-162.5 border-10 border-zinc-900 rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.1)] overflow-hidden bg-background'>
              <div className='relative w-full h-full'>
                <Image
                  src='/landing/doctor-dashboard.webp'
                  alt='Medora Doctor Dashboard'
                  fill
                  className='object-cover'
                  priority
                />
              </div>
            </div>
            <div className='absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-primary/5 blur-[120px] rounded-full' />
          </div>
        </div>
      </div>
    </section>
  )
}
