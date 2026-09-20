import React from "react"
import prisma from "@/lib/prisma"
import { BarChart3, TrendingUp, DollarSign, Wrench, Package, ShieldCheck } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function ReportesViewPage() {
  const [totalOrders, totalQuotes, totalProducts, expenses] = await Promise.all([
    prisma.serviceOrder.count(),
    prisma.quote.count(),
    prisma.product.count(),
    prisma.expense.findMany({ select: { amount: true } })
  ])

  const totalExpenseSum = expenses.reduce((sum, e) => sum + e.amount, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Reporte de Ventas Mostrador y POS</h1>
        <p className="text-xs text-gray-500 mt-0.5">Volumen de transacciones, métodos de pago y productos más vendidos</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Órdenes Históricas</span>
            <Wrench size={18} className="text-blue-500" />
          </div>
          <p className="text-3xl font-black text-gray-900">{totalOrders}</p>
          <p className="text-[11px] text-gray-400 mt-1">Servicios registrados</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Cotizaciones</span>
            <TrendingUp size={18} className="text-emerald-500" />
          </div>
          <p className="text-3xl font-black text-emerald-600">{totalQuotes}</p>
          <p className="text-[11px] text-gray-400 mt-1">Emitidas formalmente</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Artículos en Catálogo</span>
            <Package size={18} className="text-indigo-500" />
          </div>
          <p className="text-3xl font-black text-gray-900">{totalProducts}</p>
          <p className="text-[11px] text-gray-400 mt-1">Productos y refacciones</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Gastos Acumulados</span>
            <DollarSign size={18} className="text-red-500" />
          </div>
          <p className="text-3xl font-black text-red-600">
            ${totalExpenseSum.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-[11px] text-gray-400 mt-1">Egresos operativos</p>
        </div>
      </div>
    </div>
  )
}
