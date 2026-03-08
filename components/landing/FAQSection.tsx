import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Typography } from '@/components/ui/typography'
import { HelpCircle } from 'lucide-react'

// الداتا دي مكتوبة بأسلوب بياع (B2B Copywriting) بيخاطب الدكاترة مباشرة
const faqs = [
  {
    question: 'هل النظام مناسب لعيادتي الفردية ولا مخصص للمستشفيات فقط؟',
    answer:
      'تم تصميم Medora ليكون مرناً وقابلاً للتخصيص. سواء كنت تدير عيادة فردية صغيرة أو مركزاً طبياً يضم عدة أطباء وتخصصات، النظام سيتكيف مع احتياجاتك ويسهل عليك إدارتها بالكامل.',
  },
  {
    question: 'هل بيانات مرضاي في أمان؟ وهل يمكن لأي شخص الاطلاع عليها؟',
    answer:
      'أمان بياناتك هو أولويتنا القصوى. نستخدم بنية برمجية معزولة (Multi-tenant Architecture) تضمن أن بيانات عيادتك مفصولة تماماً عن أي عيادة أخرى. كما نستخدم أحدث بروتوكولات التشفير العالمية.',
  },
  {
    question: 'هل يحتاج النظام إلى أجهزة كمبيوتر بمواصفات عالية؟',
    answer:
      'إطلاقاً! النظام يعمل بالكامل سحابياً (Cloud-based). كل ما تحتاجه هو متصفح إنترنت واتصال بالشبكة. يعمل بسلاسة على أجهزة الكمبيوتر، الأجهزة اللوحية (التابلت)، وحتى الهواتف الذكية.',
  },
  {
    question: 'هل يدعم النظام الحجز الإلكتروني للمرضى؟',
    answer:
      'نعم، نوفر لك صفحة حجز إلكترونية خاصة بعيادتك (Landing Page) يمكن للمرضى من خلالها رؤية مواعيدك المتاحة وحجز كشوفاتهم مباشرة، مما يقلل الضغط على موظفي الاستقبال.',
  },
  {
    question: 'كيف يعمل نظام التنبيهات عبر الواتساب؟',
    answer:
      'يقوم النظام تلقائياً بإرسال رسائل واتساب للمرضى لتأكيد الحجز، تذكيرهم بموعد الكشف، أو حتى إرسال رسائل متابعة بعد الزيارة، وكل هذا يتم بشكل آلي تماماً بدون تدخل يدوي.',
  },
  {
    question: 'ماذا لو واجهت مشكلة فنية أثناء العمل في العيادة؟',
    answer:
      'فريق الدعم الفني لدينا متواجد على مدار الساعة طوال أيام الأسبوع لضمان عدم توقف عملك. يمكنك التواصل معنا فوراً عبر الواتساب أو الهاتف وسيتم حل أي عائق في دقائق معدودة.',
  },
]

export default function FAQSection() {
  return (
    <section id='faq' className='py-20 md:py-32 relative bg-background overflow-hidden' dir='rtl'>

      <div className='container mx-auto px-4 md:px-6 relative z-10 max-w-5xl'>
        <div className='text-center mb-16 space-y-4 flex flex-col items-center'>
          <Typography variant='h2' className='text-3xl md:text-5xl font-black text-foreground'>
            كل ما تود معرفته عن <span className='text-primary'>النظام</span>
          </Typography>

          <p className='text-lg text-muted-foreground max-w-2xl'>
            جمعنا لك إجابات لأكثر الأسئلة التي يطرحها الأطباء قبل الانضمام لمنصتنا.
          </p>
        </div>

        <Accordion type='single' collapsible className='w-full space-y-4'>
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              // الستايل هنا بيخليها كروت منفصلة وشيك بدل الخطوط العادية
              className='border border-border/60 rounded-2xl bg-card px-2 md:px-6 shadow-sm hover:border-primary/40 data-[state=open]:border-primary/50 data-[state=open]:shadow-md transition-all duration-300'
            >
              <AccordionTrigger className='text-right py-5 hover:no-underline group'>
                <div className='flex items-center gap-4'>
                  <div className='bg-muted p-2 rounded-lg group-data-[state=open]:bg-primary/10 group-data-[state=open]:text-primary transition-colors'>
                    <HelpCircle className='h-5 w-5 opacity-70 group-data-[state=open]:opacity-100' />
                  </div>
                  <span className='font-bold text-base md:text-lg text-foreground group-hover:text-primary transition-colors'>
                    {faq.question}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className='text-base text-muted-foreground leading-relaxed pb-6 pr-14 md:pr-16'>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
