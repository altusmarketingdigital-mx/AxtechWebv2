import React from "react"
import prisma from "@/lib/prisma"
import Link from "next/link"
import { ArrowLeft, Save, Wallet } from "lucide-react"
import { createExpense } from "@/app/actions/financeActions"

export const dynamic = 'force-dynamic'

export default async function NuevoGastoPage() {
  const suppliers = await prisma.supplier.findMany({
    orderBy: { name: "asc" }
  })

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      <div className="flex items-center space-x-4">
        <Link href="/admin/finanzas/gastos" className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition shadow-sm">
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Registrar Gasto</h1>
          <p className="text-xs text-gray-500 mt-0.5">Captura de egresos operativos, consumibles o pagos a proveedores</p>
        </div>
      </div>

      <form action={createExpense} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Concepto del Gasto *</label>
          <input
            type="text"
            name="concept"
            required
            placeholder="Ej. Compra de pasta térmica Artic MX-4, alcohol isopropílico, renta..."
            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Categoría *</label>
            <select
              name="category"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition font-medium"
            >
              <option value="OPERATIVO">Gasto Operativo / Taller</option>
              <option value="REFACCIONES">Compra de Refacciones</option>
              <option value="HERRAMIENTAS">Herramientas y Equipamiento</option>
              <option value="SERVICIOS">Servicios (Luz, Internet, Telefonía)</option>
              <option value="NOMINA">Nómina / Honorarios</option>
              <option value="OTRO">Otro Gasto</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Importe ($ MXN) *</label>
            <input
              type="number"
              step="0.01"
              name="amount"
              required
              placeholder="0.00"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition font-bold text-gray-900"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Método de Pago *</label>
            <select
              name="paymentMethod"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition font-medium"
            >
              <option value="EFECTIVO">Efectivo (Caja Chica)</option>
              <option value="TRANSFERENCIA">Transferencia SPEI</option>
              <option value="TARJETA">Tarjeta de Crédito / Débito</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Proveedor Relacionado</label>
            <select
              name="supplierId"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition font-medium"
            >
              <option value="">Sin proveedor / Gasto Interno</option>
              {suppliers.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">No. Comprobante / Factura</label>
            <input
              type="text"
              name="receiptRef"
              placeholder="Ej. Factura F-1289 o Folio de Ticket"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Fecha del Gasto</label>
            <input
              type="date"
              name="date"
              defaultValue={new Date().toISOString().split('T')[0]}
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Notas / Justificación</label>
          <textarea
            name="notes"
            rows={2}
            placeholder="Detalles adicionales del egreso..."
            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
          ></textarea>
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
          <Link
            href="/admin/finanzas/gastos"
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-xs font-bold hover:bg-gray-100 transition"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-7 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-red-500/20 transition hover:scale-105"
          >
            <Save size={16} />
            <span>Guardar Gasto</span>
          </button>
        </div>
      </form>
    </div>
  )
}