import React from 'react'
import type { Order } from '../types'

function formatCurrency(n:number){ return new Intl.NumberFormat(undefined, { style:'currency', currency:'AED' }).format(n) }
function formatDate(iso:string){ return new Date(iso).toLocaleString() }

export const OrdersTable: React.FC<{
  rows: Order[]
  onEdit: (o: Order) => void
  onView: (o: Order) => void
  onDelete: (id: string) => void
}> = ({ rows, onEdit, onView, onDelete }) => {
  return (
    <div className="card overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-2">
        <thead>
          <tr className="text-left text-indigo-300">
            <th className="px-3 py-2">ID</th>
            <th className="px-3 py-2">Customer</th>
            <th className="px-3 py-2">Location</th>
            <th className="px-3 py-2">Status</th>
            <th className="px-3 py-2">Total</th>
            <th className="px-3 py-2">Created</th>
            <th className="px-3 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map(o => (
            <tr key={o.id} className="rounded-xl">
              <td className="bg-slate-800/70 px-3 py-2">{o.id}</td>
              <td className="bg-slate-800/70 px-3 py-2">{o.customer}</td>
              <td className="bg-slate-800/70 px-3 py-2">{o.location}</td>
              <td className="bg-slate-800/70 px-3 py-2"><span className="badge">{o.status}</span></td>
              <td className="bg-slate-800/70 px-3 py-2">{formatCurrency(o.total)}</td>
              <td className="bg-slate-800/70 px-3 py-2">{formatDate(o.createdAt)}</td>
              <td className="bg-slate-800/70 px-3 py-2">
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded-lg border border-slate-700" onClick={() => onView(o)}>View</button>
                  <button className="px-3 py-1 rounded-lg bg-blue-600" onClick={() => onEdit(o)}>Edit</button>
                  <button className="px-3 py-1 rounded-lg bg-rose-600" onClick={() => onDelete(o.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={7} className="opacity-70 px-3 py-6 text-center">No orders found.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="opacity-70 mt-2 text-sm">{rows.length} result(s)</div>
    </div>
  )
}