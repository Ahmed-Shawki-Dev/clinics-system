import { IPublicClinic } from '@/types/public'

interface FooterProps {
  clinic: IPublicClinic
}

export default function Footer({ clinic }: FooterProps) {
  return (
    <footer className='w-full bg-black text-white py-8'>
      <div className='container mx-auto px-4 text-center space-y-2'>
        <p className='font-semibold'>{clinic.clinicName}</p>

        {clinic.address && <p className='text-sm text-gray-300'>{clinic.address}</p>}

        {clinic.phone && <p className='text-sm text-gray-300'>{clinic.phone}</p>}

        <p className='text-xs text-gray-500 mt-4'>
          © {new Date().getFullYear()} جميع الحقوق محفوظة
        </p>
      </div>
    </footer>
  )
}
