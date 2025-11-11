import React from 'react'
import type { Order } from '../../types'
import { Badge, Card } from '../atoms'
import { RowActions } from '../molecules'

function currency(n:number){ return new Intl.NumberFormat(undefined, { style:'currency', currency:'AED' }).format(n) }
function dt(iso:string){ return new Date(iso).toLocaleString() }

export const OrdersTable: React.FC<{
  rows: Order[]
  onView: (o: Order) => void
  onEdit: (o: Order) => void
  onDelete: (o: Order) => void
}> = ({ rows, onView, onEdit, onDelete }) => {
  return (
    <Card className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-2">
        <thead>
          <tr className="text-left text-indigo-300">
            {['ID','Customer','Location','Status','Total','Created',''].map(h =>
              <th key={h} className="px-3 py-2 font-bold">{h}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map(o => (
            <tr key={o.id} className="rounded-xl">
              <td className="bg-slate-800/70 px-3 py-2">{o.id}</td>
              <td className="bg-slate-800/70 px-3 py-2">{o.customer}</td>
              <td className="bg-slate-800/70 px-3 py-2">{o.location}</td>
              <td className="bg-slate-800/70 px-3 py-2"><Badge status={o.status} /></td>
              <td className="bg-slate-800/70 px-3 py-2">{currency(o.total)}</td>
              <td className="bg-slate-800/70 px-3 py-2">{dt(o.createdAt)}</td>
              <td className="bg-slate-800/70 px-3 py-2">
                <RowActions onView={()=>onView(o)} onEdit={()=>onEdit(o)} onDelete={()=>onDelete(o)} />
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr><td className="opacity-70 px-3 py-6 text-center" colSpan={7}>No orders found.</td></tr>
          )}
        </tbody>
      </table>
      <div className="opacity-70 mt-2 text-sm">{rows.length} result(s)</div>
    </Card>
  )
}
