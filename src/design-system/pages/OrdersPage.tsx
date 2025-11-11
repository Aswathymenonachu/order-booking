import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { OrdersTemplate } from '../templates/OrdersTemplate'
import { type RootState, create, update, remove, select as selectOrder, setFilter, setSearch } from '../../store'
import type { Order } from '../../types'

export const OrdersPage: React.FC = () => {
  const state = useSelector((s: RootState) => s.orders)
  const dispatch = useDispatch()
  const [mode, setMode] = useState<'create'|'edit'|'view'|null>(null)
  const selected = useMemo(() => state.orders.find(o => o.id === state.selectedId) || null, [state])

  const q = state.search.toLowerCase().trim()
  const rows = state.orders.filter(o => {
    const byFilter = state.filter === 'All' ? true : o.status === state.filter
    const bySearch = q ? (o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q)) : true
    return byFilter && bySearch
  })

  function onNew(){ setMode('create'); dispatch(selectOrder(null)) }
  function onView(o: Order){ dispatch(selectOrder(o.id)); setMode('view') }
  function onEdit(o: Order){ dispatch(selectOrder(o.id)); setMode('edit') }
  function onDelete(o: Order){ if(confirm(`Delete ${o.id}?`)) dispatch(remove(o.id)) }
  function onSubmit(order: Order){ mode==='create' ? dispatch(create(order)) : dispatch(update(order)); setMode(null); dispatch(selectOrder(null)) }
  function onCancel(){ setMode(null); dispatch(selectOrder(null)) }

  return (
    <OrdersTemplate
      filter={state.filter}
      search={state.search}
      onFilterChange={(v)=>dispatch(setFilter(v))}
      onSearchChange={(v)=>dispatch(setSearch(v))}
      rows={rows}
      onNew={onNew}
      onView={onView}
      onEdit={onEdit}
      onDelete={onDelete}
      formMode={mode}
      formInitial={mode==='create'? { createdAt: new Date().toISOString() } : selected ?? null}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  )
}
