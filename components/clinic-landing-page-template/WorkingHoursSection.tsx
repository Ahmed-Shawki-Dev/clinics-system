import { dayOrder, IPublicWorkingHour } from '@/types/public'

interface WorkingHoursSectionProps {
  workingHours: IPublicWorkingHour[]
}


export default function WorkingHoursSection({ workingHours }: WorkingHoursSectionProps) {
  if (!workingHours.length) return null

  const sorted = [...workingHours].sort((a, b) => dayOrder[a.dayOfWeek] - dayOrder[b.dayOfWeek])

  return (
    <section className='w-full bg-white py-16'>
      <div className='container mx-auto px-4 max-w-2xl'>
        <h2 className='text-2xl md:text-3xl font-bold text-center mb-12'>مواعيد العمل</h2>

        <div className='space-y-4'>
          {sorted.map((day) => (
            <div key={day.dayOfWeek} className='flex justify-between border-b pb-2'>
              <span className='font-medium'>{day.dayOfWeek}</span>

              <span className='text-gray-600'>
                {day.startTime} - {day.endTime}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
