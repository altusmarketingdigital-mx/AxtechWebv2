"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { createCustomer } from "@/app/actions/customerActions"
import { ArrowLeft, Save, User, Building, Phone, Mail, MapPin, FileText, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function NuevoClientePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [customerType, setCustomerType] = useState<"PARTICULAR" | "EMPRESA">("PARTICULAR")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    formData.set("customerType", customerType)

    const res = await createCustomer(formData)
    if (res.success) {
      alert("¡Cliente registrado exitosamente!")
      router.push("/admin/clientes")
    } else {
      setError(res.error || "Ocurrió un error al registrar el cliente")
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div className="flex items-center space-x-4">
        <Link href="/admin/clientes" className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition shadow-sm">
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Nuevo Cliente</h1>
          <p className="text-xs text-gray-500 mt-0.5">Alta de particular o empresa en el directorio central</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 flex items-center gap-3 text-sm">
          <AlertCircle size={20} className="shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
        {/* Toggle Particular / Empresa */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
            <User size={18} className="text-blue-600" /> Tipo de Cuenta
          </h2>
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setCustomerType("PARTICULAR")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                customerType === "PARTICULAR" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Particular
            </button>
            <button
              type="button"
              onClick={() => setCustomerType("EMPRESA")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                customerType === "EMPRESA" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Empresa
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="md:col-span-2">
            <label className="block font-semibold text-gray-700 mb-1">
              {customerType === "EMPRESA" ? "Razón Social / Nombre Comercial *" : "Nombre Completo *"}
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder={customerType === "EMPRESA" ? "Ej. Servicios de TI del Centro S.A. de C.V." : "Ej. Mariana Morales Castro"}
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">RFC</label>
            <input
              type="text"
              name="rfc"
              placeholder="XAXX010101000"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition uppercase"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Teléfono Principal *</label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="55 1234 5678"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">WhatsApp</label>
            <input
              type="tel"
              name="whatsapp"
              placeholder="Para notificaciones directas"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              placeholder="contacto@cliente.com"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold text-gray-700 mb-1">Dirección Fiscal / Entrega</label>
            <input
              type="text"
              name="address"
              placeholder="Calle, número, colonia, municipio, C.P."
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold text-gray-700 mb-1">Notas Internas</label>
            <textarea
              name="notes"
              rows={3}
              placeholder="Observaciones sobre crédito, personas autorizadas o preferencias de servicio..."
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
          <Link
            href="/admin/clientes"
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-xs font-bold hover:bg-gray-100 transition"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-7 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-500/20 transition hover:scale-105 disabled:opacity-50"
          >
            <Save size={16} />
            <span>{loading ? "Guardando..." : "Guardar Cliente"}</span>
          </button>
        </div>
      </form>
    </div>
  )
}