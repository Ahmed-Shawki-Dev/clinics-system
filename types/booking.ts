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
  notes?: string
  createdAt: string
}

export interface BookingsResponse {
  items: IBooking[]
  totalCount: number
  pageNumber: number
  pageSize: number
}
