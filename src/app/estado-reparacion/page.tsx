import React from "react"
import prisma from "@/lib/prisma"
import Link from "next/link"
import { 
  Search, 
  Wrench, 
  CheckCircle2, 
  Clock, 
  ArrowLeft, 
  Laptop, 
  Calendar, 
  FileText, 
  DollarSign, 
  ShieldCheck, 
  PhoneCall, 
  MessageCircle, 
  AlertCircle,
  Sparkles,
  Layers,
  Check
} from "lucide-react"

type OrderStatus = 'RECEIVED' | 'DIAGNOSING' | 'WAITING_APPROVAL' | 'REPAIRING' | 'READY' | 'DELIVERED' | 'CANCELLED'

const STEPS = [
  { id: 'RECEIVED', label: 'Recibido', desc: 'Equipo en taller' },
  { id: 'DIAGNOSING', label: 'Diagnóstico', desc: 'Revisión técnica' },
  { id: 'WAITING_APPROVAL', label: 'Cotización', desc: 'Esperando aprobación' },
  { id: 'REPAIRING', label: 'Reparación', desc: 'Mano de obra y refacciones' },
  { id: 'READY', label: 'Listo', desc: 'Para entrega o recolección' },
]

function getStepIndex(status: string) {
  switch (status) {
    case 'RECEIVED': return 0
    case 'DIAGNOSING': return 1
    case 'WAITING_APPROVAL': return 2
    case 'REPAIRING': return 3
    case 'READY':
    case 'DELIVERED': return 4
    case 'CANCELLED': return -1
    default: return 0
  }
}

const statusBadge: Record<string, { label: string; bg: string; text: string; ring: string }> = {
  RECEIVED:         { label: 'Recibido en Taller',      bg: 'bg-blue-500/10',   text: 'text-blue-600',   ring: 'ring-blue-500/30' },
  DIAGNOSING:       { label: 'En Diagnóstico',         bg: 'bg-yellow-500/10', text: 'text-yellow-700', ring: 'ring-yellow-500/30' },
  WAITING_APPROVAL: { label: 'Esperando tu Aprobación',bg: 'bg-orange-500/10', text: 'text-orange-700', ring: 'ring-orange-500/30' },
  REPAIRING:        { label: 'En Reparación',          bg: 'bg-purple-500/10', text: 'text-purple-700', ring: 'ring-purple-500/30' },
  READY:            { label: 'Listo para Entrega',     bg: 'bg-green-500/10',  text: 'text-green-700',  ring: 'ring-green-500/30' },
  DELIVERED:        { label: 'Entregado al Cliente',   bg: 'bg-slate-500/10',  text: 'text-slate-700',  ring: 'ring-slate-500/30' },
  CANCELLED:        { label: 'Servicio Cancelado',     bg: 'bg-red-500/10',    text: 'text-red-700',    ring: 'ring-red-500/30' },
}

export default async function TrackOrderPage({
  searchParams,
}: {
  searchParams: Promise<{ folio?: string }>
}) {
  const params = await searchParams
  const rawFolio = params.folio
  const folio = rawFolio ? rawFolio.trim().toUpperCase() : null

  let order = null
  let error = ""

  if (folio) {
    order = await prisma.serviceOrder.findFirst({
      where: {
        OR: [
          { folio: folio },
          { clientPhone: folio },
          { clientEmail: folio.toLowerCase() }
        ]
      },
      include: {
        payments: true
      }
    })

    if (!order) {
      error = `No se encontró ninguna orden con el folio o dato "${folio}". Por favor verifica el número e intenta nuevamente.`
    }
  }

  const currentStep = order ? getStepIndex(order.status) : 0
  const isDelivered = order?.status === 'DELIVERED'
  const isCancelled = order?.status === 'CANCELLED'

  const totalPayments = order?.payments.reduce((acc, p) => acc + p.amount, 0) || 0
  const pendingBalance = order?.costQuote ? Math.max(0, order.costQuote - totalPayments) : null

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col selection:bg-blue-500 selection:text-white">
      
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition border border-slate-700/60"
          >
            <ArrowLeft size={16} />
            <span>Regresar a Página</span>
          </Link>

          <div className="text-center">
            <Link href="/" className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
              AXTECH <span className="text-blue-500">INGENIERÍA</span>
            </Link>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Seguimiento Técnico en Línea
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition hidden sm:inline-block"
            >
              Portal de Clientes
            </Link>
            <a
              href="https://wa.me/525513485574"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded-xl text-xs font-bold transition shadow-sm"
            >
              <MessageCircle size={14} />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full space-y-10">
        
        {/* Title Hero */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles size={13} className="text-blue-400" />
            Consulta en Tiempo Real
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Rastrea el Estado de tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">Equipo</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto">
            Ingresa tu número de folio (ej. <strong className="text-slate-200">ORD-0001</strong>) o tu número de teléfono para conocer el diagnóstico, avance y presupuesto de tu reparación.
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-3xl p-4 sm:p-6 shadow-2xl shadow-blue-950/30 backdrop-blur-xl">
          <form className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                name="folio"
                defaultValue={folio || ""}
                placeholder="Ejemplo: ORD-0001 o tu teléfono..." 
                className="w-full pl-12 pr-4 py-3.5 bg-slate-900/90 border border-slate-700/70 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm sm:text-base"
                required
              />
            </div>
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/30 hover:scale-[1.02] flex items-center justify-center gap-2 shrink-0 text-sm sm:text-base"
            >
              <Search size={18} />
              <span>Consultar Estado</span>
            </button>
          </form>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-5 rounded-2xl flex items-start gap-3 text-sm">
            <AlertCircle size={20} className="shrink-0 mt-0.5 text-red-400" />
            <div>
              <p className="font-semibold">No se encontraron resultados</p>
              <p className="text-red-300/80 text-xs mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Order Details Display */}
        {order && (
          <div className="bg-slate-950/80 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl space-y-8 animate-in fade-in zoom-in-95 duration-300">
            
            {/* Order Top Banner */}
            <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950 border-b border-slate-800 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Orden de Servicio</span>
                <h2 className="text-3xl font-black text-white font-mono mt-0.5">{order.folio}</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Cliente: <strong className="text-slate-200">{order.clientName || order.clientEmail || 'Cliente Axtech'}</strong>
                </p>
              </div>

              {(() => {
                const badge = statusBadge[order.status] || { label: order.status, bg: 'bg-slate-800', text: 'text-white', ring: 'ring-slate-700' }
                return (
                  <div className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold uppercase tracking-wide ring-1 ${badge.bg} ${badge.text} ${badge.ring} self-start sm:self-auto`}>
                    {badge.label}
                  </div>
                )
              })()}
            </div>

            {/* Stepper Timeline (Only if not cancelled) */}
            {!isCancelled && (
              <div className="px-6 sm:px-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
                  <Layers size={14} className="text-blue-400" />
                  Progreso del Servicio
                </h3>
                
                <div className="grid grid-cols-5 gap-2 relative">
                  {STEPS.map((step, idx) => {
                    const isPassed = idx < currentStep || isDelivered
                    const isCurrent = idx === currentStep && !isDelivered

                    return (
                      <div key={step.id} className="flex flex-col items-center text-center space-y-2 relative">
                        {/* Connecting line */}
                        {idx < STEPS.length - 1 && (
                          <div 
                            className={`absolute top-4 left-1/2 w-full h-1 -z-0 transition-all ${
                              idx < currentStep ? 'bg-blue-500' : 'bg-slate-800'
                            }`}
                          />
                        )}

                        {/* Step Circle */}
                        <div 
                          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center font-bold text-xs sm:text-sm z-10 transition-all ${
                            isPassed 
                              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40 ring-4 ring-slate-900' 
                              : isCurrent 
                                ? 'bg-blue-500 text-white ring-4 ring-blue-500/30 animate-pulse' 
                                : 'bg-slate-800 text-slate-500 ring-4 ring-slate-900'
                          }`}
                        >
                          {isPassed ? <Check size={16} /> : idx + 1}
                        </div>

                        {/* Step Labels */}
                        <div>
                          <p className={`text-xs font-bold ${isPassed || isCurrent ? 'text-white' : 'text-slate-500'}`}>
                            {step.label}
                          </p>
                          <p className="text-[10px] text-slate-500 hidden sm:block mt-0.5">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Information Grid */}
            <div className="px-6 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Equipo Info */}
              <div className="bg-slate-900/90 border border-slate-800/80 p-5 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                  <Laptop size={16} />
                  <span>Detalles del Dispositivo</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">{order.brand} {order.model}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Tipo: <span className="text-slate-200 font-medium">{order.deviceType}</span></p>
                  {order.serialNum && (
                    <p className="text-xs text-slate-400 mt-0.5 font-mono">Serie: {order.serialNum}</p>
                  )}
                </div>
              </div>

              {/* Fecha Info */}
              <div className="bg-slate-900/90 border border-slate-800/80 p-5 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                  <Calendar size={16} />
                  <span>Fechas & Registro</span>
                </div>
                <div className="space-y-1 text-xs">
                  <p className="text-slate-400">
                    Fecha de Ingreso: <strong className="text-slate-200">{new Date(order.createdAt).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
                  </p>
                  {order.serviceDate && (
                    <p className="text-slate-400">
                      Fecha Estimada: <strong className="text-blue-400">{new Date(order.serviceDate).toLocaleDateString('es-MX')}</strong>
                    </p>
                  )}
                  <p className="text-slate-400">
                    Estatus Actual: <strong className="text-slate-200">{order.status}</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Problem Report & Technical Diagnosis */}
            <div className="px-6 sm:px-8 space-y-4">
              
              {/* Problema */}
              <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <FileText size={15} className="text-yellow-400" />
                  Problema Reportado por el Cliente
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/60">
                  {order.issueDesc}
                </p>
              </div>

              {/* Diagnóstico */}
              {order.diagnosis && (
                <div className="bg-blue-950/30 border border-blue-800/40 p-5 rounded-2xl space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2">
                    <Wrench size={15} className="text-blue-400" />
                    Diagnóstico Técnico Especializado
                  </h4>
                  <p className="text-sm text-blue-100 leading-relaxed bg-blue-950/50 p-3.5 rounded-xl border border-blue-800/50">
                    {order.diagnosis}
                  </p>
                </div>
              )}

              {/* Notas de reparación */}
              {order.repairNotes && (
                <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-green-400 flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-green-400" />
                    Trabajo y Reparaciones Realizadas
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/60">
                    {order.repairNotes}
                  </p>
                </div>
              )}
            </div>

            {/* Presupuesto & Pagos */}
            {order.costQuote !== null && (
              <div className="px-6 sm:px-8">
                <div className="bg-gradient-to-br from-slate-900 to-blue-950/50 border border-blue-800/40 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Resumen Financiero</span>
                    <h4 className="text-xl font-bold text-white mt-1">Presupuesto del Servicio</h4>
                    {totalPayments > 0 && (
                      <p className="text-xs text-green-400 mt-0.5 font-medium">
                        Anticipo registrado: ${totalPayments.toFixed(2)} MXN
                      </p>
                    )}
                  </div>
                  
                  <div className="text-left md:text-right">
                    <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                      ${order.costQuote.toFixed(2)} <span className="text-sm font-bold text-slate-400">MXN</span>
                    </p>
                    {pendingBalance !== null && (
                      <p className="text-xs text-slate-400 mt-1">
                        Saldo a liquidar al entregar: <strong className="text-white">${pendingBalance.toFixed(2)} MXN</strong>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Customer Actions & Contact Bar */}
            <div className="p-6 sm:p-8 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-sm font-bold text-white">¿Deseas aprobar o consultar sobre tu orden?</p>
                <p className="text-xs text-slate-400 mt-0.5">Escríbenos directamente indicando tu folio <strong className="text-blue-400">{order.folio}</strong></p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={`https://wa.me/525513485574?text=Hola,%20quisiera%20consultar%20el%20estatus%20de%20mi%20orden%20${order.folio}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl text-sm font-bold transition shadow-lg shadow-green-600/20"
                >
                  <MessageCircle size={18} />
                  <span>Contactar por WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        )}

        {/* Bottom Trust Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="bg-slate-950/50 border border-slate-800/60 p-5 rounded-2xl flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h5 className="font-bold text-xs text-white">Garantía en Reparaciones</h5>
              <p className="text-[11px] text-slate-400">Refacciones originales y mano de obra calificada.</p>
            </div>
          </div>

          <div className="bg-slate-950/50 border border-slate-800/60 p-5 rounded-2xl flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center shrink-0">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <h5 className="font-bold text-xs text-white">Diagnóstico Profesional</h5>
              <p className="text-[11px] text-slate-400">Revisión exhaustiva de hardware y software.</p>
            </div>
          </div>

          <div className="bg-slate-950/50 border border-slate-800/60 p-5 rounded-2xl flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
              <PhoneCall size={20} />
            </div>
            <div>
              <h5 className="font-bold text-xs text-white">Atención Personalizada</h5>
              <p className="text-[11px] text-slate-400">Soporte directo vía WhatsApp y telefónica.</p>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-4 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} AXTECH INGENIERÍA — Soluciones Tecnológicas Especializadas.</p>
      </footer>
    </div>
  )
}
