/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum WorkerMode {
  LoginBased = "LoginBased",
  PayrollOnly = "PayrollOnly",
}

export enum VisitType {
  Exam = "Exam",
  Consultation = "Consultation",
}

export enum VisitStatus {
  Open = "Open",
  Completed = "Completed",
}

export enum VisitSource {
  WalkInTicket = "WalkInTicket",
  Booking = "Booking",
  ConsultationBooking = "ConsultationBooking",
  PatientSelfServiceTicket = "PatientSelfServiceTicket",
  PatientSelfServiceBooking = "PatientSelfServiceBooking",
}

export enum UrgentCaseMode {
  UrgentNext = "UrgentNext",
  UrgentBucket = "UrgentBucket",
  UrgentFront = "UrgentFront",
  Disabled = "Disabled",
}

export enum TicketStatus {
  Waiting = "Waiting",
  Called = "Called",
  InVisit = "InVisit",
  Completed = "Completed",
  Skipped = "Skipped",
  NoShow = "NoShow",
  Cancelled = "Cancelled",
}

export enum SalesInvoiceStatus {
  Issued = "Issued",
  Cancelled = "Cancelled",
}

export enum PatientSelfServiceRequestType {
  SameDayTicket = "SameDayTicket",
  FutureBooking = "FutureBooking",
}

export enum PatientSelfServiceRequestStatus {
  PendingPaymentReview = "PendingPaymentReview",
  PaymentApproved = "PaymentApproved",
  ConvertedToQueueTicket = "ConvertedToQueueTicket",
  ConvertedToBooking = "ConvertedToBooking",
  Rejected = "Rejected",
  ReuploadRequested = "ReuploadRequested",
  Expired = "Expired",
}

export enum PatientSelfServicePaymentPolicy {
  FullOnly = "FullOnly",
  PartialAllowed = "PartialAllowed",
}

export enum PartnerType {
  Laboratory = "Laboratory",
  Radiology = "Radiology",
  Pharmacy = "Pharmacy",
}

export enum PartnerSettlementTarget {
  Doctor = "Doctor",
  Clinic = "Clinic",
}

export enum PartnerOrderStatus {
  Draft = "Draft",
  Sent = "Sent",
  Accepted = "Accepted",
  InProgress = "InProgress",
  Completed = "Completed",
  Cancelled = "Cancelled",
}

export enum MessageStatus {
  Pending = "Pending",
  Sending = "Sending",
  Sent = "Sent",
  Delivered = "Delivered",
  Read = "Read",
  Failed = "Failed",
  Retrying = "Retrying",
}

export enum MessageChannel {
  WhatsApp = "WhatsApp",
  PWA = "PWA",
}

export enum MedicalDocumentThreadStatus {
  Open = "Open",
  Closed = "Closed",
}

export enum MarketplaceOrderStatus {
  Pending = "Pending",
  WhatsAppRedirected = "WhatsAppRedirected",
  Confirmed = "Confirmed",
  Cancelled = "Cancelled",
}

export enum LabRequestType {
  Lab = "Lab",
  Imaging = "Imaging",
}

export enum InvoiceStatus {
  Unpaid = "Unpaid",
  PartiallyPaid = "PartiallyPaid",
  Paid = "Paid",
  Refunded = "Refunded",
}

export enum InventoryItemType {
  Medicine = "Medicine",
  Tool = "Tool",
  Equipment = "Equipment",
  Consumable = "Consumable",
}

export enum InAppNotificationType {
  PartnerOrderStatusChanged = "PartnerOrderStatusChanged",
  MedicalDocumentThreadUpdated = "MedicalDocumentThreadUpdated",
  PrescriptionRevised = "PrescriptionRevised",
  System = "System",
}

export enum Gender {
  Male = "Male",
  Female = "Female",
}

export enum EncounterLifecycleState {
  Draft = "Draft",
  InProgress = "InProgress",
  MedicallyCompleted = "MedicallyCompleted",
  FullyClosed = "FullyClosed",
}

export enum EncounterFinancialState {
  NotStarted = "NotStarted",
  PendingSettlement = "PendingSettlement",
  FinanciallySettled = "FinanciallySettled",
}

export enum DocumentCategory {
  Lab = "Lab",
  Radiology = "Radiology",
  OtherMedicalDocument = "OtherMedicalDocument",
}

export enum DoctorCompensationMode {
  Salary = "Salary",
  Percentage = "Percentage",
  FixedPerVisit = "FixedPerVisit",
}

export enum DayOfWeek {
  Sunday = "Sunday",
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
}

export enum CreditTransactionType {
  Issued = "Issued",
  Consumed = "Consumed",
  Adjusted = "Adjusted",
  Reversed = "Reversed",
  Expired = "Expired",
}

export enum CreditReason {
  DoctorAbsent = "DoctorAbsent",
  SessionForceClosedUnserved = "SessionForceClosedUnserved",
  SessionAutoClosedUnserved = "SessionAutoClosedUnserved",
  ClinicCancellationAfterPayment = "ClinicCancellationAfterPayment",
  NoShowRetainedByPolicy = "NoShowRetainedByPolicy",
  ManualAdjustment = "ManualAdjustment",
  CreditConsumption = "CreditConsumption",
  CreditExpiration = "CreditExpiration",
}

export enum BookingStatus {
  Confirmed = "Confirmed",
  Cancelled = "Cancelled",
  Rescheduled = "Rescheduled",
  Completed = "Completed",
}

export interface AbsenceRecordDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  employeeId?: string | null;
  employeeName?: string | null;
  /** @format uuid */
  doctorId?: string | null;
  doctorName?: string | null;
  /** @format date-time */
  fromDate?: string;
  /** @format date-time */
  toDate?: string;
  reason?: string | null;
  isPaid?: boolean;
  notes?: string | null;
  /** @format uuid */
  enteredByUserId?: string;
  /** @format uuid */
  branchId?: string | null;
  /** @format date-time */
  createdAt?: string;
}

export interface AbsenceRecordDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: AbsenceRecordDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface AbsenceRecordDtoListApiResponse {
  success?: boolean;
  message?: string | null;
  data?: AbsenceRecordDto[] | null;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface AcceptPartnerOrderRequest {
  /**
   * @minLength 0
   * @maxLength 1000
   */
  notes?: string | null;
}

export interface AddInvoiceAdjustmentRequest {
  /** @format double */
  extraAmount?: number;
  reason?: string | null;
}

export interface AddInvoiceLineItemRequest {
  /** @format uuid */
  clinicServiceId?: string | null;
  itemName?: string | null;
  /** @format double */
  unitPrice?: number;
  /** @format int32 */
  quantity?: number;
  notes?: string | null;
}

export interface AddLabResultRequest {
  resultText?: string | null;
}

export interface AddPatientMedicalDocumentThreadReplyRequest {
  /**
   * @minLength 0
   * @maxLength 4000
   */
  message: string;
  isInternalNote?: boolean;
}

export interface AddSubProfileRequest {
  /**
   * @minLength 0
   * @maxLength 200
   */
  name: string;
  /**
   * @minLength 0
   * @maxLength 20
   */
  phone: string;
  /** @format date-time */
  dateOfBirth?: string | null;
  gender?: Gender;
}

export interface AdjustSelfServicePaidAmountRequest {
  /**
   * @format double
   * @min 0
   * @max 999999999
   */
  adjustedPaidAmount?: number;
  /**
   * @minLength 0
   * @maxLength 1000
   */
  notes?: string | null;
}

export interface ApiResponse {
  success?: boolean;
  message?: string | null;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface ApiResponseMeta {
  /** @format date-time */
  timestamp?: string;
  requestId?: string | null;
}

export interface ApprovePatientSelfServiceRequest {
  /**
   * @format double
   * @min 0
   * @max 999999999
   */
  adjustedPaidAmount?: number | null;
  /**
   * @minLength 0
   * @maxLength 1000
   */
  notes?: string | null;
}

export interface AttendanceRecordDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  employeeId?: string | null;
  employeeName?: string | null;
  /** @format uuid */
  doctorId?: string | null;
  doctorName?: string | null;
  /** @format uuid */
  branchId?: string | null;
  /** @format uuid */
  enteredByUserId?: string | null;
  /** @format date-time */
  checkInAt?: string;
  /** @format date-time */
  checkOutAt?: string | null;
  /** @format int32 */
  lateMinutes?: number | null;
  /** @format int32 */
  overtimeMinutes?: number | null;
  isAbsent?: boolean;
  /** @format date-time */
  createdAt?: string;
}

export interface AttendanceRecordDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: AttendanceRecordDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface AttendanceRecordDtoListApiResponse {
  success?: boolean;
  message?: string | null;
  data?: AttendanceRecordDto[] | null;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface BookingDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  branchId?: string | null;
  /** @format uuid */
  patientId?: string;
  patientName?: string | null;
  patientPhone?: string | null;
  /** @format uuid */
  doctorId?: string;
  doctorName?: string | null;
  /** @format uuid */
  doctorServiceId?: string | null;
  serviceName?: string | null;
  visitType?: VisitType;
  source?: VisitSource;
  /** @format date-time */
  bookingDate?: string;
  bookingTime?: string | null;
  status?: BookingStatus;
  notes?: string | null;
  /** @format uuid */
  queueTicketId?: string | null;
  /** @format date-time */
  cancelledAt?: string | null;
  cancellationReason?: string | null;
  isOperationalNow?: boolean;
  operationalPurpose?: string | null;
  /** @format date-time */
  createdAt?: string;
}

export interface BookingDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: BookingDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface BookingDtoListApiResponse {
  success?: boolean;
  message?: string | null;
  data?: BookingDto[] | null;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface BookingDtoPagedResult {
  items?: BookingDto[] | null;
  /** @format int32 */
  totalCount?: number;
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  totalPages?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}

export interface BookingDtoPagedResultApiResponse {
  success?: boolean;
  message?: string | null;
  data?: BookingDtoPagedResult;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface BooleanApiResponse {
  success?: boolean;
  message?: string | null;
  data?: boolean;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface CancelBookingRequest {
  cancellationReason?: string | null;
}

export interface CancelSubscriptionRequest {
  /**
   * @minLength 0
   * @maxLength 500
   */
  cancelReason: string;
}

export interface CheckOutAttendanceRequest {
  /** @format date-time */
  checkOutAt?: string | null;
  /** @format int32 */
  overtimeMinutes?: number | null;
}

export interface ClinicOverviewReportDto {
  /** @format date-time */
  fromDate?: string;
  /** @format date-time */
  toDate?: string;
  /** @format int32 */
  totalVisits?: number;
  /** @format int32 */
  examVisits?: number;
  /** @format int32 */
  consultationVisits?: number;
  /** @format int32 */
  bookingVisits?: number;
  /** @format int32 */
  walkInVisits?: number;
  /** @format int32 */
  selfServiceVisits?: number;
  /** @format double */
  totalInvoiced?: number;
  /** @format double */
  totalCollected?: number;
  /** @format double */
  totalRefunded?: number;
  /** @format double */
  totalExpenses?: number;
  /** @format double */
  netCashflow?: number;
  doctors?: DoctorOverviewReportRowDto[] | null;
}

export interface ClinicOverviewReportDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: ClinicOverviewReportDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface ClinicPaymentMethodDto {
  /** @format uuid */
  id?: string;
  methodName?: string | null;
  providerName?: string | null;
  accountName?: string | null;
  accountNumber?: string | null;
  iban?: string | null;
  walletNumber?: string | null;
  instructions?: string | null;
  isActive?: boolean;
  /** @format int32 */
  displayOrder?: number;
}

export interface ClinicPaymentMethodDtoListApiResponse {
  success?: boolean;
  message?: string | null;
  data?: ClinicPaymentMethodDto[] | null;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface ClinicPaymentOptionsDto {
  selfServicePaymentPolicy?: PatientSelfServicePaymentPolicy;
  /** @format int32 */
  selfServiceRequestExpiryHours?: number;
  methods?: ClinicPaymentMethodDto[] | null;
}

export interface ClinicPaymentOptionsDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: ClinicPaymentOptionsDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface ClinicServiceDto {
  /** @format uuid */
  id?: string;
  name?: string | null;
  description?: string | null;
  /** @format double */
  defaultPrice?: number;
  /** @format int32 */
  defaultDurationMinutes?: number | null;
  isActive?: boolean;
  /** @format date-time */
  createdAt?: string;
}

export interface ClinicServiceDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: ClinicServiceDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface ClinicServiceDtoPagedResult {
  items?: ClinicServiceDto[] | null;
  /** @format int32 */
  totalCount?: number;
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  totalPages?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}

export interface ClinicServiceDtoPagedResultApiResponse {
  success?: boolean;
  message?: string | null;
  data?: ClinicServiceDtoPagedResult;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface ClinicSettingsDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  tenantId?: string;
  clinicName?: string | null;
  phone?: string | null;
  whatsAppSenderNumber?: string | null;
  supportWhatsAppNumber?: string | null;
  supportPhoneNumber?: string | null;
  address?: string | null;
  city?: string | null;
  logoUrl?: string | null;
  imgUrl?: string | null;
  description?: string | null;
  socialLinks?: Record<string, string | null>;
  bookingEnabled?: boolean;
  /** @format int32 */
  cancellationWindowHours?: number;
  retainCreditOnNoShow?: boolean;
  selfServicePaymentPolicy?: PatientSelfServicePaymentPolicy;
  /** @format int32 */
  selfServiceRequestExpiryHours?: number;
  workingHours?: WorkingHourDto[] | null;
}

export interface ClinicSettingsDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: ClinicSettingsDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface ClosePatientMedicalDocumentThreadRequest {
  /**
   * @minLength 0
   * @maxLength 1000
   */
  notes?: string | null;
}

export interface CloseStaleVisitRequest {
  resolutionNote?: string | null;
  markQueueTicketNoShow?: boolean;
}

export interface CompleteVisitRequest {
  diagnosis?: string | null;
  notes?: string | null;
}

export interface CreateAbsenceRecordRequest {
  /** @format uuid */
  employeeId?: string | null;
  /** @format uuid */
  doctorId?: string | null;
  /** @format date-time */
  fromDate?: string;
  /** @format date-time */
  toDate?: string;
  /**
   * @minLength 0
   * @maxLength 500
   */
  reason: string;
  isPaid?: boolean;
  /**
   * @minLength 0
   * @maxLength 2000
   */
  notes?: string | null;
  /** @format uuid */
  branchId?: string | null;
}

export interface CreateAttendanceRecordRequest {
  /** @format uuid */
  employeeId?: string | null;
  /** @format uuid */
  doctorId?: string | null;
  /** @format uuid */
  branchId?: string | null;
  /** @format date-time */
  checkInAt?: string | null;
  /** @format int32 */
  lateMinutes?: number | null;
  isAbsent?: boolean;
}

export interface CreateBookingRequest {
  /** @format uuid */
  patientId?: string | null;
  /** @format uuid */
  branchId?: string | null;
  /** @format uuid */
  doctorId?: string;
  /** @format uuid */
  doctorServiceId?: string | null;
  visitType?: VisitType;
  source?: VisitSource;
  /** @format date-time */
  bookingDate?: string;
  bookingTime?: string | null;
  notes?: string | null;
}

export interface CreateClinicServiceRequest {
  name?: string | null;
  description?: string | null;
  /** @format double */
  defaultPrice?: number;
  /** @format int32 */
  defaultDurationMinutes?: number | null;
}

export interface CreateDoctorCompensationRuleRequest {
  mode: DoctorCompensationMode;
  /**
   * @format double
   * @min 0.01
   * @max 1000000000
   */
  value?: number;
  /** @format date-time */
  effectiveFrom?: string;
  /** @format date-time */
  effectiveTo?: string | null;
}

export interface CreateDoctorNoteRequest {
  message?: string | null;
}

export interface CreateDoctorRequest {
  /**
   * @minLength 0
   * @maxLength 200
   */
  name: string;
  /**
   * @minLength 0
   * @maxLength 50
   */
  username: string;
  /**
   * @minLength 6
   * @maxLength 100
   */
  password: string;
  /**
   * @minLength 0
   * @maxLength 100
   */
  specialty?: string | null;
  /**
   * @minLength 0
   * @maxLength 20
   */
  phone?: string | null;
  bio?: string | null;
  photoUrl?: string | null;
  urgentCaseMode?: UrgentCaseMode;
  urgentEnabled?: boolean | null;
  /**
   * @format int32
   * @min 0
   * @max 3
   */
  urgentInsertAfterCount?: number | null;
  /**
   * @format int32
   * @min 1
   * @max 120
   */
  avgVisitDurationMinutes?: number;
  compensationMode: DoctorCompensationMode;
  /**
   * @format double
   * @min 0
   * @max 1000000000
   */
  compensationValue?: number;
  /** @format date-time */
  compensationEffectiveFrom?: string | null;
}

export interface CreateExpenseRequest {
  category?: string | null;
  /** @format double */
  amount?: number;
  notes?: string | null;
  /** @format date-time */
  expenseDate?: string | null;
}

export interface CreateInventoryItemRequest {
  /**
   * @minLength 0
   * @maxLength 200
   */
  name: string;
  /**
   * @minLength 0
   * @maxLength 2000
   */
  description?: string | null;
  /**
   * @minLength 0
   * @maxLength 100
   */
  skuCode: string;
  itemType?: InventoryItemType;
  /**
   * @minLength 0
   * @maxLength 50
   */
  unit: string;
  /**
   * @format double
   * @min 0
   */
  salePrice?: number;
  /**
   * @format double
   * @min 0
   */
  costPrice?: number;
  /**
   * @format double
   * @min 0
   */
  quantityOnHand?: number;
  /**
   * @format double
   * @min 0
   */
  lowStockThreshold?: number;
  usableInVisit?: boolean;
  sellablePublicly?: boolean;
  internalOnly?: boolean;
  billableInVisit?: boolean;
  active?: boolean;
  /** @format uuid */
  branchId?: string;
  showInLanding?: boolean;
  images?: string[] | null;
}

export interface CreateInvoiceRequest {
  /** @format uuid */
  visitId?: string;
  /** @format double */
  amount?: number;
  notes?: string | null;
}

export interface CreateLabPartnerOrderRequest {
  /** @format uuid */
  partnerId: string;
  /** @format uuid */
  partnerContractId?: string | null;
  /** @format uuid */
  partnerServiceCatalogItemId?: string | null;
  /**
   * @format double
   * @min 0
   * @max 1000000000
   */
  estimatedCost?: number | null;
  /**
   * @minLength 0
   * @maxLength 120
   */
  externalReference?: string | null;
  /**
   * @minLength 0
   * @maxLength 2000
   */
  notes?: string | null;
}

export interface CreateLabRequestRequest {
  testName?: string | null;
  type?: LabRequestType;
  notes?: string | null;
  isUrgent?: boolean;
}

export interface CreateNotificationSubscriptionRequest {
  endpoint?: string | null;
  p256dh?: string | null;
  auth?: string | null;
}

export interface CreatePartnerContractRequest {
  /** @format uuid */
  partnerId: string;
  /** @format uuid */
  branchId?: string | null;
  /**
   * @minLength 0
   * @maxLength 200
   */
  serviceScope?: string | null;
  /**
   * @format double
   * @min 0
   * @max 1000
   */
  commissionPercentage?: number | null;
  settlementTarget?: PartnerSettlementTarget;
  /**
   * @format double
   * @min 0
   * @max 1000
   */
  clinicDoctorSharePercentage?: number | null;
  /**
   * @format double
   * @min 0
   * @max 1000000000
   */
  flatFee?: number | null;
  /** @format date-time */
  effectiveFrom?: string;
  /** @format date-time */
  effectiveTo?: string | null;
  /**
   * @minLength 0
   * @maxLength 2000
   */
  notes?: string | null;
}

export interface CreatePartnerRequest {
  /**
   * @minLength 0
   * @maxLength 200
   */
  name: string;
  type: PartnerType;
  /**
   * @minLength 0
   * @maxLength 200
   */
  contactName?: string | null;
  /**
   * @minLength 0
   * @maxLength 50
   */
  contactPhone?: string | null;
  /**
   * @minLength 0
   * @maxLength 120
   */
  contactEmail?: string | null;
  /**
   * @minLength 0
   * @maxLength 1000
   */
  address?: string | null;
  /**
   * @minLength 0
   * @maxLength 2000
   */
  notes?: string | null;
}

export interface CreatePartnerServiceCatalogItemRequest {
  /** @format uuid */
  partnerId: string;
  /** @format uuid */
  branchId?: string | null;
  /**
   * @minLength 0
   * @maxLength 200
   */
  serviceName: string;
  /**
   * @format double
   * @min 0.01
   * @max 1000000000
   */
  price?: number;
  settlementTarget?: PartnerSettlementTarget;
  /**
   * @format double
   * @min 0.01
   * @max 1000
   */
  settlementPercentage?: number;
  /**
   * @format double
   * @min 0
   * @max 1000
   */
  clinicDoctorSharePercentage?: number | null;
  /**
   * @minLength 0
   * @maxLength 2000
   */
  notes?: string | null;
}

export interface CreatePartnerUserRequest {
  /**
   * @minLength 0
   * @maxLength 100
   */
  username: string;
  /**
   * @minLength 6
   * @maxLength 100
   */
  password: string;
  /**
   * @minLength 0
   * @maxLength 200
   */
  displayName: string;
  /**
   * @minLength 0
   * @maxLength 50
   */
  phone?: string | null;
  isPrimary?: boolean;
}

export interface CreatePatientMedicalDocumentThreadRequest {
  /**
   * @minLength 0
   * @maxLength 300
   */
  subject: string;
  /**
   * @minLength 0
   * @maxLength 1000
   */
  notes?: string | null;
  /**
   * @minLength 0
   * @maxLength 4000
   */
  initialMessage?: string | null;
}

export interface CreatePatientRequest {
  /**
   * @minLength 0
   * @maxLength 200
   */
  name: string;
  /**
   * @minLength 0
   * @maxLength 20
   */
  phone: string;
  /** @format date-time */
  dateOfBirth?: string | null;
  gender?: Gender;
  address?: string | null;
  notes?: string | null;
}

export interface CreatePatientResponse {
  patient?: PatientDto;
  username?: string | null;
  initialPassword?: string | null;
  password?: string | null;
}

export interface CreatePatientResponseApiResponse {
  success?: boolean;
  message?: string | null;
  data?: CreatePatientResponse;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface CreatePaymentRequest {
  /** @format uuid */
  invoiceId?: string;
  /** @format double */
  amount?: number;
  paymentMethod?: string | null;
  referenceNumber?: string | null;
  notes?: string | null;
}

export interface CreatePayrollOnlyWorkerRequest {
  /**
   * @minLength 0
   * @maxLength 200
   */
  name: string;
  /**
   * @minLength 0
   * @maxLength 20
   */
  phone?: string | null;
  /**
   * @minLength 0
   * @maxLength 50
   */
  role?: string | null;
  /** @format double */
  salary?: number | null;
  /** @format date-time */
  hireDate?: string | null;
  notes?: string | null;
}

export interface CreatePrescriptionPartnerOrderRequest {
  /** @format uuid */
  partnerId: string;
  /** @format uuid */
  partnerContractId?: string | null;
  /** @format uuid */
  partnerServiceCatalogItemId?: string | null;
  /**
   * @format double
   * @min 0
   * @max 1000000000
   */
  estimatedCost?: number | null;
  /**
   * @minLength 0
   * @maxLength 120
   */
  externalReference?: string | null;
  /**
   * @minLength 0
   * @maxLength 2000
   */
  notes?: string | null;
}

export interface CreatePrescriptionRequest {
  medicationName?: string | null;
  dosage?: string | null;
  frequency?: string | null;
  duration?: string | null;
  instructions?: string | null;
  revisionReason?: string | null;
}

export interface CreatePublicMarketplaceOrderItemRequest {
  /** @format uuid */
  inventoryItemId?: string;
  /**
   * @format double
   * @min 0.0001
   */
  quantity?: number;
}

export interface CreatePublicMarketplaceOrderRequest {
  /**
   * @minLength 0
   * @maxLength 200
   */
  customerName: string;
  /**
   * @minLength 0
   * @maxLength 50
   */
  phone: string;
  /** @format uuid */
  branchId?: string;
  /**
   * @minLength 0
   * @maxLength 1000
   */
  notes?: string | null;
  /** @minItems 1 */
  items: CreatePublicMarketplaceOrderItemRequest[];
}

export interface CreateQueueSessionRequest {
  /** @format uuid */
  doctorId?: string | null;
  /** @format uuid */
  branchId?: string | null;
  notes?: string | null;
}

export interface CreateQueueTicketRequest {
  /** @format uuid */
  sessionId?: string;
  /** @format uuid */
  branchId?: string | null;
  /** @format uuid */
  patientId?: string;
  /** @format uuid */
  doctorId?: string;
  source?: VisitSource;
  visitType?: VisitType;
  /** @format uuid */
  doctorServiceId?: string | null;
  isUrgent?: boolean;
  notes?: string | null;
}

export interface CreateQueueTicketWithPaymentRequest {
  /** @format uuid */
  sessionId?: string;
  /** @format uuid */
  branchId?: string | null;
  /** @format uuid */
  patientId?: string;
  /** @format uuid */
  doctorId?: string;
  /** @format uuid */
  doctorServiceId?: string | null;
  source?: VisitSource;
  isUrgent?: boolean;
  notes?: string | null;
  visitType?: VisitType;
  /** @format double */
  paidAmount?: number | null;
  /** @format double */
  paymentAmount?: number | null;
  paymentMethod?: string | null;
  paymentReference?: string | null;
  paymentNotes?: string | null;
}

export interface CreateSalaryPayoutRequest {
  /** @format uuid */
  employeeId?: string | null;
  /** @format uuid */
  doctorId?: string | null;
  /**
   * @format double
   * @min 0.01
   * @max 1000000000
   */
  amount?: number;
  /** @format date-time */
  payoutDate?: string | null;
  /**
   * @minLength 0
   * @maxLength 1000
   */
  notes?: string | null;
}

export interface CreateStaffRequest {
  /**
   * @minLength 0
   * @maxLength 200
   */
  name: string;
  /**
   * @minLength 0
   * @maxLength 50
   */
  username: string;
  /**
   * @minLength 6
   * @maxLength 100
   */
  password: string;
  role?: string | null;
  /**
   * @minLength 0
   * @maxLength 20
   */
  phone?: string | null;
  workerMode?: WorkerMode;
  /** @format double */
  salary?: number | null;
  /** @format date-time */
  hireDate?: string | null;
  notes?: string | null;
}

export interface CreateSubscriptionRequest {
  /** @format uuid */
  tenantId: string;
  /**
   * @minLength 0
   * @maxLength 100
   */
  planName: string;
  /** @format date-time */
  startDate: string;
  /** @format date-time */
  endDate: string;
  /**
   * @format double
   * @min 0.01
   */
  amount: number;
  /**
   * @minLength 0
   * @maxLength 10
   */
  currency: string;
  notes?: string | null;
}

export interface CreateTenantRequest {
  /**
   * @minLength 0
   * @maxLength 200
   */
  name: string;
  /**
   * @minLength 0
   * @maxLength 100
   * @pattern ^[a-z0-9\-]+$
   */
  slug: string;
  /** @format tel */
  contactPhone?: string | null;
  /**
   * @minLength 0
   * @maxLength 500
   */
  address?: string | null;
  logoUrl?: string | null;
  ownerName?: string | null;
  ownerUsername?: string | null;
  /**
   * @minLength 6
   * @maxLength 100
   */
  ownerPassword?: string | null;
  /** @format tel */
  ownerPhone?: string | null;
}

export interface CreateVisitRequest {
  visitType?: VisitType;
  source?: VisitSource;
  /** @format uuid */
  branchId?: string | null;
  /** @format uuid */
  queueTicketId?: string | null;
  /** @format uuid */
  doctorId?: string;
  /** @format uuid */
  patientId?: string;
  complaint?: string | null;
  notes?: string | null;
}

export interface DailyClosingSnapshotDto {
  /** @format uuid */
  id?: string;
  /** @format date-time */
  snapshotDate?: string;
  /** @format uuid */
  generatedByUserId?: string;
  /** @format double */
  totalInvoiced?: number;
  /** @format double */
  totalCollected?: number;
  /** @format double */
  totalExpenses?: number;
  /** @format double */
  netCashFlow?: number;
  /** @format int32 */
  visitsCompleted?: number;
  /** @format int32 */
  paymentsCount?: number;
  /** @format int32 */
  expensesCount?: number;
  /** @format date-time */
  createdAt?: string;
}

export interface DailyClosingSnapshotDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: DailyClosingSnapshotDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface DailyClosingSnapshotDtoListApiResponse {
  success?: boolean;
  message?: string | null;
  data?: DailyClosingSnapshotDto[] | null;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface DailyRevenueDto {
  /** @format date-time */
  date?: string;
  /** @format double */
  totalRevenue?: number;
  /** @format double */
  totalPaid?: number;
  /** @format double */
  totalUnpaid?: number;
  /** @format int32 */
  invoiceCount?: number;
  /** @format int32 */
  paymentCount?: number;
}

export interface DailyRevenueDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: DailyRevenueDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface DoctorClinicServiceLinkDto {
  /** @format uuid */
  linkId?: string;
  /** @format uuid */
  doctorId?: string;
  /** @format uuid */
  clinicServiceId?: string;
  serviceName?: string | null;
  /** @format double */
  effectivePrice?: number;
  /** @format int32 */
  effectiveDurationMinutes?: number | null;
  /** @format double */
  overridePrice?: number | null;
  /** @format int32 */
  overrideDurationMinutes?: number | null;
  isActive?: boolean;
}

export interface DoctorClinicServiceLinkDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: DoctorClinicServiceLinkDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface DoctorClinicServiceLinkDtoListApiResponse {
  success?: boolean;
  message?: string | null;
  data?: DoctorClinicServiceLinkDto[] | null;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface DoctorCompensationHistoryItemDto {
  /** @format uuid */
  id?: string;
  mode?: DoctorCompensationMode;
  /** @format double */
  value?: number;
  /** @format date-time */
  effectiveFrom?: string;
  /** @format uuid */
  changedByUserId?: string;
  notes?: string | null;
  /** @format date-time */
  createdAt?: string;
}

export interface DoctorCompensationRuleDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  doctorId?: string;
  mode?: DoctorCompensationMode;
  /** @format double */
  value?: number;
  /** @format date-time */
  effectiveFrom?: string;
  /** @format date-time */
  effectiveTo?: string | null;
  isActive?: boolean;
  /** @format date-time */
  createdAt?: string;
}

export interface DoctorCompensationRuleDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: DoctorCompensationRuleDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface DoctorCompensationRuleDtoListApiResponse {
  success?: boolean;
  message?: string | null;
  data?: DoctorCompensationRuleDto[] | null;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface DoctorDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  userId?: string;
  name?: string | null;
  UrgentCaseMode;
  specialty?: string | null;
  phone?: string | null;
  bio?: string | null;
  photoUrl?: string | null;
  isEnabled?: boolean;
  username?: string | null;
  urgentCaseMode?: UrgentCaseMode;
  urgentEnabled?: boolean;
  /** @format int32 */
  urgentInsertAfterCount?: number | null;
  supportsUrgent?: boolean;
  /** @format int32 */
  avgVisitDurationMinutes?: number;
  compensationMode?: DoctorCompensationMode;
  /** @format double */
  compensationValue?: number;
  /** @format date-time */
  compensationEffectiveFrom?: string;
  services?: DoctorServiceDto[] | null;
  compensationHistory?: DoctorCompensationHistoryItemDto[] | null;
  visitFieldConfig?: DoctorVisitFieldConfigDto;
  /** @format date-time */
  createdAt?: string;
}

export interface DoctorDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: DoctorDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface DoctorDtoPagedResult {
  items?: DoctorDto[] | null;
  /** @format int32 */
  totalCount?: number;
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  totalPages?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}

export interface DoctorDtoPagedResultApiResponse {
  success?: boolean;
  message?: string | null;
  data?: DoctorDtoPagedResult;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface DoctorNoteDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  doctorId?: string;
  doctorName?: string | null;
  message?: string | null;
  isRead?: boolean;
  /** @format date-time */
  readAt?: string | null;
  /** @format uuid */
  readByUserId?: string | null;
  /** @format date-time */
  createdAt?: string;
}

export interface DoctorNoteDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: DoctorNoteDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface DoctorNoteDtoListApiResponse {
  success?: boolean;
  message?: string | null;
  data?: DoctorNoteDto[] | null;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface DoctorNoteDtoPagedResult {
  items?: DoctorNoteDto[] | null;
  /** @format int32 */
  totalCount?: number;
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  totalPages?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}

export interface DoctorNoteDtoPagedResultApiResponse {
  success?: boolean;
  message?: string | null;
  data?: DoctorNoteDtoPagedResult;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface DoctorOverviewReportRowDto {
  /** @format uuid */
  doctorId?: string;
  doctorName?: string | null;
  /** @format int32 */
  visitsCount?: number;
  /** @format double */
  collectedAmount?: number;
  compensationMode?: DoctorCompensationMode;
  /** @format double */
  compensationValue?: number;
  /** @format double */
  estimatedCompensationAmount?: number;
}

export interface DoctorRevenueDto {
  /** @format uuid */
  doctorId?: string;
  doctorName?: string | null;
  /** @format double */
  totalRevenue?: number;
  /** @format double */
  totalPaid?: number;
  /** @format int32 */
  visitCount?: number;
  /** @format double */
  commissionPercent?: number;
  /** @format double */
  commissionAmount?: number;
}

export interface DoctorRevenueDtoListApiResponse {
  success?: boolean;
  message?: string | null;
  data?: DoctorRevenueDto[] | null;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface DoctorServiceDto {
  /** @format uuid */
  id?: string;
  serviceName?: string | null;
  /** @format double */
  price?: number;
  /** @format int32 */
  durationMinutes?: number | null;
  isActive?: boolean;
}

export interface DoctorServiceDtoListApiResponse {
  success?: boolean;
  message?: string | null;
  data?: DoctorServiceDto[] | null;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface DoctorServiceRequest {
  /**
   * @minLength 0
   * @maxLength 200
   */
  serviceName: string;
  /**
   * @format double
   * @min 0
   */
  price?: number;
  /**
   * @format int32
   * @min 1
   * @max 480
   */
  durationMinutes?: number | null;
  isActive?: boolean;
}

export interface DoctorVisitFieldConfigDto {
  bloodPressure?: boolean;
  heartRate?: boolean;
  temperature?: boolean;
  weight?: boolean;
  height?: boolean;
  bmi?: boolean;
  bloodSugar?: boolean;
  oxygenSaturation?: boolean;
  respiratoryRate?: boolean;
}

export interface DoctorVisitFieldConfigDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: DoctorVisitFieldConfigDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface ExpenseDto {
  /** @format uuid */
  id?: string;
  category?: string | null;
  /** @format double */
  amount?: number;
  notes?: string | null;
  /** @format date-time */
  expenseDate?: string;
  /** @format uuid */
  recordedByUserId?: string;
  recordedByName?: string | null;
  /** @format date-time */
  createdAt?: string;
}

export interface ExpenseDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: ExpenseDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface ExpenseDtoPagedResult {
  items?: ExpenseDto[] | null;
  /** @format int32 */
  totalCount?: number;
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  totalPages?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}

export interface ExpenseDtoPagedResultApiResponse {
  success?: boolean;
  message?: string | null;
  data?: ExpenseDtoPagedResult;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface ExtendSubscriptionRequest {
  /** @format date-time */
  newEndDate: string;
  notes?: string | null;
}

export interface HealthDto {
  status?: string | null;
  database?: string | null;
  version?: string | null;
  /** @format date-time */
  timestamp?: string;
}

export interface HealthDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: HealthDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface InAppNotificationDto {
  /** @format uuid */
  id?: string;
  type?: InAppNotificationType;
  title?: string | null;
  body?: string | null;
  entityType?: string | null;
  /** @format uuid */
  entityId?: string | null;
  isRead?: boolean;
  /** @format date-time */
  readAt?: string | null;
  /** @format date-time */
  createdAt?: string;
}

export interface InAppNotificationDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: InAppNotificationDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface InAppNotificationDtoPagedResult {
  items?: InAppNotificationDto[] | null;
  /** @format int32 */
  totalCount?: number;
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  totalPages?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}

export interface InAppNotificationDtoPagedResultApiResponse {
  success?: boolean;
  message?: string | null;
  data?: InAppNotificationDtoPagedResult;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface Int32ApiResponse {
  success?: boolean;
  message?: string | null;
  /** @format int32 */
  data?: number;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface InventoryItemDto {
  /** @format uuid */
  id?: string;
  name?: string | null;
  description?: string | null;
  skuCode?: string | null;
  itemType?: InventoryItemType;
  unit?: string | null;
  /** @format double */
  salePrice?: number;
  /** @format double */
  costPrice?: number;
  /** @format double */
  quantityOnHand?: number;
  /** @format double */
  lowStockThreshold?: number;
  usableInVisit?: boolean;
  sellablePublicly?: boolean;
  internalOnly?: boolean;
  billableInVisit?: boolean;
  active?: boolean;
  /** @format uuid */
  branchId?: string;
  branchName?: string | null;
  showInLanding?: boolean;
  isLowStock?: boolean;
  images?: InventoryItemImageDto[] | null;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface InventoryItemDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: InventoryItemDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface InventoryItemDtoPagedResult {
  items?: InventoryItemDto[] | null;
  /** @format int32 */
  totalCount?: number;
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  totalPages?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}

export interface InventoryItemDtoPagedResultApiResponse {
  success?: boolean;
  message?: string | null;
  data?: InventoryItemDtoPagedResult;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface InventoryItemImageDto {
  /** @format uuid */
  id?: string;
  imageUrl?: string | null;
  /** @format int32 */
  displayOrder?: number;
}

export interface InvoiceDto {
  /** @format uuid */
  id?: string;
  invoiceNumber?: string | null;
  /** @format uuid */
  visitId?: string;
  /** @format uuid */
  patientId?: string;
  patientName?: string | null;
  patientPhone?: string | null;
  /** @format uuid */
  doctorId?: string;
  doctorName?: string | null;
  /** @format double */
  amount?: number;
  /** @format double */
  paidAmount?: number;
  /** @format double */
  remainingAmount?: number;
  status?: InvoiceStatus;
  isServiceRendered?: boolean;
  /** @format double */
  creditAmount?: number;
  hasPendingSettlement?: boolean;
  /** @format double */
  pendingSettlementAmount?: number;
  encounterFinancialState?: EncounterFinancialState;
  /** @format double */
  totalRefunded?: number;
  /** @format date-time */
  creditIssuedAt?: string | null;
  notes?: string | null;
  lineItems?: InvoiceLineItemDto[] | null;
  payments?: PaymentDto[] | null;
  /** @format date-time */
  createdAt?: string;
}

export interface InvoiceDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: InvoiceDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface InvoiceDtoPagedResult {
  items?: InvoiceDto[] | null;
  /** @format int32 */
  totalCount?: number;
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  totalPages?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}

export interface InvoiceDtoPagedResultApiResponse {
  success?: boolean;
  message?: string | null;
  data?: InvoiceDtoPagedResult;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface InvoiceLineItemDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  invoiceId?: string;
  /** @format uuid */
  clinicServiceId?: string | null;
  itemName?: string | null;
  /** @format double */
  unitPrice?: number;
  /** @format int32 */
  quantity?: number;
  /** @format double */
  totalPrice?: number;
  notes?: string | null;
  /** @format date-time */
  createdAt?: string;
}

export interface LabRequestDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  visitId?: string;
  testName?: string | null;
  type?: LabRequestType;
  notes?: string | null;
  isUrgent?: boolean;
  resultText?: string | null;
  /** @format date-time */
  resultReceivedAt?: string | null;
  /** @format date-time */
  createdAt?: string;
}

export interface LabRequestDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: LabRequestDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface LabRequestDtoListApiResponse {
  success?: boolean;
  message?: string | null;
  data?: LabRequestDto[] | null;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface LoginRequest {
  username?: string | null;
  password?: string | null;
}

export interface LoginResponse {
  token?: string | null;
  refreshToken?: string | null;
  /** @format date-time */
  expiresAt?: string;
  user?: UserInfoDto;
}

export interface LoginResponseApiResponse {
  success?: boolean;
  message?: string | null;
  data?: LoginResponse;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface MarkPaidRequest {
  /**
   * @minLength 0
   * @maxLength 100
   */
  paymentMethod: string;
  /**
   * @minLength 0
   * @maxLength 200
   */
  paymentReference?: string | null;
  /** @format date-time */
  paidAt?: string | null;
}

export interface MarkPartnerOrderArrivedRequest {
  /** @format date-time */
  arrivedAt?: string | null;
  /**
   * @minLength 0
   * @maxLength 1000
   */
  notes?: string | null;
}

export interface MarketplaceOrderDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  branchId?: string;
  customerName?: string | null;
  phone?: string | null;
  notes?: string | null;
  status?: MarketplaceOrderStatus;
  /** @format date-time */
  whatsAppRedirectedAt?: string | null;
  /** @format uuid */
  salesInvoiceId?: string | null;
  /** @format double */
  subtotalAmount?: number;
  /** @format double */
  totalAmount?: number;
  /** @format date-time */
  confirmedAt?: string | null;
  /** @format date-time */
  cancelledAt?: string | null;
  items?: MarketplaceOrderItemDto[] | null;
  salesInvoice?: SalesInvoiceDto;
  /** @format date-time */
  createdAt?: string;
}

export interface MarketplaceOrderDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: MarketplaceOrderDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface MarketplaceOrderDtoPagedResult {
  items?: MarketplaceOrderDto[] | null;
  /** @format int32 */
  totalCount?: number;
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  totalPages?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}

export interface MarketplaceOrderDtoPagedResultApiResponse {
  success?: boolean;
  message?: string | null;
  data?: MarketplaceOrderDtoPagedResult;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface MarketplaceOrderItemDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  inventoryItemId?: string;
  itemName?: string | null;
  /** @format double */
  unitPrice?: number;
  /** @format double */
  quantity?: number;
  /** @format double */
  lineTotal?: number;
}

export interface MediaFileDto {
  /** @format uuid */
  id?: string;
  category?: string | null;
  publicUrl?: string | null;
  contentType?: string | null;
  /** @format int64 */
  fileSizeBytes?: number;
  originalFileName?: string | null;
  /** @format date-time */
  createdAt?: string;
}

export interface MediaFileDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: MediaFileDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface MessageLogDto {
  /** @format uuid */
  id?: string;
  templateName?: string | null;
  recipientPhone?: string | null;
  /** @format uuid */
  recipientUserId?: string | null;
  channel?: MessageChannel;
  status?: MessageStatus;
  /** @format int32 */
  attemptCount?: number;
  /** @format date-time */
  nextAttemptAt?: string | null;
  /** @format date-time */
  lastAttemptAt?: string | null;
  /** @format date-time */
  sentAt?: string | null;
  /** @format date-time */
  deliveredAt?: string | null;
  providerMessageId?: string | null;
  lastProviderStatus?: string | null;
  providerRawResponse?: string | null;
  renderedBody?: string | null;
  failureReason?: string | null;
  variables?: string | null;
  /** @format date-time */
  createdAt?: string;
}

export interface MessageLogDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: MessageLogDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface MessageLogDtoPagedResult {
  items?: MessageLogDto[] | null;
  /** @format int32 */
  totalCount?: number;
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  totalPages?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}

export interface MessageLogDtoPagedResultApiResponse {
  success?: boolean;
  message?: string | null;
  data?: MessageLogDtoPagedResult;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface MonthlyRevenueDto {
  /** @format int32 */
  year?: number;
  /** @format int32 */
  month?: number;
  /** @format double */
  totalRevenue?: number;
  /** @format double */
  totalPaid?: number;
  /** @format double */
  totalExpenses?: number;
  /** @format double */
  salaryExpenses?: number;
  /** @format double */
  nonSalaryExpenses?: number;
  /** @format double */
  netProfit?: number;
  /** @format int32 */
  invoiceCount?: number;
}

export interface MonthlyRevenueDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: MonthlyRevenueDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface NotificationSubscriptionDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  userId?: string;
  endpoint?: string | null;
  isActive?: boolean;
  /** @format date-time */
  lastUsedAt?: string | null;
  /** @format date-time */
  createdAt?: string;
}

export interface NotificationSubscriptionDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: NotificationSubscriptionDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface NotificationSubscriptionDtoListApiResponse {
  success?: boolean;
  message?: string | null;
  data?: NotificationSubscriptionDto[] | null;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface ObjectApiResponse {
  success?: boolean;
  message?: string | null;
  data?: any;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface PartnerContractDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  partnerId?: string;
  partnerName?: string | null;
  partnerType?: PartnerType;
  /** @format uuid */
  branchId?: string | null;
  serviceScope?: string | null;
  /** @format double */
  commissionPercentage?: number | null;
  settlementTarget?: PartnerSettlementTarget;
  /** @format double */
  clinicDoctorSharePercentage?: number | null;
  /** @format double */
  flatFee?: number | null;
  /** @format date-time */
  effectiveFrom?: string;
  /** @format date-time */
  effectiveTo?: string | null;
  isActive?: boolean;
  notes?: string | null;
  /** @format date-time */
  createdAt?: string;
}

export interface PartnerContractDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: PartnerContractDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface PartnerContractDtoListApiResponse {
  success?: boolean;
  message?: string | null;
  data?: PartnerContractDto[] | null;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface PartnerDto {
  /** @format uuid */
  id?: string;
  name?: string | null;
  type?: PartnerType;
  contactName?: string | null;
  contactPhone?: string | null;
  contactEmail?: string | null;
  address?: string | null;
  notes?: string | null;
  isActive?: boolean;
  /** @format date-time */
  createdAt?: string;
}

export interface PartnerDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: PartnerDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface PartnerDtoPagedResult {
  items?: PartnerDto[] | null;
  /** @format int32 */
  totalCount?: number;
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  totalPages?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}

export interface PartnerDtoPagedResultApiResponse {
  success?: boolean;
  message?: string | null;
  data?: PartnerDtoPagedResult;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface PartnerOrderDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  partnerId?: string;
  partnerName?: string | null;
  partnerType?: PartnerType;
  /** @format uuid */
  partnerContractId?: string | null;
  /** @format uuid */
  branchId?: string;
  /** @format uuid */
  visitId?: string;
  /** @format uuid */
  patientId?: string;
  patientName?: string | null;
  /** @format uuid */
  doctorId?: string;
  doctorName?: string | null;
  /** @format uuid */
  labRequestId?: string | null;
  /** @format uuid */
  prescriptionId?: string | null;
  /** @format uuid */
  partnerServiceCatalogItemId?: string | null;
  status?: PartnerOrderStatus;
  /** @format uuid */
  orderedByUserId?: string;
  /** @format date-time */
  orderedAt?: string;
  /** @format date-time */
  sentAt?: string | null;
  /** @format date-time */
  acceptedAt?: string | null;
  /** @format date-time */
  scheduledAt?: string | null;
  /** @format date-time */
  patientArrivedAt?: string | null;
  /** @format date-time */
  resultUploadedAt?: string | null;
  /** @format date-time */
  completedAt?: string | null;
  /** @format date-time */
  cancelledAt?: string | null;
  /** @format uuid */
  completedByUserId?: string | null;
  serviceNameSnapshot?: string | null;
  /** @format double */
  servicePrice?: number | null;
  settlementTarget?: PartnerSettlementTarget;
  /** @format double */
  settlementPercentage?: number | null;
  /** @format double */
  clinicDoctorSharePercentage?: number | null;
  /** @format double */
  doctorPayoutAmount?: number | null;
  /** @format double */
  clinicRevenueAmount?: number | null;
  resultSummary?: string | null;
  /** @format double */
  estimatedCost?: number | null;
  /** @format double */
  finalCost?: number | null;
  externalReference?: string | null;
  notes?: string | null;
  statusHistory?: PartnerOrderStatusHistoryDto[] | null;
  /** @format date-time */
  createdAt?: string;
}

export interface PartnerOrderDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: PartnerOrderDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface PartnerOrderDtoPagedResult {
  items?: PartnerOrderDto[] | null;
  /** @format int32 */
  totalCount?: number;
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  totalPages?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}

export interface PartnerOrderDtoPagedResultApiResponse {
  success?: boolean;
  message?: string | null;
  data?: PartnerOrderDtoPagedResult;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface PartnerOrderStatusHistoryDto {
  /** @format uuid */
  id?: string;
  oldStatus?: PartnerOrderStatus;
  newStatus?: PartnerOrderStatus;
  /** @format uuid */
  changedByUserId?: string;
  /** @format date-time */
  changedAt?: string;
  notes?: string | null;
}

export interface PartnerServiceCatalogItemDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  partnerId?: string;
  partnerName?: string | null;
  /** @format uuid */
  branchId?: string | null;
  serviceName?: string | null;
  /** @format double */
  price?: number;
  settlementTarget?: PartnerSettlementTarget;
  /** @format double */
  settlementPercentage?: number;
  /** @format double */
  clinicDoctorSharePercentage?: number | null;
  isActive?: boolean;
  notes?: string | null;
  /** @format date-time */
  createdAt?: string;
}

export interface PartnerServiceCatalogItemDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: PartnerServiceCatalogItemDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface PartnerServiceCatalogItemDtoListApiResponse {
  success?: boolean;
  message?: string | null;
  data?: PartnerServiceCatalogItemDto[] | null;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface PartnerUserDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  partnerId?: string;
  partnerName?: string | null;
  /** @format uuid */
  userId?: string;
  username?: string | null;
  displayName?: string | null;
  phone?: string | null;
  isPrimary?: boolean;
  isActive?: boolean;
  /** @format date-time */
  createdAt?: string;
}

export interface PartnerUserDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: PartnerUserDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface PatchClinicSettingsRequest {
  /**
   * @minLength 0
   * @maxLength 200
   */
  clinicName?: string | null;
  /**
   * @minLength 0
   * @maxLength 20
   */
  phone?: string | null;
  /**
   * @minLength 0
   * @maxLength 20
   */
  whatsAppSenderNumber?: string | null;
  /**
   * @minLength 0
   * @maxLength 20
   */
  supportWhatsAppNumber?: string | null;
  /**
   * @minLength 0
   * @maxLength 20
   */
  supportPhoneNumber?: string | null;
  address?: string | null;
  /**
   * @minLength 0
   * @maxLength 100
   */
  city?: string | null;
  logoUrl?: string | null;
  description?: string | null;
  socialLinks?: Record<string, string>;
  bookingEnabled?: boolean | null;
  retainCreditOnNoShow?: boolean | null;
  selfServicePaymentPolicy?: PatientSelfServicePaymentPolicy;
  /**
   * @format int32
   * @min 0
   * @max 168
   */
  cancellationWindowHours?: number | null;
  /**
   * @format int32
   * @min 1
   * @max 168
   */
  selfServiceRequestExpiryHours?: number | null;
  workingHours?: WorkingHourRequest[] | null;
}

export interface PatchDoctorRequest {
  /**
   * @minLength 0
   * @maxLength 200
   */
  name?: string | null;
  /**
   * @minLength 0
   * @maxLength 100
   */
  specialty?: string | null;
  /**
   * @minLength 0
   * @maxLength 20
   */
  phone?: string | null;
  bio?: string | null;
  photoUrl?: string | null;
  urgentCaseMode?: UrgentCaseMode;
  urgentEnabled?: boolean | null;
  /**
   * @format int32
   * @min 0
   * @max 3
   */
  urgentInsertAfterCount?: number | null;
  /**
   * @format int32
   * @min 1
   * @max 120
   */
  avgVisitDurationMinutes?: number | null;
  compensationMode?: DoctorCompensationMode;
  /**
   * @format double
   * @min 0
   * @max 1000000000
   */
  compensationValue?: number | null;
  /** @format date-time */
  compensationEffectiveFrom?: string | null;
}

export interface PatchInvoiceRequest {
  /** @format double */
  amount?: number | null;
  notes?: string | null;
}

export interface PatchPatientRequest {
  /**
   * @minLength 0
   * @maxLength 200
   */
  name?: string | null;
  /**
   * @minLength 0
   * @maxLength 20
   */
  phone?: string | null;
  /** @format date-time */
  dateOfBirth?: string | null;
  gender?: Gender;
  address?: string | null;
  notes?: string | null;
}

export interface PatchStaffRequest {
  /**
   * @minLength 0
   * @maxLength 200
   */
  name?: string | null;
  /**
   * @minLength 0
   * @maxLength 20
   */
  phone?: string | null;
  workerMode?: WorkerMode;
  /** @format double */
  salary?: number | null;
  /** @format date-time */
  hireDate?: string | null;
  notes?: string | null;
}

export interface PatientChronicProfileDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  patientId?: string;
  diabetes?: boolean;
  hypertension?: boolean;
  cardiacDisease?: boolean;
  asthma?: boolean;
  other?: boolean;
  otherNotes?: string | null;
  /** @format uuid */
  recordedByUserId?: string | null;
  /** @format date-time */
  updatedAt?: string;
}

export interface PatientChronicProfileDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: PatientChronicProfileDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface PatientCreditBalanceDto {
  /** @format uuid */
  patientId?: string;
  /** @format double */
  balance?: number;
}

export interface PatientCreditBalanceDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: PatientCreditBalanceDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface PatientCreditTransactionDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  patientId?: string;
  type?: CreditTransactionType;
  reason?: CreditReason;
  /** @format double */
  amount?: number;
  /** @format double */
  balanceAfter?: number;
  /** @format uuid */
  invoiceId?: string | null;
  /** @format uuid */
  paymentId?: string | null;
  /** @format uuid */
  queueTicketId?: string | null;
  /** @format uuid */
  queueSessionId?: string | null;
  notes?: string | null;
  /** @format date-time */
  createdAt?: string;
}

export interface PatientCreditTransactionDtoPagedResult {
  items?: PatientCreditTransactionDto[] | null;
  /** @format int32 */
  totalCount?: number;
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  totalPages?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}

export interface PatientCreditTransactionDtoPagedResultApiResponse {
  success?: boolean;
  message?: string | null;
  data?: PatientCreditTransactionDtoPagedResult;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface PatientDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  userId?: string;
  name?: string | null;
  phone?: string | null;
  /** @format date-time */
  dateOfBirth?: string | null;
  gender?: Gender;
  address?: string | null;
  notes?: string | null;
  isDefault?: boolean;
  /** @format uuid */
  parentPatientId?: string | null;
  username?: string | null;
  subProfiles?: PatientSubProfileDto[] | null;
  /** @format date-time */
  createdAt?: string;
}

export interface PatientDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: PatientDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface PatientDtoPagedResult {
  items?: PatientDto[] | null;
  /** @format int32 */
  totalCount?: number;
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  totalPages?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}

export interface PatientDtoPagedResultApiResponse {
  success?: boolean;
  message?: string | null;
  data?: PatientDtoPagedResult;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface PatientLoginResponse {
  token?: string | null;
  refreshToken?: string | null;
  /** @format date-time */
  expiresAt?: string;
  user?: PatientUserInfoDto;
}

export interface PatientLoginResponseApiResponse {
  success?: boolean;
  message?: string | null;
  data?: PatientLoginResponse;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface PatientMedicalDocumentDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  patientId?: string;
  category?: DocumentCategory;
  originalFileName?: string | null;
  contentType?: string | null;
  /** @format int64 */
  fileSizeBytes?: number;
  notes?: string | null;
  /** @format date-time */
  createdAt?: string;
}

export interface PatientMedicalDocumentDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: PatientMedicalDocumentDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface PatientMedicalDocumentDtoListApiResponse {
  success?: boolean;
  message?: string | null;
  data?: PatientMedicalDocumentDto[] | null;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface PatientMedicalDocumentThreadDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  patientId?: string;
  /** @format uuid */
  documentId?: string;
  /** @format uuid */
  createdByUserId?: string;
  subject?: string | null;
  status?: MedicalDocumentThreadStatus;
  /** @format date-time */
  closedAt?: string | null;
  /** @format uuid */
  closedByUserId?: string | null;
  notes?: string | null;
  replies?: PatientMedicalDocumentThreadReplyDto[] | null;
  /** @format date-time */
  createdAt?: string;
}

export interface PatientMedicalDocumentThreadDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: PatientMedicalDocumentThreadDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface PatientMedicalDocumentThreadDtoListApiResponse {
  success?: boolean;
  message?: string | null;
  data?: PatientMedicalDocumentThreadDto[] | null;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface PatientMedicalDocumentThreadReplyDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  threadId?: string;
  /** @format uuid */
  authorUserId?: string;
  message?: string | null;
  isInternalNote?: boolean;
  /** @format date-time */
  createdAt?: string;
}

export interface PatientPartnerOrderTimelineDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  visitId?: string;
  /** @format uuid */
  partnerId?: string;
  partnerName?: string | null;
  partnerType?: PartnerType;
  serviceName?: string | null;
  status?: PartnerOrderStatus;
  /** @format date-time */
  orderedAt?: string;
  /** @format date-time */
  acceptedAt?: string | null;
  /** @format date-time */
  scheduledAt?: string | null;
  /** @format date-time */
  patientArrivedAt?: string | null;
  /** @format date-time */
  resultUploadedAt?: string | null;
  /** @format date-time */
  completedAt?: string | null;
  /** @format double */
  price?: number | null;
  /** @format double */
  finalCost?: number | null;
  /** @format double */
  doctorPayoutAmount?: number | null;
  /** @format double */
  clinicRevenueAmount?: number | null;
  resultSummary?: string | null;
  notes?: string | null;
}

export interface PatientPartnerOrderTimelineDtoListApiResponse {
  success?: boolean;
  message?: string | null;
  data?: PatientPartnerOrderTimelineDto[] | null;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface PatientProfileDto {
  /** @format uuid */
  id?: string;
  name?: string | null;
  isDefault?: boolean;
}

export interface PatientSelfServicePaymentProofDto {
  originalFileName?: string | null;
  publicUrl?: string | null;
  contentType?: string | null;
  /** @format int64 */
  fileSizeBytes?: number;
}

export interface PatientSelfServiceRequestDocumentDto {
  /** @format uuid */
  id?: string;
  originalFileName?: string | null;
  publicUrl?: string | null;
  contentType?: string | null;
  /** @format int64 */
  fileSizeBytes?: number;
  notes?: string | null;
  /** @format date-time */
  createdAt?: string;
}

export interface PatientSelfServiceRequestDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  patientId?: string;
  patientName?: string | null;
  /** @format uuid */
  doctorId?: string;
  doctorName?: string | null;
  /** @format uuid */
  branchId?: string;
  branchName?: string | null;
  /** @format uuid */
  doctorServiceId?: string;
  serviceName?: string | null;
  requestType?: PatientSelfServiceRequestType;
  status?: PatientSelfServiceRequestStatus;
  visitType?: VisitType;
  source?: VisitSource;
  /** @format date-time */
  requestedDate?: string;
  requestedTime?: string | null;
  /** @format double */
  servicePriceSnapshot?: number | null;
  /** @format int32 */
  serviceDurationMinutesSnapshot?: number | null;
  complaint?: string | null;
  symptoms?: string | null;
  durationNotes?: string | null;
  hasChronicConditions?: boolean;
  chronicConditionsDetails?: string | null;
  currentMedications?: string | null;
  knownAllergies?: string | null;
  isPregnant?: boolean | null;
  emergencyContactName?: string | null;
  emergencyContactPhone?: string | null;
  notes?: string | null;
  /** @format double */
  declaredPaidAmount?: number | null;
  /** @format double */
  adjustedPaidAmount?: number | null;
  paymentMethod?: string | null;
  transferReference?: string | null;
  transferSenderName?: string | null;
  /** @format date-time */
  transferDate?: string | null;
  paymentProof?: PatientSelfServicePaymentProofDto;
  isWithinClinicWorkingHours?: boolean | null;
  isWithinDoctorSchedule?: boolean | null;
  doctorShiftOpenAtSubmission?: boolean | null;
  /** @format date-time */
  availabilityCheckedAt?: string | null;
  availabilityCheckNotes?: string | null;
  /** @format date-time */
  expiresAt?: string;
  /** @format int32 */
  reuploadCount?: number;
  reuploadReason?: string | null;
  /** @format date-time */
  reuploadRequestedAt?: string | null;
  /** @format uuid */
  reuploadRequestedByUserId?: string | null;
  rejectionReason?: string | null;
  /** @format date-time */
  rejectedAt?: string | null;
  /** @format uuid */
  rejectedByUserId?: string | null;
  approvalNotes?: string | null;
  /** @format date-time */
  approvedAt?: string | null;
  /** @format uuid */
  approvedByUserId?: string | null;
  /** @format uuid */
  convertedQueueTicketId?: string | null;
  /** @format uuid */
  convertedBookingId?: string | null;
  /** @format date-time */
  convertedAt?: string | null;
  documents?: PatientSelfServiceRequestDocumentDto[] | null;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface PatientSelfServiceRequestDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: PatientSelfServiceRequestDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface PatientSelfServiceRequestListItemDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  patientId?: string;
  patientName?: string | null;
  /** @format uuid */
  doctorId?: string;
  doctorName?: string | null;
  /** @format uuid */
  branchId?: string;
  branchName?: string | null;
  /** @format uuid */
  doctorServiceId?: string;
  serviceName?: string | null;
  requestType?: PatientSelfServiceRequestType;
  status?: PatientSelfServiceRequestStatus;
  /** @format date-time */
  requestedDate?: string;
  requestedTime?: string | null;
  /** @format double */
  declaredPaidAmount?: number | null;
  /** @format double */
  adjustedPaidAmount?: number | null;
  /** @format date-time */
  expiresAt?: string;
  /** @format uuid */
  convertedQueueTicketId?: string | null;
  /** @format uuid */
  convertedBookingId?: string | null;
  /** @format date-time */
  createdAt?: string;
}

export interface PatientSelfServiceRequestListItemDtoPagedResult {
  items?: PatientSelfServiceRequestListItemDto[] | null;
  /** @format int32 */
  totalCount?: number;
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  totalPages?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}

export interface PatientSelfServiceRequestListItemDtoPagedResultApiResponse {
  success?: boolean;
  message?: string | null;
  data?: PatientSelfServiceRequestListItemDtoPagedResult;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface PatientSubProfileDto {
  /** @format uuid */
  id?: string;
  name?: string | null;
  phone?: string | null;
  /** @format date-time */
  dateOfBirth?: string | null;
  gender?: Gender;
  isDefault?: boolean;
}

export interface PatientSummaryDto {
  /** @format uuid */
  patientId?: string;
  name?: string | null;
  phone?: string | null;
  /** @format date-time */
  dateOfBirth?: string | null;
  gender?: string | null;
  /** @format int32 */
  totalVisits?: number;
  recentVisits?: VisitSummaryDto[] | null;
}

export interface PatientSummaryDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: PatientSummaryDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface PatientUserInfoDto {
  /** @format uuid */
  id?: string;
  username?: string | null;
  displayName?: string | null;
  role?: string | null;
  /** @format uuid */
  tenantId?: string | null;
  profiles?: PatientProfileDto[] | null;
}

export interface PaymentDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  invoiceId?: string;
  /** @format double */
  amount?: number;
  paymentMethod?: string | null;
  referenceNumber?: string | null;
  /** @format date-time */
  paidAt?: string;
  notes?: string | null;
  isRefund?: boolean;
  /** @format date-time */
  createdAt?: string;
}

export interface PaymentDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: PaymentDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface PaymentDtoListApiResponse {
  success?: boolean;
  message?: string | null;
  data?: PaymentDto[] | null;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface PrescriptionDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  visitId?: string;
  medicationName?: string | null;
  dosage?: string | null;
  frequency?: string | null;
  duration?: string | null;
  instructions?: string | null;
  /** @format date-time */
  createdAt?: string;
}

export interface PrescriptionDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: PrescriptionDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface PrescriptionDtoListApiResponse {
  success?: boolean;
  message?: string | null;
  data?: PrescriptionDto[] | null;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface PrescriptionRevisionDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  prescriptionId?: string;
  /** @format uuid */
  visitId?: string;
  /** @format int32 */
  revisionNumber?: number;
  action?: string | null;
  medicationName?: string | null;
  dosage?: string | null;
  frequency?: string | null;
  duration?: string | null;
  instructions?: string | null;
  reason?: string | null;
  /** @format uuid */
  changedByUserId?: string;
  /** @format date-time */
  changedAt?: string;
}

export interface PrescriptionRevisionDtoListApiResponse {
  success?: boolean;
  message?: string | null;
  data?: PrescriptionRevisionDto[] | null;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface ProfitReportDto {
  /** @format date-time */
  from?: string;
  /** @format date-time */
  to?: string;
  /** @format double */
  totalRevenue?: number;
  /** @format double */
  totalPaid?: number;
  /** @format double */
  totalExpenses?: number;
  /** @format double */
  salaryExpenses?: number;
  /** @format double */
  nonSalaryExpenses?: number;
  /** @format double */
  netProfit?: number;
  /** @format int32 */
  invoiceCount?: number;
  /** @format int32 */
  expenseCount?: number;
  byDoctor?: DoctorRevenueDto[] | null;
}

export interface ProfitReportDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: ProfitReportDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface PublicBranchDto {
  /** @format uuid */
  id?: string;
  name?: string | null;
  address?: string | null;
  phone?: string | null;
}

export interface PublicClinicDto {
  clinicName?: string | null;
  phone?: string | null;
  supportWhatsAppNumber?: string | null;
  supportPhoneNumber?: string | null;
  address?: string | null;
  city?: string | null;
  logoUrl?: string | null;
  imgUrl?: string | null;
  description?: string | null;
  socialLinks?: Record<string, string | null>;
  bookingEnabled?: boolean;
  tenantSlug?: string | null;
  isActive?: boolean;
}

export interface PublicClinicDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: PublicClinicDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface PublicDoctorDto {
  /** @format uuid */
  id?: string;
  name?: string | null;
  specialty?: string | null;
  bio?: string | null;
  photoUrl?: string | null;
  isEnabled?: boolean;
  /** @format int32 */
  avgVisitDurationMinutes?: number;
  services?: PublicDoctorServiceDto[] | null;
}

export interface PublicDoctorDtoListApiResponse {
  success?: boolean;
  message?: string | null;
  data?: PublicDoctorDto[] | null;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface PublicDoctorServiceDto {
  /** @format uuid */
  id?: string;
  serviceName?: string | null;
  /** @format double */
  price?: number;
  /** @format int32 */
  durationMinutes?: number | null;
}

export interface PublicDoctorServiceDtoListApiResponse {
  success?: boolean;
  message?: string | null;
  data?: PublicDoctorServiceDto[] | null;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface PublicLandingDto {
  clinic?: PublicClinicDto;
  featuredServices?: PublicDoctorServiceDto[] | null;
  featuredProducts?: PublicMarketplaceItemDto[] | null;
  doctorsAvailableNow?: PublicDoctorDto[] | null;
  branches?: PublicBranchDto[] | null;
  paymentMethods?: ClinicPaymentMethodDto[] | null;
}

export interface PublicLandingDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: PublicLandingDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface PublicMarketplaceItemDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  branchId?: string;
  name?: string | null;
  description?: string | null;
  skuCode?: string | null;
  itemType?: InventoryItemType;
  unit?: string | null;
  /** @format double */
  salePrice?: number;
  /** @format double */
  quantityOnHand?: number;
  showInLanding?: boolean;
  images?: InventoryItemImageDto[] | null;
}

export interface PublicMarketplaceItemDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: PublicMarketplaceItemDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface PublicMarketplaceItemDtoPagedResult {
  items?: PublicMarketplaceItemDto[] | null;
  /** @format int32 */
  totalCount?: number;
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  totalPages?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}

export interface PublicMarketplaceItemDtoPagedResultApiResponse {
  success?: boolean;
  message?: string | null;
  data?: PublicMarketplaceItemDtoPagedResult;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface PublicWorkingHourDto {
  dayOfWeek?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  isActive?: boolean;
}

export interface PublicWorkingHourDtoListApiResponse {
  success?: boolean;
  message?: string | null;
  data?: PublicWorkingHourDto[] | null;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface QueueBoardDto {
  sessions?: QueueBoardSessionDto[] | null;
}

export interface QueueBoardDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: QueueBoardDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface QueueBoardSessionDto {
  /** @format uuid */
  sessionId?: string;
  /** @format uuid */
  doctorId?: string | null;
  /** @format uuid */
  branchId?: string | null;
  doctorName?: string | null;
  isActive?: boolean;
  /** @format int32 */
  waitingCount?: number;
  /** @format int32 */
  calledCount?: number;
  /** @format int32 */
  inVisitCount?: number;
  /** @format int32 */
  completedCount?: number;
  currentTicket?: QueueTicketDto;
  waitingTickets?: QueueTicketDto[] | null;
}

export interface QueueBoardSessionDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: QueueBoardSessionDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface QueueSessionDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  doctorId?: string | null;
  /** @format uuid */
  branchId?: string | null;
  doctorName?: string | null;
  /** @format date-time */
  startedAt?: string;
  /** @format date-time */
  closedAt?: string | null;
  isActive?: boolean;
  notes?: string | null;
  /** @format int32 */
  totalTickets?: number;
  /** @format int32 */
  waitingCount?: number;
  /** @format int32 */
  completedCount?: number;
  /** @format date-time */
  createdAt?: string;
}

export interface QueueSessionDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: QueueSessionDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface QueueSessionDtoPagedResult {
  items?: QueueSessionDto[] | null;
  /** @format int32 */
  totalCount?: number;
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  totalPages?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}

export interface QueueSessionDtoPagedResultApiResponse {
  success?: boolean;
  message?: string | null;
  data?: QueueSessionDtoPagedResult;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface QueueTicketDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  sessionId?: string;
  /** @format uuid */
  branchId?: string | null;
  /** @format uuid */
  visitId?: string | null;
  /** @format uuid */
  invoiceId?: string | null;
  /** @format uuid */
  patientId?: string;
  patientName?: string | null;
  /** @format uuid */
  doctorId?: string;
  doctorName?: string | null;
  source?: VisitSource;
  visitType?: VisitType;
  isFromBooking?: boolean;
  isFromWalkIn?: boolean;
  isFromSelfService?: boolean;
  /** @format uuid */
  doctorServiceId?: string | null;
  serviceName?: string | null;
  /** @format double */
  invoiceAmount?: number | null;
  /** @format double */
  paidAmount?: number | null;
  /** @format double */
  remainingAmount?: number | null;
  invoiceStatus?: InvoiceStatus;
  /** @format int32 */
  ticketNumber?: number;
  status?: TicketStatus;
  isUrgent?: boolean;
  urgentAccepted?: boolean;
  /** @format date-time */
  issuedAt?: string;
  /** @format date-time */
  calledAt?: string | null;
  /** @format date-time */
  visitStartedAt?: string | null;
  /** @format date-time */
  completedAt?: string | null;
  notes?: string | null;
  /** @format int32 */
  myQueueNumber?: number | null;
  /** @format int32 */
  currentServingNumber?: number | null;
  /** @format int32 */
  patientsAheadCount?: number | null;
  /** @format int32 */
  estimatedWaitMinutes?: number | null;
  estimatedWaitText?: string | null;
}

export interface QueueTicketDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: QueueTicketDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface QueueTicketDtoListApiResponse {
  success?: boolean;
  message?: string | null;
  data?: QueueTicketDto[] | null;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface RecordVisitInventoryUsageRequest {
  /** @format uuid */
  inventoryItemId?: string;
  /**
   * @format double
   * @min 0.0001
   */
  quantity?: number;
  /**
   * @minLength 0
   * @maxLength 500
   */
  notes?: string | null;
}

export interface RefreshTokenRequest {
  refreshToken?: string | null;
}

export interface RefundInvoiceRequest {
  /** @format double */
  amount?: number;
  reason?: string | null;
  referenceNumber?: string | null;
}

export interface RejectPatientSelfServiceRequest {
  /**
   * @minLength 0
   * @maxLength 1000
   */
  reason: string;
}

export interface RequestSelfServicePaymentReupload {
  /**
   * @minLength 0
   * @maxLength 1000
   */
  reason: string;
}

export interface RescheduleBookingRequest {
  /** @format date-time */
  bookingDate?: string;
  bookingTime?: string | null;
}

export interface ResetPasswordResponse {
  newPassword?: string | null;
}

export interface ResetPasswordResponseApiResponse {
  success?: boolean;
  message?: string | null;
  data?: ResetPasswordResponse;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface SalaryPayoutExpenseDto {
  /** @format uuid */
  expenseId?: string;
  /** @format double */
  amount?: number;
  /** @format date-time */
  expenseDate?: string;
  category?: string | null;
  notes?: string | null;
}

export interface SalaryPayoutExpenseDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: SalaryPayoutExpenseDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface SalesInvoiceDto {
  /** @format uuid */
  id?: string;
  invoiceNumber?: string | null;
  /** @format uuid */
  branchId?: string;
  /** @format uuid */
  marketplaceOrderId?: string;
  customerName?: string | null;
  phone?: string | null;
  /** @format double */
  subtotalAmount?: number;
  /** @format double */
  totalAmount?: number;
  status?: SalesInvoiceStatus;
  /** @format date-time */
  issuedAt?: string;
  /** @format date-time */
  cancelledAt?: string | null;
  lineItems?: SalesInvoiceLineItemDto[] | null;
}

export interface SalesInvoiceLineItemDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  inventoryItemId?: string;
  itemName?: string | null;
  /** @format double */
  unitPrice?: number;
  /** @format double */
  quantity?: number;
  /** @format double */
  lineTotal?: number;
}

export interface SchedulePartnerOrderRequest {
  /** @format date-time */
  scheduledAt?: string;
  /**
   * @minLength 0
   * @maxLength 1000
   */
  notes?: string | null;
}

export interface SendMessageRequest {
  templateName?: string | null;
  recipientPhone?: string | null;
  /** @format uuid */
  recipientUserId?: string | null;
  channel?: MessageChannel;
  variables?: Record<string, string>;
}

export interface SendNotificationRequest {
  /** @format uuid */
  userId?: string;
  title?: string | null;
  body?: string | null;
  templateName?: string | null;
  variables?: Record<string, string>;
}

export interface SendPatientCredentialsRequest {
  regeneratePassword?: boolean;
  usePhoneAsPassword?: boolean;
}

export interface SendPatientCredentialsResponse {
  /** @format uuid */
  patientId?: string;
  username?: string | null;
  issuedPassword?: string | null;
  messageQueued?: boolean;
}

export interface SendPatientCredentialsResponseApiResponse {
  success?: boolean;
  message?: string | null;
  data?: SendPatientCredentialsResponse;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface ServiceSalesReportRowDto {
  serviceName?: string | null;
  /** @format int32 */
  quantity?: number;
  /** @format double */
  grossAmount?: number;
  /** @format int32 */
  invoicesCount?: number;
}

export interface ServicesSalesReportDto {
  /** @format date-time */
  fromDate?: string;
  /** @format date-time */
  toDate?: string;
  /** @format int32 */
  totalItemsSold?: number;
  /** @format double */
  grossSales?: number;
  rows?: ServiceSalesReportRowDto[] | null;
}

export interface ServicesSalesReportDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: ServicesSalesReportDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface SetInventoryItemActivationRequest {
  active?: boolean;
}

export interface SetPartnerActivationRequest {
  isActive?: boolean;
}

export interface StaffDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  userId?: string;
  name?: string | null;
  phone?: string | null;
  role?: string | null;
  username?: string | null;
  /** @format double */
  salary?: number | null;
  workerMode?: WorkerMode;
  /** @format date-time */
  hireDate?: string | null;
  notes?: string | null;
  isEnabled?: boolean;
  /** @format date-time */
  createdAt?: string;
}

export interface StaffDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: StaffDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface StaffDtoPagedResult {
  items?: StaffDto[] | null;
  /** @format int32 */
  totalCount?: number;
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  totalPages?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}

export interface StaffDtoPagedResultApiResponse {
  success?: boolean;
  message?: string | null;
  data?: StaffDtoPagedResult;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface StaleOpenVisitDto {
  /** @format uuid */
  visitId?: string;
  /** @format uuid */
  patientId?: string;
  patientName?: string | null;
  /** @format uuid */
  doctorId?: string;
  doctorName?: string | null;
  /** @format uuid */
  queueTicketId?: string | null;
  complaint?: string | null;
  /** @format date-time */
  startedAt?: string;
  /** @format double */
  ageHours?: number;
  hasActiveQueueTicket?: boolean;
}

export interface StaleOpenVisitDtoListApiResponse {
  success?: boolean;
  message?: string | null;
  data?: StaleOpenVisitDto[] | null;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface StartVisitResultDto {
  ticket?: QueueTicketDto;
  /** @format uuid */
  visitId?: string;
}

export interface StartVisitResultDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: StartVisitResultDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface UpdateClinicPaymentMethodsRequest {
  methods: UpsertClinicPaymentMethodRequest[];
}

export interface UpdateClinicServiceRequest {
  name?: string | null;
  description?: string | null;
  /** @format double */
  defaultPrice?: number | null;
  /** @format int32 */
  defaultDurationMinutes?: number | null;
  isActive?: boolean | null;
}

export interface UpdateClinicSettingsRequest {
  /**
   * @minLength 0
   * @maxLength 200
   */
  clinicName: string;
  /**
   * @minLength 0
   * @maxLength 20
   */
  phone?: string | null;
  /**
   * @minLength 0
   * @maxLength 20
   */
  whatsAppSenderNumber?: string | null;
  /**
   * @minLength 0
   * @maxLength 20
   */
  supportWhatsAppNumber?: string | null;
  /**
   * @minLength 0
   * @maxLength 20
   */
  supportPhoneNumber?: string | null;
  address?: string | null;
  /**
   * @minLength 0
   * @maxLength 100
   */
  city?: string | null;
  logoUrl?: string | null;
  description?: string | null;
  socialLinks?: Record<string, string>;
  bookingEnabled?: boolean;
  retainCreditOnNoShow?: boolean;
  selfServicePaymentPolicy?: PatientSelfServicePaymentPolicy;
  /**
   * @format int32
   * @min 0
   * @max 168
   */
  cancellationWindowHours?: number;
  /**
   * @format int32
   * @min 1
   * @max 168
   */
  selfServiceRequestExpiryHours?: number;
  workingHours?: WorkingHourRequest[] | null;
}

export interface UpdateDoctorRequest {
  /**
   * @minLength 0
   * @maxLength 200
   */
  name: string;
  /**
   * @minLength 0
   * @maxLength 100
   */
  specialty?: string | null;
  /**
   * @minLength 0
   * @maxLength 20
   */
  phone?: string | null;
  bio?: string | null;
  photoUrl?: string | null;
  urgentCaseMode?: UrgentCaseMode;
  urgentEnabled?: boolean | null;
  /**
   * @format int32
   * @min 0
   * @max 3
   */
  urgentInsertAfterCount?: number | null;
  /**
   * @format int32
   * @min 1
   * @max 120
   */
  avgVisitDurationMinutes?: number;
  compensationMode: DoctorCompensationMode;
  /**
   * @format double
   * @min 0
   * @max 1000000000
   */
  compensationValue?: number;
  /** @format date-time */
  compensationEffectiveFrom?: string | null;
}

export interface UpdateDoctorServicesRequest {
  services: DoctorServiceRequest[];
}

export interface UpdateExpenseRequest {
  category?: string | null;
  /** @format double */
  amount?: number;
  notes?: string | null;
  /** @format date-time */
  expenseDate?: string | null;
}

export interface UpdateFeatureFlagRequest {
  onlineBooking: boolean;
  whatsappAutomation: boolean;
  pwaNotifications: boolean;
  expensesModule: boolean;
  advancedMedicalTemplates: boolean;
  ratings: boolean;
  export: boolean;
  consultationVisitTypeEnabled: boolean;
  urgentInsertPolicyEnabled: boolean;
  encounterPendingSettlementEnabled: boolean;
  patientDocumentsEnabled: boolean;
  compensationRulesEnabled: boolean;
  dailyClosingSnapshotEnabled: boolean;
}

export interface UpdateInventoryItemRequest {
  /**
   * @minLength 0
   * @maxLength 200
   */
  name: string;
  /**
   * @minLength 0
   * @maxLength 2000
   */
  description?: string | null;
  /**
   * @minLength 0
   * @maxLength 100
   */
  skuCode: string;
  itemType?: InventoryItemType;
  /**
   * @minLength 0
   * @maxLength 50
   */
  unit: string;
  /**
   * @format double
   * @min 0
   */
  salePrice?: number;
  /**
   * @format double
   * @min 0
   */
  costPrice?: number;
  /**
   * @format double
   * @min 0
   */
  quantityOnHand?: number;
  /**
   * @format double
   * @min 0
   */
  lowStockThreshold?: number;
  usableInVisit?: boolean;
  sellablePublicly?: boolean;
  internalOnly?: boolean;
  billableInVisit?: boolean;
  active?: boolean;
  /** @format uuid */
  branchId?: string;
  showInLanding?: boolean;
  images?: string[] | null;
}

export interface UpdateInvoiceRequest {
  /** @format double */
  amount?: number;
  notes?: string | null;
}

export interface UpdateLabRequestRequest {
  testName?: string | null;
  type?: LabRequestType;
  notes?: string | null;
  isUrgent?: boolean;
}

export interface UpdateMarketplaceOrderStatusRequest {
  status?: MarketplaceOrderStatus;
  /**
   * @minLength 0
   * @maxLength 1000
   */
  notes?: string | null;
}

export interface UpdatePartnerContractRequest {
  /** @format uuid */
  branchId?: string | null;
  /**
   * @minLength 0
   * @maxLength 200
   */
  serviceScope?: string | null;
  /**
   * @format double
   * @min 0
   * @max 1000
   */
  commissionPercentage?: number | null;
  settlementTarget?: PartnerSettlementTarget;
  /**
   * @format double
   * @min 0
   * @max 1000
   */
  clinicDoctorSharePercentage?: number | null;
  /**
   * @format double
   * @min 0
   * @max 1000000000
   */
  flatFee?: number | null;
  /** @format date-time */
  effectiveFrom?: string;
  /** @format date-time */
  effectiveTo?: string | null;
  isActive?: boolean;
  /**
   * @minLength 0
   * @maxLength 2000
   */
  notes?: string | null;
}

export interface UpdatePartnerOrderStatusRequest {
  status: PartnerOrderStatus;
  /**
   * @format double
   * @min 0
   * @max 1000000000
   */
  finalCost?: number | null;
  /**
   * @minLength 0
   * @maxLength 120
   */
  externalReference?: string | null;
  /**
   * @minLength 0
   * @maxLength 1000
   */
  notes?: string | null;
}

export interface UpdatePartnerRequest {
  /**
   * @minLength 0
   * @maxLength 200
   */
  name: string;
  type: PartnerType;
  /**
   * @minLength 0
   * @maxLength 200
   */
  contactName?: string | null;
  /**
   * @minLength 0
   * @maxLength 50
   */
  contactPhone?: string | null;
  /**
   * @minLength 0
   * @maxLength 120
   */
  contactEmail?: string | null;
  /**
   * @minLength 0
   * @maxLength 1000
   */
  address?: string | null;
  /**
   * @minLength 0
   * @maxLength 2000
   */
  notes?: string | null;
}

export interface UpdatePartnerServiceCatalogItemRequest {
  /** @format uuid */
  branchId?: string | null;
  /**
   * @minLength 0
   * @maxLength 200
   */
  serviceName: string;
  /**
   * @format double
   * @min 0.01
   * @max 1000000000
   */
  price?: number;
  settlementTarget?: PartnerSettlementTarget;
  /**
   * @format double
   * @min 0.01
   * @max 1000
   */
  settlementPercentage?: number;
  /**
   * @format double
   * @min 0
   * @max 1000
   */
  clinicDoctorSharePercentage?: number | null;
  isActive?: boolean;
  /**
   * @minLength 0
   * @maxLength 2000
   */
  notes?: string | null;
}

export interface UpdatePatientRequest {
  /**
   * @minLength 0
   * @maxLength 200
   */
  name: string;
  /**
   * @minLength 0
   * @maxLength 20
   */
  phone: string;
  /** @format date-time */
  dateOfBirth?: string | null;
  gender?: Gender;
  address?: string | null;
  notes?: string | null;
}

export interface UpdatePrescriptionRequest {
  medicationName?: string | null;
  dosage?: string | null;
  frequency?: string | null;
  duration?: string | null;
  instructions?: string | null;
  revisionReason?: string | null;
}

export interface UpdateStaffRequest {
  /**
   * @minLength 0
   * @maxLength 200
   */
  name: string;
  /**
   * @minLength 0
   * @maxLength 20
   */
  phone?: string | null;
  workerMode?: WorkerMode;
  /** @format double */
  salary?: number | null;
  /** @format date-time */
  hireDate?: string | null;
  notes?: string | null;
}

export interface UpdateTenantRequest {
  /**
   * @minLength 0
   * @maxLength 200
   */
  name: string;
  /** @format tel */
  contactPhone?: string | null;
  /**
   * @minLength 0
   * @maxLength 500
   */
  address?: string | null;
  logoUrl?: string | null;
}

export interface UpdateVisitFieldsRequest {
  bloodPressure?: boolean;
  heartRate?: boolean;
  temperature?: boolean;
  weight?: boolean;
  height?: boolean;
  bmi?: boolean;
  bloodSugar?: boolean;
  oxygenSaturation?: boolean;
  respiratoryRate?: boolean;
}

export interface UpdateVisitRequest {
  complaint?: string | null;
  diagnosis?: string | null;
  notes?: string | null;
  /** @format int32 */
  bloodPressureSystolic?: number | null;
  /** @format int32 */
  bloodPressureDiastolic?: number | null;
  /** @format int32 */
  heartRate?: number | null;
  /** @format double */
  temperature?: number | null;
  /** @format double */
  weight?: number | null;
  /** @format double */
  height?: number | null;
  /** @format double */
  bmi?: number | null;
  /** @format double */
  bloodSugar?: number | null;
  /** @format double */
  oxygenSaturation?: number | null;
  /** @format int32 */
  respiratoryRate?: number | null;
  /** @format date-time */
  followUpDate?: string | null;
}

export interface UploadPartnerOrderResultRequest {
  /**
   * @minLength 0
   * @maxLength 4000
   */
  resultSummary: string;
  /** @format date-time */
  resultUploadedAt?: string | null;
  /**
   * @format double
   * @min 0
   * @max 1000000000
   */
  finalCost?: number | null;
  /**
   * @minLength 0
   * @maxLength 120
   */
  externalReference?: string | null;
  /**
   * @minLength 0
   * @maxLength 1000
   */
  notes?: string | null;
}

export interface UpsertClinicPaymentMethodRequest {
  /**
   * @minLength 0
   * @maxLength 100
   */
  methodName: string;
  /**
   * @minLength 0
   * @maxLength 120
   */
  providerName?: string | null;
  /**
   * @minLength 0
   * @maxLength 120
   */
  accountName?: string | null;
  /**
   * @minLength 0
   * @maxLength 120
   */
  accountNumber?: string | null;
  /**
   * @minLength 0
   * @maxLength 120
   */
  iban?: string | null;
  /**
   * @minLength 0
   * @maxLength 80
   */
  walletNumber?: string | null;
  /**
   * @minLength 0
   * @maxLength 1500
   */
  instructions?: string | null;
  isActive?: boolean;
  /** @format int32 */
  displayOrder?: number;
}

export interface UpsertDoctorClinicServiceLinkRequest {
  /** @format double */
  overridePrice?: number | null;
  /** @format int32 */
  overrideDurationMinutes?: number | null;
  isActive?: boolean;
}

export interface UpsertPatientChronicProfileRequest {
  diabetes?: boolean;
  hypertension?: boolean;
  cardiacDisease?: boolean;
  asthma?: boolean;
  other?: boolean;
  /**
   * @minLength 0
   * @maxLength 1000
   */
  otherNotes?: string | null;
}

export interface UserInfoDto {
  /** @format uuid */
  id?: string;
  username?: string | null;
  displayName?: string | null;
  role?: string | null;
  /** @format uuid */
  tenantId?: string | null;
  tenantSlug?: string | null;
  permissions?: string[] | null;
}

export interface UserInfoDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: UserInfoDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface VisitDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  branchId?: string | null;
  visitType?: VisitType;
  source?: VisitSource;
  /** @format uuid */
  queueTicketId?: string | null;
  /** @format uuid */
  doctorId?: string;
  doctorName?: string | null;
  /** @format uuid */
  patientId?: string;
  patientName?: string | null;
  patientPhone?: string | null;
  /** @format date-time */
  patientDateOfBirth?: string | null;
  patientGender?: string | null;
  serviceName?: string | null;
  ticketStatus?: TicketStatus;
  /** @format date-time */
  ticketCancelledAt?: string | null;
  isCancelled?: boolean;
  effectiveStatus?: string | null;
  phone?: string | null;
  /** @format date-time */
  dateOfBirth?: string | null;
  gender?: string | null;
  status?: VisitStatus;
  lifecycleState?: EncounterLifecycleState;
  financialState?: EncounterFinancialState;
  complaint?: string | null;
  diagnosis?: string | null;
  notes?: string | null;
  /** @format int32 */
  bloodPressureSystolic?: number | null;
  /** @format int32 */
  bloodPressureDiastolic?: number | null;
  /** @format int32 */
  heartRate?: number | null;
  /** @format double */
  temperature?: number | null;
  /** @format double */
  weight?: number | null;
  /** @format double */
  height?: number | null;
  /** @format double */
  bmi?: number | null;
  /** @format double */
  bloodSugar?: number | null;
  /** @format double */
  oxygenSaturation?: number | null;
  /** @format int32 */
  respiratoryRate?: number | null;
  /** @format date-time */
  followUpDate?: string | null;
  /** @format date-time */
  startedAt?: string;
  /** @format date-time */
  completedAt?: string | null;
  /** @format date-time */
  medicallyCompletedAt?: string | null;
  /** @format date-time */
  financiallySettledAt?: string | null;
  /** @format date-time */
  fullyClosedAt?: string | null;
  prescriptions?: PrescriptionDto[] | null;
  labRequests?: LabRequestDto[] | null;
  invoice?: InvoiceDto;
  chronicProfile?: PatientChronicProfileDto;
  /** @format date-time */
  createdAt?: string;
}

export interface VisitDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: VisitDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface VisitDtoPagedResult {
  items?: VisitDto[] | null;
  /** @format int32 */
  totalCount?: number;
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  totalPages?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}

export interface VisitDtoPagedResultApiResponse {
  success?: boolean;
  message?: string | null;
  data?: VisitDtoPagedResult;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface VisitInventoryUsageDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  inventoryItemId?: string;
  inventoryItemName?: string | null;
  /** @format uuid */
  doctorId?: string;
  /** @format uuid */
  patientId?: string;
  /** @format uuid */
  visitId?: string;
  /** @format double */
  quantity?: number;
  /** @format double */
  billedAmount?: number;
  /** @format date-time */
  usedAt?: string;
  /** @format uuid */
  branchId?: string;
  /** @format uuid */
  invoiceId?: string | null;
  billedToInvoice?: boolean;
  notes?: string | null;
}

export interface VisitInventoryUsageDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: VisitInventoryUsageDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}

export interface VisitSummaryDto {
  /** @format uuid */
  id?: string;
  doctorName?: string | null;
  complaint?: string | null;
  diagnosis?: string | null;
  /** @format date-time */
  startedAt?: string;
  /** @format date-time */
  completedAt?: string | null;
}

export interface WorkingHourDto {
  /** @format uuid */
  id?: string;
  dayOfWeek?: DayOfWeek;
  startTime?: string | null;
  endTime?: string | null;
  isActive?: boolean;
}

export interface WorkingHourRequest {
  dayOfWeek?: DayOfWeek;
  /** @minLength 1 */
  startTime: string;
  /** @minLength 1 */
  endTime: string;
  isActive?: boolean;
}

export interface YearlyRevenueDto {
  /** @format int32 */
  year?: number;
  /** @format double */
  totalRevenue?: number;
  /** @format double */
  totalPaid?: number;
  /** @format double */
  totalExpenses?: number;
  /** @format double */
  salaryExpenses?: number;
  /** @format double */
  nonSalaryExpenses?: number;
  /** @format double */
  netProfit?: number;
  /** @format int32 */
  invoiceCount?: number;
  months?: MonthlyRevenueDto[] | null;
}

export interface YearlyRevenueDtoApiResponse {
  success?: boolean;
  message?: string | null;
  data?: YearlyRevenueDto;
  errors?: any[] | null;
  meta?: ApiResponseMeta;
}
