import { Typography } from '@/components/ui/typography'
import { IPublicClinic } from '@/types/public'
import { MapPin, MessageCircle, PhoneCall } from 'lucide-react'

interface ExtendedClinic extends IPublicClinic {
  aboutDescription?: string
}

export default function AboutClinicSection({ clinic }: { clinic: ExtendedClinic }) {
  if (!clinic) return null

  const displayAddress = [clinic.city, clinic.address].filter(Boolean).join('، ')
  const displayPhone = clinic.phone || clinic.supportPhoneNumber
  const description =
    clinic.aboutDescription ||
    'نلتزم بتقديم رعاية طبية استثنائية تعتمد على أحدث التقنيات وأفضل الكفاءات. نضع صحتك وصحة أسرتك في قمة أولوياتنا لضمان تجربة علاجية آمنة ومريحة.'

  return (
    <section id='about-clinic' className='py-16 md:py-24 relative overflow-hidden' dir='rtl'>
      <div className='max-w-4xl mx-auto px-4 md:px-6 flex flex-col items-center text-center space-y-12 relative z-10'>
        {/* النص العلوي */}
        <div className='space-y-5 flex flex-col items-center w-full'>
          <Typography
            variant='h2'
            className='text-3xl md:text-5xl font-black text-foreground w-full leading-tight'
          >
            لماذا تختار {clinic.clinicName}؟
          </Typography>

          <div className='prose prose-lg dark:prose-invert text-muted-foreground leading-relaxed mx-auto max-w-2xl'>
            <p>{description}</p>
          </div>
        </div>

        {/* الـ 3 مربعات جنب بعض */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-4'>
          {/* الهاتف */}
          {displayPhone && (
            <div className='flex flex-col items-center justify-center gap-4 p-6 rounded-3xl bg-background border border-border/50 shadow-sm transition-all hover:shadow-md hover:-translate-y-1'>
              <div className='bg-primary/10 p-3 rounded-2xl'>
                <PhoneCall className='h-6 w-6 text-primary' />
              </div>
              <div className='text-center'>
                <p className='text-xs text-muted-foreground font-bold uppercase tracking-wider'>
                  رقم الهاتف
                </p>
                <p className='font-black text-foreground mt-1 text-lg' dir='ltr'>
                  {displayPhone}
                </p>
              </div>
            </div>
          )}

          {/* واتساب */}
          {clinic.supportWhatsAppNumber && (
            <div className='flex flex-col items-center justify-center gap-4 p-6 rounded-3xl bg-background border border-border/50 shadow-sm transition-all hover:shadow-md hover:-translate-y-1'>
              <div className='bg-[#25D366]/10 p-3 rounded-2xl'>
                <MessageCircle className='h-6 w-6 text-[#25D366]' />
              </div>
              <div className='text-center'>
                <p className='text-xs text-muted-foreground font-bold uppercase tracking-wider'>
                  واتساب
                </p>
                <p className='font-black text-foreground mt-1 text-lg' dir='ltr'>
                  {clinic.supportWhatsAppNumber}
                </p>
              </div>
            </div>
          )}

          {/* العنوان */}
          {displayAddress && (
            <div className='flex flex-col items-center justify-center gap-4 p-6 rounded-3xl bg-background border border-border/50 shadow-sm transition-all hover:shadow-md hover:-translate-y-1'>
              <div className='bg-destructive/10 p-3 rounded-2xl'>
                <MapPin className='h-6 w-6 text-destructive' />
              </div>
              <div className='text-center'>
                <p className='text-xs text-muted-foreground font-bold uppercase tracking-wider'>
                  العنوان
                </p>
                <p className='font-bold text-foreground mt-1 text-sm leading-snug'>
                  {displayAddress}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
