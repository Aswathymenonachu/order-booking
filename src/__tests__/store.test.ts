import { beforeEach, test, expect } from 'vitest'
import { store, create, update, remove, hydrate, INITIAL_STATE } from '../store'

beforeEach(() => {
  localStorage.clear()
  store.dispatch(hydrate(INITIAL_STATE))
})

test('creates, updates, and deletes an order (state only)', () => {
  const newOrder = {
    id: 'ORD-XYZ',
    customer: 'Tester',
    location: 'Dubai',
    status: 'Pending',
    total: 10,
    createdAt: new Date().toISOString(),
  }

  store.dispatch(create(newOrder))
  let state = store.getState().orders
  expect(state.orders.some(o => o.id === newOrder.id)).toBe(true)

  store.dispatch(update({ ...newOrder, status: 'Active' }))
  state = store.getState().orders
  expect(state.orders.find(o => o.id === newOrder.id)?.status).toBe('Active')

  store.dispatch(remove(newOrder.id))
  state = store.getState().orders
  expect(state.orders.some(o => o.id === newOrder.id)).toBe(false)
})
