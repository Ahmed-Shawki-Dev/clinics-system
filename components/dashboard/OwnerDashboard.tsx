import { getDailyFinance } from '@/actions/finance/get-daily-finance'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Banknote, CreditCard, FileText, Wallet } from 'lucide-react'
import { DashboardHeader, DashboardShell } from '../shell'

interface OwnerDashboardProps {
  tenantSlug: string
  displayName: string
}

export default async function OwnerDashboard({ tenantSlug, displayName }: OwnerDashboardProps) {
  const response = await getDailyFinance(tenantSlug)

  if (!response.success || !response.data) {
    return (
      <Alert variant='destructive' className='mt-4'>
        <AlertCircle className='h-4 w-4' />
        <AlertTitle>خطأ</AlertTitle>
        <AlertDescription>
          {response.message || 'حدث خطأ أثناء جلب البيانات المالية.'}
        </AlertDescription>
      </Alert>
    )
  }

  const { totalRevenue, totalPaid, totalUnpaid, invoiceCount, paymentCount } = response.data

  const statCards = [
    {
      title: 'إجمالي الدخل',
      value: `${totalRevenue} ج.م`,
      icon: Banknote,
      iconColor: 'text-muted-foreground',
      valueColor: '',
    },
    {
      title: 'المحصل (الخزنة)',
      value: `${totalPaid} ج.م`,
      icon: Wallet,
      iconColor: 'text-emerald-600',
      valueColor: 'text-emerald-600',
    },
    {
      title: 'المتبقي (آجل)',
      value: `${totalUnpaid} ج.م`,
      icon: AlertCircle,
      iconColor: 'text-rose-600',
      valueColor: 'text-rose-600',
    },
    {
      title: 'عدد الفواتير',
      value: invoiceCount,
      icon: FileText,
      iconColor: 'text-muted-foreground',
      valueColor: '',
    },
    {
      title: 'عمليات الدفع',
      value: paymentCount,
      icon: CreditCard,
      iconColor: 'text-muted-foreground',
      valueColor: '',
    },
  ]

  return (
    <DashboardShell>
      <DashboardHeader heading={`أهلا بك، ${displayName}`} text='الصفحة الرئيسية للإدارة' />

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.iconColor}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${stat.valueColor}`}>{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </DashboardShell>
  )
}
