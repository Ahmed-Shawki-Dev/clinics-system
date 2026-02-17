export type VisitStatus = 'Open' | 'Completed'
export type LabRequestType = 'Lab' | 'Imaging'

export interface IPrescription {
  id: string
  visitId: string
  medicationName: string
  dosage: string
  frequency: string
  duration: string
  instructions: string | null
  createdAt: string
}

export interface ILabRequest {
  id: string
  visitId: string
  testName: string
  type: LabRequestType
  notes: string | null
  isUrgent: boolean
  resultText: string | null
  createdAt: string
  resultReceivedAt: string
}

export interface IPayment {
  id: string
  invoiceId: string
  amount: number
  paymentMethod: string
  referenceNumber: string | null
  paidAt: string
  notes: string | null
  createdAt: string
}

export interface IInvoice {
  id: string
  visitId: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  amount: number
  paidAmount: number
  remainingAmount: number
  status: 'Unpaid' | 'PartiallyPaid' | 'Paid'
  notes: string | null
  payments: IPayment[]
  createdAt: string
}

export interface IVisit {
  id: string
  queueTicketId: string | null
  doctorId: string
  doctorName: string
  patientId: string
  patientName: string
  status: VisitStatus
  complaint: string | null
  diagnosis: string | null
  notes: string
  // Vitals
  bloodPressureSystolic: number | null
  bloodPressureDiastolic: number | null
  heartRate: number | null
  temperature: number | null
  weight: number | null
  height: number | null
  bmi: number | null
  bloodSugar: number | null
  oxygenSaturation: number | null
  respiratoryRate: number | null
  followUpDate: string | null

  startedAt: string
  completedAt: string | null

  // Relations
  prescriptions: IPrescription[]
  labRequests: ILabRequest[]
  invoice: IInvoice | null
}

export interface DoctorVisitFieldConfig {
  bloodPressure: boolean
  heartRate: boolean
  temperature: boolean
  weight: boolean
  height: boolean
  bmi: boolean
  bloodSugar: boolean
  oxygenSaturation: boolean
  respiratoryRate: boolean
}