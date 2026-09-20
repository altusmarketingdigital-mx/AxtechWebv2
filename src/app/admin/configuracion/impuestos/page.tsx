import React from "react"
import prisma from "@/lib/prisma"
import Link from "next/link"
import { Settings, ShieldCheck, ArrowLeft } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function ConfigSubViewPage() {
  const settings = await prisma.companySettings.findUnique({
    where: { id: "default" }
  })

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/admin/configuracion" className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition shadow-sm">
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Tasas de Impuestos y Retenciones</h1>
          <p className="text-xs text-gray-500 mt-0.5">Configuración de IVA (16%) y retención de ISR aplicables a servicios y ventas</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4 text-xs">
        <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
          <ShieldCheck size={18} />
          <span className="font-semibold">Parámetro sincronizado con el núcleo de Service Desk de AXTECH.</span>
        </div>

        <div className="space-y-3 text-gray-700 leading-relaxed">
          <p>
            Esta configuración alimenta directamente las plantillas de órdenes de servicio, presupuestos en PDF, cálculos fiscales de cotización y los accesos públicos de seguimiento.
          </p>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 font-mono text-[11px] space-y-1">
            <p><strong>Empresa emisora:</strong> {settings?.companyName || 'AXTECH INGENIERÍA'}</p>
            <p><strong>Tasa de IVA general:</strong> {settings?.defaultIva || 16}%</p>
            <p><strong>Teléfonos oficiales:</strong> {settings?.phones || '55 1234 5678'}</p>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-100 flex justify-end">
          <Link
            href="/admin/configuracion"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition"
          >
            Editar Parámetros Generales
          </Link>
        </div>
      </div>
    </div>
  )
}
