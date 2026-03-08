'use client'

import { fadeInUp, staggerContainer } from '@/animation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Typography } from '@/components/ui/typography'
import { BarChart, Calendar, Clock, DollarSign, FileText, Users } from 'lucide-react'
import { motion } from 'motion/react'

const features = [
  {
    icon: Calendar,
    title: 'إدارة المواعيد',
    description: 'نظام حجز ذكي مع تذكيرات أوتوماتيكية للمرضى عبر واتساب لتقليل التخلف عن المواعيد.',
  },
  {
    icon: Users,
    title: 'ملفات المرضى',
    description: 'سجل طبي رقمي شامل يشمل الأشعة، التحاليل، والروشتات السابقة لكل مريض.',
  },
  {
    icon: FileText,
    title: 'روشتات إلكترونية',
    description: 'أصدر روشتاتك بضغطة زر وأرسلها فوراً للمريض، مع دعم كامل لقواعد بيانات الأدوية.',
  },
  {
    icon: DollarSign,
    title: 'النظام المالي',
    description: 'تتبع دقيق للإيرادات، المصروفات، وصافي الأرباح بتقارير محاسبية احترافية.',
  },
  {
    icon: Clock,
    title: 'الطابور الذكي',
    description: 'نظام إدارة انتظار حي يقلل الازدحام داخل العيادة ويحسن تجربة المريض بشكل جذري.',
  },
  {
    icon: BarChart,
    title: 'تحليلات الأداء',
    description: 'لوحة بيانات تفاعلية تعرض نمو عيادتك وأكثر الخدمات طلباً لاتخاذ قرارات مدروسة.',
  },
]

export function FeaturesSection() {
  return (
    <section className='py-24 bg-background relative overflow-hidden'>
      <div className='container px-6 mx-auto relative z-10'>
        {/* Header - Centered & Direct */}
        <motion.div
          className='max-w-3xl mx-auto text-center mb-16 space-y-4'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <Typography
              variant='h2'
              className='text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]'
            >
              مميزات النظام
            </Typography>
          </motion.div>
        </motion.div>

        {/* 📱 نسخة الموبايل: Carousel (بدون تعقيد) */}
        <div className='block md:hidden'>
          <Carousel opts={{ align: 'start', direction: 'rtl' }} className='w-full'>
            <CarouselContent className='-ml-4'>
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <CarouselItem key={index} className='pl-4 basis-[88%]'>
                    <Card className='h-full border-muted/60 shadow-sm rounded-3xl overflow-hidden bg-card/50 backdrop-blur-sm'>
                      <CardHeader className='p-6'>
                        <div className='mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner'>
                          <Icon className='h-7 w-7' />
                        </div>
                        <CardTitle className='text-2xl font-black text-right tracking-tight'>
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className='px-6 pb-6'>
                        <Typography className='text-muted-foreground text-right leading-relaxed font-medium'>
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
          </Carousel>
          <p className='text-center text-[10px] uppercase tracking-widest text-muted-foreground mt-6 opacity-50 font-bold'>
            ← اسحب لاستكشاف المميزات
          </p>
        </div>

        {/* 💻 نسخة الكمبيوتر: Grid (أنيقة ومنظمة) */}
        <div className='hidden md:grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Card className='group h-full transition-all duration-500 hover:border-primary/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] border-muted/60 rounded-[2.5rem] bg-card/30 backdrop-blur-sm relative overflow-hidden'>
                  {/* لمسة ديكور خفيفة بتظهر في الهوفر */}
                  <div className='absolute -right-8 -top-8 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors' />

                  <CardHeader>
                    <div className='mb-6 inline-flex h-16 w-16 items-center justify-center rounded-[1.25rem] bg-background border border-muted group-hover:border-primary/20 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm'>
                      <Icon className='h-8 w-8' />
                    </div>
                    <CardTitle className='text-2xl font-black text-right tracking-tighter leading-none'>
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='px-8 pb-8'>
                    <Typography className='text-muted-foreground text-right leading-relaxed font-medium'>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
