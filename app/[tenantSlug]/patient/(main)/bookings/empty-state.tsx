export function EmptyState({ message, icon }: { message: string; icon: React.ReactNode }) {
  return (
    <div className='flex flex-col items-center justify-center py-12 text-center space-y-3 opacity-40'>
      {icon}
      <p className='text-sm font-medium'>{message}</p>
    </div>
  )
}
