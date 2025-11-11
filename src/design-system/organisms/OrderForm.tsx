import React, { useEffect, useState } from 'react'
import { Card, Input, Label, Select, Button } from '../atoms'
import type { Order, OrderStatus } from '../../types'

const statuses: OrderStatus[] = ['Pending','Active','Out For Delivery','Delivered','Canceled']

export const OrderForm: React.FC<{
  mode: 'create' | 'edit' | 'view'
  initial?: Partial<Order>
  onSubmit: (order: Order) => void
  onCancel: () => void
}> = ({ mode, initial, onSubmit, onCancel }) => {
  const [form, setForm] = useState<Order>({
    id: '', customer: '', location: '', status: 'Pending', total: 0, createdAt: new Date().toISOString(),
    ...initial,
  } as Order)

  useEffect(() => { setForm(f => ({ ...f, ...(initial || {}) })) }, [initial])

  const readOnly = mode === 'view'
  const title = mode==='create' ? 'Create Order' : mode==='edit' ? 'Edit Order' : 'View Order'
  const set = <K extends keyof Order>(k: K, v: Order[K]) => setForm(prev => ({ ...prev, [k]: v }))

  function submit(e: React.FormEvent){
    e.preventDefault()
    if(readOnly) return onCancel()
    if(!form.id || !form.customer) return alert('ID and Customer are required')
    onSubmit(form)
  }

  return (
    <Card className="space-y-3">
      <h3 className="m-0 text-lg font-semibold">{title}</h3>
      <form className="space-y-3" onSubmit={submit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <Label>Order ID</Label>
            <Input aria-label="Order ID" value={form.id} onChange={(e)=>set('id', e.target.value)} readOnly={readOnly || mode==='edit'} placeholder="ORD-1006" />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Customer</Label>
            <Input aria-label="Customer" value={form.customer} onChange={(e)=>set('customer', e.target.value)} readOnly={readOnly} placeholder="Jane Doe" />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Location</Label>
            <Input aria-label="Location" value={form.location} onChange={(e)=>set('location', e.target.value)} readOnly={readOnly} placeholder="Dubai" />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Status</Label>
            <Select value={form.status} onChange={(e)=>set('status', e.target.value as OrderStatus)} disabled={readOnly}
              options={statuses.map(s => ({ label: s, value: s }))} />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Total</Label>
            <Input aria-label="Total" type="number" step="0.01" min="0" value={form.total}
              onChange={(e)=>set('total', Number(e.target.value))} readOnly={readOnly} />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Created At</Label>
            <Input aria-label="Created At" type="datetime-local"
              value={new Date(form.createdAt).toISOString().slice(0,16)}
              onChange={(e)=>set('createdAt', new Date(e.target.value).toISOString())}
              readOnly={readOnly} />
          </div>
        </div>
        <div className="flex gap-2">
          <Button type="button" onClick={onCancel}>Close</Button>
          {readOnly ? null : <Button type="submit" variant="primary">{mode==='create' ? 'Create' : 'Save'}</Button>}
        </div>
      </form>
    </Card>
  )
}
