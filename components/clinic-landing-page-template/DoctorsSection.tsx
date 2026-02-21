import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography' // مسارك المظبوط
import { IPublicDoctor } from '@/types/public'
import { UserRound } from 'lucide-react'
import Image from 'next/image'

export default function DoctorsSection({ doctors }: { doctors: IPublicDoctor[] }) {
  if (!doctors || doctors.length === 0) return null

  return (
    <section id='doctors' className='py-24  flex justify-center items-center '>
      <div className='container px-4 md:px-6'>
        {/* --- Header with Strict Flex Centering --- */}
        <div className='flex flex-col items-center justify-center text-center space-y-4 mb-16'>
          <Typography variant='h2' className='text-3xl md:text-4xl font-bold tracking-tight'>
            نخبة من الأطباء
          </Typography>

          <Typography variant='muted' className='max-w-175 text-lg'>
            فريق طبي متميز بتخصصات دقيقة لضمان أفضل تشخيص وعلاج.
          </Typography>
        </div>

        {/* --- Doctors Grid --- */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {doctors.map((doctor) => (
            <Card
              key={doctor.id}
              className='group pt-0 overflow-hidden border-border/50 bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1'
            >
              {/* Image Container */}
              <div className='relative h-80 w-full overflow-hidden bg-muted flex items-center justify-center'>
                {doctor.photoUrl ? (
                  <Image
                    src={doctor.photoUrl}
                    alt={doctor.name}
                    fill
                    className='object-cover object-center transition-transform duration-500 group-hover:scale-105'
                  />
                ) : (
                  <div className='flex flex-col items-center gap-2 text-muted-foreground/50'>
                    <UserRound className='h-20 w-20' />
                  </div>
                )}

                {/* Floating Badge */}
                <div className='absolute bottom-4 right-4 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100'>
                  <Badge className='bg-background/95 text-foreground shadow-md backdrop-blur hover:bg-background'>
                    {doctor.specialty}
                  </Badge>
                </div>
              </div>

              {/* Card Body */}
              <CardHeader className='text-right pb-2'>
                <div className='space-y-1'>
                  {/* Specialty (Visible on Mobile/Default) */}
                  <Typography variant='small' className='text-primary font-bold md:hidden'>
                    {doctor.specialty}
                  </Typography>
                  <Typography variant='h4' className='font-bold'>
                    {doctor.name}
                  </Typography>
                </div>
              </CardHeader>

              <CardContent className='text-right'>
                {doctor.bio ? (
                  <Typography variant='muted' className='line-clamp-3 leading-relaxed'>
                    {doctor.bio}
                  </Typography>
                ) : (
                  <Typography variant='muted' className='italic opacity-50 text-sm'>
                    لا توجد نبذة مختصرة.
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
