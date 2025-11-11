import React from 'react'
import { cn } from './helpers'
export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) =>
  <div className={cn('bg-slate-900/70 border border-slate-700 rounded-2xl p-4 shadow-xl', className)} {...props} />
