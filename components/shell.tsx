import { Typography } from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import * as React from 'react'

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
  className?: string
}

export function DashboardHeader({ heading, text, children, className }: DashboardHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between ', className)}>
      <div className='grid '>
        <Typography variant='h2'>{heading}</Typography>
        {text && <Typography variant='muted'>{text}</Typography>}
      </div>
      {children}
    </div>
  )
}

type DashboardShellProps = React.HTMLAttributes<HTMLDivElement>

export function DashboardShell({ children, className, ...props }: DashboardShellProps) {
  return (
    <div className={cn('flex flex-col gap-8  h-full', className)} {...props}>
      {children}
    </div>
  )
}
