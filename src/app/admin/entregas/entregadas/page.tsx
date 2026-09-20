import React from "react"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { PackageCheck, ShieldCheck, Printer, User, Laptop, Calendar, FileText } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function EntregasHistorialPage() {
  const deliveredOrders = await prisma.serviceOrder.findMany({
    where: {
      status: "DELIVERED"
    },
    include: {
      payments: true
    },
    orderBy: { deliveredAt: "desc" }
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Historial de Entregas y Garantías</h1>
          <p className="text-xs text-gray-500 mt-0.5">Registro oficial de equipos entregados, pólizas activas y comprobantes</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-[10px] border-b border-gray-100">
              <tr>
                <th className="py-3 px-4">Folio</th>
                <th className="py-3 px-4">Cliente</th>
                <th className="py-3 px-4">Equipo</th>
                <th className="py-3 px-4">Recibió</th>
                <th className="py-3 px-4">Fecha Entrega</th>
                <th className="py-3 px-4">Garantía</th>
                <th className="py-3 px-4 text-right">Total Liquidado</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {deliveredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">
                    No se han registrado entregas todavía.
                  </td>
                </tr>
              ) : (
                deliveredOrders.map((ord) => {
                  const isWarrantyActive = ord.warrantyValidUntil 
                    ? new Date(ord.warrantyValidUntil) > new Date() 
                    : false

                  const totalPaid = ord.payments.reduce((sum, p) => sum + p.amount, 0)

                  return (
                    <tr key={ord.id} className="hover:bg-gray-50/50 transition">
                      <td className="py-3.5 px-4 font-bold text-blue-600">
                        <Link href={`/admin/servicios/${ord.folio}`}>{ord.folio}</Link>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-gray-900">
                        {ord.clientName}
                      </td>
                      <td className="py-3.5 px-4 text-gray-600">
                        {ord.brand} {ord.model}
                      </td>
                      <td className="py-3.5 px-4 text-gray-700">
                        {ord.receivedBy || ord.clientName}
                        {ord.receiverIdDoc && (
                          <span className="block text-[10px] text-gray-400">ID: {ord.receiverIdDoc}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-gray-500">
                        {ord.deliveredAt ? new Date(ord.deliveredAt).toLocaleDateString('es-MX') : 'N/A'}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isWarrantyActive 
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                            : "bg-gray-100 text-gray-600 border border-gray-200"
                        }`}>
                          <ShieldCheck size={11} />
                          {isWarrantyActive ? `${ord.warrantyDays || 30}d (Vigente)` : "Expirada"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-black text-gray-900">
                        ${(ord.costQuote || totalPaid).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <Link
                          href={`/admin/entregas/${ord.id}/pdf`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-bold p-1.5 rounded-lg hover:bg-blue-50 transition"
                          title="Imprimir Póliza de Garantía / Comprobante"
                        >
                          <Printer size={15} />
                          <span>Póliza PDF</span>
                        </Link>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}