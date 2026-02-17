import Image from 'next/image'
import { IPublicClinic } from '../../types/public'

interface NavbarProps {
  clinic: IPublicClinic
}
export default function Navbar({ clinic }: NavbarProps) {
  return (
    <nav className='w-full border-b bg-white'>
      <div className='container mx-auto flex items-center justify-between py-4'>
        <div className='flex items-center gap-2'>
          {clinic.logoUrl ? (
            <Image
              src={clinic.logoUrl}
              alt={clinic.clinicName}
              className='h-10 w-10 object-contain'
              width={40}
              height={40}
            />
          ) : null}
          <span className='text-lg font-semibold'>{clinic.clinicName}</span>
        </div>

        {clinic.bookingEnabled && (
          <a href='#booking' className='rounded bg-black px-4 py-2 text-white'>
            احجز الآن
          </a>
        )}
      </div>
    </nav>
  )
}
