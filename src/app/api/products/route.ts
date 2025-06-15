import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get('q') || ''
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { sku: { contains: search, mode: 'insensitive' } },
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    },
    orderBy: { updatedAt: 'desc' }
  })
  return NextResponse.json(products)
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  const product = await prisma.product.create({ data })
  return NextResponse.json(product, { status: 201 })
}
