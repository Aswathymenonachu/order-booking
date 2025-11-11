import React from 'react'
import { Button } from '../atoms'

export const RowActions: React.FC<{
  onView: () => void
  onEdit: () => void
  onDelete: () => void
}> = ({ onView, onEdit, onDelete }) => (
  <div className="flex gap-2">
    <Button onClick={onView} variant="ghost">View</Button>
    <Button onClick={onEdit} variant="primary">Edit</Button>
    <Button onClick={onDelete} variant="danger">Delete</Button>
  </div>
)
