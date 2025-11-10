import React, { useEffect, useState } from 'react'
import type { Order, OrderStatus } from '../types'

const statuses: OrderStatus[] = ['Pending','Active','Out For Delivery','Delivered','Canceled']

type Props = {
  initial?: Partial<Order>
  mode: 'create'|'edit'|'view'
  onSubmit: (order: Order) => void
  onCancel: () => void
}

export const OrderForm: React.FC<Props> = ({ initial, mode, onSubmit, onCancel }) => {
  const [form, setForm] = useState<Order>({
    id: '',
    customer: '',
    location: '',
    status: 'Pending',
    total: 0,
    createdAt: new Date().toISOString(),
    ...initial,
  } as Order)

  useEffect(() => {
    setForm(f => ({ ...f, ...(initial || {}) }))
  }, [initial])

  const readOnly = mode === 'view'
  const title = mode === 'create' ? 'Create Order' : mode === 'edit' ? 'Edit Order' : 'View Order'

  function handleChange<K extends keyof Order>(key: K, value: Order[K]){
    setForm(prev => ({ ...prev, [key]: value }))
  }

  function submit(e: React.FormEvent){
    e.preventDefault()
    if(readOnly) return onCancel()
    if(!form.id || !form.customer){
      alert('ID and Customer are required')
      return
    }
    onSubmit(form)
  }

  return (
    <div className="card space-y-3">
      <h3 className="m-0 text-lg font-semibold">{title}</h3>
      <form className="space-y-3" onSubmit={submit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs opacity-80">Order ID</label>
            <input
              className="rounded-xl border border-slate-700 bg-slate-800/70 px-3 py-2"
              value={form.id}
              onChange={e => handleChange('id', e.target.value)}
              placeholder="ORD-1006"
              readOnly={readOnly || mode==='edit'}
              aria-label="Order ID"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs opacity-80">Customer</label>
            <input
              className="rounded-xl border border-slate-700 bg-slate-800/70 px-3 py-2"
              value={form.customer}
              onChange={e => handleChange('customer', e.target.value)}
              placeholder="Jane Doe"
              readOnly={readOnly}
              aria-label="Customer"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs opacity-80">Location</label>
            <input
              className="rounded-xl border border-slate-700 bg-slate-800/70 px-3 py-2"
              value={form.location}
              onChange={e => handleChange('location', e.target.value)}
              placeholder="Dubai"
              readOnly={readOnly}
              aria-label="Location"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs opacity-80">Status</label>
            <select
              className="rounded-xl border border-slate-700 bg-slate-800/70 px-3 py-2"
              value={form.status}
              onChange={e => handleChange('status', e.target.value as OrderStatus)}
              disabled={readOnly}
            >
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs opacity-80">Total</label>
            <input
              className="rounded-xl border border-slate-700 bg-slate-800/70 px-3 py-2"
              type="number"
              value={form.total}
              onChange={e => handleChange('total', Number(e.target.value))}
              step="0.01"
              min="0"
              readOnly={readOnly}
              aria-label="Total"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs opacity-80">Created At</label>
            <input
              className="rounded-xl border border-slate-700 bg-slate-800/70 px-3 py-2"
              type="datetime-local"
              value={new Date(form.createdAt).toISOString().slice(0,16)}
              onChange={e => handleChange('createdAt', new Date(e.target.value).toISOString())}
              readOnly={readOnly}
              aria-label="Created At"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button type="button" className="rounded-xl border border-slate-700 px-3 py-2" onClick={onCancel}>Close</button>
          {readOnly ? null : <button className="rounded-xl bg-blue-600 px-3 py-2" type="submit">{mode==='create' ? 'Create' : 'Save'}</button>}
        </div>
      </form>
    </div>
  )
}