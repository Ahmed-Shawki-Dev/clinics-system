'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ILabRequest, IPrescription, IVisit } from '@/types/visit'
import { Printer, Save } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { IPatientSummary } from '../../../../../../actions/patient/get-patient-summary'
import { completeVisitAction } from '../../../../../../actions/visit/complete-visit'
import { IDoctor } from '../../../../../../types/doctor'
import { ClinicalTab } from './clinical-tab'
import { HistoryTab } from './history-tab'
import { LabsTab } from './lab-tab'
import { PrescriptionTab } from './prescription-tab'

// إضافات الروشتة الجديدة
import { useTenantStore } from '@/store/useTenantStore'
import Image from 'next/image'

export function VisitTerminalClient({
  visit,
  tenantSlug,
  defaultTab,
  doctor,
  summary,
}: {
  visit: IVisit
  tenantSlug: string
  defaultTab: string
  doctor?: IDoctor
  summary: IPatientSummary | null
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [isCompleting, setIsCompleting] = useState(false)

  // سحب بيانات العيادة (اللوجو والاسم)
  const tenantConfig = useTenantStore((state) => state.config)

  const handleCompleteVisit = async () => {
    setIsCompleting(true)
    const res = await completeVisitAction(tenantSlug, visit.id)
    setIsCompleting(false)

    if (res.success) {
      toast.success('تم إنهاء الزيارة بنجاح')
      router.push(`/${tenantSlug}/dashboard/doctor/queue`)
    } else {
      toast.error(res.message || 'حدث خطأ أثناء إنهاء الزيارة')
    }
  }

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', value)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className='flex flex-col gap-4 relative w-full'>
      {/* ========================================= */}
      {/* ستايل الطباعة - تكرار الهيدر والفوتر على كل صفحة */}
      {/* ========================================= */}
      <style type='text/css' media='print'>
        {`
          @page {
            /* Standard prescription pad size */
            size: 148mm 210mm;
            margin: 7mm 8mm 8mm 8mm;
          }

          html,
          body {
            background: #fff !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          /* Hide everything in the app while printing */
          body * {
            visibility: hidden !important;
          }

          /* Show only prescription area */
          #visit-print-area,
          #visit-print-area * {
            visibility: visible !important;
          }

          #visit-print-area {
            position: static !important;
            width: 100% !important;
            height: auto !important;
            overflow: visible !important;
            background: white !important;
            color: black !important;
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif !important;
            font-size: 10.5pt !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Table trick for repeating header/footer */
          #visit-print-area table.print-layout {
            width: 100% !important;
            border-collapse: collapse !important;
            table-layout: fixed !important;
          }
          #visit-print-area > table.print-layout > thead {
            display: table-header-group !important;
          }
          #visit-print-area > table.print-layout > tfoot {
            display: table-footer-group !important;
          }
          #visit-print-area > table.print-layout > tbody {
            display: table-row-group !important;
          }

          #visit-print-area > table.print-layout > thead td,
          #visit-print-area > table.print-layout > tfoot td,
          #visit-print-area > table.print-layout > tbody td {
            padding: 0 !important;
            border: none !important;
          }

          /* Medications table */
          #visit-print-area .rx-table {
            width: 100% !important;
            border-collapse: collapse !important;
          }
          #visit-print-area .rx-table th {
            background-color: #f3f4f6 !important;
            font-size: 8.2pt !important;
            padding: 4px 6px !important;
            border-bottom: 1.5px solid #333 !important;
            text-align: right !important;
            font-weight: 700 !important;
          }
          #visit-print-area .rx-table td {
            padding: 12px 6px !important;
            border-bottom: 0.5px solid #ddd !important;
            font-size: 9.2pt !important;
            vertical-align: top !important;
            word-break: break-word !important;
            white-space: normal !important;
          }
          #visit-print-area .rx-table tr:last-child td {
            border-bottom: 1px solid #999 !important;
          }
          #visit-print-area .rx-table .med-name {
            font-weight: 700 !important;
            font-size: 9.8pt !important;
          }
          #visit-print-area .rx-table .med-note {
            font-size: 8pt !important;
            color: #333 !important;
            font-style: normal !important;
            font-weight: 500 !important;
          }

          /* Labs grid */
          #visit-print-area .labs-grid {
            display: grid !important;
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 12px !important;
          }
          #visit-print-area .lab-item {
            font-size: 8.5pt !important;
            padding: 0px 5px !important;
            border: 1px solid #e5e7eb !important;
            border-radius: 6px !important;
          }

          /* Page break control */
          #visit-print-area .rx-table tr {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }

          #visit-print-area .labs-grid,
          #visit-print-area .lab-item {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }

          /* Best effort: avoid auto-printed URL text on links in engines that support it */
          a[href]:after,
          abbr[title]:after {
            content: '' !important;
          }
        `}
      </style>

      {/* ========================================= */}
      {/* واجهة المستخدم (تختفي وقت الطباعة) */}
      {/* ========================================= */}
      <div className='print:hidden flex flex-col gap-4'>
        {/* Header الزيارة */}
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card p-4 rounded-xl border shadow-sm'>
          <div className='flex items-center gap-4 w-full sm:w-auto'>
            <div className='space-y-1.5'>
              <h2 className='text-xl font-bold leading-none text-right'>{visit.patientName}</h2>
              <div className='flex flex-wrap gap-2 pt-1 justify-start'>
                <Badge variant='outline' className='whitespace-nowrap'>
                  زيارة كشف
                </Badge>
                <Badge
                  variant={visit.status === 'Open' ? 'default' : 'secondary'}
                  className='whitespace-nowrap'
                >
                  {visit.status === 'Open' ? 'حالة مفتوحة' : 'مكتملة'}
                </Badge>
              </div>
            </div>
          </div>

          <div className='flex w-full sm:w-auto gap-2 mt-2 sm:mt-0'>
            <Button variant='outline' onClick={() => window.print()}>
              <Printer className='w-4 h-4 ml-2' /> طباعة الروشتة
            </Button>

            {!visit.completedAt && (
              <Button onClick={handleCompleteVisit} disabled={isCompleting} variant={'destructive'}>
                <Save className='w-4 h-4 ml-2' />
                {isCompleting ? 'جاري الإنهاء...' : 'إنهاء الزيارة'}
              </Button>
            )}
          </div>
        </div>

        {/* التابات */}
        <Tabs defaultValue={defaultTab} onValueChange={handleTabChange} className='w-full'>
          <TabsList className='flex w-full h-12 overflow-x-auto justify-start sm:justify-center bg-muted/50 p-1 mb-4'>
            <TabsTrigger value='clinical' className='px-4 sm:px-8 text-sm'>
              التشخيص والشكوى
            </TabsTrigger>
            <TabsTrigger value='history' className='px-4 sm:px-8 text-sm'>
              السجل الطبي
            </TabsTrigger>
            <TabsTrigger value='prescription' className='px-4 sm:px-8 text-sm'>
              الروشتة
            </TabsTrigger>
            <TabsTrigger value='labs' className='px-4 sm:px-8 text-sm'>
              التحاليل والأشعة
            </TabsTrigger>
          </TabsList>

          <TabsContent value='clinical' className='focus-visible:outline-none mt-2'>
            <ClinicalTab visit={visit} tenantSlug={tenantSlug} doctor={doctor} />
          </TabsContent>

          <TabsContent value='history' className='focus-visible:outline-none mt-2'>
            <HistoryTab summary={summary} tenantSlug={tenantSlug} currentVisitId={visit.id} />
          </TabsContent>

          <TabsContent value='prescription' className='focus-visible:outline-none mt-2'>
            <PrescriptionTab visit={visit} tenantSlug={tenantSlug} />
          </TabsContent>

          <TabsContent value='labs' className='focus-visible:outline-none mt-2'>
            <LabsTab tenantSlug={tenantSlug} visit={visit} />
          </TabsContent>
        </Tabs>
      </div>

      {/* ========================================= */}
      {/* منطقة الطباعة - روشتة احترافية بهيدر وفوتر متكرر */}
      {/* ========================================= */}
      <div id='visit-print-area' className='hidden print:block' dir='rtl'>
        <table className='print-layout'>
          {/* ── Header يتكرر في كل صفحة ── */}
          <thead>
            <tr>
              <td>
                <div style={{ paddingBottom: '4px' }}>
                  {/* صف العيادة + الطبيب */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      borderBottom: '2px solid #222',
                      paddingBottom: '6px',
                      marginBottom: '4px',
                    }}
                  >
                    {/* العيادة */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {tenantConfig?.logoUrl && (
                        <div
                          style={{
                            width: '40px',
                            height: '40px',
                            position: 'relative',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            border: '1px solid #ccc',
                            flexShrink: 0,
                          }}
                        >
                          <Image
                            src={tenantConfig.logoUrl}
                            alt='Logo'
                            fill
                            className='object-cover'
                          />
                        </div>
                      )}
                      <div>
                        <div style={{ fontSize: '13pt', fontWeight: 800, lineHeight: 1.2 }}>
                          {tenantConfig?.name || tenantSlug.replace(/-/g, ' ')}
                        </div>
                      </div>
                    </div>
                    {/* الطبيب */}
                    <div style={{ textAlign: 'left', fontSize: '9pt' }}>
                      <div style={{ fontSize: '11pt', fontWeight: 700 }}>
                        د. {visit.doctorName || ''}
                      </div>
                      <div style={{ color: '#555' }}>{doctor?.specialty || 'ممارس عام'}</div>
                    </div>
                  </div>

                  {/* صف بيانات المريض */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '16px',
                      fontSize: '8.5pt',
                      padding: '4px 0',
                      borderBottom: '1px solid #ccc',
                      marginBottom: '2px',
                    }}
                  >
                    <div>
                      <span style={{ color: '#888' }}>المريض: </span>
                      <span style={{ fontWeight: 700, fontSize: '9.5pt' }}>
                        {visit.patientName}
                      </span>
                    </div>
                    <div>
                      <span style={{ color: '#888' }}>التاريخ: </span>
                      <span style={{ fontWeight: 600 }}>
                        {new Date(visit.startedAt).toLocaleDateString('ar-EG')}
                      </span>
                    </div>
                    {visit.weight && (
                      <div>
                        <span style={{ color: '#888' }}>الوزن: </span>
                        <span style={{ fontWeight: 600 }}>{visit.weight} كجم</span>
                      </div>
                    )}
                    <div style={{ marginRight: 'auto', textAlign: 'left' }} dir='ltr'>
                      <span style={{ color: '#888' }}>#</span>
                      <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>
                        {visit.id.slice(0, 8).toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </thead>

          {/* ── Footer يتكرر في كل صفحة ── */}
          <tfoot>
            <tr>
              <td>
                <div
                  style={{
                    borderTop: '1.5px solid #222',
                    paddingTop: '4px',
                    marginTop: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    fontSize: '7.5pt',
                    color: '#666',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, color: '#333', fontSize: '8pt' }}>
                      {tenantConfig?.name || tenantSlug.replace(/-/g, ' ')}
                    </div>
                    <div>تمنياتنا بالشفاء العاجل</div>
                  </div>

                  {visit.followUpDate ? (
                    <div
                      style={{
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        padding: '3px 8px',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ fontSize: '6.5pt', color: '#888' }}>المتابعة القادمة</div>
                      <div style={{ fontWeight: 700, fontSize: '9pt', color: '#000' }}>
                        {new Date(visit.followUpDate).toLocaleDateString('ar-EG')}
                      </div>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center' }}>
                      <div
                        style={{
                          width: '100px',
                          borderBottom: '1px solid #999',
                          marginBottom: '2px',
                          height: '20px',
                        }}
                      ></div>
                      <div style={{ fontSize: '7pt' }}>توقيع الطبيب</div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          </tfoot>

          {/* ── المحتوى ── */}
          <tbody>
            <tr>
              <td>
                {/* Rx + الأدوية */}
                {visit.prescriptions && visit.prescriptions.length > 0 && (
                  <div style={{ marginBottom: '8px' }}>
                    <table className='rx-table' dir='ltr'>
                      <thead>
                        <tr>
                          <th style={{ width: '3%', textAlign: 'center' }}>#</th>
                          <th style={{ width: '38%', textAlign: 'left' }}>Medication</th>
                          <th style={{ width: '11%', textAlign: 'center' }}>Dosage</th>
                          <th style={{ width: '18%', textAlign: 'center' }}>Frequency</th>
                          <th style={{ width: '10%', textAlign: 'center' }}>Duration</th>
                          <th style={{ width: '20%', textAlign: 'right' }}>ملاحظات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {visit.prescriptions.map((p: IPrescription, i: number) => (
                          <tr key={p.id}>
                            <td style={{ textAlign: 'center', color: '#999', fontSize: '7.5pt' }}>
                              {i + 1}
                            </td>
                            <td style={{ textAlign: 'left' }}>
                              <span className='med-name'>{p.medicationName}</span>
                            </td>
                            <td style={{ textAlign: 'center' }}>{p.dosage}</td>
                            <td style={{ textAlign: 'center' }}>{p.frequency}</td>
                            <td style={{ textAlign: 'center' }}>{p.duration}</td>
                            <td style={{ textAlign: 'right' }} dir='rtl'>
                              {p.instructions && <span className='med-note'>{p.instructions}</span>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* التحاليل والأشعة */}
                {visit.labRequests && visit.labRequests.length > 0 && (
                  <div
                    style={{
                      marginTop: '6px',
                      paddingTop: '6px',
                      borderTop: visit.prescriptions?.length ? '1px dashed #bbb' : 'none',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '9pt',
                        fontWeight: 700,
                        marginBottom: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-block',
                          width: '3px',
                          height: '12px',
                          background: '#333',
                          borderRadius: '1px',
                        }}
                      ></span>
                      الفحوصات المطلوبة:
                    </div>
                    <div className='labs-grid'>
                      {visit.labRequests.map((req: ILabRequest, index: number) => (
                        <div
                          key={req.id || index}
                          className='lab-item'
                          style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}
                        >
                          <span style={{ color: '#333' }}>●</span>
                          <span style={{ fontWeight: 600 }}>{req.testName}</span>
                          {req.isUrgent && (
                            <span
                              style={{
                                fontSize: '6.5pt',
                                color: '#dc2626',
                                fontWeight: 700,
                                border: '1px solid #dc2626',
                                borderRadius: '2px',
                                padding: '0 3px',
                              }}
                            >
                              عاجل
                            </span>
                          )}
                          {req.notes && (
                            <span style={{ color: '#888', fontSize: '7pt' }}>({req.notes})</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!visit.prescriptions?.length &&
                  (!visit.labRequests || !visit.labRequests.length) && (
                    <div
                      style={{
                        textAlign: 'center',
                        padding: '30px 0',
                        color: '#aaa',
                        fontSize: '10pt',
                      }}
                    >
                      لا توجد طلبات طبية أو أدوية مسجلة لهذه الزيارة.
                    </div>
                  )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
