'use client'

import {
  callTicketAction,
  finishTicketAction,
  skipTicketAction,
  startVisitAction,
} from '@/actions/queue/tickets'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { IQueueTicket } from '@/types/queue'
import { CheckCircle2, FastForward, PlayCircle, Stethoscope, User, UserPlus } from 'lucide-react'
import { BaseApiResponse } from '../../../../../types/api'

interface Props {
  currentTicket?: IQueueTicket | null
  waitingTickets: IQueueTicket[]
  isPending: boolean
  onAction: (
    actionFn: (tenantSlug: string, ticketId: string) => Promise<BaseApiResponse<IQueueTicket>>,
    ticketId: string,
  ) => void
}

export function CurrentPatientCard({ currentTicket, waitingTickets, isPending, onAction }: Props) {
  return (
    <Card >

      <CardContent className='p-8'>
        {currentTicket ? (
          <div className='flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8'>
            {/* 1. بيانات المريض (Clean Typography) */}
            <div className='flex items-center gap-5'>
              <div className='w-16 h-16 rounded-full bg-muted flex items-center justify-center shrink-0'>
                <User className='w-8 h-8 text-muted-foreground' />
              </div>

              <div className='space-y-1'>
                <div className='flex items-center gap-3'>
                  <h3 className='text-3xl font-bold tracking-tight text-foreground'>
                    {currentTicket.patientName}
                  </h3>
                  {currentTicket?.isUrgent && (
                    <Badge
                      variant='destructive'
                      className='px-2.5 py-0.5 rounded-sm font-semibold text-xs uppercase tracking-wider'
                    >
                      طارئ
                    </Badge>
                  )}
                </div>

                <div className='flex items-center gap-3 text-sm text-muted-foreground'>
                  <span className='font-mono font-medium'>#{currentTicket.ticketNumber}</span>
                  <span className='text-muted/50'>•</span>
                  <span className='flex items-center gap-1.5'>
                    <Stethoscope className='w-3.5 h-3.5' /> {currentTicket.serviceName}
                  </span>
                </div>
              </div>
            </div>

            {/* ملاحظات الريسبشن (Minimal Callout) */}
            {currentTicket.notes && (
              <div className='w-full xl:w-auto xl:max-w-md p-3.5 bg-muted rounded-xl text-muted-foreground text-sm'>
                {currentTicket.notes}
              </div>
            )}

            {/* 2. أزرار التحكم (Flat & Clean) */}
            <div className='flex flex-col sm:flex-row gap-3 w-full xl:w-auto mt-6 xl:mt-0'>
              {currentTicket.status === 'Called' && (
                <>
                  <Button
                    variant='ghost'
                    className='h-12 px-6 font-medium text-muted-foreground hover:bg-muted/50 transition-colors'
                    disabled={isPending}
                    onClick={() => onAction(skipTicketAction, currentTicket.id)}
                  >
                    <FastForward className='w-4 h-4 ml-2 opacity-70' /> تخطي
                  </Button>

                  <Button
                    className='h-12 px-8 font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors'
                    disabled={isPending}
                    onClick={() => onAction(startVisitAction, currentTicket.id)}
                  >
                    <PlayCircle className='w-4 h-4 ml-2 opacity-90' /> بدء الكشف
                  </Button>
                </>
              )}

              {currentTicket.status === 'InVisit' && (
                <Button
                  disabled={isPending}
                  onClick={() => onAction(finishTicketAction, currentTicket.id)}
                >
                  <CheckCircle2 className='w-4 h-4 ml-2 opacity-90' /> إنهاء الكشف
                </Button>
              )}
            </div>
          </div>
        ) : (
          /* حالة الفراغ (Minimal Empty State) */
          <div className='flex flex-col items-center justify-center  space-y-6'>
            <div className='w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center'>
              <UserPlus className='w-8 h-8 text-muted-foreground/60' />
            </div>

            <div className='text-center space-y-1.5'>
              <h3 className='text-xl font-semibold text-foreground'>الغرفة فارغة</h3>
              <p className='text-sm text-muted-foreground'>
                اضغط لنداء المريض التالي من قائمة الانتظار.
              </p>
            </div>

            <Button
              variant={waitingTickets.length > 0 ? 'default' : 'secondary'}
              className='h-12 px-8 font-semibold rounded-md transition-colors'
              disabled={waitingTickets.length === 0 || isPending}
              onClick={() => onAction(callTicketAction, waitingTickets[0]?.id)}
            >
              {waitingTickets.length > 0 ? 'نداء المريض التالي' : 'الطابور فارغ'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
