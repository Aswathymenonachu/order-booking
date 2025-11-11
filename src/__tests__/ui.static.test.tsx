import React from 'react'
import { render, screen, within } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store, hydrate, INITIAL_STATE } from '../store'
import App from '../App'

beforeEach(() => {
  localStorage.clear()
  store.dispatch(hydrate(INITIAL_STATE))
})

function renderApp() {
  return render(
    <Provider store={store}>
      <App />
    </Provider>
  )
}

test('renders heading, toolbar, and table headers', () => {
  renderApp()

  // Title
  expect(screen.getByRole('heading', { name: /orders/i })).toBeInTheDocument()

  // Toolbar controls
  // select for status filter
  const statusSelect = screen.getByRole('combobox')
  expect(statusSelect).toBeInTheDocument()

  // search input
  expect(
    screen.getByPlaceholderText(/search by id or customer/i)
  ).toBeInTheDocument()

  // New Order button
  expect(screen.getByRole('button', { name: /\+ new order/i })).toBeInTheDocument()

  // Table headers (stable, not tied to data)
  const columnHeaders = screen.getAllByRole('columnheader')
  const headerTexts = columnHeaders.map((th) => th.textContent?.trim())
  ;['ID', 'Customer', 'Location', 'Status', 'Total', 'Created'].forEach(h =>
    expect(headerTexts).toContain(h)
  )
})
