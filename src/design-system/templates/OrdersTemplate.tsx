import React from 'react'
import { Toolbar } from '../molecules'
import { OrdersTable, OrderForm } from '../organisms'
import type { Order, OrderStatus } from '../../types'

export const OrdersTemplate: React.FC<{
  title?: string
  filter: OrderStatus | 'All'
  search: string
  onFilterChange: (v: OrderStatus | 'All') => void
  onSearchChange: (v: string) => void
  rows: Order[]
  onNew: () => void
  onView: (o: Order) => void
  onEdit: (o: Order) => void
  onDelete: (o: Order) => void
  formMode: 'create'|'edit'|'view'|null
  formInitial?: Partial<Order> | null
  onSubmit: (o: Order) => void
  onCancel: () => void
}> = (props) => {
  const { title='Watermelon Ecosystem Orders', filter, search, onFilterChange, onSearchChange, rows,
          onNew, onView, onEdit, onDelete,
          formMode, formInitial, onSubmit, onCancel } = props

  return (
    <div className="container space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{title}</h1>
        <button className="rounded-xl bg-green-600 px-3 py-2" onClick={onNew}>+ New Order</button>
      </div>

      <Toolbar filter={filter} onFilterChange={onFilterChange} search={search} onSearchChange={onSearchChange} />
      <OrdersTable rows={rows} onView={onView} onEdit={onEdit} onDelete={(o)=>onDelete(o)} />

      {formMode && (
        <OrderForm mode={formMode} initial={formInitial ?? undefined} onSubmit={onSubmit} onCancel={onCancel} />
      )}
    </div>
  )
}
