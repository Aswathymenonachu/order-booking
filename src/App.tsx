import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import { OrdersPage } from './design-system/pages'
import './styles.scss'

const App: React.FC = () => (
  <Provider store={store}>
    <OrdersPage />
  </Provider>
)

export default App
