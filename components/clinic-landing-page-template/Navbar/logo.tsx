import { Typography } from '@/components/ui/typography'
import Image from 'next/image'

interface ClinicLogoProps {
  logoUrl: string | null
  clinicName: string
}

export const ClinicLogo = ({ logoUrl, clinicName }: ClinicLogoProps) => {
  return (
    <div className='flex items-center'>
      {logoUrl ? (
        <div className='relative h-10 w-32 overflow-hidden '>
          <Image src={logoUrl} alt={clinicName} fill className='object-contain' priority />
        </div>
      ) : (
        <Typography variant='h4' className='font-bold tracking-tight '>
          {clinicName}
        </Typography>
      )}
    </div>
  )
}
