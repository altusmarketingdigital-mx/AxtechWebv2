"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { createServiceOrder } from "@/app/actions/serviceOrderActions"
import { 
  ArrowLeft, 
  Save, 
  User, 
  Laptop, 
  FileText, 
  ShieldAlert, 
  CheckSquare, 
  Building, 
  KeyRound,
  Eye,
  Camera,
  AlertCircle
} from "lucide-react"
import Link from "next/link"

const DEFAULT_ACCESSORIES = [
  "Cargador original",
  "Cable de corriente",
  "Batería",
  "Mochila / Funda",
  "Mouse",
  "Adaptador de video",
  "Memoria USB / SD",
  "Caja original"
]

export default function NuevaOrdenAvanzadaPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Estado del formulario
  const [clientType, setClientType] = useState<"PARTICULAR" | "EMPRESA">("PARTICULAR")
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([])
  const [customAccessory, setCustomAccessory] = useState("")
  const [priority, setPriority] = useState("NORMAL")

  const toggleAccessory = (item: string) => {
    setSelectedAccessories(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    )
  }

  const addCustomAccessory = () => {
    if (customAccessory.trim() && !selectedAccessories.includes(customAccessory.trim())) {
      setSelectedAccessories(prev => [...prev, customAccessory.trim()])
      setCustomAccessory("")
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const form = e.currentTarget
    const formData = new FormData(form)
    
    // Guardar accesorios como JSON string
    formData.set("accessories", JSON.stringify(selectedAccessories))
    formData.set("clientType", clientType)
    formData.set("priority", priority)

    const result = await createServiceOrder(formData)

    if (result.success) {
      alert(`¡Orden creada exitosamente con Folio: ${result.folio}!`)
      router.push(`/admin/servicios/${result.folio}`)
    } else {
      setError(result.error || "Error desconocido al crear la orden")
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/servicios" className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition shadow-sm">
            <ArrowLeft size={20} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Nueva Orden de Servicio</h1>
            <p className="text-xs text-gray-500 mt-0.5">Recepción completa de equipo, datos de cliente y accesorios</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-medium">Prioridad:</span>
          <select 
            value={priority} 
            onChange={(e) => setPriority(e.target.value)}
            className="text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="NORMAL">Normal</option>
            <option value="ALTA">Alta</option>
            <option value="URGENTE">Urgente</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 flex items-center gap-3 text-sm">
          <AlertCircle size={20} className="shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* SECCIÓN 1: DATOS DEL CLIENTE */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-3 gap-3">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
              <User size={18} className="text-blue-600" /> Datos del Cliente
            </h2>
            
            {/* Toggle Particular / Empresa */}
            <div className="flex bg-gray-100 p-1 rounded-xl w-fit">
              <button
                type="button"
                onClick={() => setClientType("PARTICULAR")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  clientType === "PARTICULAR" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-800"
                }`}
              >
                Particular
              </button>
              <button
                type="button"
                onClick={() => setClientType("EMPRESA")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  clientType === "EMPRESA" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-800"
                }`}
              >
                Empresa
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                {clientType === "EMPRESA" ? "Razón Social / Empresa *" : "Nombre Completo del Cliente *"}
              </label>
              <input 
                type="text" 
                name="clientName" 
                required 
                placeholder={clientType === "EMPRESA" ? "Ej. Constructora del Norte S.A. de C.V." : "Ej. Juan Pérez García"}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition" 
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">RFC (Opcional)</label>
              <input 
                type="text" 
                name="clientRfc" 
                placeholder="XAXX010101000"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition uppercase" 
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Teléfono Principal *</label>
              <input 
                type="tel" 
                name="clientPhone" 
                required 
                placeholder="55 1234 5678"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition" 
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">WhatsApp (Opcional)</label>
              <input 
                type="tel" 
                name="clientWhatsapp" 
                placeholder="Para avisos automáticos"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition" 
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold text-gray-700 mb-1">Correo Electrónico (Para envío de órdenes y cotizaciones)</label>
              <input 
                type="email" 
                name="clientEmail" 
                placeholder="cliente@ejemplo.com"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition" 
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold text-gray-700 mb-1">Dirección Completa (Opcional)</label>
              <input 
                type="text" 
                name="clientAddress" 
                placeholder="Calle, número, colonia, código postal"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition" 
              />
            </div>
          </div>
        </section>

        {/* SECCIÓN 2: DATOS DEL EQUIPO */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
          <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
              <Laptop size={18} className="text-indigo-600" /> Información Técnica del Equipo
            </h2>
            <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
              Folio Asignado: EQ-AUTOMÁTICO
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Tipo de Equipo *</label>
              <select 
                name="deviceType" 
                required
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition font-medium"
              >
                <option value="Laptop">Laptop / Portátil</option>
                <option value="PC Escritorio">PC de Escritorio / Gamer</option>
                <option value="All-in-One">All-in-One</option>
                <option value="Servidor">Servidor</option>
                <option value="Impresora">Impresora</option>
                <option value="Smartphone">Smartphone</option>
                <option value="Tablet">Tablet</option>
                <option value="CCTV / DVR">CCTV / DVR</option>
                <option value="Otro">Otro Dispositivo</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Marca *</label>
              <input 
                type="text" 
                name="brand" 
                required 
                placeholder="Ej. Dell, HP, Lenovo, Apple, Asus"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition" 
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Modelo *</label>
              <input 
                type="text" 
                name="model" 
                required 
                placeholder="Ej. Inspiron 15, Pavilion, ThinkPad E14"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition" 
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Número de Serie (S/N)</label>
              <input 
                type="text" 
                name="serialNum" 
                placeholder="Ej. CN-0X89-..."
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition uppercase" 
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Service Tag / Identificador</label>
              <input 
                type="text" 
                name="serviceTag" 
                placeholder="Ej. 7XBW21"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition uppercase" 
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Color / Acabado</label>
              <input 
                type="text" 
                name="color" 
                placeholder="Ej. Gris espacial, Negro mate"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition" 
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Sistema Operativo</label>
              <input 
                type="text" 
                name="os" 
                placeholder="Ej. Windows 11 Pro, macOS Sonoma, Linux"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition" 
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                <KeyRound size={13} className="text-amber-500" /> Contraseña / PIN de Inicio (Para pruebas técnicas)
              </label>
              <input 
                type="text" 
                name="devicePassword" 
                placeholder="PIN, contraseña o 'Sin contraseña'"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition font-mono" 
              />
            </div>
          </div>
        </section>

        {/* SECCIÓN 3: RECEPCIÓN FÍSICA Y ACCESORIOS */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
              <CheckSquare size={18} className="text-emerald-600" /> Accesorios Recibidos y Estado Físico
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Selecciona los accesorios incluidos:</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {DEFAULT_ACCESSORIES.map(acc => {
                  const isChecked = selectedAccessories.includes(acc)
                  return (
                    <button
                      key={acc}
                      type="button"
                      onClick={() => toggleAccessory(acc)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border text-left flex items-center justify-between transition ${
                        isChecked 
                          ? "bg-emerald-50 border-emerald-300 text-emerald-800 font-bold" 
                          : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <span className="truncate">{acc}</span>
                      <span className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[9px] ${
                        isChecked ? "bg-emerald-600 text-white border-emerald-600" : "border-gray-300 bg-white"
                      }`}>
                        {isChecked && "✓"}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Agregar accesorio personalizado */}
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={customAccessory}
                  onChange={(e) => setCustomAccessory(e.target.value)}
                  placeholder="Agregar otro accesorio (ej. Funda de piel, dongle USB-C)..."
                  className="flex-1 px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCustomAccessory(); } }}
                />
                <button
                  type="button"
                  onClick={addCustomAccessory}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl border border-gray-200"
                >
                  Agregar
                </button>
              </div>
            </div>

            <div className="text-xs">
              <label className="block font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                <Eye size={14} className="text-gray-500" /> Estado Físico / Daños Visibles
              </label>
              <textarea 
                name="physicalCondition" 
                rows={2} 
                placeholder="Ej. Bisagra izquierda floja, rayón pronunciado en la tapa superior, tornillos faltantes en base..."
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
              ></textarea>
            </div>
          </div>
        </section>

        {/* SECCIÓN 4: PROBLEMA Y SÍNTOMAS REPORTADOS */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
              <FileText size={18} className="text-blue-600" /> Falla Reportada por el Cliente
            </h2>
          </div>

          <div className="text-xs space-y-3">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Descripción detallada del fallo *</label>
              <textarea 
                name="issueDesc" 
                rows={4} 
                required
                placeholder="Describe los síntomas que menciona el cliente: se apaga repentinamente, pantalla azul, lentitud extrema, no carga la batería, etc."
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
              ></textarea>
            </div>
          </div>
        </section>

        {/* Botón de Envío */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            href="/admin/servicios"
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-xs font-bold hover:bg-gray-100 transition"
          >
            Cancelar
          </Link>
          <button 
            type="submit" 
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-500/20 transition hover:scale-105 disabled:opacity-50"
          >
            <Save size={16} />
            <span>{loading ? "Creando y Asignando Folios..." : "Registrar y Crear Orden de Servicio"}</span>
          </button>
        </div>

      </form>
    </div>
  )
}