import React from 'react'
import { cn } from './helpers'

export type Option = { label: string; value: string }
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> { options: Option[] }

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, ...props }, ref) => (
    <select ref={ref} className={cn('rounded-xl border border-slate-700 bg-slate-800/70 px-3 py-2', className)} {...props}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  )
)
Select.displayName = 'Select'
