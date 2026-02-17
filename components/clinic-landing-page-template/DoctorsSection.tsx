import { IPublicDoctor } from '@/types/public'
import Image from 'next/image'

interface DoctorsSectionProps {
  doctors: IPublicDoctor[]
}
export default function DoctorsSection({ doctors }: DoctorsSectionProps) {
  if (!doctors.length) return null

  return (
    <section className='w-full bg-white py-16'>
      <div className='container mx-auto px-4'>
        <h2 className='text-2xl md:text-3xl font-bold text-center mb-12'>فريق الأطباء</h2>

        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className='rounded-xl border p-6 shadow-sm hover:shadow-md transition'
            >
              {doctor.photoUrl ? (
                <Image
                  width={100}
                  height={100}
                  src={doctor.photoUrl}
                  alt={doctor.name}
                  className='h-24 w-24 rounded-full object-cover mx-auto'
                />
              ) : (
                <div className='h-24 w-24 rounded-full bg-gray-200 mx-auto' />
              )}

              <h3 className='mt-4 text-lg font-semibold text-center'>{doctor.name}</h3>

              <p className='text-center text-gray-500 text-sm'>{doctor.specialty}</p>

              {doctor.bio && (
                <p className='mt-3 text-sm text-gray-600 text-center line-clamp-3'>{doctor.bio}</p>
              )}

              {doctor.services.length > 0 && (
                <div className='mt-4 text-xs text-gray-500'>
                  <p className='font-medium mb-2 text-gray-700'>الخدمات:</p>
                  <ul className='space-y-1'>
                    {doctor.services.map((service) => (
                      <li key={service.id}>
                        • {service.serviceName} — {service.price} جنيه
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
