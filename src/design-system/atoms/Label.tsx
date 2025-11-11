import React from 'react'
import { cn } from './helpers'
export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ className, ...props }) =>
  <label className={cn('text-xs opacity-80', className)} {...props} />
