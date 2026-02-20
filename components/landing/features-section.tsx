import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { BarChart, Calendar, Clock, DollarSign, FileText, Users } from 'lucide-react'

const features = [
  {
    icon: Calendar,
    title: 'إدارة المواعيد بذكاء',
    description: 'نظام حجز متقدم مع تذكيرات أوتوماتيكية للمرضى عبر واتساب.',
  },
  {
    icon: Users,
    title: 'ملفات مرضى شاملة',
    description: 'تاريخ طبي كامل، أشعة، تحاليل، ووصفات طبية لجميع أفراد العائلة.',
  },
  {
    icon: FileText,
    title: 'وصفات وتحاليل إلكترونية',
    description: 'إنشاء وصفات وتحاليل وإرسالها للمريض إلكترونياً.',
  },
  {
    icon: DollarSign,
    title: 'الفواتير والمدفوعات',
    description: 'نظام محاسبي متكامل يتتبع المدفوعات والمستحقات.',
  },
  {
    icon: Clock,
    title: 'طوابير انتظار ذكية',
    description: 'نظام إدارة طوابير مرن يقلل وقت انتظار المرضى.',
  },
  {
    icon: BarChart,
    title: 'تقارير وتحليلات',
    description: 'تقارير يومية وشهرية عن الإيرادات وأداء العيادة.',
  },
]

export function FeaturesSection() {
  return (
    <section className='relative flex flex-col items-center justify-center py-24 md:py-32 text-center overflow-hidden'>
      <div className='container px-4 md:px-6'>
        {/* Header Section */}
        <div className='mx-auto max-w-3xl text-center mb-6'>
          <Typography variant='h2' className='mb-4'>
            كل ما تحتاجه لإدارة عيادتك الناجحة
          </Typography>
  
        </div>

        {/* Grid Section */}
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                className='group transition-shadow hover:shadow-md border-muted/60'
              >
                <CardHeader>
                  <div className='mb-4 inline-flex h-12 w-12 items-center justify-center  rounded-lg bg-primary/10 text-primary'>
                    <Icon className='h-6 w-6' />
                  </div>
                  <CardTitle>
                    <Typography variant='h3' className='text-xl text-right'>
                      {feature.title}
                    </Typography>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Typography variant='muted' className='text-right'>{feature.description}</Typography>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
