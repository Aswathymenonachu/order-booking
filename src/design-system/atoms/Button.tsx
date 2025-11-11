import React from 'react'
import { cn } from './helpers'

type Variant = 'default' | 'primary' | 'danger' | 'ghost'
type Size = 'sm' | 'md'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const base = 'inline-flex items-center justify-center rounded-xl px-3 py-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed'
const variants: Record<Variant, string> = {
  default: 'border border-slate-700 bg-slate-800/70 hover:bg-slate-800',
  primary: 'bg-green-600 hover:bg-green-500 text-white',
  danger:  'bg-rose-600 hover:bg-rose-500 text-white',
  ghost:   'border border-slate-700 hover:bg-slate-800/60',
}
const sizes: Record<Size, string> = { sm: 'text-sm', md: 'text-base' }

export const Button: React.FC<ButtonProps> = ({ className, variant='default', size='md', ...props }) => {
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />
}
