export const dayOrder: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
}

export type PublicDayOfWeek =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'

export interface IPublicClinic {
  clinicName: string
  phone: string | null
  supportWhatsAppNumber: string | null
  supportPhoneNumber: string | null
  address: string | null
  city: string | null
  logoUrl: string | null
  bookingEnabled: boolean
  tenantSlug: string
  isActive: boolean
}

export interface IPublicService {
  id: string
  serviceName: string
  price: number
  durationMinutes: number
}

export interface IPublicDoctor {
  id: string
  name: string
  specialty: string
  bio: string | null
  photoUrl: string | null
  isEnabled: boolean
  avgVisitDurationMinutes: number
  services: IPublicService[]
}

export interface IPublicWorkingHour {
  dayOfWeek: PublicDayOfWeek
  startTime: string
  endTime: string
  isActive: boolean
}
