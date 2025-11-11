import React from 'react'
import { cn } from './helpers'
import type { OrderStatus } from '../../types'

const map: Record<OrderStatus, string> = {
  Delivered: 'bg-green-600 text-white-600',
  'Out For Delivery': 'bg-yellow-600 text-white-600',
  Canceled: 'bg-red-600 text-white-300',
  Active: 'bg-orange-600 text-white-300',
  Pending: 'bg-indigo-600 text-white-300',
}

export const Badge: React.FC<{ status: OrderStatus; className?: string }> = ({ status, className }) => (
  <span className={cn('badge', map[status], className)}>{status}</span>
)
