import { IPublicService } from '@/types/public'

interface ServicesSectionProps {
  services: IPublicService[]
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  if (!services.length) return null

  return (
    <section className='w-full bg-gray-50 py-16'>
      <div className='container mx-auto px-4'>
        <h2 className='text-2xl md:text-3xl font-bold text-center mb-12'>خدماتنا</h2>

        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {services.map((service) => (
            <div
              key={service.id}
              className='rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition'
            >
              <h3 className='text-lg font-semibold'>{service.serviceName}</h3>

              <p className='mt-2 text-sm text-gray-500'>المدة: {service.durationMinutes} دقيقة</p>

              <p className='mt-4 text-base font-bold'>{service.price} جنيه</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
