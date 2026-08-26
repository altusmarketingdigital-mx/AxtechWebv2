import React from "react"
import prisma from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"
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
  Check,
  ChevronRight,
  ShoppingBag,
  User,
  Phone,
  Mail
} from "lucide-react"

type OrderStatus = 'RECEIVED' | 'DIAGNOSING' | 'WAITING_APPROVAL' | 'REPAIRING' | 'READY' | 'DELIVERED' | 'CANCELLED'

const STEPS = [
  { id: 'RECEIVED', label: 'Recibido', desc: 'Equipo en taller' },
  { id: 'DIAGNOSING', label: 'Diagnóstico', desc: 'Revisión técnica' },
  { id: 'WAITING_APPROVAL', label: 'Cotización', desc: 'Esperando aprobación' },
  { id: 'REPAIRING', label: 'Reparación', desc: 'Mano de obra y piezas' },
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

const statusBadge: Record<string, { label: string; bg: string; text: string; border: string }> = {
  RECEIVED:         { label: 'Recibido en Taller',      bg: 'bg-blue-50',   text: 'text-blue-700',   border: 'border-blue-200' },
  DIAGNOSING:       { label: 'En Diagnóstico',         bg: 'bg-amber-50',  text: 'text-amber-800',  border: 'border-amber-200' },
  WAITING_APPROVAL: { label: 'Esperando tu Aprobación',bg: 'bg-orange-50', text: 'text-orange-800', border: 'border-orange-200' },
  REPAIRING:        { label: 'En Reparación',          bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-200' },
  READY:            { label: 'Listo para Entrega',     bg: 'bg-emerald-50',text: 'text-emerald-800',border: 'border-emerald-200' },
  DELIVERED:        { label: 'Entregado al Cliente',   bg: 'bg-slate-100', text: 'text-slate-800',  border: 'border-slate-300' },
  CANCELLED:        { label: 'Servicio Cancelado',     bg: 'bg-red-50',    text: 'text-red-700',    border: 'border-red-200' },
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
      error = `No se encontró ninguna orden registrada con "${folio}". Verifica tu folio o teléfono y vuelve a intentarlo.`
    }
  }

  const currentStep = order ? getStepIndex(order.status) : 0
  const isDelivered = order?.status === 'DELIVERED'
  const isCancelled = order?.status === 'CANCELLED'

  const totalPayments = order?.payments.reduce((acc, p) => acc + p.amount, 0) || 0
  const pendingBalance = order?.costQuote ? Math.max(0, order.costQuote - totalPayments) : null

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-primary/20">
      
      {/* Exact Brand Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-200 z-50 px-6 py-2 flex justify-between items-center transition-all shadow-sm">
        <Link href="/" className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform shrink-0">
          <Image src="/logo.png" alt="AXTECH INGENIERÍA" width={160} height={45} className="object-contain" priority />
        </Link>
        
        <div className="hidden lg:flex gap-8 font-medium text-sm text-gray-800 items-center">
          <Link href="/#inicio" className="hover:text-primary transition-all">INICIO</Link>
          <Link href="/#soluciones" className="hover:text-primary transition-all">SOLUCIONES</Link>
          <Link href="/#nosotros" className="hover:text-primary transition-all">NOSOTROS</Link>
          <Link href="/#contacto" className="hover:text-primary transition-all">CONTACTO</Link>
          <Link 
            href="/tienda" 
            className="flex items-center gap-1.5 font-bold text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full hover:bg-blue-100 transition-all border border-blue-200"
          >
            <ShoppingBag className="w-4 h-4 text-blue-600" />
            TIENDA ONLINE
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-600 hover:text-primary px-3 py-1.5 rounded-lg hover:bg-gray-100 transition"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Regresar a Página</span>
          </Link>
          <Link
            href="/login"
            className="border border-gray-300 text-gray-700 hover:border-primary hover:text-primary px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5"
          >
            <User className="w-4 h-4" />
            Iniciar Sesión
          </Link>
        </div>
      </nav>

      {/* Hero Section Header */}
      <section className="relative pt-36 pb-12 px-6 bg-gradient-to-b from-white via-blue-50/40 to-slate-50 border-b border-gray-200/80 overflow-hidden">
        {/* Soft Background Glows */}
        <div className="absolute top-10 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-10 -right-20 w-80 h-80 bg-accent/15 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-primary text-xs font-bold uppercase tracking-wider">
            <Sparkles size={14} className="text-accent" />
            Seguimiento de Servicio Técnico
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-gray-900 leading-tight">
            Consulta el Estado de tu <span className="text-gradient-brand">Equipo</span>
          </h1>
          
          <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto font-light leading-relaxed">
            Ingresa el <strong className="text-gray-900 font-semibold">Folio de Servicio</strong> (ej. ORD-0001) o tu número de teléfono registrado para ver el avance y diagnóstico de tu reparación.
          </p>

          {/* Search Box */}
          <div className="pt-4 max-w-2xl mx-auto">
            <div className="bg-white p-3 sm:p-4 rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-200">
              <form className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    name="folio"
                    defaultValue={folio || ""}
                    placeholder="Escribe tu folio (ej. ORD-0001) o teléfono..." 
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition text-sm sm:text-base font-medium"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-2xl font-bold transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 flex items-center justify-center gap-2 shrink-0 text-sm sm:text-base cursor-pointer"
                >
                  <Search size={18} />
                  <span>Rastrear Orden</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Main Results Section */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-10 w-full space-y-8">
        
        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-5 rounded-2xl flex items-start gap-3 text-sm shadow-sm animate-in fade-in">
            <AlertCircle size={20} className="shrink-0 mt-0.5 text-red-600" />
            <div>
              <p className="font-bold text-red-900">Orden no encontrada</p>
              <p className="text-red-700 text-xs mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Order Details Card */}
        {order && (
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xl shadow-slate-900/5 space-y-8 animate-in fade-in duration-300">
            
            {/* Order Top Banner */}
            <div className="p-6 sm:p-8 bg-gradient-to-r from-blue-50/70 via-white to-amber-50/50 border-b border-gray-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Orden de Servicio Técnico</span>
                <h2 className="text-3xl font-extrabold text-primary font-mono mt-0.5">{order.folio}</h2>
                <p className="text-xs text-gray-600 mt-1">
                  Cliente: <strong className="text-gray-900">{order.clientName || order.clientEmail || 'Cliente Axtech'}</strong>
                </p>
              </div>

              {(() => {
                const badge = statusBadge[order.status] || { label: order.status, bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300' }
                return (
                  <div className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold uppercase tracking-wide border ${badge.bg} ${badge.text} ${badge.border} self-start sm:self-auto shadow-sm`}>
                    {badge.label}
                  </div>
                )
              })()}
            </div>

            {/* Stepper Timeline */}
            {!isCancelled && (
              <div className="px-6 sm:px-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-6 flex items-center gap-2">
                  <Layers size={14} className="text-primary" />
                  Estatus del Proceso
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
                              idx < currentStep ? 'bg-primary' : 'bg-gray-200'
                            }`}
                          />
                        )}

                        {/* Step Circle */}
                        <div 
                          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center font-bold text-xs sm:text-sm z-10 transition-all ${
                            isPassed 
                              ? 'bg-primary text-white shadow-md shadow-primary/30 ring-4 ring-white' 
                              : isCurrent 
                                ? 'bg-accent text-gray-950 ring-4 ring-accent/30 font-black animate-pulse' 
                                : 'bg-gray-100 text-gray-400 ring-4 ring-white border border-gray-200'
                          }`}
                        >
                          {isPassed ? <Check size={16} /> : idx + 1}
                        </div>

                        {/* Step Labels */}
                        <div>
                          <p className={`text-xs font-bold ${isPassed || isCurrent ? 'text-gray-900' : 'text-gray-400'}`}>
                            {step.label}
                          </p>
                          <p className="text-[10px] text-gray-500 hidden sm:block mt-0.5">
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
              <div className="bg-gray-50/80 border border-gray-200 p-5 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider">
                  <Laptop size={16} />
                  <span>Equipo / Dispositivo</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{order.brand} {order.model}</h4>
                  <p className="text-xs text-gray-600 mt-0.5">Tipo: <span className="text-gray-900 font-semibold">{order.deviceType}</span></p>
                  {order.serialNum && (
                    <p className="text-xs text-gray-500 mt-0.5 font-mono">No. Serie: {order.serialNum}</p>
                  )}
                </div>
              </div>

              {/* Fecha Info */}
              <div className="bg-gray-50/80 border border-gray-200 p-5 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider">
                  <Calendar size={16} />
                  <span>Fechas de Servicio</span>
                </div>
                <div className="space-y-1 text-xs">
                  <p className="text-gray-600">
                    Fecha de Ingreso: <strong className="text-gray-900">{new Date(order.createdAt).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
                  </p>
                  {order.serviceDate && (
                    <p className="text-gray-600">
                      Fecha Estimada de Entrega: <strong className="text-primary">{new Date(order.serviceDate).toLocaleDateString('es-MX')}</strong>
                    </p>
                  )}
                  <p className="text-gray-600">
                    Estatus Actual: <strong className="text-gray-900">{order.status}</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Problem & Diagnosis */}
            <div className="px-6 sm:px-8 space-y-4">
              
              {/* Falla reportada */}
              <div className="bg-white border border-gray-200 p-5 rounded-2xl space-y-2 shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                  <FileText size={15} className="text-amber-500" />
                  Problema Reportado por el Cliente
                </h4>
                <p className="text-sm text-gray-800 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                  {order.issueDesc}
                </p>
              </div>

              {/* Diagnóstico */}
              {order.diagnosis && (
                <div className="bg-blue-50/50 border border-blue-200/80 p-5 rounded-2xl space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                    <Wrench size={15} className="text-primary" />
                    Diagnóstico Técnico Especializado
                  </h4>
                  <p className="text-sm text-blue-950 leading-relaxed bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                    {order.diagnosis}
                  </p>
                </div>
              )}

              {/* Notas de reparación */}
              {order.repairNotes && (
                <div className="bg-emerald-50/50 border border-emerald-200 p-5 rounded-2xl space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-600" />
                    Trabajo y Reparaciones Realizadas
                  </h4>
                  <p className="text-sm text-emerald-950 leading-relaxed bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                    {order.repairNotes}
                  </p>
                </div>
              )}
            </div>

            {/* Presupuesto & Pagos */}
            {order.costQuote !== null && (
              <div className="px-6 sm:px-8">
                <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 border border-blue-200 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">Resumen Financiero</span>
                    <h4 className="text-xl font-bold text-gray-900 mt-1">Presupuesto del Servicio</h4>
                    {totalPayments > 0 && (
                      <p className="text-xs text-emerald-700 mt-0.5 font-semibold">
                        ✓ Anticipo abonado: ${totalPayments.toFixed(2)} MXN
                      </p>
                    )}
                  </div>
                  
                  <div className="text-left md:text-right">
                    <p className="text-3xl font-black text-primary">
                      ${order.costQuote.toFixed(2)} <span className="text-sm font-bold text-gray-500">MXN</span>
                    </p>
                    {pendingBalance !== null && (
                      <p className="text-xs text-gray-600 mt-1">
                        Saldo a liquidar al entregar: <strong className="text-gray-900 font-bold">${pendingBalance.toFixed(2)} MXN</strong>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Contact Action Bar */}
            <div className="p-6 sm:p-8 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-sm font-bold text-gray-900">¿Deseas autorizar la cotización o tienes alguna duda?</p>
                <p className="text-xs text-gray-500 mt-0.5">Escríbenos directamente indicando tu folio <strong className="text-primary font-bold">{order.folio}</strong></p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={`https://wa.me/525513485574?text=Hola,%20quisiera%20consultar%20el%20estatus%20de%20mi%20orden%20${order.folio}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-bold transition shadow-lg shadow-green-600/20 hover:scale-105"
                >
                  <MessageCircle size={18} />
                  <span>Contactar por WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        )}

        {/* Trust Badges matching Homepage */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="bg-white border border-gray-200 p-5 rounded-2xl flex items-center gap-3.5 shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-primary flex items-center justify-center shrink-0 border border-blue-100">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h5 className="font-bold text-sm text-gray-900">Garantía en Reparaciones</h5>
              <p className="text-xs text-gray-500">Refacciones de alta calidad y mano de obra calificada.</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-5 rounded-2xl flex items-center gap-3.5 shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <h5 className="font-bold text-sm text-gray-900">Diagnóstico Profesional</h5>
              <p className="text-xs text-gray-500">Revisión exhaustiva de hardware y software.</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-5 rounded-2xl flex items-center gap-3.5 shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
              <PhoneCall size={22} />
            </div>
            <div>
              <h5 className="font-bold text-sm text-gray-900">Atención Personalizada</h5>
              <p className="text-xs text-gray-500">Soporte directo vía WhatsApp y telefónica.</p>
            </div>
          </div>
        </div>

      </main>

      {/* Brand Footer */}
      <footer className="bg-[#02040a] pt-16 pb-10 px-6 border-t border-white/10 relative overflow-hidden mt-16 text-gray-300">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/10 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 relative z-10">
          
          <div className="space-y-6">
            <Image src="/logo.png" alt="AXTECH INGENIERÍA" width={160} height={45} className="object-contain bg-white px-3 py-1 rounded-full shadow-lg" />
            <p className="text-gray-300 text-sm leading-relaxed">
              Innovación, ingeniería y tecnología para impulsar el crecimiento de tu empresa.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Enlaces Rápidos</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/#inicio" className="hover:text-primary transition-colors">Inicio</Link></li>
              <li><Link href="/#soluciones" className="hover:text-primary transition-colors">Soluciones</Link></li>
              <li><Link href="/tienda" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors flex items-center gap-1.5"><ShoppingBag size={14} /> Tienda en Línea</Link></li>
              <li><Link href="/estado-reparacion" className="hover:text-primary transition-colors">Rastrear mi Equipo</Link></li>
              <li><Link href="/login" className="hover:text-primary transition-colors">Iniciar Sesión</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Contacto</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" /> 55 1348 5574
              </li>
              <li className="flex items-center gap-2 break-all">
                <Mail className="w-4 h-4 text-accent" /> ventas@axtech-ingenieria.com
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Portal de Clientes</h4>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              Inicia sesión para revisar todas tus órdenes de servicio y compras pasadas.
            </p>
            <Link
              href="/login"
              className="inline-block bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-full font-bold text-xs transition shadow-md"
            >
              Acceso a Clientes →
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-white/10 pt-6 text-center text-xs text-gray-500 relative z-10">
          <p>© {new Date().getFullYear()} AXTECH INGENIERÍA. Todos los derechos reservados.</p>
        </div>
      </footer>

    </div>
  )
}
