import React from "react"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { Users, UserPlus, Phone, Mail, Building, MapPin, Search, Wrench, FileText } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function ClientesPage() {
  const customers = await prisma.user.findMany({
    where: { role: "customer" },
    include: {
      serviceOrdersAsClient: {
        select: { id: true, folio: true, status: true, brand: true, model: true }
      },
      quotes: {
        select: { id: true, folio: true, total: true }
      }
    },
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Directorio de Clientes</h1>
          <p className="text-xs text-gray-500 mt-0.5">Gestión de particulares, empresas y expedientes de servicio</p>
        </div>
        <Link
          href="/admin/clientes/nuevo"
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition"
        >
          <UserPlus size={15} />
          <span>Nuevo Cliente</span>
        </Link>
      </div>

      {/* Grid de Clientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customers.length === 0 ? (
          <div className="col-span-full bg-white p-12 text-center rounded-2xl border border-gray-100">
            <Users size={40} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-sm font-bold text-gray-700">Sin clientes registrados en el directorio</h3>
            <p className="text-xs text-gray-400 mt-1">Registra tu primer cliente usando el botón superior.</p>
          </div>
        ) : (
          customers.map((c) => (
            <div 
              key={c.id} 
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md border ${
                    c.customerType === 'EMPRESA' 
                      ? 'bg-purple-50 text-purple-700 border-purple-200' 
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    {c.customerType || 'PARTICULAR'}
                  </span>
                  {c.rfc && (
                    <span className="text-[10px] font-mono text-gray-400">RFC: {c.rfc}</span>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-900 leading-snug truncate">
                    {c.name || 'Sin nombre'}
                  </h3>
                  <div className="mt-1 space-y-0.5 text-xs text-gray-500">
                    {c.phone && (
                      <p className="flex items-center gap-1.5 truncate">
                        <Phone size={12} className="text-gray-400 shrink-0" /> {c.phone}
                      </p>
                    )}
                    {c.email && !c.email.includes('@cliente.axtech.mx') && (
                      <p className="flex items-center gap-1.5 truncate">
                        <Mail size={12} className="text-gray-400 shrink-0" /> {c.email}
                      </p>
                    )}
                    {c.address && (
                      <p className="flex items-center gap-1.5 truncate text-[11px] text-gray-400">
                        <MapPin size={12} className="text-gray-400 shrink-0" /> {c.address}
                      </p>
                    )}
                  </div>
                </div>

                {/* Resumen de actividad */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 text-center">
                  <div className="bg-gray-50 p-2 rounded-xl">
                    <span className="text-xs font-black text-gray-800 block">
                      {c.serviceOrdersAsClient.length}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">Órdenes</span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-xl">
                    <span className="text-xs font-black text-emerald-600 block">
                      {c.quotes.length}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">Cotizaciones</span>
                  </div>
                </div>
              </div>

              {/* Acciones directas */}
              <div className="flex gap-2 pt-2 border-t border-gray-100">
                <Link
                  href={`/admin/ordenes/nueva?clientName=${encodeURIComponent(c.name || '')}&clientPhone=${encodeURIComponent(c.phone || '')}&clientEmail=${encodeURIComponent(c.email || '')}`}
                  className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 text-[11px] font-bold py-2 rounded-xl text-center border border-gray-200 transition"
                >
                  + Orden
                </Link>
                <Link
                  href={`/admin/cotizaciones/nueva?clientName=${encodeURIComponent(c.name || '')}&clientPhone=${encodeURIComponent(c.phone || '')}&clientEmail=${encodeURIComponent(c.email || '')}`}
                  className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 text-[11px] font-bold py-2 rounded-xl text-center border border-gray-200 transition"
                >
                  + Cotización
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}