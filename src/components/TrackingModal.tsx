"use client"

import React, { useState } from "react"
import { 
  Search, 
  X, 
  Laptop, 
  Calendar, 
  FileText, 
  Wrench, 
  CheckCircle2, 
  MessageCircle, 
  AlertCircle, 
  Layers, 
  Check, 
  Loader2,
  DollarSign
} from "lucide-react"
import { searchServiceOrderByQuery } from "@/app/actions/serviceOrderActions"

const STEPS = [
  { id: 'RECEIVED', label: 'Recibido', desc: 'En taller' },
  { id: 'DIAGNOSING', label: 'Diagnóstico', desc: 'Revisión' },
  { id: 'WAITING_APPROVAL', label: 'Cotización', desc: 'Por aprobar' },
  { id: 'REPAIRING', label: 'Reparación', desc: 'En proceso' },
  { id: 'READY', label: 'Listo', desc: 'Entrega' },
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

export default function TrackingModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [order, setOrder] = useState<any | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setError("")
    setOrder(null)

    const res = await searchServiceOrderByQuery(query)
    if (res.success && res.order) {
      setOrder(res.order)
    } else {
      setError(res.error || "No se encontró la orden")
    }
    setLoading(false)
  }

  const handleClose = () => {
    setIsOpen(false)
    setError("")
    setOrder(null)
    setQuery("")
  }

  const currentStep = order ? getStepIndex(order.status) : 0
  const isDelivered = order?.status === 'DELIVERED'
  const isCancelled = order?.status === 'CANCELLED'
  const totalPayments = order?.payments?.reduce((acc: number, p: any) => acc + p.amount, 0) || 0
  const pendingBalance = order?.costQuote ? Math.max(0, order.costQuote - totalPayments) : null

  return (
    <>
      {/* Trigger Card Button */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between">
        <div>
          <p className="font-semibold text-gray-800">Seguimiento Público</p>
          <p className="text-sm text-gray-500">Consulta el estado de tu equipo por folio o teléfono</p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-bold transition shadow-sm cursor-pointer hover:scale-105 active:scale-95"
        >
          Consultar
        </button>
      </div>

      {/* Modal Popup */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-200"
          onClick={handleClose}
        >
          <div 
            className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden max-h-[90vh] flex flex-col relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-50/60 to-white shrink-0">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-gray-900">
                  Rastreo de Orden de Servicio
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Ingresa tu número de folio o teléfono registrado
                </p>
              </div>
              <button
                onClick={handleClose}
                className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 flex items-center justify-center transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body / Scrollable */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
              
              {/* Search Form */}
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ej. ORD-0001 o 55 1234 5678..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                    required
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-1.5 shrink-0 disabled:opacity-60 cursor-pointer"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                  <span>{loading ? "Buscando..." : "Buscar"}</span>
                </button>
              </form>

              {/* Error Alert */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-start gap-2.5 text-xs animate-in fade-in">
                  <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-600" />
                  <div>
                    <p className="font-bold">No se encontró la orden</p>
                    <p className="text-red-600 mt-0.5">{error}</p>
                  </div>
                </div>
              )}

              {/* Order Result */}
              {order && (
                <div className="space-y-5 animate-in fade-in duration-300">
                  
                  {/* Order Banner */}
                  <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-50 to-indigo-50/50 rounded-2xl border border-blue-100 flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Folio Técnico</span>
                      <h4 className="text-2xl font-black text-blue-600 font-mono">{order.folio}</h4>
                      <p className="text-xs text-gray-600 mt-0.5">
                        Cliente: <strong>{order.clientName || order.clientEmail || 'Cliente Axtech'}</strong>
                      </p>
                    </div>

                    {(() => {
                      const badge = statusBadge[order.status] || { label: order.status, bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' }
                      return (
                        <span className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${badge.bg} ${badge.text} ${badge.border}`}>
                          {badge.label}
                        </span>
                      )
                    })()}
                  </div>

                  {/* Stepper Timeline */}
                  {!isCancelled && (
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                      <h5 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                        <Layers size={13} className="text-blue-600" />
                        Progreso de la Reparación
                      </h5>
                      <div className="grid grid-cols-5 gap-1 relative">
                        {STEPS.map((step, idx) => {
                          const isPassed = idx < currentStep || isDelivered
                          const isCurrent = idx === currentStep && !isDelivered

                          return (
                            <div key={step.id} className="flex flex-col items-center text-center space-y-1 relative">
                              {idx < STEPS.length - 1 && (
                                <div 
                                  className={`absolute top-3 left-1/2 w-full h-1 -z-0 transition-all ${
                                    idx < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                                  }`}
                                />
                              )}

                              <div 
                                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-xl flex items-center justify-center font-bold text-[10px] sm:text-xs z-10 ${
                                  isPassed 
                                    ? 'bg-blue-600 text-white shadow-sm ring-2 ring-white' 
                                    : isCurrent 
                                      ? 'bg-amber-500 text-white ring-2 ring-amber-200 font-bold animate-pulse' 
                                      : 'bg-white text-gray-400 ring-2 ring-gray-100 border border-gray-200'
                                }`}
                              >
                                {isPassed ? <Check size={12} /> : idx + 1}
                              </div>

                              <p className={`text-[10px] sm:text-xs font-bold leading-tight ${isPassed || isCurrent ? 'text-gray-900' : 'text-gray-400'}`}>
                                {step.label}
                              </p>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Device & Dates Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                      <p className="font-bold text-gray-700 flex items-center gap-1.5">
                        <Laptop size={14} className="text-blue-600" /> Dispositivo
                      </p>
                      <p className="font-bold text-sm text-gray-900">{order.brand} {order.model}</p>
                      <p className="text-gray-500">Tipo: {order.deviceType}</p>
                      {order.serialNum && <p className="text-gray-400 font-mono text-[11px]">Serie: {order.serialNum}</p>}
                    </div>

                    <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                      <p className="font-bold text-gray-700 flex items-center gap-1.5">
                        <Calendar size={14} className="text-blue-600" /> Fechas
                      </p>
                      <p className="text-gray-600">Ingreso: <strong>{new Date(order.createdAt).toLocaleDateString('es-MX')}</strong></p>
                      {order.serviceDate && (
                        <p className="text-blue-600 font-medium">Estimada: <strong>{new Date(order.serviceDate).toLocaleDateString('es-MX')}</strong></p>
                      )}
                    </div>
                  </div>

                  {/* Problem & Diagnosis */}
                  <div className="space-y-2 text-xs">
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <p className="font-bold text-gray-500 mb-1 flex items-center gap-1">
                        <FileText size={13} /> Problema Reportado:
                      </p>
                      <p className="text-gray-800">{order.issueDesc}</p>
                    </div>

                    {order.diagnosis && (
                      <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                        <p className="font-bold text-blue-700 mb-1 flex items-center gap-1">
                          <Wrench size={13} /> Diagnóstico Técnico:
                        </p>
                        <p className="text-blue-950">{order.diagnosis}</p>
                      </div>
                    )}
                  </div>

                  {/* Financials */}
                  {order.costQuote !== null && (
                    <div className="p-4 bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-xl border border-blue-200 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Presupuesto</p>
                        <p className="text-xl font-black text-gray-900">${order.costQuote.toFixed(2)} MXN</p>
                        {totalPayments > 0 && (
                          <p className="text-[11px] text-emerald-700 font-medium">Anticipo: ${totalPayments.toFixed(2)} MXN</p>
                        )}
                      </div>
                      {pendingBalance !== null && (
                        <div className="text-right">
                          <p className="text-[10px] text-gray-500 font-semibold uppercase">Saldo Pendiente</p>
                          <p className="text-lg font-bold text-blue-600">${pendingBalance.toFixed(2)} MXN</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* WhatsApp Action */}
                  <a
                    href={`https://wa.me/525513485574?text=Hola,%20quisiera%20consultar%20el%20estatus%20de%20mi%20orden%20${order.folio}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-xs sm:text-sm transition shadow-sm"
                  >
                    <MessageCircle size={16} />
                    <span>Consultar por WhatsApp con Folio {order.folio}</span>
                  </a>

                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  )
}
