"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { createSupplier } from "@/app/actions/supplierActions"
import { ArrowLeft, Save, Truck, Building, Phone, Mail, MapPin, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function NuevoProveedorPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const res = await createSupplier(formData)

    if (res.success) {
      alert("¡Proveedor registrado con éxito!")
      router.push("/admin/proveedores")
    } else {
      setError(res.error || "Ocurrió un error al registrar el proveedor")
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div className="flex items-center space-x-4">
        <Link href="/admin/proveedores" className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition shadow-sm">
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Nuevo Proveedor</h1>
          <p className="text-xs text-gray-500 mt-0.5">Alta de distribuidor, mayorista o fabricante de partes</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 flex items-center gap-3 text-sm">
          <AlertCircle size={20} className="shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="md:col-span-2">
            <label className="block font-semibold text-gray-700 mb-1">Nombre Comercial del Proveedor *</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Ej. CVA Mayoreo, CT Internacional, Syscom, Ingram Micro"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Razón Social</label>
            <input
              type="text"
              name="businessName"
              placeholder="Ej. Comercializadora de Valor Agregado S.A. de C.V."
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">RFC / Tax ID</label>
            <input
              type="text"
              name="rfc"
              placeholder="CVA950101XXX"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition uppercase"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Nombre del Asesor / Contacto</label>
            <input
              type="text"
              name="contactPerson"
              placeholder="Ej. Lic. Fernando Gómez"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Días de Crédito Otorgados</label>
            <input
              type="number"
              name="creditDays"
              defaultValue={0}
              placeholder="0 para compras de contado"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Teléfono Principal</label>
            <input
              type="tel"
              name="phone"
              placeholder="55 1234 5678"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Correo Electrónico de Pedidos</label>
            <input
              type="email"
              name="email"
              placeholder="pedidos@proveedor.com"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold text-gray-700 mb-1">Dirección / Centro de Distribución</label>
            <input
              type="text"
              name="address"
              placeholder="Bodega, parque industrial, ciudad"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold text-gray-700 mb-1">Condiciones Comerciales y Garantías</label>
            <textarea
              name="notes"
              rows={2}
              placeholder="Tiempos promedio de entrega, portal B2B, políticas de RMA / garantías..."
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
          <Link
            href="/admin/proveedores"
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
            <span>{loading ? "Guardando..." : "Registrar Proveedor"}</span>
          </button>
        </div>
      </form>
    </div>
  )
}