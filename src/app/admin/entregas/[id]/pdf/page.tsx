import React from "react"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { ShieldCheck, Printer, CheckCircle2, Phone, Mail, Globe, MapPin } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function PolizaEntregaPdfPage({
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

  const settings = await prisma.companySettings.findUnique({
    where: { id: "default" }
  })

  const totalPaid = order.payments.reduce((sum, p) => sum + p.amount, 0)
  const totalCost = order.costQuote || totalPaid

  return (
    <div className="bg-gray-100 min-h-screen font-sans print:bg-white text-sm sm:text-base">
      
      {/* Botón flotante para imprimir */}
      <div className="fixed bottom-8 right-8 print:hidden z-50">
        <button 
          id="print-btn"
          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-4 shadow-2xl flex items-center justify-center transition-transform hover:scale-110 group relative"
        >
          <Printer size={24} />
          <span className="absolute right-full mr-4 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold">
            Imprimir Comprobante y Póliza
          </span>
        </button>
      </div>

      {/* Hoja Formato A4 */}
      <div className="max-w-[210mm] mx-auto bg-white min-h-[297mm] p-[10mm] sm:p-[15mm] md:p-[20mm] print:p-[10mm] shadow-xl print:shadow-none print:max-w-none text-xs text-gray-800 space-y-6">
        
        {/* ENCABEZADO */}
        <header className="flex justify-between items-start border-b-2 border-gray-900 pb-5">
          <div className="max-w-[55%]">
            <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">{settings?.companyName || 'AXTECH INGENIERÍA'}</h1>
            <p className="text-[11px] font-bold text-blue-600 uppercase tracking-widest mt-0.5">Comprobante de Entrega y Póliza de Garantía</p>
            {settings?.address && (
              <p className="text-gray-500 text-[10px] mt-1.5 flex items-start gap-1">
                <MapPin size={12} className="mt-0.5 shrink-0" />
                <span>{settings.address}</span>
              </p>
            )}
            <div className="text-[10px] text-gray-500 flex gap-4 mt-1">
              {settings?.phones && <span>Tel: {settings.phones}</span>}
              {settings?.email && <span>Email: {settings.email}</span>}
            </div>
          </div>

          <div className="text-right">
            <div className="inline-block bg-slate-900 text-white px-4 py-2 rounded-lg text-right">
              <p className="text-[9px] text-gray-300 uppercase tracking-widest font-bold">Folio de Servicio</p>
              <p className="text-lg font-black">{order.folio}</p>
            </div>
            <p className="text-[10px] text-gray-500 mt-2 font-medium">
              Fecha de Entrega: {order.deliveredAt ? new Date(order.deliveredAt).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }) : new Date().toLocaleDateString('es-MX')}
            </p>
          </div>
        </header>

        {/* DATOS DEL CLIENTE Y EQUIPO */}
        <div className="grid grid-cols-2 gap-4">
          <section className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Datos del Cliente</h3>
            <p className="font-bold text-gray-900 text-sm">{order.clientName}</p>
            <p className="text-gray-600 mt-0.5">{order.clientPhone}</p>
            {order.clientEmail && <p className="text-gray-600">{order.clientEmail}</p>}
            {order.clientAddress && <p className="text-gray-500 text-[10px] mt-1">{order.clientAddress}</p>}
          </section>

          <section className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Equipo Entregado</h3>
            <p className="font-bold text-gray-900 text-sm">{order.brand} {order.model}</p>
            <p className="text-gray-600 mt-0.5">Tipo: {order.deviceType} • Folio Eq: {order.equipFolio || 'EQ-000001'}</p>
            {order.serialNum && <p className="text-gray-500 text-[10px] font-mono">S/N: {order.serialNum}</p>}
            {order.color && <p className="text-gray-500 text-[10px]">Color: {order.color}</p>}
          </section>
        </div>

        {/* SERVICIO REALIZADO Y REFACCIONES */}
        <section className="border border-gray-200 rounded-xl p-4 space-y-2">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b pb-1">
            Resumen del Servicio Realizado
          </h3>
          <div className="space-y-1.5 pt-1">
            <p><strong className="font-semibold text-gray-700">Falla inicial:</strong> {order.issueDesc}</p>
            {order.diagnosis && <p><strong className="font-semibold text-gray-700">Diagnóstico:</strong> {order.diagnosis}</p>}
            {order.recommendedSolution && <p><strong className="font-semibold text-gray-700">Trabajo realizado:</strong> {order.recommendedSolution}</p>}
            {order.requiredParts && <p><strong className="font-semibold text-gray-700">Refacciones instaladas:</strong> {order.requiredParts}</p>}
          </div>
        </section>

        {/* LIQUIDACIÓN Y PAGO */}
        <section className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 flex justify-between items-center">
          <div>
            <h3 className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Estado de Cuenta</h3>
            <p className="text-xs text-emerald-700 font-semibold mt-0.5">Servicio completamente liquidado y finiquitado.</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-gray-500 uppercase block font-bold">Importe Total Pagado</span>
            <span className="text-xl font-black text-gray-900">${totalCost.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN</span>
          </div>
        </section>

        {/* PÓLIZA DE GARANTÍA OFICIAL */}
        <section className="border-2 border-blue-600 rounded-xl p-4 bg-blue-50/20 space-y-2">
          <div className="flex items-center justify-between border-b border-blue-200 pb-2">
            <div className="flex items-center gap-2">
              <ShieldCheck size={20} className="text-blue-600" />
              <h3 className="text-xs font-black text-blue-900 uppercase tracking-wide">Póliza de Garantía Oficial</h3>
            </div>
            <span className="bg-blue-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full">
              {order.warrantyDays || 30} DÍAS DE GARANTÍA
            </span>
          </div>

          <p className="text-[11px] leading-relaxed text-gray-700 pt-1">
            Esta garantía cubre exclusivamente la mano de obra del servicio realizado y los componentes o refacciones instaladas descritas en este comprobante. 
            Vigente hasta el: <strong className="font-black text-blue-900">{order.warrantyValidUntil ? new Date(order.warrantyValidUntil).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }) : '30 días a partir de la fecha de entrega'}</strong>.
          </p>

          <ul className="text-[10px] text-gray-500 list-disc pl-4 space-y-0.5">
            <li>La garantía se invalida si el equipo presenta sellos violados, manipulación por terceros, humedad, golpes o variaciones eléctricas.</li>
            <li>Es indispensable presentar este comprobante para cualquier reclamación de garantía.</li>
          </ul>
        </section>

        {/* FIRMAS DE CONFORMIDAD */}
        <section className="pt-10 grid grid-cols-2 gap-12 text-center text-xs">
          <div className="border-t border-gray-400 pt-2 space-y-1">
            <p className="font-bold text-gray-900">{order.receivedBy || order.clientName}</p>
            {order.receiverIdDoc && <p className="text-[10px] text-gray-500">ID / INE: {order.receiverIdDoc}</p>}
            <p className="text-[10px] text-gray-400 font-medium">Firma de Conformidad del Cliente</p>
          </div>

          <div className="border-t border-gray-400 pt-2 space-y-1">
            <p className="font-bold text-gray-900">{settings?.companyName || 'AXTECH INGENIERÍA'}</p>
            <p className="text-[10px] text-gray-500">Entrega en Taller / Servicio Técnico</p>
            <p className="text-[10px] text-gray-400 font-medium">Firma y Sello de Recepción</p>
          </div>
        </section>

      </div>

      {/* Script de impresión nativa */}
      <script dangerouslySetInnerHTML={{__html: `
        function printDoc() { window.print() }
        document.getElementById('print-btn')?.addEventListener('click', printDoc)
      `}} />
    </div>
  )
}