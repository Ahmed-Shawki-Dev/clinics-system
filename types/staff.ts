export interface IStaff {
  id: string
  name: string
  username: string
  phone: string | null 
  role: string
  salary: number | null
  hireDate: string | null
  isEnabled: boolean 
  createdAt: string
}

export interface IStaffResponse {
  items: IStaff[]
  totalCount: number
}
