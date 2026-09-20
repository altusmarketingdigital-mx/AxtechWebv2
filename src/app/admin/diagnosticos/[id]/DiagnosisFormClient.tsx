"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { saveTechnicalDiagnosis } from "@/app/actions/diagnosisActions"
import { 
  Cpu, 
  HardDrive, 
  Monitor, 
  Save, 
  Wrench, 
  AlertTriangle, 
  FileText,
  Clock,
  ShieldCheck,
  CheckCircle2
} from "lucide-react"

const HARDWARE_COMPONENTS = [
  "CPU / Procesador",
  "Memoria RAM",
  "Almacenamiento (SSD / HDD)",
  "Tarjeta de Video (GPU)",
  "Batería",
  "Pantalla / Display",
  "Teclado",
  "Touchpad / Ratón",
  "Puertos USB / Tipo C",
  "Red / Ethernet",
  "Wi-Fi",
  "Bluetooth",
  "Sistema de Audio / Bocinas",
  "Cámara Web",
  "Cargador / Alimentación",
  "Sistema Térmico / Ventiladores"
]

const SOFTWARE_COMPONENTS = [
  "Sistema Operativo",
  "Controladores / Drivers",
  "Actualizaciones Pendientes",
  "Infección por Malware / Virus",
  "Licencia de Software",
  "Programas y Aplicaciones"
]

export default function DiagnosisFormClient({ order }: { order: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // Parse existing checks if any
  const parseJson = (str: string | null) => {
    try {
      return str ? JSON.parse(str) : {}
    } catch {
      return {}
    }
  }

  const [hwChecks, setHwChecks] = useState<Record<string, string>>(() => parseJson(order.hardwareCheck))
  const [swChecks, setSwChecks] = useState<Record<string, string>>(() => parseJson(order.softwareCheck))

  const handleHwChange = (comp: string, status: string) => {
    setHwChecks(prev => ({ ...prev, [comp]: status }))
  }

  const handleSwChange = (comp: string, status: string) => {
    setSwChecks(prev => ({ ...prev, [comp]: status }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    formData.set("hardwareCheck", JSON.stringify(hwChecks))
    formData.set("softwareCheck", JSON.stringify(swChecks))

    const res = await saveTechnicalDiagnosis(formData)
    if (res.success) {
      alert("¡Diagnóstico técnico guardado exitosamente!")
      router.refresh()
    } else {
      alert(res.error || "Ocurrió un error al guardar")
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input type="hidden" name="orderId" value={order.id} />

      {/* SECCIÓN 1: EVALUACIÓN DE HARDWARE */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
            <Cpu size={18} className="text-blue-600" /> Evaluación de Componentes de Hardware
          </h2>
          <span className="text-[10px] text-gray-400 font-medium">Marca el estado de cada pieza</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {HARDWARE_COMPONENTS.map(comp => {
            const current = hwChecks[comp] || "NA"
            return (
              <div key={comp} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl border border-gray-100 text-xs">
                <span className="font-semibold text-gray-800 truncate pr-2">{comp}</span>
                <div className="flex gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleHwChange(comp, "CORRECTO")}
                    className={`px-2 py-1 rounded text-[10px] font-bold transition ${
                      current === "CORRECTO" ? "bg-emerald-600 text-white shadow-sm" : "bg-white text-gray-500 hover:bg-gray-200 border"
                    }`}
                  >
                    ✓ Ok
                  </button>
                  <button
                    type="button"
                    onClick={() => handleHwChange(comp, "OBSERVACION")}
                    className={`px-2 py-1 rounded text-[10px] font-bold transition ${
                      current === "OBSERVACION" ? "bg-amber-500 text-white shadow-sm" : "bg-white text-gray-500 hover:bg-gray-200 border"
                    }`}
                  >
                    ⚠ Obs
                  </button>
                  <button
                    type="button"
                    onClick={() => handleHwChange(comp, "FALLA")}
                    className={`px-2 py-1 rounded text-[10px] font-bold transition ${
                      current === "FALLA" ? "bg-red-600 text-white shadow-sm" : "bg-white text-gray-500 hover:bg-gray-200 border"
                    }`}
                  >
                    ✕ Falla
                  </button>
                  <button
                    type="button"
                    onClick={() => handleHwChange(comp, "NA")}
                    className={`px-2 py-1 rounded text-[10px] font-bold transition ${
                      current === "NA" ? "bg-gray-300 text-gray-700" : "bg-white text-gray-400 hover:bg-gray-200 border"
                    }`}
                  >
                    N/A
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* SECCIÓN 2: EVALUACIÓN DE SOFTWARE */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
            <Monitor size={18} className="text-indigo-600" /> Evaluación de Software y Sistema
          </h2>
          <span className="text-[10px] text-gray-400 font-medium">Revisión lógica</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SOFTWARE_COMPONENTS.map(comp => {
            const current = swChecks[comp] || "NA"
            return (
              <div key={comp} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl border border-gray-100 text-xs">
                <span className="font-semibold text-gray-800 truncate pr-2">{comp}</span>
                <div className="flex gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleSwChange(comp, "CORRECTO")}
                    className={`px-2 py-1 rounded text-[10px] font-bold transition ${
                      current === "CORRECTO" ? "bg-emerald-600 text-white shadow-sm" : "bg-white text-gray-500 hover:bg-gray-200 border"
                    }`}
                  >
                    ✓ Ok
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSwChange(comp, "OBSERVACION")}
                    className={`px-2 py-1 rounded text-[10px] font-bold transition ${
                      current === "OBSERVACION" ? "bg-amber-500 text-white shadow-sm" : "bg-white text-gray-500 hover:bg-gray-200 border"
                    }`}
                  >
                    ⚠ Obs
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSwChange(comp, "FALLA")}
                    className={`px-2 py-1 rounded text-[10px] font-bold transition ${
                      current === "FALLA" ? "bg-red-600 text-white shadow-sm" : "bg-white text-gray-500 hover:bg-gray-200 border"
                    }`}
                  >
                    ✕ Falla
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSwChange(comp, "NA")}
                    className={`px-2 py-1 rounded text-[10px] font-bold transition ${
                      current === "NA" ? "bg-gray-300 text-gray-700" : "bg-white text-gray-400 hover:bg-gray-200 border"
                    }`}
                  >
                    N/A
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* SECCIÓN 3: RESULTADOS TÉCNICOS Y SOLUCIÓN */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <div className="border-b border-gray-100 pb-3">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
            <Wrench size={18} className="text-emerald-600" /> Diagnóstico Final y Solución Técnica
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="md:col-span-2">
            <label className="block font-semibold text-gray-700 mb-1">Causa Raíz Encontrada *</label>
            <textarea
              name="rootCause"
              rows={2}
              required
              defaultValue={order.rootCause || ""}
              placeholder="Ej. Corto circuito en la línea de 19V debido a condensador cerámico dañado cerca del conector de carga."
              className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold text-gray-700 mb-1">Solución Recomendada *</label>
            <textarea
              name="recommendedSolution"
              rows={2}
              required
              defaultValue={order.recommendedSolution || ""}
              placeholder="Ej. Reemplazo de componente SMD dañado, limpieza por ultrasonido y reemplazo de pasta térmica."
              className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
            ></textarea>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Refacciones Necesarias</label>
            <textarea
              name="requiredParts"
              rows={2}
              defaultValue={order.requiredParts || ""}
              placeholder="Ej. 1x SSD M.2 NVMe 500GB Kingston, 1x Batería Dell 42Wh original"
              className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
            ></textarea>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Tiempo Estimado de Entrega</label>
            <input
              type="text"
              name="estimatedTime"
              defaultValue={order.estimatedTime || ""}
              placeholder="Ej. 24 a 48 horas hábiles"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Costo Estimado Presupuestado ($ MXN)</label>
            <input
              type="number"
              step="0.01"
              name="costQuote"
              defaultValue={order.costQuote || ""}
              placeholder="0.00"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition font-bold text-gray-900"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Actualizar Estado de la Orden</label>
            <select
              name="status"
              defaultValue={order.status === "RECEIVED" ? "WAITING_APPROVAL" : order.status}
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition font-bold text-blue-700"
            >
              <option value="DIAGNOSING">En Diagnóstico (En revisión)</option>
              <option value="WAITING_APPROVAL">Diagnóstico Terminado (Por Cotizar / Autorizar)</option>
              <option value="REPAIRING">Autorizado (En Reparación)</option>
            </select>
          </div>
        </div>
      </section>

      {/* Botón de Guardado */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-8 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-500/20 transition hover:scale-105 disabled:opacity-50"
        >
          <Save size={16} />
          <span>{loading ? "Guardando Diagnóstico..." : "Guardar Evaluación Técnica"}</span>
        </button>
      </div>
    </form>
  )
}