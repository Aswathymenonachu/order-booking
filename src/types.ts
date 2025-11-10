export type OrderStatus = 'Pending' | 'Active' | 'Out For Delivery' | 'Delivered' | 'Canceled'
export interface Order {
  id: string
  customer: string
  location: string
  status: OrderStatus
  total: number
  createdAt: string // ISO
}