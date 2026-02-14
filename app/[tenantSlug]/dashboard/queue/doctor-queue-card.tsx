'use client'

import { closeQueueSession } from '@/actions/queue/sessions'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/ui/data-table'
import { IQueueBoardSession } from '@/types/queue'
import { Clock, StopCircle, UserCheck, Users } from 'lucide-react'
import * as React from 'react'
import { toast } from 'sonner'
import { getQueueColumns } from './queue-columns'

interface DoctorQueueCardProps {
  tenantSlug: string
  session: IQueueBoardSession
}

export function DoctorQueueCard({ tenantSlug, session }: DoctorQueueCardProps) {
  // ترتيب الطابور برمجياً: طوارئ أولاً ثم رقم التذكرة
  const sortedWaitlist = React.useMemo(() => {
    return [...session.waitingTickets].sort((a, b) => {
      if (a.isUrgent && !b.isUrgent) return -1
      if (!a.isUrgent && b.isUrgent) return 1
      return a.ticketNumber - b.ticketNumber
    })
  }, [session.waitingTickets])

  const columns = React.useMemo(() => getQueueColumns(tenantSlug), [tenantSlug])

  const handleCloseSession = async () => {
    const res = await closeQueueSession(tenantSlug, session.sessionId)
    if (res.success) {
      toast.success(`تم إنهاء شفت د. ${session.doctorName}`)
    } else {
      toast.error(res.message || 'فشل إغلاق العيادة')
    }
  }

  return (
    <Card className='border-2 shadow-md'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-4 bg-muted/30'>
        <div className='flex flex-col gap-1'>
          <CardTitle className='text-xl font-extrabold flex items-center gap-2'>
            <span className='h-3 w-3 rounded-full bg-green-500 animate-pulse' />
            د. {session.doctorName}
          </CardTitle>
          <div className='flex gap-4 text-sm text-muted-foreground'>
            <span className='flex items-center gap-1'>
              <Clock className='h-3 w-3' /> {session.waitingCount} منتظر
            </span>
            <span className='flex items-center gap-1'>
              <UserCheck className='h-3 w-3' /> {session.completedCount} انتهى
            </span>
          </div>
        </div>

        {/* زر إنهاء الشفت مع تأكيد */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant='ghost' size='sm' className='text-destructive hover:bg-destructive/10'>
              <StopCircle className='h-4 w-4 ml-1' />
              إنهاء الشفت
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>هل أنت متأكد من إغلاق العيادة؟</AlertDialogTitle>
              <AlertDialogDescription>
                سيتم إنهاء شفت د. {session.doctorName}. يوجد {session.waitingCount} مريض في
                الانتظار.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>تراجع</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleCloseSession}
                className='bg-destructive hover:bg-destructive/90'
              >
                تأكيد الإغلاق
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>

      <CardContent className='pt-6 space-y-6'>
        {/* المريض الحالي - Main Focus */}
        <div className='rounded-xl border-2 border-primary/20 bg-primary/5 p-4 relative overflow-hidden'>
          <div className='absolute top-0 left-0 bg-primary text-white px-3 py-1 text-xs font-bold rounded-br-lg'>
            الحالة الحالية
          </div>
          {session.currentTicket ? (
            <div className='flex items-center justify-between mt-2'>
              <div>
                <p className='text-sm text-muted-foreground font-medium'>المريض الحالي</p>
                <h3 className='text-2xl font-black text-primary'>
                  {session.currentTicket.patientName}
                </h3>
              </div>
              <div className='text-center'>
                <p className='text-xs text-muted-foreground uppercase'>تذكرة رقم</p>
                <p className='text-3xl font-black'>#{session.currentTicket.ticketNumber}</p>
              </div>
            </div>
          ) : (
            <p className='text-center py-4 text-muted-foreground font-medium italic'>
              العيادة جاهزة لاستقبال المريض التالي...
            </p>
          )}
        </div>

        {/* جدول طابور الانتظار باستخدام جدولك الجينيريك */}
        <div className='space-y-3'>
          <h4 className='font-bold flex items-center gap-2 text-muted-foreground uppercase text-xs tracking-wider'>
            <Users className='h-4 w-4' /> قائمة الانتظار
          </h4>
          <DataTable columns={columns} data={sortedWaitlist} searchKey='patientName' />
        </div>
      </CardContent>
    </Card>
  )
}
