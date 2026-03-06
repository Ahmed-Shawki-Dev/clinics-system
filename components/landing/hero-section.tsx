'use client'

import { ambientBlob1, ambientBlob2, fadeInUp, staggerContainer } from '@/animation'
import { Typography } from '@/components/ui/typography'
import { ChevronDown, HeartPulse, ShieldCheck, Star, Stethoscope } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { StarfieldBackground } from '../ui/starfield'

export default function HeroSection() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  // 4 طبقات من الحركة العكسية للكروت
  const floatX1 = useTransform(smoothX, [-0.5, 0.5], [-30, 30])
  const floatY1 = useTransform(smoothY, [-0.5, 0.5], [-30, 30])

  const floatX2 = useTransform(smoothX, [-0.5, 0.5], [40, -40])
  const floatY2 = useTransform(smoothY, [-0.5, 0.5], [40, -40])

  const floatX3 = useTransform(smoothX, [-0.5, 0.5], [20, -20])
  const floatY3 = useTransform(smoothY, [-0.5, 0.5], [-40, 40])

  const floatX4 = useTransform(smoothX, [-0.5, 0.5], [-40, 40])
  const floatY4 = useTransform(smoothY, [-0.5, 0.5], [20, -20])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    mouseX.set(clientX / innerWidth - 0.5)
    mouseY.set(clientY / innerHeight - 0.5)
  }

  return (
    <section
      className='relative font-serif min-h-[90vh] md:min-h-[95vh] flex items-center justify-center overflow-hidden w-full pt-20 pb-16'
      dir='rtl'
      onMouseMove={handleMouseMove}
    >
      <StarfieldBackground className='absolute inset-0 z-0' />

      {/* Background Blobs */}
      <motion.div
        variants={ambientBlob1}
        animate='animate'
        className='absolute top-1/4 -right-10 w-120 h-120 bg-primary/10 rounded-full blur-[100px] pointer-events-none z-0'
      />
      <motion.div
        variants={ambientBlob2}
        animate='animate'
        className='absolute bottom-0 -left-10 w-100 h-100 bg-secondary/10 rounded-full blur-[120px] pointer-events-none z-0'
      />

      <div className='absolute inset-0 bg-[url("https://grainy-gradients.vercel.app/noise.svg")] opacity-20 mix-blend-overlay pointer-events-none z-0'></div>

      {/* ====== طبقة الـ Fade السحرية ====== */}
      <div className='absolute bottom-0 left-0 w-full h-32 md:h-48 bg-linear-to-t from-background via-background/80 to-transparent pointer-events-none z-10' />

      <div className='container mx-auto px-4 relative z-20'>
        <motion.div
          className='flex flex-col items-center justify-center text-center max-w-4xl mx-auto space-y-8'
          variants={staggerContainer}
          initial='hidden'
          animate='visible'
        >
          {/* Main Title */}
          <motion.div variants={fadeInUp} className='w-full relative'>
            <Typography
              variant='h1'
              className='text-5xl md:text-7xl lg:text-8xl font-black text-foreground tracking-tighter leading-[1.1] bg-clip-text'
            >
              Medora
            </Typography>
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={fadeInUp}>
            <Typography
              variant='lead'
              className='text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed mx-auto'
            >
              نقدم لك ولأسرتك رعاية طبية متكاملة على يد نخبة من أفضل الأطباء. دقة في التشخيص، أحدث
              الأجهزة، وتجربة خالية من الانتظار.
            </Typography>
          </motion.div>

          {/* Trust Pile (Social Proof) */}
          <motion.div variants={fadeInUp} className='flex flex-col items-center gap-3 pt-6'>
            <div className='flex -space-x-3 -space-x-reverse'></div>
            <div className='flex items-center gap-2 text-sm text-muted-foreground font-medium'>
              <div className='flex'>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className='w-4 h-4 text-amber-400 fill-amber-400' />
                ))}
              </div>
              <span>موثوق من +10,000 مريض</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Cards - 4 زوايا */}
        {/* Top Right */}
        <motion.div
          className='hidden lg:flex absolute top-10 right-5 bg-background/80 border border-border p-4 rounded-3xl shadow-xl items-center gap-3 backdrop-blur-xl'
          style={{ x: floatX1, y: floatY1 }}
        >
          <div className='bg-primary/20 p-3 rounded-2xl'>
            <Stethoscope className='h-6 w-6 text-primary' />
          </div>
          <div>
            <p className='font-black text-base'>نخبة الأطباء</p>
            <p className='text-xs text-muted-foreground'>خبرات عالمية</p>
          </div>
        </motion.div>

        {/* Bottom Left */}
        <motion.div
          className='hidden lg:flex absolute bottom-20 left-10 bg-background/80 border border-border p-4 rounded-3xl shadow-xl items-center gap-3 backdrop-blur-xl'
          style={{ x: floatX2, y: floatY2 }}
        >
          <div className='bg-secondary/20 p-3 rounded-2xl'>
            <HeartPulse className='h-6 w-6 text-secondary-foreground' />
          </div>
          <div>
            <p className='font-black text-base'>أحدث التقنيات</p>
            <p className='text-xs text-muted-foreground'>تشخيص دقيق</p>
          </div>
        </motion.div>

        {/* Top Left */}
        <motion.div
          className='hidden lg:flex absolute top-20 left-16 bg-background/80 border border-border p-4 rounded-3xl shadow-xl items-center gap-3 backdrop-blur-xl'
          style={{ x: floatX3, y: floatY3 }}
        >
          <div className='bg-amber-500/20 p-3 rounded-2xl'>
            <Star className='h-6 w-6 text-amber-500 fill-amber-500' />
          </div>
          <div>
            <p className='font-black text-base'>4.9/5</p>
            <p className='text-xs text-muted-foreground'>تقييم الزوار</p>
          </div>
        </motion.div>

        {/* Bottom Right */}
        <motion.div
          className='hidden lg:flex absolute bottom-32 right-12 bg-background/80 border border-border p-4 rounded-3xl shadow-xl items-center gap-3 backdrop-blur-xl'
          style={{ x: floatX4, y: floatY4 }}
        >
          <div className='bg-emerald-500/20 p-3 rounded-2xl'>
            <ShieldCheck className='h-6 w-6 text-emerald-500' />
          </div>
          <div>
            <p className='font-black text-base'>عيادات معتمدة</p>
            <p className='text-xs text-muted-foreground'>معايير جودة عالية</p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator - خد بالك اديناه z-20 عشان يبان فوق الـ Fade */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className='absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground opacity-60 z-20'
      >
        <span className='text-xs uppercase tracking-wider font-semibold'>اكتشف المزيد</span>
        <ChevronDown className='w-5 h-5' />
      </motion.div>
    </section>
  )
}
