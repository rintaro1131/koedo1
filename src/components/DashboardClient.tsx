"use client"

import { useEffect, useState } from 'react'
import ProductTable from '@/components/ProductTable'
import ProductFormModal from '@/components/ProductFormModal'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function DashboardClient({ initialData }: { initialData: any[] }) {
  const [products, setProducts] = useState<any[]>(initialData)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const fetchProducts = async (q = '') => {
    const res = await fetch(`/api/products?q=${encodeURIComponent(q)}`)
    const json = await res.json()
    setProducts(json)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchProducts(search)}
          className="max-w-sm"
        />
        <Button onClick={() => fetchProducts(search)}>Search</Button>
        <Button className="ml-auto" onClick={() => setModalOpen(true)}>
          Add Product
        </Button>
      </div>
      <ProductTable initialData={products} />
      <ProductFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={(p) => setProducts((prev) => [p, ...prev])}
      />
    </div>
  )
}
