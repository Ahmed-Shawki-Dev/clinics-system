import { Button } from '@/components/ui/button'
import { IPublicClinic } from '../../../types/public'
import { ModeToggle } from '../../ModeToggle'
import { ClinicLogo } from './logo'
import { NavMenu } from './nav-menu'
import { NavigationSheet } from './navigation-sheet'

const Navbar = ({ clinic }: { clinic: IPublicClinic }) => {
  return (
    <nav className='mx-auto h-16 border bg-background w-full'>
      <div className='mx-auto flex h-full items-center justify-between px-4'>
        <div className='flex space-x-2 items-center'>
          <ClinicLogo logoUrl={clinic.logoUrl} clinicName={clinic.clinicName}/>
          <ModeToggle />
        </div>

        {/* Desktop Menu */}
        <NavMenu className='hidden md:block' />

        <div className='flex items-center gap-3'>
          <Button className='hidden rounded-full sm:inline-flex' variant='outline'>
            تسجيل الدخول كمريض
          </Button>
          <Button className='rounded-full'>تسجيل الدخول</Button>

          {/* Mobile Menu */}
          <div className='md:hidden'>
            <NavigationSheet clinic={clinic} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
