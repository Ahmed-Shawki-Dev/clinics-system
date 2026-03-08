'use client'

import { Clock, HeartHandshake, Shield, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '../../animation'
import { Typography } from '../ui/typography'

// داتا حقيقية ومقنعة لأي عيادة بدون مبالغات
const standards = [
  {
    id: 1,
    title: 'معايير أمان صارمة',
    description: 'نطبق بروتوكولات تعقيم عالمية لضمان بيئة طبية آمنة تماماً لك ولأسرتك.',
    icon: Shield,
  },
  {
    id: 2,
    title: 'رعاية إنسانية',
    description: 'نستمع لمخاوفك بعناية ونضع راحتك النفسية والجسدية على رأس أولوياتنا.',
    icon: HeartHandshake,
  },
  {
    id: 3,
    title: 'احترام وقتك',
    description: 'نظام إدارة حجوزات دقيق يضمن لك الدخول في موعدك دون فترات انتظار مزعجة.',
    icon: Clock,
  },
]

export default function ClinicStandardsSection() {
  return (
    <section className='py-24 md:py-32 relative overflow-hidden'>


      <motion.div
        className='container max-w-6xl mx-auto px-4 md:px-6 flex flex-col items-center text-center space-y-16 relative z-10'
        variants={staggerContainer}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className='space-y-6 flex flex-col items-center w-full max-w-3xl'>


          <motion.div variants={fadeInUp}>
            <Typography
              variant='h2'
              className='text-3xl md:text-4xl lg:text-5xl font-black text-foreground w-full leading-[1.3] md:leading-[1.2]'
            >
              لماذا يثق بنا
              <span className='text-transparent bg-clip-text bg-linear-to-r from-primary to-primary/60'>
                {' '}
                المرضى
              </span>
              ؟
            </Typography>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Typography
              variant='lead'
              className='text-muted-foreground leading-relaxed text-lg md:text-xl'
            >
              لا نقدم مجرد علاج، بل نصنع تجربة رعاية طبية متكاملة تضعك في المركز الأول وتضمن لك راحة
              البال.
            </Typography>
          </motion.div>
        </div>

        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full'>
          {standards.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='group relative flex flex-col items-center text-center gap-4 p-8 md:p-10 rounded-[2.5rem] bg-card/60 backdrop-blur-xl border border-border/50 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden'
            >
              {/* شريط اللمعان العلوي اللي بيفرش من النص في الهوفر */}
              <div className='absolute top-0 inset-x-0 h-1 bg-linear-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center' />

              {/* الأيقونة */}
              <div className='w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary group-hover:scale-110 transition-all duration-500'>
                <item.icon className='w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-500' />
              </div>

              {/* النصوص */}
              <h3 className='text-xl font-bold text-foreground mt-2 group-hover:text-primary transition-colors duration-300'>
                {item.title}
              </h3>

              <p className='text-base text-muted-foreground leading-relaxed'>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
