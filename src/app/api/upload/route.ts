import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ message: 'file missing' }, { status: 400 })

  const supabase = supabaseServer()
  const fileName = `${Date.now()}-${file.name}`
  const { data, error } = await supabase.storage.from('product-images').upload(fileName, file, {
    cacheControl: '3600',
    upsert: false
  })
  if (error) return NextResponse.json({ message: error.message }, { status: 500 })

  const { data: publicUrl } = supabase.storage.from('product-images').getPublicUrl(fileName)
  return NextResponse.json({ url: publicUrl.publicUrl })
}
