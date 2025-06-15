import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({ where: { id: params.id } })
  if (!product) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  return NextResponse.json(product)
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const data = await request.json()
  const product = await prisma.product.update({ where: { id: params.id }, data })
  return NextResponse.json(product)
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.product.delete({ where: { id: params.id } })
  return NextResponse.json({ ok: true })
}
