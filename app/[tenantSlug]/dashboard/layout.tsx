import DashboardLayoutClient from '@/components/dashboard-layout-client'
interface LayoutProps {
  children: React.ReactNode
}

export default async function DashboardServerLayout({ children }: LayoutProps) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>
}
