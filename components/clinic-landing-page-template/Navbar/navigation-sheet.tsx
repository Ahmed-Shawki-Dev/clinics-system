import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Menu } from 'lucide-react'
import { ClinicLogo } from './logo'
import { NavMenu } from './nav-menu'

export const NavigationSheet = () => {
  return (
    <Sheet>
      <VisuallyHidden>
        <SheetTitle>Navigation Menu</SheetTitle>
      </VisuallyHidden>

      <SheetTrigger asChild>
        <Button className='rounded-full' size='icon' variant='outline'>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className='px-6 py-3'>
        <ClinicLogo />
        <NavMenu className='mt-6 [&>div]:h-full' orientation='vertical' />
      </SheetContent>
    </Sheet>
  )
}
