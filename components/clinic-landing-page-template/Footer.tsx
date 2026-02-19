import { Typography } from '@/components/ui/typography'
import Link from 'next/link'
import { IPublicClinic } from '../../types/public'
import { ClinicLogo } from './Navbar/logo'

export default function Footer({ clinic }: { clinic: IPublicClinic }) {
  return (
    <footer className='w-full bg-background py-6 md:py-5 border-t '>
      <div className='container mx-auto flex flex-col md:flex-row items-center w-full  justify-between gap-6 md:gap-4'>
        {/* Logo */}
        <Link href='#' className='flex items-center gap-2' prefetch={false}>
          <ClinicLogo logoUrl={clinic.logoUrl} clinicName={clinic.clinicName} />
          <span className='sr-only'>Acme Inc</span>
        </Link>

        {/* Navigation Links */}
        <nav className='flex flex-wrap items-center justify-center gap-4 sm:gap-6'>
          {['About', 'Services', 'Contact', 'Privacy'].map((item) => (
            <Link key={item} href='#' prefetch={false}>
              <Typography
                variant='small'
                as='span'
                className='hover:underline underline-offset-4 transition-colors'
              >
                {item}
              </Typography>
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <Typography variant='muted' className='text-xs text-center md:text-right'>
          &copy; 2024 Acme Inc. All rights reserved.
        </Typography>
      </div>
    </footer>
  )
}
