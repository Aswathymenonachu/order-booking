import React from 'react'
import { cn } from './helpers'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn('rounded-xl border border-slate-700 bg-slate-800/70 px-3 py-2', className)} {...props} />
  )
)
Input.displayName = 'Input'
