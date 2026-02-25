export interface IBooking {
  id: string
  patientId: string
  patientName: string
  patientPhone: string
  doctorId: string
  doctorName: string
  doctorServiceId?: string | null
  serviceName?: string | null
  bookingDate: string // ISO String
  bookingTime: string // HH:mm
  status: 'Confirmed' | 'Cancelled' | 'Rescheduled' | 'Completed'
  notes?: string | null
  queueTicketId?: string | null // 👈 عشان لو الحجز اتربط بتذكرة في الطابور
  cancelledAt?: string | null // 👈 تاريخ ووقت الإلغاء
  cancellationReason?: string | null // 👈 سبب الإلغاء
  createdAt: string
}

export interface BookingsResponse {
  items: IBooking[]
  totalCount: number
  pageNumber: number
  pageSize: number
}
