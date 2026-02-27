'use client'

import { DataTable } from '@/components/ui/data-table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CalendarDays, Layout } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { AppointmentsCalendar } from './appointments-calendar'
import { columns } from './columns'

// استيراد الـ Types بتاعتك [cite: 2026-01-20]
import { IBooking } from '@/types/booking'

interface AppointmentsViewProps {
  bookingsList: IBooking[]
}

export function AppointmentsView({ bookingsList }: AppointmentsViewProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentView = searchParams.get('view') || 'table'

  const handleViewChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('view', value)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <Tabs value={currentView} onValueChange={handleViewChange} className='w-full' dir='rtl'>
      <div className='flex items-center justify-between mb-6'>
        <TabsList className='grid w-75 grid-cols-2'>
          <TabsTrigger value='table' className='flex items-center gap-2 text-sm font-medium cursor-pointer'>
            <Layout className='h-4 w-4' /> الجدول
          </TabsTrigger>
          <TabsTrigger value='calendar' className='flex items-center gap-2 text-sm font-medium'>
            <CalendarDays className='h-4 w-4' /> التقويم
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value='table' className='mt-0 outline-none'>
        <DataTable
          columns={columns}
          data={bookingsList}
          searchKey='patientName'
          filterColumn='status'
          filterOptions={['Confirmed', 'Cancelled', 'Completed', 'Rescheduled']}
        />
      </TabsContent>

      <TabsContent value='calendar' className='mt-0 outline-none'>
        <AppointmentsCalendar bookingsList={bookingsList} />
      </TabsContent>
    </Tabs>
  )
}
