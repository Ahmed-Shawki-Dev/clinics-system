export interface IServiceItem {
  serviceName: string
  price: number
  durationMinutes?: number
  isActive?: boolean
}

export interface UpdateDoctorServicesPayload {
  services: IServiceItem[]
  doctorId: string
  tenantSlug: string
}
