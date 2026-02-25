import { Badge } from '../../../../../components/ui/badge'
import { IBooking } from '../../../../../types/booking'

export function StatusBadge({ status }: { status: IBooking['status'] }) {
  const variants: Record<IBooking['status'], 'default' | 'secondary' | 'destructive' | 'outline'> =
    {
      Confirmed: 'default',
      Completed: 'secondary', // أو أي Variant عندك في الـ Config
      Cancelled: 'destructive',
      Rescheduled: 'outline',
    }

  const labels: Record<IBooking['status'], string> = {
    Confirmed: 'مؤكد',
    Completed: 'مكتمل',
    Cancelled: 'ملغي',
    Rescheduled: 'معدل',
  }

  return (
    <Badge variant={variants[status]} className='rounded-lg font-black text-[10px]'>
      {labels[status]}
    </Badge>
  )
}


