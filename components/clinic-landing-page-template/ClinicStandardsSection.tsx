'use client'

import { Clock, HeartHandshake, Shield, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
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
    <section className='py-24 bg-muted/20' dir='rtl'>
      <motion.div
        className='container max-w-5xl mx-auto px-4 md:px-6 flex flex-col items-center text-center space-y-16 relative z-10'
        variants={staggerContainer}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className='space-y-6 flex flex-col items-center w-full max-w-3xl'>
          <motion.div variants={fadeInUp}>
            <Typography
              variant='h2'
              className='text-3xl md:text-4xl lg:text-5xl font-normal text-foreground w-full leading-[1.2]'
            >
              لماذا يثق بنا<span className='text-primary font-bold'> المرضى</span> ؟
            </Typography>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Typography
              variant='lead'
              className='text-muted-foreground leading-relaxed text-lg md:text-xl'
            >
              نقدم أفضل الحلول الطبية
            </Typography>
          </motion.div>
        </div>

        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {standards.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='bg-card shadow-xl border border-border/50 rounded-2xl p-6 hover:shadow-lg hover:border-primary/30 transition-all group'
            >
              <div className='w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300'>
                <item.icon className='w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300' />
              </div>
              <h3 className='text-lg font-bold text-foreground mb-2'>{item.title}</h3>
              <p className='text-sm text-muted-foreground leading-relaxed'>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
