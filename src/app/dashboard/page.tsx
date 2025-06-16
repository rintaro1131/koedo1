import { supabaseServer } from '@/lib/supabase-server'
import DashboardClient from '@/components/DashboardClient'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'

export default async function DashboardPage() {
  // Auth guard
  const supabase = supabaseServer()
  const {
    data: { session }
  } = await supabase.auth.getSession()
  if (!session) redirect('/login')

  // Fetch initial data from DB
  const products = await prisma.product.findMany({ orderBy: { updatedAt: 'desc' } })

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold">Inventory Dashboard</h1>
      <DashboardClient initialData={products} />
    </div>
  )
}
