import React from "react"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { PackageCheck, Clock, CheckCircle2, DollarSign, Laptop, ArrowRight, ShieldCheck, User } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function EntregasPendientesPage() {
  const orders = await prisma.serviceOrder.findMany({
    where: {
      status: { in: ['READY', 'REPAIRING'] }
    },
    include: {
      payments: true
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Equipos Listos para Entrega</h1>
          <p className="text-xs text-gray-500 mt-0.5">Control de liquidación, entrega formal y emisión de póliza de garantía</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.length === 0 ? (
          <div className="col-span-full bg-white p-12 text-center rounded-2xl border border-gray-100">
            <PackageCheck size={40} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-sm font-bold text-gray-700">Sin equipos pendientes de entrega</h3>
            <p className="text-xs text-gray-400 mt-1">Los equipos listos aparecerán aquí para su liquidación y entrega.</p>
          </div>
        ) : (
          orders.map((ord) => {
            const totalPayments = ord.payments.reduce((sum, p) => sum + p.amount, 0)
            const totalQuote = ord.costQuote || 0
            const pendingBalance = Math.max(0, totalQuote - totalPayments)

            return (
              <div 
                key={ord.id} 
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                      {ord.folio}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      ord.status === 'READY' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    }`}>
                      {ord.status === 'READY' ? 'Listo p/ Entrega' : 'En Reparación'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-gray-900 leading-snug truncate">
                      {ord.brand} {ord.model}
                    </h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                      <User size={13} className="text-gray-400" /> {ord.clientName}
                    </p>
                  </div>

                  {/* Estado Financiero */}
                  <div className="grid grid-cols-2 gap-2 bg-gray-50 p-2.5 rounded-xl border border-gray-100 text-xs">
                    <div>
                      <span className="text-[10px] text-gray-400 block font-bold uppercase">Costo Total</span>
                      <span className="font-bold text-gray-800">
                        ${totalQuote.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block font-bold uppercase">Saldo x Liquidar</span>
                      <span className={`font-black ${pendingBalance > 0 ? "text-amber-600" : "text-emerald-600"}`}>
                        ${pendingBalance.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/admin/entregas/${ord.id}`}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <PackageCheck size={16} />
                  <span>Procesar Entrega y Garantía</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}