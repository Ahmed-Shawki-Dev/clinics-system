import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Activity, Users, Stethoscope } from 'lucide-react'
import { IQueueTicket } from '@/types/queue'

interface Props {
  waitingTickets: IQueueTicket[]
  waitingCount: number
}

export function WaitingQueueList({ waitingTickets, waitingCount }: Props) {
  return (
    <div className='mt-8'>
      {/* الـ Header المودرن */}
      <div className='flex items-center justify-between mb-6'>
        <h3 className='text-xl font-black tracking-tight flex items-center gap-2.5 text-foreground'>
          <div className='p-2 bg-primary/10 rounded-lg'>
            <Clock className='w-5 h-5 text-primary' />
          </div>
          قائمة الانتظار
        </h3>
        <Badge variant='outline' className='px-3 py-1 text-sm font-bold bg-muted/50'>
          الإجمالي: {waitingCount}
        </Badge>
      </div>

      {waitingTickets.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
          {waitingTickets.map((ticket, index) => {
            const isNext = index === 0

            return (
              <Card
                key={ticket.id}
                className={`group relative  overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-background/50 backdrop-blur-sm border-border
                  ${isNext ? 'shadow-primary/20 border border-primary' : ''}
                  ${ticket.isUrgent ? 'border-destructive/40 bg-destructive/5' : ''}
                `}
              >


                <CardContent className='p-6'>
                  <div className='flex flex-col space-y-4'>
                    {/* الصف الأول: رقم التذكرة والبادجات */}
                    <div className='flex items-start justify-between'>
                      <span className='inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-muted/80 text-muted-foreground text-sm font-black tracking-widest'>
                        #{ticket.ticketNumber}
                      </span>

                      <div className='flex gap-2'>
                        {isNext && (
                          <Badge className='bg-primary/10 text-primary hover:bg-primary/20 shadow-none border-0 px-3'>
                            التالي
                          </Badge>
                        )}
                        {ticket.isUrgent && (
                          <Badge
                            variant='destructive'
                            className='shadow-none flex gap-1.5 items-center px-3'
                          >
                            <Activity className='w-3.5 h-3.5' /> طارئ
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* الصف الثاني: اسم المريض والخدمة */}
                    <div>
                      <h4 className='font-bold text-xl tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-1'>
                        {ticket.patientName}
                      </h4>
                      {ticket.serviceName && (
                        <p className='text-sm text-muted-foreground mt-1.5 font-medium flex items-center gap-1.5'>
                          <Stethoscope className='w-4 h-4 opacity-70' />
                          <span className='line-clamp-1'>{ticket.serviceName}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        /* Empty State (حالة الفراغ) الأنيقة */
        <div className='flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed rounded-3xl bg-muted/10 border-muted-foreground/20'>
          <div className='w-20 h-20 bg-muted/30 rounded-full flex items-center justify-center mb-4'>
            <Users className='w-10 h-10 text-muted-foreground/50' />
          </div>
          <p className='text-xl font-bold text-foreground'>لا يوجد مرضى في الانتظار</p>
          <p className='text-muted-foreground mt-2 font-medium text-center max-w-sm'>
            الطابور فارغ حالياً، سيظهر المرضى هنا فور تسجيلهم من قبل الاستقبال.
          </p>
        </div>
      )}
    </div>
  )
}
