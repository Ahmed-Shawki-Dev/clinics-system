import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className='border-t py-6'>
      <div className='container mx-auto'>
        <div className='flex flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground md:flex-row'>
          <p>© {new Date().getFullYear()} BetaClinic. جميع الحقوق محفوظة.</p>
          <span className='hidden md:inline'>•</span>
          <p className='flex items-center gap-1'>
            صنع بـ <Heart className='h-3 w-3 fill-red-500 text-red-500' /> في مصر
          </p>
        </div>
      </div>
    </footer>
  )
}
