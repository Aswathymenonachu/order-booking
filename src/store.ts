import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Order, OrderStatus } from './types'

type State = {
  orders: Order[]
  filter: OrderStatus | 'All'
  search: string
  selectedId: string | null
}

const initialData: Order[] = [
  { id: '1001', customer: 'Aswathy Menon', location: 'Dubai', status: 'Pending', total: 620.50, createdAt: new Date(Date.now()-86400000*2).toISOString() },
  { id: '1fdf', customer: 'Shaheer', location: 'Abu Dhabi', status: 'Active', total: 2089.99, createdAt: new Date(Date.now()-86400000*1.4).toISOString() },
  { id: 'ORD-1003', customer: 'Priya', location: 'Sharjah', status: 'Out For Delivery', total: 450.25, createdAt: new Date(Date.now()-3600_000*20).toISOString() },
  { id: 'ORD-1004', customer: 'Jobby joe', location: 'Ajman', status: 'Delivered', total: 2300.10, createdAt: new Date(Date.now()-3600_000*5).toISOString() },
  { id: 'ORD-1005', customer: 'Tim', location: 'Dubai', status: 'Canceled', total: 1005.00, createdAt: new Date(Date.now()-3600_000*2).toISOString() },
]

const initial: State = { orders: initialData, filter: 'All', search: '', selectedId: null }

const KEY = 'orders-crud-state-v2'
const stored = typeof window !== 'undefined' ? (() => { try { const raw = localStorage.getItem(KEY); return raw ? JSON.parse(raw) as State : null } catch { return null } })() : null

const slice = createSlice({
  name: 'orders',
  initialState: stored ?? initial,
  reducers: {
    create: (state, action: PayloadAction<Order>) => { state.orders.unshift(action.payload); state.selectedId = null },
    update: (state, action: PayloadAction<Order>) => {
      const i = state.orders.findIndex(o => o.id === action.payload.id)
      if (i !== -1) state.orders[i] = action.payload
      state.selectedId = null
    },
    remove: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter(o => o.id !== action.payload)
      state.selectedId = null
    },
    select: (state, action: PayloadAction<string | null>) => { state.selectedId = action.payload },
    setFilter: (state, action: PayloadAction<State['filter']>) => { state.filter = action.payload },
    setSearch: (state, action: PayloadAction<string>) => { state.search = action.payload },
    hydrate: (_state, action: PayloadAction<State>) => action.payload,
  }
})

export const { create, update, remove, select, setFilter, setSearch, hydrate } = slice.actions

export const store = configureStore({ reducer: { orders: slice.reducer } })

store.subscribe(() => { try { localStorage.setItem(KEY, JSON.stringify(store.getState().orders)) } catch {} })
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch