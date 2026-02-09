export interface IPatient {
  id: string
  name: string 
  phone: string
  dateOfBirth: string
  gender: 'Male' | 'Female'
  address?: string
  notes?: string
  subProfiles?:[] 
}

export interface PatientsListResponse {
  items: IPatient[]
  totalCount: number
}