import React from "react"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { CircleDollarSign, Clock, AlertTriangle, CheckCircle2, User, ArrowRight, DollarSign } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function CobranzaPage() {
  // Cuentas por cobrar: órdenes con saldo pendiente que no estén canceladas
  const orders = await prisma.serviceOrder.findMany({
    where: {
      status: { notIn: ["CANCELLED"] },
      costQuote: { gt: 0 }
    },
    include: {
      payments: true
    },
    orderBy: { createdAt: "desc" }
  })

  // Filtrar las que tienen saldo pendiente
  const pendingReceivables = orders.map(ord => {
    const totalCost = ord.costQuote || 0
    const totalPaid = ord.payments.reduce((sum, p) => sum + p.amount, 0)
    const balance = Math.max(0, totalCost - totalPaid)
    return { ...ord, totalCost, totalPaid, balance }
  }).filter(ord => ord.balance > 0)

  const totalReceivable = pendingReceivables.reduce((sum, ord) => sum + ord.balance, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Cobranza y Cuentas por Cobrar</h1>
          <p className="text-xs text-gray-500 mt-0.5">Control de saldos vencidos, pagos parciales y recuperación de cartera</p>
        </div>
      </div>

      {/* KPI Card */}
      <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white p-6 rounded-2xl shadow-sm max-w-sm">
        <div className="flex items-center justify-between opacity-90 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider">Saldo Total por Cobrar</span>
          <CircleDollarSign size={22} />
        </div>
        <p className="text-3xl font-black tracking-tight">
          ${totalReceivable.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
        </p>
        <p className="text-[11px] opacity-80 mt-1">{pendingReceivables.length} órdenes con saldo pendiente</p>
      </div>

      {/* Tabla de Cuentas por Cobrar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-[10px] border-b border-gray-100">
              <tr>
                <th className="py-3 px-4">Folio</th>
                <th className="py-3 px-4">Cliente</th>
                <th className="py-3 px-4">Equipo</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4 text-right">Costo Total</th>
                <th className="py-3 px-4 text-right">Pagado</th>
                <th className="py-3 px-4 text-right">Saldo Deudor</th>
                <th className="py-3 px-4 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pendingReceivables.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">
                    ¡Excelente! No hay cuentas pendientes de cobro en este momento.
                  </td>
                </tr>
              ) : (
                pendingReceivables.map((ord) => (
                  <tr key={ord.id} className="hover:bg-gray-50/50 transition">
                    <td className="py-3.5 px-4 font-bold text-blue-600">
                      <Link href={`/admin/servicios/${ord.folio}`}>{ord.folio}</Link>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-gray-900">
                      <div>{ord.clientName}</div>
                      <div className="text-[10px] text-gray-400">{ord.clientPhone}</div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600">
                      {ord.brand} {ord.model}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700">
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right text-gray-700">
                      ${ord.totalCost.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold text-emerald-600">
                      ${ord.totalPaid.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4 text-right font-black text-amber-600">
                      ${ord.balance.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <Link
                        href={`/admin/entregas/${ord.id}`}
                        className="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold px-3 py-1.5 rounded-xl text-[11px] transition"
                      >
                        <span>Cobrar</span>
                        <ArrowRight size={12} />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}