import { getVisitAction } from '@/actions/visit/get-visit'
import { VisitTerminalClient } from './visit-terminal-client'

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ visitId: string; tenantSlug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { tab } = await searchParams
  const { visitId, tenantSlug } = await params
  const response = await getVisitAction(tenantSlug, visitId)
  console.log(response)
  if (!response.success || !response.data) return <div>Hello World!</div>

  return (
    <VisitTerminalClient
      visit={response.data}
      tenantSlug={tenantSlug}
      defaultTab={(tab as string) || 'clinical'}
    />
  )
}
