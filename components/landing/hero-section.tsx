'use client'

import { ambientBlob1, ambientBlob2, fadeInUp, staggerContainer } from '@/animation'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  BarChart3,
  CalendarCheck,
  ChevronDown,
  ShieldCheck,
  Star,
  Users,
} from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { StarfieldBackground } from '../ui/starfield'

export default function HeroSection() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 50, stiffness: 250 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  // 4 طبقات من الحركة العكسية للكروت (Parallax)
  const floatX1 = useTransform(smoothX, [-0.5, 0.5], [-35, 35])
  const floatY1 = useTransform(smoothY, [-0.5, 0.5], [-35, 35])

  const floatX2 = useTransform(smoothX, [-0.5, 0.5], [45, -45])
  const floatY2 = useTransform(smoothY, [-0.5, 0.5], [45, -45])

  const floatX3 = useTransform(smoothX, [-0.5, 0.5], [25, -25])
  const floatY3 = useTransform(smoothY, [-0.5, 0.5], [-45, 45])

  const floatX4 = useTransform(smoothX, [-0.5, 0.5], [-45, 45])
  const floatY4 = useTransform(smoothY, [-0.5, 0.5], [25, -25])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    mouseX.set(clientX / innerWidth - 0.5)
    mouseY.set(clientY / innerHeight - 0.5)
  }

  return (
    <section
      className='relative min-h-[95vh] flex items-center justify-center overflow-hidden w-full pt-20 pb-16 bg-background'
      dir='rtl'
      onMouseMove={handleMouseMove}
    >
      <StarfieldBackground className='absolute inset-0 z-0 hidden md:block' />

      {/* Background Blobs - ألوان أهدى وأكثر احترافية */}
      <motion.div
        variants={ambientBlob1}
        animate='animate'
        className='absolute top-1/4 -right-10 w-120 h-120 bg-primary/10 rounded-full blur-[100px] pointer-events-none z-0'
      />
      <motion.div
        variants={ambientBlob2}
        animate='animate'
        className='absolute bottom-0 -left-10 w-100 h-100 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none z-0'
      />

      <div className='absolute inset-0 bg-[url("https://grainy-gradients.vercel.app/noise.svg")] opacity-10 mix-blend-overlay pointer-events-none z-0'></div>

      <div className='absolute bottom-0 left-0 w-full h-48 bg-linear-to-t from-background via-background/80 to-transparent pointer-events-none z-10' />

      <div className='container mx-auto px-4 relative z-20'>
        <motion.div
          className='flex flex-col items-center justify-center text-center max-w-5xl mx-auto space-y-10'
          variants={staggerContainer}
          initial='hidden'
          animate='visible'
        >
          {/* Main Title */}
          <div className='space-y-4 md:space-y-2'>
            <motion.div variants={fadeInUp} className='w-full'>
              <h1 className='text-6xl md:text-8xl  font-sans font-black'>MEDORA CLINIC</h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div variants={fadeInUp}>
              <p className='text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium'>
                تحكم كامل في المواعيد، السجلات الطبية، والتقارير المالية في منصة واحدة فائقة السرعة.
              </p>
            </motion.div>
          </div>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className='flex flex-wrap items-center justify-center gap-5 pt-4'
          >
            <Button
              size='lg'
              className='h-12 px-5  font-black rounded-2xl shadow-2xl shadow-primary/20 hover:scale-105 transition-all'
            >
              ابدأ الآن
              <ArrowLeft className='mr-2 h-5 w-5' />
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='h-12 px-5 font-black rounded-2xl backdrop-blur-md border-border hover:bg-muted/50 transition-all'
            >
              مشاهدة النظام
            </Button>
          </motion.div>

          {/* Trust Pile */}
          <motion.div variants={fadeInUp} className='flex flex-col items-center gap-3 pt-4'>
            <div className='flex items-center gap-2 text-sm text-muted-foreground font-bold tracking-widest uppercase opacity-70'>
              <div className='flex ml-2'>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className='w-4 h-4 text-amber-400 fill-amber-400' />
                ))}
              </div>
              <span>موثوق من الأطباء</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating SaaS Cards */}
        {/* Top Right: Queue */}
        <motion.div
          className='hidden lg:flex absolute top-10 right-[5%] bg-card/60 border border-primary/20 p-5 rounded-4xl shadow-2xl items-center gap-4 backdrop-blur-2xl'
          style={{ x: floatX1, y: floatY1 }}
        >
          <div>
            <CalendarCheck />
          </div>
          <div className='text-right'>
            <p className='font-black text-lg'>الدور الحالي</p>
            <p className='text-xs text-muted-foreground font-bold'>تحديث لحظي للأدوار</p>
          </div>
        </motion.div>

        {/* Bottom Left: Finance */}
        <motion.div
          className='hidden lg:flex absolute bottom-20 left-[5%] bg-card/60 border border-emerald-500/20 p-5 rounded-4xl shadow-2xl items-center gap-4 backdrop-blur-2xl'
          style={{ x: floatX2, y: floatY2 }}
        >
          <div>
            <BarChart3 />
          </div>
          <div className='text-right'>
            <p className='font-black text-lg'>تقارير مالية</p>
            <p className='text-xs text-muted-foreground font-bold'>متابعة الإيرادات والمصروفات</p>
          </div>
        </motion.div>

        {/* Top Left: Records */}
        <motion.div
          className='hidden lg:flex absolute top-20 left-[8%] bg-card/60 border border-blue-500/20 p-5 rounded-4xl shadow-2xl items-center gap-4 backdrop-blur-2xl'
          style={{ x: floatX3, y: floatY3 }}
        >
          <div>
            <Users />
          </div>
          <div className='text-right'>
            <p className='font-black text-lg'>سجلات طبية</p>
            <p className='text-xs text-muted-foreground font-bold'>أرشفة ذكية وشاملة</p>
          </div>
        </motion.div>

        {/* Bottom Right: Security */}
        <motion.div
          className='hidden lg:flex absolute bottom-32 right-[10%] bg-card/60 border border-amber-500/20 p-5 rounded-4xl shadow-2xl items-center gap-4 backdrop-blur-2xl'
          style={{ x: floatX4, y: floatY4 }}
        >
          <div>
            <ShieldCheck />
          </div>
          <div className='text-right'>
            <p className='font-black text-lg'>حماية البيانات</p>
            <p className='text-xs text-muted-foreground font-bold'>حماية كاملة لبيانات العيادة</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className='absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 z-20'
      >
        <ChevronDown className='w-5 h-5' />
      </motion.div>
    </section>
  )
}
