'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { CalendarDays, Layout, Phone, Stethoscope, User, Calendar, Clock } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { format } from 'date-fns'
import { ar } from 'date-fns/locale'

import { AppointmentsCalendar } from './appointments-calendar'
import { BookingRowActions } from './BookingRowActions' // 👈 أكشنز كل صف
import { IPaginatedData } from '@/types/api'
import { IBooking } from '@/types/booking'
import { GenericPagination } from '../../../../../components/shared/pagination'

interface AppointmentsViewProps {
  paginatedData: IPaginatedData<IBooking> | null
  currentView: string
}

export function AppointmentsView({ paginatedData, currentView }: AppointmentsViewProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const bookingsList = paginatedData?.items || []

  const handleViewChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('view', value)
    params.set('page', '1') // دايما رجعه لأول صفحة لما يغير الفيو
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  // دالة صغيرة لترجمة وتلوين الحالة
  const getStatusBadge = (status: string) => {
    const config: Record<
      string,
      { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }
    > = {
      Confirmed: { label: 'مؤكد', variant: 'default' },
      Cancelled: { label: 'ملغي', variant: 'destructive' },
      Completed: { label: 'مكتمل', variant: 'secondary' },
      Rescheduled: { label: 'مؤجل', variant: 'outline' },
    }
    const { label, variant } = config[status] || { label: status, variant: 'outline' }
    return <Badge variant={variant}>{label}</Badge>
  }

  return (
    <Tabs value={currentView} onValueChange={handleViewChange} className='w-full' dir='rtl'>
      <div className='flex items-center justify-between mb-6'>
        <TabsList className='grid w-75 grid-cols-2'>
          <TabsTrigger
            value='table'
            className='flex items-center gap-2 text-sm font-medium cursor-pointer'
          >
            <Layout className='h-4 w-4' /> الجدول
          </TabsTrigger>
          <TabsTrigger value='calendar' className='flex items-center gap-2 text-sm font-medium'>
            <CalendarDays className='h-4 w-4' /> التقويم
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value='table' className='mt-0 outline-none'>
          {/* 🔥 الجدول الـ Native النظيف 🔥 */}
          <div className='overflow-x-auto rounded-3xl border'>
            <Table>
              <TableHeader className='bg-muted/50'>
                <TableRow>
                  <TableHead className='text-right'>المريض</TableHead>
                  <TableHead className='text-right'>الدكتور</TableHead>
                  <TableHead className='text-right'>الميعاد</TableHead>
                  <TableHead className='text-right'>الحالة</TableHead>
                  <TableHead className='text-left w-20'>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookingsList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className='h-32 text-center text-muted-foreground'>
                      لا يوجد حجوزات حالياً.
                    </TableCell>
                  </TableRow>
                ) : (
                  bookingsList.map((booking) => (
                    <TableRow key={booking.id} className='hover:bg-muted/30 transition-colors'>
                      {/* 1. المريض */}
                      <TableCell>
                        <div className='flex flex-col gap-1 text-right'>
                          <span className='font-semibold flex items-center gap-2 text-sm'>
                            <User className='h-3.5 w-3.5 text-muted-foreground shrink-0' />
                            {booking.patientName}
                          </span>
                          <span
                            className='text-[11px] text-muted-foreground  flex items-center gap-1'
                          >
                            {booking.patientPhone}
                          </span>
                        </div>
                      </TableCell>

                      {/* 2. الدكتور والخدمة */}
                      <TableCell>
                        <div className='flex flex-col gap-1 text-right'>
                          <div className='flex items-center gap-2 text-sm'>
                            <Stethoscope className='h-3.5 w-3.5 text-primary shrink-0' />
                            <span className='font-medium'>{booking.doctorName}</span>
                          </div>
                          {booking.serviceName && (
                            <span className='text-[11px] text-muted-foreground mr-5'>
                              {booking.serviceName}
                            </span>
                          )}
                        </div>
                      </TableCell>

                      {/* 3. الميعاد */}
                      <TableCell>
                        <div className='flex flex-col gap-1 text-right'>
                          <div className='flex items-center gap-1.5 text-sm'>
                            <Calendar className='h-3.5 w-3.5 text-muted-foreground shrink-0' />
                            {format(new Date(booking.bookingDate), 'PPP', { locale: ar })}
                          </div>
                          <div className='flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground'>
                            <Clock className='h-3.5 w-3.5 shrink-0' />
                            {booking.bookingTime}
                          </div>
                        </div>
                      </TableCell>

                      {/* 4. الحالة */}
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>

                      {/* 5. الإجراءات (الـ 3 نقط) */}
                      <TableCell className='text-left'>
                        <BookingRowActions booking={booking} />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* الباجينيشن */}
          {paginatedData && paginatedData.totalPages > 1 && (
            <div className='p-4 border-t bg-muted/10'>
              <GenericPagination
                currentPage={paginatedData.pageNumber}
                totalPages={paginatedData.totalPages}
                hasNextPage={paginatedData.hasNextPage}
                hasPreviousPage={paginatedData.hasPreviousPage}
              />
            </div>
          )}
      </TabsContent>

      <TabsContent value='calendar' className='mt-0 outline-none'>
        <AppointmentsCalendar bookingsList={bookingsList} />
      </TabsContent>
    </Tabs>
  )
}
