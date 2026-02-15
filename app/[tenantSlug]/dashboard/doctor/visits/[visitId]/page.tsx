import { getVisitAction } from '@/actions/visit/get-visit'
import { VisitTerminalClient } from './visit-terminal-client'

export default async function Page({
  params,
}: {
  params: Promise<{ visitId: string; tenantSlug: string }>
}) {
  const { visitId, tenantSlug } = await params
  const response = await getVisitAction(tenantSlug, visitId)
  console.log(response)
  if (!response.success || !response.data) return <div>Hello World!</div>

  return <VisitTerminalClient visit={response.data} tenantSlug={tenantSlug} />
}
