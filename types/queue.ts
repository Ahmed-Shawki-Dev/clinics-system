export type TicketStatus =
  | 'Waiting'
  | 'Called'
  | 'InVisit'
  | 'Completed'
  | 'Skipped'
  | 'NoShow'
  | 'Cancelled'

// 2. تذكرة المريض (QueueTicketDto)
export interface IQueueTicket {
  id: string
  sessionId: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  doctorServiceId?: string | null
  serviceName?: string | null
  ticketNumber: number
  status: TicketStatus
  isUrgent: boolean
  issuedAt: string
  calledAt?: string | null
  visitStartedAt?: string | null
  completedAt?: string | null
  notes?: string | null
}

// 3. الشِفت بتاع الدكتور (QueueSessionDto)
export interface IQueueSession {
  id: string
  doctorId: string
  doctorName: string
  startedAt: string
  closedAt: string | null
  isActive: boolean
  notes: string | null
  totalTickets: number
  waitingCount: number
  completedCount: number
  createdAt: string
}

// 4. طابور الدكتور جوه شاشة المراقبة (QueueBoardSessionDto)
export interface IQueueBoardSession {
  sessionId: string
  doctorId?: string // الباك إند بيرجعها في الـ my-queue
  doctorName: string
  isActive: boolean
  waitingCount: number
  calledCount: number
  inVisitCount: number
  completedCount: number
  currentTicket?: IQueueTicket | null
  waitingTickets: IQueueTicket[]
}

export interface IQueueBoard {
  sessions: IQueueBoardSession[]
}
