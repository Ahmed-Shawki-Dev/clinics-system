export type TicketStatus =
  | "Waiting"
  | "Called"
  | "InVisit"
  | "Completed"
  | "Skipped"
  | "NoShow"
  | "Cancelled";

export interface IQueueTicket {
  id: string;
  sessionId: string;

  // 🔥 الكنز اللي الباك إند ضافه (الربط المباشر بالزيارة والفاتورة)
  visitId?: string | null;
  invoiceId?: string | null;

  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  doctorServiceId?: string | null;
  serviceName?: string | null;

  // 🔥 حقول الفلوس الجديدة اللي رجعت في التذكرة
  invoiceAmount?: number;
  paidAmount?: number;
  remainingAmount?: number;
  invoiceStatus?: "Paid" | "Unpaid" | "PartiallyPaid" | "Refunded" | string;

  ticketNumber: number;
  status: TicketStatus;
  isUrgent: boolean;
  urgentAccepted?: boolean;
  issuedAt: string;
  calledAt?: string | null;
  visitStartedAt?: string | null;
  completedAt?: string | null;
  notes?: string | null;

  // حقول الـ Rich Status
  myQueueNumber?: number | null;
  currentServingNumber?: number | null;
  patientsAheadCount?: number | null;
  estimatedWaitMinutes?: number | null;
  estimatedWaitText?: string | null;
}

export interface IQueueSession {
  id: string;
  doctorId: string;
  doctorName: string;
  startedAt: string;
  closedAt: string | null;
  isActive: boolean;
  notes: string | null;
  totalTickets: number;
  waitingCount: number;
  completedCount: number;
  createdAt: string;
}

export interface IQueueBoardSession {
  sessionId: string;
  doctorId?: string;
  doctorName: string;
  isActive: boolean;
  waitingCount: number;
  calledCount: number;
  inVisitCount: number;
  completedCount: number;
  currentTicket?: IQueueTicket | null;
  waitingTickets: IQueueTicket[];
}

export interface IQueueBoard {
  sessions: IQueueBoardSession[];
}

export interface ICreateTicketResponse {
  ticket: IQueueTicket;
  visitId: string;
}
