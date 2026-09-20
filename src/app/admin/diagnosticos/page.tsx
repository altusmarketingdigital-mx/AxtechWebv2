import React from "react"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { Stethoscope, Clock, CheckCircle2, AlertTriangle, ArrowRight, Laptop } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function DiagnosticosListPage() {
  const orders = await prisma.serviceOrder.findMany({
    where: {
      status: { in: ['RECEIVED', 'DIAGNOSING', 'WAITING_APPROVAL', 'REPAIRING'] }
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Centro de Diagnósticos</h1>
          <p className="text-xs text-gray-500 mt-0.5">Evaluación de hardware, causas raíz y presupuestos técnicos</p>
        </div>
      </div>

      {/* Tarjetas de Órdenes para Diagnóstico */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.length === 0 ? (
          <div className="col-span-full bg-white p-12 text-center rounded-2xl border border-gray-100">
            <Stethoscope size={40} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-sm font-bold text-gray-700">Sin equipos pendientes de diagnóstico</h3>
            <p className="text-xs text-gray-400 mt-1">Todas las órdenes recibidas han sido diagnosticadas o entregadas.</p>
          </div>
        ) : (
          orders.map((ord) => (
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
                    ord.status === 'RECEIVED' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                    ord.status === 'DIAGNOSING' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                    'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {ord.status === 'RECEIVED' ? 'Sin Diagnóstico' :
                     ord.status === 'DIAGNOSING' ? 'En Revisión' : 'Listo p/ Cotizar'}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-900 leading-snug truncate">
                    {ord.brand} {ord.model}
                  </h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                    <Laptop size={13} className="text-gray-400" /> {ord.deviceType} • {ord.clientName}
                  </p>
                </div>

                <div className="p-3 bg-gray-50 rounded-xl text-xs text-gray-600 border border-gray-100">
                  <span className="font-semibold text-gray-700 block mb-0.5">Falla reportada:</span>
                  <p className="line-clamp-2 text-gray-500">{ord.issueDesc}</p>
                </div>
              </div>

              <Link
                href={`/admin/diagnosticos/${ord.id}`}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition"
              >
                <Stethoscope size={15} />
                <span>Abrir Ficha de Diagnóstico</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  )
}