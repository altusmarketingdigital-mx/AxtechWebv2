import React from "react"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, PackageCheck, User, Laptop, ShieldCheck, DollarSign } from "lucide-react"
import DeliveryFormClient from "./DeliveryFormClient"

export const dynamic = 'force-dynamic'

export default async function FichaEntregaPage({
  params
}: {
  params: Promise<{ id: string }> | { id: string }
}) {
  const resolvedParams = await Promise.resolve(params)
  const id = resolvedParams.id

  const order = await prisma.serviceOrder.findUnique({
    where: { id },
    include: { payments: true }
  })

  if (!order) notFound()

  const totalPaid = order.payments.reduce((sum, p) => sum + p.amount, 0)
  const totalCost = order.costQuote || 0
  const pendingBalance = Math.max(0, totalCost - totalPaid)

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      <div className="flex items-center space-x-4">
        <Link href="/admin/entregas/pendientes" className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition shadow-sm">
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Ficha de Entrega y Garantía</h1>
            <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
              {order.folio}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">Liquidación final, verificación de accesorios y activación de póliza</p>
        </div>
      </div>

      {/* Resumen del Servicio */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-1">
          <span className="text-gray-400 font-bold uppercase text-[10px] block">Cliente</span>
          <p className="font-bold text-gray-900">{order.clientName}</p>
          <p className="text-gray-500">{order.clientPhone}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-1">
          <span className="text-gray-400 font-bold uppercase text-[10px] block">Dispositivo</span>
          <p className="font-bold text-gray-900">{order.brand} {order.model}</p>
          <p className="text-gray-500">{order.deviceType} • S/N: {order.serialNum || 'N/A'}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-1">
          <span className="text-gray-400 font-bold uppercase text-[10px] block">Estado Financiero</span>
          <div className="flex justify-between">
            <span className="text-gray-500">Costo:</span>
            <span className="font-bold text-gray-800">${totalCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Pagado:</span>
            <span className="font-bold text-emerald-600">${totalPaid.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t pt-1">
            <span className="font-bold text-gray-700">Saldo:</span>
            <span className={`font-black ${pendingBalance > 0 ? "text-amber-600" : "text-emerald-600"}`}>
              ${pendingBalance.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Formulario Cliente de Cierre */}
      <DeliveryFormClient 
        order={JSON.parse(JSON.stringify(order))} 
        pendingBalance={pendingBalance} 
      />
    </div>
  )
}