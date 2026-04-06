# Elite Clinic — Frontend Handoff (Updated Backend Delta)

Purpose: one file that separates **new endpoints**, **changed behavior**, **new fields**, **what to update in UI**, and **what is still deferred**.

---

## 1) Read This First

This file is **not a full product spec from zero**. It is a **delta handoff** for the frontend based on the backend work already implemented across the recent passes.

It is split into:
- **Global app changes**
- **New endpoints**
- **Updated existing endpoints / changed behavior**
- **DTO / response changes**
- **What frontend must do**
- **What is not finished yet / do not build assumptions on**

### Status labels used in this file
- **NEW** = endpoint or contract was added
- **UPDATED** = route existed before, but behavior or returned fields changed
- **UNCHANGED** = included only because frontend must use it with the new flow
- **DEFERRED** = backend not finalized yet, do not assume production-ready behavior

### Very important backend rules now
1. **Tenant isolation is strict**. Clinic-scoped requests must use `X-Tenant`.
2. **Token tenant must match the selected tenant**. Cross-clinic access is rejected.
3. **Patient-app profile flows should prefer profile/patient ID based APIs**, not `my/*`, when the selected profile matters.
4. **Money actions are non-destructive**. Refund/reverse/adjustment semantics are audit-style, not silent deletes.
5. **Urgent behavior is no longer “always push to front”**. It is controlled by doctor settings.

---

## 2) Global Frontend Requirements

### 2.1 Authentication / tenant handling
**UPDATED**

#### A. `POST /api/auth/patient/login`
Behavior:
- If the authenticated account is not a patient role, backend returns `403`.
- Message: `Only patient users can authenticate using patient login`

Frontend must:
- Treat `403` differently from `401`.
- Show a role-specific message such as: “Use staff login instead”.

#### B. `GET /api/auth/me`
Behavior:
- Non-super-admin users must provide `X-Tenant`.
- Missing tenant header returns `400`.

Frontend must:
- Always attach `X-Tenant` for tenant-scoped sessions.
- Never assume `me` is enough without tenant context.

#### C. Login token / login response
**UPDATED**

Behavior:
- Login response includes tenant slug.
- JWT also includes tenant slug.

Frontend must:
- Continue using `X-Tenant` as the active routing/context key.
- Do not attempt to switch tenant arbitrarily on the client; current token is clinic-bound.

#### D. Rate limiting
**UPDATED**

Applies at least to:
- `/api/auth/login`
- `/api/auth/patient/login`
- `/api/auth/refresh`
- some public APIs

Frontend must:
- Handle `429 Too Many Requests`
- Show retry/backoff messaging

---

## 3) Doctor Object / Services Loading

## 3.1 Doctor payload now carries effective services
**UPDATED**

Problem solved by backend:
- Frontend should no longer need doctor-list request + N requests per doctor to get services.

What changed:
- Doctor list / detail payloads were adjusted so the doctor object includes the effective services directly.
- Backend bridges clinic-level shared services + doctor-specific enablement logic into the doctor payload.

Applies to:
- doctor list endpoints
- doctor detail endpoints
- relevant public doctor payloads

Frontend must:
- Stop doing per-doctor follow-up service fetches when listing doctors.
- Read services directly from doctor object where available.
- Keep clinic services and doctor services visually separated in UI language when needed.

### Expected UI impact
Use the doctor object to show:
- doctor profile data
- doctor enabled clinic services
- service pricing/duration if exposed

### Naming note
- No confirmed route rename was introduced here.
- The main change is **payload shape / embedding**, not necessarily route name.

---

## 4) Patient App — Profile-Based APIs

This is one of the most important changes.

## 4.1 Why this changed
Previously, patient-facing flows relying on `my/*` were not enough because one account can represent:
- father
- mother
- child
- dependent profile

Backend direction now:
- selected patient/profile ID drives the view
- backend validates that the selected profile belongs to the authenticated patient hierarchy

## 4.2 New patient-app API direction
**NEW / UPDATED**

### New controller surface
- Patient-app endpoints were added under a profile-based approach through a dedicated patient app flow.
- Existing `my/*` assumptions should not be the primary frontend design anymore when selected profile matters.

### Patient-app use cases now expected from backend
Frontend should use profile/patient-ID based flows for:
- patient profile details
- patient visit history
- prescriptions
- credits
- invoices
- active queue / ticket state
- uploaded documents
- chronic conditions

### Security behavior
Backend validates:
- token belongs to a patient account
- requested profile belongs to that account hierarchy
- same-tenant access only

Frontend must:
- always send the selected profile/patient ID in patient-app screens
- not rely on “current user = one patient record” assumption
- store selected profile in app state and drive requests from it

### Existing frontend assumption to remove
Do not build the patient app around:
- `my-ticket`
- `my-visits`
- `my-prescriptions`

unless the screen truly means “current default patient only”.

---

## 5) Queue / Ticket / Operational Status

## 5.1 Rich queue status for patient
**UPDATED**

The patient queue status response now includes richer operational data.

### Added/expected fields
- `myQueueNumber`
- `currentServingNumber`
- `patientsAheadCount`
- `estimatedWaitMinutes`
- `estimatedWaitText`
- in some cases `urgentPolicyApplied`

### Meaning
- `myQueueNumber`: my ticket number
- `currentServingNumber`: who is currently inside / currently being served
- `patientsAheadCount`: how many patients remain before me
- `estimatedWaitMinutes`: estimated time remaining
- `estimatedWaitText`: human-readable estimate for UI

### Estimation source
Backend uses doctor settings such as average visit duration.

Frontend must:
- update patient waiting screen to use these fields directly
- display both my number and current serving number
- display estimated wait text instead of trying to recompute locally

## 5.2 Queue notes to complaint
**UPDATED**

Behavior:
- Receptionist notes captured on queue/ticket are copied into visit complaint as the default complaint when the visit starts.

Frontend must:
- receptionist UI should still send queue/ticket notes normally
- doctor UI can now expect complaint to be prefilled from reception notes in many cases
- do not assume blank complaint when starting visit

---

## 6) Urgent Policy

## 6.1 New backend rule
**UPDATED**

Urgent handling is now controlled by doctor settings, not just by `isUrgent = true`.

### Doctor-side settings behavior
- `UrgentEnabled` controls whether urgent tickets are allowed at all
- `UrgentInsertAfterCount` controls insertion rule
- supported values: `0`, `1`, `2`, `3`

Meaning:
- `0` = after current patient
- `1` / `2` / `3` = after N eligible waiting patients

### What changed for frontend
#### When urgent is disabled
If a ticket is issued with `isUrgent = true` and the doctor does not allow urgent mode:
- backend rejects request clearly

Frontend must:
- show a proper validation error
- not assume urgent will always succeed

#### When urgent is enabled
Urgent ticket is inserted deterministically, not blindly to absolute front.

Frontend must:
- stop using “urgent = immediately first” assumption
- re-read queue ordering from backend after issuance
- use returned board/ticket status instead of client-side manual reorder assumptions

---

## 7) Visit / Encounter State

## 7.1 VisitType and encounter state fields
**UPDATED**

Backend introduced/extended encounter state concepts.

### Added/important fields in visit/encounter DTOs
- `visitType`
- `lifecycleState`
- `financialState`
- `medicallyCompletedAt`
- `financiallySettledAt`
- `fullyClosedAt`
- `pendingSettlementAmount` (where exposed)

### VisitType
Supported values now include:
- `Exam`
- `Consultation`

Frontend must:
- treat consultations as distinct in filters/views
- split relevant screens into exam vs consultation where needed
- not assume every visit is one generic exam

### Closure rule
Backend now enforces:
- fully closed requires medical completion + financial settlement
- pending settlement blocks full closure

Frontend must:
- show pending settlement state when present
- avoid showing “visit fully done” if there is outstanding settlement

---

## 8) Invoices / Line Items / Extra Charges / Pending Settlement

## 8.1 Same-invoice extra charges
**NEW / UPDATED**

Backend now supports adding extra clinic services/items as line items on the **same invoice**.

### New endpoint
**NEW**
- `POST /api/clinic/invoices/{id}/line-items`

### Purpose
Doctor can add extra clinic services during encounter and they become auditable line items on the same invoice.

### Frontend must do
When doctor adds extra clinic services:
1. create/add line item to the invoice through backend flow
2. show receptionist that the encounter now has pending settlement
3. prevent normal “fully finished” UX until pending amount is resolved

## 8.2 Invoice DTO changes
**UPDATED**

Invoice payload can now include fields like:
- line items
- pending settlement related fields
- adjusted totals
- refunded totals
- remaining amount updates

Frontend must:
- update invoice detail view to render line items
- show additional charges explicitly
- show updated remaining amount after extra services are added

## 8.3 Existing adjustment/refund behavior
**UPDATED**

Backend already supports:
- adjustment flow
- refund flow

Now the system direction is clearer:
- no silent deletion of money records
- all meaningful money actions should remain auditable

Frontend must:
- stop thinking of “remove money” as delete
- treat refund / adjustment / reverse / credit as separate business operations

---

## 9) Credits / No-Show / Financial Meaning

## 9.1 Credits
**UPDATED**

Patient credit APIs exist and are part of the frontend financial picture now.

### Read APIs
- `GET /api/clinic/patient-credits/{patientId}/balance`
- `GET /api/clinic/patient-credits/{patientId}/history`

Frontend must:
- show patient credit balance in profile/finance views
- show credit history timeline if the UX has a finance tab

## 9.2 No-show paid logic
**PARTIALLY PRODUCTIZED / BACKEND DIRECTION SET**

Direction now:
- paid no-show should be handled as retained value / credit, not silent loss or silent deletion
- patient may keep right to future service / retained monetary value depending on business flow

Frontend must:
- expect no-show related financial records/credit semantics
- not assume every paid ticket ends as “used” or “refunded” only

Note:
- full final finance-state coverage across every edge case is still not completely finished everywhere
- treat some advanced no-show handling as **in progress** unless explicitly confirmed endpoint-by-endpoint

---

## 10) Public Clinic Profile / Landing

## 10.1 Rich public clinic payload
**UPDATED**

Public clinic payload is expected to include richer landing data:
- clinic image / logo
- clinic description
- social links
- active-now doctors
- clinic services where relevant

### Image / landing media
**NEW / UPDATED**

Owner-controlled upload exists for clinic image.

#### New endpoint
- `POST /api/clinic/media/clinic-image`

Role:
- owner-controlled flow (clinic owner / privileged role)

Behavior:
- multipart/form-data upload
- backend stores image and updates clinic settings image URL
- public profile returns the image URL

Frontend must:
- add clinic landing image upload in owner dashboard
- refresh settings/public preview after successful upload

## 10.2 Public available-now doctors
**UPDATED**

Immediate-booking/public flows should only show doctors with active session/shift now.

Frontend must:
- use available-now endpoints for immediate booking screens
- stop showing offline/non-active doctors in “book now” style flows

## 10.3 Location fields
**PARTIALLY/NEWLY INTRODUCED DIRECTION**

Backend direction includes support for:
- `address`
- `latitude`
- `longitude`
- `mapUrl`

Frontend must:
- prepare landing/settings UI to support structured location, not only raw address text

Important note:
- if a specific endpoint still returns old text-only address in some environments, treat structured location as a new contract to adopt gradually.

---

## 11) Patient Medical Documents

This is a major **NEW** area from the latest slice.

## 11.1 Supported document categories
- `Lab`
- `Radiology`
- `OtherMedicalDocument`

## 11.2 Allowed file types
- PDF
- JPG / JPEG
- PNG
- WEBP

## 11.3 Max size
- 10 MB

## 11.4 New endpoints
**NEW**
- `POST /api/clinic/patients/{patientId}/medical-documents`
- `GET /api/clinic/patients/{patientId}/medical-documents`
- `GET /api/clinic/patients/{patientId}/medical-documents/{documentId}`

### Behavior
- patient hierarchy ownership is enforced for patient role
- clinic staff / doctor in same tenant can access per allowed rules
- tenant isolation remains enforced

### Frontend must do
#### Patient app
- add upload screen / upload button for profile documents
- allow category selection
- validate size and type client-side before upload when possible
- list uploaded medical documents by selected profile ID

#### Doctor / clinic side
- show patient uploaded documents in patient/visit context
- show category and notes
- allow retrieval/viewing when authorized

### Request notes
Upload is expected as multipart/form-data with at least:
- file
- category
- optional notes

Do not hardcode category labels differently than backend enum names unless you map them carefully.

---

## 12) Structured Chronic Conditions

## 12.1 New chronic profile APIs
**NEW**
- `GET /api/clinic/patients/{patientId}/chronic-conditions`
- `PUT /api/clinic/patients/{patientId}/chronic-conditions`

## 12.2 Supported fields
- `diabetes`
- `hypertension`
- `cardiacDisease`
- `asthma`
- `other`
- `otherNotes`

### Frontend must do
#### Patient / clinic edit forms
- render structured toggles / checkboxes
- render free-text note for “Other”

#### Doctor view
- display chronic conditions in encounter context
- show them as quick health flags for decision support

### Visit DTO impact
Visit / encounter context now may include chronic profile data.

Frontend must:
- update doctor visit page to display chronic profile if present
- not assume doctor needs separate call for every chronic flag if visit DTO already includes it

---

## 13) Workforce / Compensation / Attendance / Salary Payout / Daily Closing

This is a major **NEW** block from the latest slice.

## 13.1 Compensation rules
**NEW**

### Endpoints
- `POST /api/clinic/workforce/doctors/{doctorId}/compensation-rules`
- `GET /api/clinic/workforce/doctors/{doctorId}/compensation-rules`

### Supported compensation modes
- `Salary`
- `Percentage`
- `FixedPerVisit`

### Frontend must do
- add doctor compensation configuration in owner/manager admin UI
- allow effective date entry
- display historical/active rules

## 13.2 Attendance
**NEW**

### Endpoints
- `POST /api/clinic/workforce/attendance`
- `PUT /api/clinic/workforce/attendance/{attendanceId}/checkout`
- `GET /api/clinic/workforce/attendance`

### Behavior
Attendance records support doctor/employee workflows and timing indicators such as:
- check-in
- check-out
- late minutes
- overtime minutes

### Frontend must do
- add attendance action buttons
- add attendance listing/filter screen
- support employee-with-account and employee-without-account workflows

## 13.3 Salary payout
**NEW**

### Endpoint
- `POST /api/clinic/workforce/salary-payouts`

### Behavior
- creates an expense entry
- auditable salary payout flow

Frontend must:
- add owner/manager salary payout action
- show resulting expense in expense/reporting UI
- do not treat salary payout as a pure HR note; it is a finance expense event

## 13.4 Daily closing snapshot
**NEW**

### Endpoints
- `POST /api/clinic/workforce/daily-closing/generate`
- `GET /api/clinic/workforce/daily-closing`

### Purpose
Generate and retrieve daily snapshot/report containing operational and financial summary.

Frontend must:
- add daily-closing generation screen or action
- add daily-closing report listing/view
- treat it as an auditable snapshot, not a hard close/lock in v1

---

## 14) Reporting Enrichment

**UPDATED / PARTIAL**

Backend direction now includes more reporting depth, especially around:
- doctor commission/percentage style visibility
- salary-related grouping through expenses
- better end-of-day reporting support

Frontend must:
- prepare finance/reports area for more grouped breakdowns
- support filters by expense name/category where available
- separate visit revenue vs service revenue where DTOs expose that distinction

Important:
- reporting is improved, but not every desired accounting/dashboard dimension is fully finished yet
- build against what is returned, do not invent hidden accounting rules on the frontend

---

## 15) Ghost / Open Visits Handling

**UPDATED / PARTIAL**

Backend added safe handling for stale / ghost open visits.

Frontend impact:
- admin/support screens can later surface stale open visits if those endpoints are exposed in your branch/build
- do not assume every old open visit is reachable through standard doctor queue views

This is mainly operational/admin support behavior, not a patient-facing primary flow.

---

## 16) Booking Clarification

**UPDATED / PARTIAL**

Booking remains in the system, but backend direction is:
- active-now booking should help operational queue flow
- future booking should have clearer meaning than before
- do not treat booking as an exact duplicate of walk-in queue

Frontend must:
- distinguish clearly between:
  - walk-in ticket
  - online booking
  - consultation / consultation-like flow if exposed via `visitType`

Note:
- booking business semantics are improved but still not the most finalized module compared with queue/invoice/patient credentials.

---

## 17) WhatsApp / Messaging

## 17.1 What already exists
**UPDATED / PARTIAL**

Backend already has messaging foundation and provider integration direction.
Mandatory scenario direction includes:
- `PatientAccountCreated`
- `QueueTicketIssued`
- `QueueTurnReady`
- `CreditIssued`

### Frontend impact
In admin/ops UI, where message logs/status are shown, be ready to render richer states such as:
- pending / sending / retrying / failed / delivered
- provider status fields where exposed

## 17.2 Credentials send button
**UPDATED**

Frontend must provide a visible action to send patient credentials to WhatsApp again.
This should remain accessible from patient management/reception flows.

---

## 18) Exact New / Updated Endpoint Index

## 18.1 New endpoints added in the recent slices

### Medical / chronic
- `POST /api/clinic/patients/{patientId}/medical-documents`
- `GET /api/clinic/patients/{patientId}/medical-documents`
- `GET /api/clinic/patients/{patientId}/medical-documents/{documentId}`
- `GET /api/clinic/patients/{patientId}/chronic-conditions`
- `PUT /api/clinic/patients/{patientId}/chronic-conditions`

### Workforce
- `POST /api/clinic/workforce/doctors/{doctorId}/compensation-rules`
- `GET /api/clinic/workforce/doctors/{doctorId}/compensation-rules`
- `POST /api/clinic/workforce/attendance`
- `PUT /api/clinic/workforce/attendance/{attendanceId}/checkout`
- `GET /api/clinic/workforce/attendance`
- `POST /api/clinic/workforce/salary-payouts`
- `POST /api/clinic/workforce/daily-closing/generate`
- `GET /api/clinic/workforce/daily-closing`

### Invoice line items
- `POST /api/clinic/invoices/{id}/line-items`

### Clinic image upload
- `POST /api/clinic/media/clinic-image`

### Earlier patient-credit/public-doctor additions that frontend still needs
- `GET /api/clinic/patient-credits/{patientId}/balance`
- `GET /api/clinic/patient-credits/{patientId}/history`
- `GET /api/public/{slug}/doctors/available-now`

## 18.2 Existing endpoints with changed behavior
- `POST /api/auth/patient/login`
- `GET /api/auth/me`
- doctor list/detail/public doctor payloads (services embedded)
- patient app flows (selected profile ID pattern)
- queue/ticket status payloads
- invoice/detail payloads
- public clinic payload

---

## 19) Response / DTO Changes Frontend Must Adopt

## 19.1 Doctor DTO
**UPDATED**

Added/important:
- effective services embedded in doctor object
- urgent policy related fields may now matter in admin/queue flows

Frontend action:
- use doctor.services-like embedded payload where returned
- stop N+1 fetch pattern

## 19.2 Queue DTO
**UPDATED**

Added/important:
- `myQueueNumber`
- `currentServingNumber`
- `patientsAheadCount`
- `estimatedWaitMinutes`
- `estimatedWaitText`
- possibly `urgentPolicyApplied`

Frontend action:
- update waiting UI and queue ticket cards

## 19.3 Visit DTO
**UPDATED**

Added/important:
- `visitType`
- lifecycle / financial state fields
- chronic profile in encounter context
- complaint may already include receptionist note default

Frontend action:
- split consultation vs exam views/filters
- show chronic conditions if present

## 19.4 Invoice DTO
**UPDATED**

Added/important:
- line items
- pending settlement information
- adjusted/refunded totals where exposed

Frontend action:
- update invoice details and checkout screen
- show outstanding extras distinctly

## 19.5 Patient medical DTOs
**NEW**

Frontend action:
- render document list per patient/profile
- render chronic condition edit/display sections

## 19.6 Workforce DTOs
**NEW**

Frontend action:
- render compensation rules list/create form
- render attendance create/check-out/list
- render daily-closing snapshot list/detail

---

## 20) What Frontend Must Change Screen-by-Screen

## 20.1 Login / auth screens
- add proper `403` handling for patient login misuse
- make sure tenant header is always attached
- handle `429`

## 20.2 Doctor list / doctor cards / doctor picker
- stop fetching services one doctor at a time
- read services from doctor payload
- in public immediate-booking flow, use only active-now doctors

## 20.3 Patient management / receptionist patient creation
- show generated username/password after create
- add “send credentials to WhatsApp” action
- show clinic-bound account info only for that tenant

## 20.4 Patient app profile selector
- selected profile/patient ID must drive requests
- every tab should switch using selected profile ID

## 20.5 Patient app tabs
### Profile
- use patient/profile details endpoint by selected ID

### Visits / consultations
- render filtered or split visit history using `visitType`

### Prescriptions
- load by selected profile ID

### Queue/ticket status
- use rich queue status fields

### Credits
- add current balance + history

### Invoices
- show invoices/payments by selected profile ID

### Medical documents
- add upload/list/download

### Chronic conditions
- add structured condition display/edit where applicable

## 20.6 Doctor visit/encounter page
- show patient age and encounter context as returned
- show chronic conditions if present
- show patient uploaded documents if provided separately or via linked views
- do not assume complaint is empty on start

## 20.7 Reception / queue board
- after urgent issuance, do not locally force ticket to top
- refresh ordering from backend
- show pending settlement when doctor adds extra services

## 20.8 Invoice / checkout / finance screens
- render line items and extra charges
- render remaining amount after additional services
- support refund/adjustment semantics as real business actions

## 20.9 Owner/admin clinic profile settings
- add clinic image upload
- add description fields
- add social links editor
- prepare location editor for address + lat/lng + map URL

## 20.10 Workforce screens
- compensation setup for doctors
- attendance action buttons
- salary payout action
- daily closing generation + viewing

---

## 21) Explicit Renames / Name Changes

### Confirmed route renames
At this stage, there is **no strongly confirmed evidence of a major public route rename** in the recent slices.

### What changed instead
Most recent work changed:
- payload structure
- business behavior
- added endpoints
- state fields

So frontend should assume:
- many routes are the same
- but contracts and expected behavior changed

If a screen is already wired, re-check payload assumptions before reusing old UI logic.

---

## 22) What Is Still Deferred / Not Safe To Assume Fully Complete

Do **not** build final frontend assumptions yet for these areas without another confirmation pass:

1. **Full booking product semantics**
- booking exists and is improved, but the full “online exam vs consultation vs walk-in” product split is not completely finalized everywhere.

2. **Full finance semantics across every edge case**
- strong foundation exists, but some advanced cases are still being hardened.

3. **Full WhatsApp reminder phase 2**
- medication reminders / consultation reminders are not the same maturity level as the core mandatory scenario foundation.

4. **Advanced reporting dimensions**
- reporting is richer than before, but not every requested accounting/product view is fully done.

5. **All runtime HTTP smoke validation for latest slice**
- latest slice validation used build/tests and focused service-level tests because direct REST calls were blocked in that environment.

Frontend recommendation:
- implement what is explicitly listed as new/updated
- keep optional toggles or soft rollout for less mature modules

---

## 23) Safe Integration Order For Frontend

Recommended order:
1. auth + tenant header + login handling
2. doctor payload service embedding
3. patient profile selector and profile-id API usage
4. queue status screen changes
5. invoice/checkout line items + pending settlement
6. clinic image/public profile changes
7. patient documents + chronic conditions
8. workforce screens
9. advanced reports and deferred flows

---

## 24) One Prompt You Can Paste Into the IDE If You Need More Backend Clarification

Use this exact prompt inside the IDE if you want the code assistant to inspect the backend and answer with code-grounded details before frontend implementation:

```text
Read the current Elite Clinic backend codebase and answer only from the actual implemented code.
I am the frontend developer and I need a strict integration answer.

Please give me, in one response:
1. exact controller routes related to [PUT YOUR SCREEN HERE]
2. request DTOs and required fields
3. response DTOs and newly added fields
4. authorization/roles/tenant requirements
5. whether this endpoint is NEW or UPDATED
6. whether any old frontend assumption is now invalid
7. one minimal request/response example per endpoint
8. any enum values I must handle in UI

Do not explain the whole project.
Answer only with the concrete code-grounded integration contract for that area.
```

Examples for `[PUT YOUR SCREEN HERE]`:
- patient medical documents
- queue ticket status
- invoices and pending settlement
- workforce attendance and salary payout
- public clinic profile and clinic image

---

## 25) Final Short Summary For Frontend Team

### Biggest frontend changes right now
- doctor payload now contains effective services
- patient app must be profile-ID driven
- queue status is richer and urgent logic changed
- visits now carry more lifecycle/financial meaning
- invoices support same-invoice extra line items and pending settlement
- public clinic profile is richer and includes owner-uploaded image flow
- new patient medical document APIs exist
- new chronic condition APIs exist
- new workforce APIs exist for compensation, attendance, salary payout, daily closing

### Biggest old assumptions to remove
- “my/* is enough for patient app”
- “urgent always goes first”
- “doctor services require separate request per doctor”
- “money removal = delete”
- “visit is always one generic exam with no encounter state”
