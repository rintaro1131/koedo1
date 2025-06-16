"use client"

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface Props {
  open: boolean
  onClose: () => void
  onCreated: (product: any) => void
}

export default function ProductFormModal({ open, onClose, onCreated }: Props) {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    sku: '',
    title: '',
    description: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form })
      })
      const json = await res.json()
      onCreated(json)
      onClose()
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded bg-white p-6 space-y-4">
        <h2 className="text-lg font-semibold">Add Product</h2>
        <Input name="sku" placeholder="SKU" value={form.sku} onChange={handleChange} />
        <Input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <Input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <div className="flex justify-end gap-2 pt-2">
          <Button className="bg-muted text-foreground" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  )
}
