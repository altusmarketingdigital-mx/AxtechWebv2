"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { processOrderDelivery } from "@/app/actions/deliveryActions"
import { 
  PackageCheck, 
  ShieldCheck, 
  DollarSign, 
  CheckSquare, 
  User, 
  CreditCard, 
  Banknote, 
  ArrowRightLeft,
  AlertCircle,
  FileCheck
} from "lucide-react"

export default function DeliveryFormClient({ 
  order, 
  pendingBalance 
}: { 
  order: any
  pendingBalance: number 
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  // Checklist de entrega
  const [checks, setChecks] = useState({
    deviceTested: true,
    accessoriesReturned: true,
    paymentSettled: pendingBalance === 0,
    warrantyExplained: true,
    clientSatisfied: true
  })

  // Pago
  const [paymentAmount, setPaymentAmount] = useState<number>(pendingBalance)
  const [paymentMethod, setPaymentMethod] = useState("EFECTIVO")
  const [receivedBy, setReceivedBy] = useState(order.clientName || "")
  const [receiverIdDoc, setReceiverIdDoc] = useState("")
  const [warrantyDays, setWarrantyDays] = useState(30)
  const [deliveryNotes, setDeliveryNotes] = useState("")

  const toggleCheck = (key: keyof typeof checks) => {
    setChecks(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.set("orderId", order.id)
    formData.set("receivedBy", receivedBy)
    formData.set("receiverIdDoc", receiverIdDoc)
    formData.set("deliveryNotes", deliveryNotes)
    formData.set("warrantyDays", warrantyDays.toString())
    formData.set("paymentAmount", paymentAmount.toString())
    formData.set("paymentMethod", paymentMethod)
    formData.set("deliveryChecks", JSON.stringify(checks))

    const res = await processOrderDelivery(formData)
    if (res.success) {
      alert("¡Orden entregada con éxito y póliza de garantía activada!")
      router.push(`/admin/entregas/${order.id}/pdf`)
    } else {
      alert(res.error || "Ocurrió un error al procesar la entrega")
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* 1. Liquidación de Saldo */}
      {pendingBalance > 0 && (
        <section className="bg-amber-50 rounded-2xl p-6 border border-amber-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-amber-900 uppercase tracking-wide flex items-center gap-2">
              <DollarSign size={18} className="text-amber-600" /> Liquidación de Saldo Pendiente
            </h2>
            <span className="text-sm font-black text-amber-900">
              Por pagar: ${pendingBalance.toFixed(2)} MXN
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Monto que Liquida Hoy ($ MXN) *</label>
              <input
                type="number"
                step="0.01"
                max={pendingBalance}
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 bg-white border border-amber-300 rounded-xl font-bold text-gray-900 outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Método de Pago *</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-amber-300 rounded-xl font-bold text-gray-800 outline-none"
              >
                <option value="EFECTIVO">Efectivo</option>
                <option value="TARJETA">Tarjeta de Débito / Crédito</option>
                <option value="TRANSFERENCIA">Transferencia SPEI</option>
              </select>
            </div>
          </div>
        </section>
      )}

      {/* 2. Control de Calidad y Verificación de Entrega */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <div className="border-b border-gray-100 pb-3">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
            <CheckSquare size={18} className="text-blue-600" /> Checklist de Entrega y Conformidad
          </h2>
        </div>

        <div className="space-y-2.5 text-xs">
          <label className="flex items-center gap-3 p-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl cursor-pointer transition border border-gray-100">
            <input
              type="checkbox"
              checked={checks.deviceTested}
              onChange={() => toggleCheck("deviceTested")}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
            <span className="font-semibold text-gray-800">
              Equipo probado y encendido en presencia del cliente (funcionalidad validada)
            </span>
          </label>

          <label className="flex items-center gap-3 p-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl cursor-pointer transition border border-gray-100">
            <input
              type="checkbox"
              checked={checks.accessoriesReturned}
              onChange={() => toggleCheck("accessoriesReturned")}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
            <span className="font-semibold text-gray-800">
              Accesorios devueltos en su totalidad (cargador, cables, periféricos recibidos)
            </span>
          </label>

          <label className="flex items-center gap-3 p-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl cursor-pointer transition border border-gray-100">
            <input
              type="checkbox"
              checked={checks.warrantyExplained}
              onChange={() => toggleCheck("warrantyExplained")}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
            <span className="font-semibold text-gray-800">
              Póliza y términos de garantía informados al cliente
            </span>
          </label>

          <label className="flex items-center gap-3 p-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl cursor-pointer transition border border-gray-100">
            <input
              type="checkbox"
              checked={checks.clientSatisfied}
              onChange={() => toggleCheck("clientSatisfied")}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
            <span className="font-semibold text-gray-800">
              Cliente conforme con el trabajo y estado estético del equipo
            </span>
          </label>
        </div>
      </section>

      {/* 3. Datos de Recepción y Póliza de Garantía */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <div className="border-b border-gray-100 pb-3">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
            <ShieldCheck size={18} className="text-emerald-600" /> Póliza de Garantía y Receptor
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Nombre de quien Recibe el Equipo *</label>
            <input
              type="text"
              required
              value={receivedBy}
              onChange={(e) => setReceivedBy(e.target.value)}
              placeholder="Nombre de la persona que retira"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Identificación Oficial (INE / Cédula)</label>
            <input
              type="text"
              value={receiverIdDoc}
              onChange={(e) => setReceiverIdDoc(e.target.value)}
              placeholder="Opcional (ej. Clave de Elector INE)"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Vigencia de Garantía (Días)</label>
            <select
              value={warrantyDays}
              onChange={(e) => setWarrantyDays(parseInt(e.target.value, 10))}
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition font-bold text-gray-800"
            >
              <option value="15">15 Días Naturales</option>
              <option value="30">30 Días (1 Mes - Estándar)</option>
              <option value="60">60 Días (2 Meses)</option>
              <option value="90">90 Días (3 Meses - Refacción Mayor)</option>
              <option value="180">180 Días (6 Meses)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold text-gray-700 mb-1">Observaciones Finales de Entrega</label>
            <textarea
              rows={2}
              value={deliveryNotes}
              onChange={(e) => setDeliveryNotes(e.target.value)}
              placeholder="Notas sobre recomendaciones de uso, advertencias o detalles particulares..."
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
            ></textarea>
          </div>
        </div>
      </section>

      {/* Botón Maestro */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-8 py-3.5 rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition hover:scale-105 disabled:opacity-50"
        >
          <FileCheck size={18} />
          <span>{loading ? "Cerrando y Generando Póliza..." : "✓ ENTREGAR, CERRAR ORDEN Y GENERAR PÓLIZA PDF"}</span>
        </button>
      </div>

    </form>
  )
}