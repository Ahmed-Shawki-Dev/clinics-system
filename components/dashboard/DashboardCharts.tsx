'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, XAxis, YAxis } from 'recharts'
import { IDoctorProfit, IYearlyFinance } from '../../types/finance'

interface DashboardChartsProps {
  yearlyData: IYearlyFinance
  doctorsData: IDoctorProfit[]
}

// إعدادات Shadcn Charts عشان الألوان تظبط مع الدارك/لايت
const barChartConfig = {
  revenue: { label: 'الإيرادات', color: 'var(--chart-1)' },
  paid: { label: 'المحصل', color: 'var(--chart-2)' },
} satisfies ChartConfig

const pieChartConfig = {
  revenue: { label: 'إجمالي الدخل' },
} satisfies ChartConfig

// أسماء الشهور بالعربي
const arabicMonths = [
  'يناير',
  'فبراير',
  'مارس',
  'أبريل',
  'مايو',
  'يونيو',
  'يوليو',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر',
]

export function DashboardCharts({ yearlyData, doctorsData }: DashboardChartsProps) {
  // 1. تجهيز داتا البار شارت
  const formattedMonthlyData = yearlyData.months.map((m) => ({
    name: arabicMonths[m.month - 1] || m.month.toString(),
    revenue: m.totalRevenue,
    paid: m.totalPaid,
  }))

  // 2. تجهيز داتا الباي شارت وإعطاء لون من ثيم Shadcn لكل دكتور
  const formattedDoctorsData = doctorsData.map((doc, index) => ({
    name: doc.doctorName,
    revenue: doc.totalRevenue,
    fill: `var(--chart-${(index % 5) + 1})`, // بيلف على الـ 5 ألوان بتوع Shadcn
  }))

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4'>
      {/* رسمة الإيرادات الشهرية */}
      <Card className='col-span-1 lg:col-span-4 shadow-sm border-border/50'>
        <CardHeader>
          <CardTitle>تحليل الإيرادات ({yearlyData.year})</CardTitle>
          <CardDescription>مقارنة بين إجمالي الإيرادات والمبالغ المحصلة فعلياً</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={barChartConfig} className='h-[300px] w-full'>
            <BarChart
              data={formattedMonthlyData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='hsl(var(--border))' />
              <XAxis dataKey='name' tickLine={false} axisLine={false} tickMargin={10} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
                width={50}
              />
              <ChartTooltip content={<ChartTooltipContent indicator='dashed' />} />
              <Bar dataKey='revenue' fill='var(--color-revenue)' radius={[4, 4, 0, 0]} />
              <Bar dataKey='paid' fill='var(--color-paid)' radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* رسمة أداء الأطباء */}
      <Card className='col-span-1 lg:col-span-3 shadow-sm border-border/50'>
        <CardHeader>
          <CardTitle>أداء الأطباء</CardTitle>
          <CardDescription>توزيع الإيرادات حسب كل طبيب اليوم</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col items-center justify-center'>
          {formattedDoctorsData.length > 0 ? (
            <ChartContainer config={pieChartConfig} className='h-[250px] w-full'>
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent indicator='line' />} />
                <Pie
                  data={formattedDoctorsData}
                  dataKey='revenue'
                  nameKey='name'
                  cx='50%'
                  cy='50%'
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  stroke='none'
                >
                  {formattedDoctorsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          ) : (
            <div className='h-[250px] flex items-center justify-center text-muted-foreground text-sm'>
              لا توجد إيرادات مسجلة للأطباء اليوم.
            </div>
          )}

          {/* مفتاح الرسم البياني (Legend) */}
          <div className='flex flex-wrap justify-center gap-4 mt-4'>
            {formattedDoctorsData.map((doc, i) => (
              <div
                key={i}
                className='flex items-center gap-2 text-sm text-muted-foreground font-medium'
              >
                <span className='w-3 h-3 rounded-full' style={{ backgroundColor: doc.fill }} />
                {doc.name}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
