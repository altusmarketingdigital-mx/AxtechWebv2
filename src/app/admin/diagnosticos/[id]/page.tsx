import React from "react"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { 
  ArrowLeft, 
  Stethoscope, 
  FilePlus, 
  Cpu, 
  HardDrive, 
  Monitor, 
  Battery, 
  Wifi, 
  User, 
  Laptop,
  CheckCircle2,
  Save,
  AlertTriangle
} from "lucide-react"
import DiagnosisFormClient from "./DiagnosisFormClient"

export const dynamic = 'force-dynamic'

export default async function FichaDiagnosticoPage({
  params
}: {
  params: Promise<{ id: string }> | { id: string }
}) {
  const resolvedParams = await Promise.resolve(params)
  const id = resolvedParams.id

  const order = await prisma.serviceOrder.findUnique({
    where: { id }
  })

  if (!order) notFound()

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* Encabezado y Acción a Cotización */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Link href="/admin/diagnosticos" className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition shadow-sm">
            <ArrowLeft size={20} className="text-gray-600" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">Diagnóstico Técnico</h1>
              <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                {order.folio}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">Ficha de inspección de hardware, software y solución recomendada</p>
          </div>
        </div>

        {/* BOTÓN MAESTRO: GENERAR COTIZACIÓN */}
        <Link
          href={`/admin/cotizaciones/nueva?clientName=${encodeURIComponent(order.clientName || '')}&clientPhone=${encodeURIComponent(order.clientPhone || '')}&clientEmail=${encodeURIComponent(order.clientEmail || '')}&notes=${encodeURIComponent(`Orden relacionada: ${order.folio} - ${order.brand} ${order.model}. Falla: ${order.issueDesc}`)}`}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition hover:scale-105"
        >
          <FilePlus size={16} />
          <span>GENERAR COTIZACIÓN</span>
        </Link>
      </div>

      {/* Resumen del Equipo y Cliente */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-xs">
          <span className="text-gray-400 font-bold uppercase text-[10px] block mb-1">Cliente</span>
          <p className="font-bold text-gray-900 truncate">{order.clientName}</p>
          <p className="text-gray-500">{order.clientPhone}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-xs">
          <span className="text-gray-400 font-bold uppercase text-[10px] block mb-1">Dispositivo</span>
          <p className="font-bold text-gray-900 truncate">{order.brand} {order.model}</p>
          <p className="text-gray-500">{order.deviceType} • {order.equipFolio || 'EQ-000001'}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-xs">
          <span className="text-gray-400 font-bold uppercase text-[10px] block mb-1">Contraseña / PIN</span>
          <p className="font-mono font-bold text-indigo-600">{order.devicePassword || 'Sin contraseña'}</p>
          <p className="text-gray-500 truncate">S/N: {order.serialNum || 'N/A'}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-xs">
          <span className="text-gray-400 font-bold uppercase text-[10px] block mb-1">Estado de Orden</span>
          <span className="inline-block px-2 py-0.5 font-bold rounded-full bg-blue-50 text-blue-700 text-[10px]">
            {order.status}
          </span>
          <p className="text-[10px] text-gray-400 mt-1">Recibido: {order.createdAt.toLocaleDateString('es-MX')}</p>
        </div>
      </div>

      {/* Formulario Interactivo de Evaluación */}
      <DiagnosisFormClient order={JSON.parse(JSON.stringify(order))} />
    </div>
  )
}