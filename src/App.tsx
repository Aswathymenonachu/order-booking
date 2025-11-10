import React, { useMemo, useState } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { store, type RootState, setFilter, setSearch, select as selectOrder, create, update, remove } from './store'
import { OrdersTable } from './components/OrdersTable'
import { OrderForm } from './components/OrderForm'
import type { Order, OrderStatus } from './types'

const FilterBar: React.FC = () => {
  const filter = useSelector((s: RootState) => s.orders.filter)
  const search = useSelector((s: RootState) => s.orders.search)
  const dispatch = useDispatch()

  const statuses: (OrderStatus|'All')[] = ['All','Pending','Active','Out For Delivery','Delivered','Canceled']

  return (
    <div className="flex flex-wrap gap-2">
      <select
        className="rounded-xl border border-slate-700 bg-slate-800/70 px-3 py-2"
        value={filter}
        onChange={e => dispatch(setFilter(e.target.value as any))}>
        {statuses.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <input
        className="rounded-xl border border-slate-700 bg-slate-800/70 px-3 py-2 flex-1 min-w-[240px]"
        placeholder="Search by ID or customer…"
        value={search}
        onChange={e => dispatch(setSearch(e.target.value))}
      />
    </div>
  )
}

const ActionsBar: React.FC<{onNew: () => void}> = ({onNew}) => {
  return (
    <div className="flex gap-2">
      <button className="rounded-xl bg-blue-600 px-3 py-2" onClick={onNew}>+ New Order</button>
    </div>
  )
}

const Shell: React.FC = () => {
  const state = useSelector((s: RootState) => s.orders)
  const dispatch = useDispatch()
  const [mode, setMode] = useState<'create'|'edit'|'view'|null>(null)
  const selected = useMemo(() => state.orders.find(o => o.id === state.selectedId) || null, [state])

  function openCreate(){ setMode('create'); dispatch(selectOrder(null)) }
  function openEdit(o: Order){ dispatch(selectOrder(o.id)); setMode('edit') }
  function openView(o: Order){ dispatch(selectOrder(o.id)); setMode('view') }
  function closeForm(){ setMode(null); dispatch(selectOrder(null)) }
  function submit(order: Order){ if(mode === 'create'){ dispatch(create(order)) } else if(mode === 'edit'){ dispatch(update(order)) } closeForm() }
  function del(id: string){ if(confirm(`Delete ${id}?`)){ dispatch(remove(id)) } }

  const q = state.search.toLowerCase().trim()
  const rows = state.orders.filter(o => {
    const matchesFilter = state.filter === 'All' ? true : o.status === state.filter
    const matchesSearch = q ? (o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q)) : true
    return matchesFilter && matchesSearch
  })

  return (
    <div className="container space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Watermelon Ecosystem Orders</h1>
        <ActionsBar onNew={openCreate} />
      </div>
      <FilterBar />
      <OrdersTable rows={rows} onEdit={openEdit} onView={openView} onDelete={del} />
      {mode && (
        <OrderForm
          mode={mode}
          initial={mode==='create' ? { createdAt: new Date().toISOString() } : selected ?? undefined}
          onSubmit={submit}
          onCancel={closeForm}
        />
      )}
    </div>
  )
}

const App: React.FC = () => <Provider store={store}><Shell /></Provider>
export default App