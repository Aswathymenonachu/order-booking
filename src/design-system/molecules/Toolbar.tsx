import React from 'react'
import { Input, Select } from '../atoms'
import type { OrderStatus } from '../../types'

const statusOptions: (OrderStatus|'All')[] = ['All','Pending','Active','Out For Delivery','Delivered','Canceled']

export const Toolbar: React.FC<{
  filter: OrderStatus | 'All'
  onFilterChange: (v: OrderStatus | 'All') => void
  search: string
  onSearchChange: (v: string) => void
}> = ({ filter, onFilterChange, search, onSearchChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Select
        value={filter}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onFilterChange(e.target.value as OrderStatus | 'All')}
        options={statusOptions.map(s => ({ label: s, value: s }))}
        aria-label="Status Filter"
      />
      <Input
        placeholder="Search by ID or customer…"
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
        aria-label="Search"
        className="flex-1 min-w-[240px]"
      />
    </div>
  )
}
