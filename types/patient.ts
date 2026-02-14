export interface ISubProfile {
  id: string
  name: string
  phone: string
  dateOfBirth: string
  gender: 'Male' | 'Female'
  isDefault: boolean
}

export interface IPatient {
  id: string
  userId: string
  name: string
  phone: string
  dateOfBirth: string
  gender: 'Male' | 'Female'
  address: string | null
  notes: string | null
  isDefault: boolean
  parentPatientId: string | null
  username: string | null
  subProfiles: ISubProfile[]
  createdAt: string
}
