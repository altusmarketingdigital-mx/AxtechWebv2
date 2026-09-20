import React from "react"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { Wallet, Plus, TrendingDown, DollarSign, Calendar, Tag, Building2 } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function GastosPage() {
  const expenses = await prisma.expense.findMany({
    include: { supplier: true },
    orderBy: { date: "desc" }
  })

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Gastos y Egresos Operativos</h1>
          <p className="text-xs text-gray-500 mt-0.5">Control de compras, insumos de taller, consumibles y costos fijos</p>
        </div>
        <Link
          href="/admin/finanzas/gastos/nuevo"
          className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition"
        >
          <Plus size={15} />
          <span>Registrar Gasto</span>
        </Link>
      </div>

      {/* Tarjeta de Resumen */}
      <div className="bg-gradient-to-br from-red-500 to-rose-600 text-white p-6 rounded-2xl shadow-sm max-w-sm">
        <div className="flex items-center justify-between opacity-90 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider">Total de Gastos Registrados</span>
          <TrendingDown size={20} />
        </div>
        <p className="text-3xl font-black tracking-tight">
          ${totalExpenses.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
        </p>
        <p className="text-[11px] opacity-80 mt-1">{expenses.length} movimientos en total</p>
      </div>

      {/* Tabla de Gastos */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-[10px] border-b border-gray-100">
              <tr>
                <th className="py-3 px-4">Fecha</th>
                <th className="py-3 px-4">Concepto</th>
                <th className="py-3 px-4">Categoría</th>
                <th className="py-3 px-4">Proveedor</th>
                <th className="py-3 px-4">Método</th>
                <th className="py-3 px-4">Comprobante / Ref</th>
                <th className="py-3 px-4 text-right">Monto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {expenses.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    No se han registrado gastos aún.
                  </td>
                </tr>
              ) : (
                expenses.map((exp) => (
                  <tr key={exp.id} className="hover:bg-gray-50/50 transition">
                    <td className="py-3.5 px-4 text-gray-500">
                      {new Date(exp.date).toLocaleDateString('es-MX')}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-gray-900">
                      {exp.concept}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-700">
                        {exp.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600">
                      {exp.supplier?.name || 'Gasto General'}
                    </td>
                    <td className="py-3.5 px-4 text-gray-500">
                      {exp.paymentMethod}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-gray-400">
                      {exp.receiptRef || '-'}
                    </td>
                    <td className="py-3.5 px-4 text-right font-black text-red-600">
                      -${exp.amount.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
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