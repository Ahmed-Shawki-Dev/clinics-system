import { getMyBookingsAction } from '@/actions/patient-app/get-my-bookings'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { IBooking } from '@/types/booking' // التايب التوأم اللي عملناه
import { CalendarDays, History } from 'lucide-react'
import { BookingCard } from './booking-card'
import { EmptyState } from './empty-state'

export default async function PatientBookingsPage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>
}) {
  const { tenantSlug } = await params
  const response = await getMyBookingsAction(tenantSlug)

  // التعامل مع الداتا بـ Type-Safety
  const allBookings: IBooking[] = response?.data || []

  // 1. هنجيب بداية اليوم النهاردة عشان المقارنة تكون دقيقة باليوم
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // 2. فلترة الحجوزات القادمة (مؤكدة + تاريخها النهاردة أو قدام)
  const upcoming = allBookings.filter((b) => {
    const bookingDate = new Date(b.bookingDate)
    const isFutureOrToday = bookingDate >= today
    return isFutureOrToday && (b.status === 'Confirmed' || b.status === 'Rescheduled')
  })

  // 3. أي حاجة تانية تروح "السابقة" (تاريخها فات OR حالتها انتهت/اتلغت)
  const past = allBookings.filter((b) => {
    const bookingDate = new Date(b.bookingDate)
    const isPastDate = bookingDate < today
    return isPastDate || b.status === 'Completed' || b.status === 'Cancelled'
  })

  return (
    <div className='space-y-6 p-4 pb-24 max-w-lg mx-auto'>
      <header className='space-y-1'>
        <h2 className='text-2xl font-black tracking-tight'>جدول مواعيدي</h2>
        <p className='text-sm text-muted-foreground text-right'>
          تابع حجوزاتك الحالية وتاريخ زياراتك
        </p>
      </header>

      <Tabs defaultValue='upcoming' className='w-full' dir='rtl'>
        <TabsList className='grid w-full grid-cols-2 rounded-xl bg-muted/50 p-1'>
          <TabsTrigger value='upcoming' className='rounded-lg font-bold'>
            القادمة ({upcoming.length})
          </TabsTrigger>
          <TabsTrigger value='past' className='rounded-lg font-bold'>
            السابقة
          </TabsTrigger>
        </TabsList>

        <TabsContent value='upcoming' className='mt-6 space-y-4'>
          {upcoming.length > 0 ? (
            upcoming.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                isPast={false}
                tenantSlug={tenantSlug}
              />
            ))
          ) : (
            <EmptyState
              message='لا توجد حجوزات قائمة حالياً'
              icon={<CalendarDays className='h-10 w-10' />}
            />
          )}
        </TabsContent>

        <TabsContent value='past' className='mt-6 space-y-4'>
          {past.length > 0 ? (
            past.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                isPast={true}
                tenantSlug={tenantSlug}
              />
            ))
          ) : (
            <EmptyState message='سجل الحجوزات فارغ' icon={<History className='h-10 w-10' />} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
