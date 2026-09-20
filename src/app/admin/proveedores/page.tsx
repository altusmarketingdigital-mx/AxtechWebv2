import React from "react"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { Truck, Plus, Phone, Mail, MapPin, Building, FileText, DollarSign } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function ProveedoresPage() {
  const suppliers = await prisma.supplier.findMany({
    include: {
      purchaseOrders: true,
      expenses: true
    },
    orderBy: { name: "asc" }
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Proveedores y Compras</h1>
          <p className="text-xs text-gray-500 mt-0.5">Catálogo oficial de mayoristas, distribuidores y fabricantes</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/proveedores/ordenes"
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition"
          >
            <FileText size={15} />
            <span>Órdenes de Compra</span>
          </Link>
          <Link
            href="/admin/proveedores/nuevo"
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition"
          >
            <Plus size={15} />
            <span>Nuevo Proveedor</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {suppliers.length === 0 ? (
          <div className="col-span-full bg-white p-12 text-center rounded-2xl border border-gray-100">
            <Truck size={40} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-sm font-bold text-gray-700">Sin proveedores registrados</h3>
            <p className="text-xs text-gray-400 mt-1">Registra a tus proveedores de refacciones, partes y equipos para gestionar compras.</p>
          </div>
        ) : (
          suppliers.map((s) => (
            <div 
              key={s.id} 
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-800 truncate pr-2">{s.name}</span>
                  {s.creditDays && s.creditDays > 0 ? (
                    <span className="text-[10px] font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded-md border border-purple-200 shrink-0">
                      {s.creditDays}d crédito
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold bg-gray-50 text-gray-600 px-2 py-0.5 rounded-md border border-gray-200 shrink-0">
                      Contado
                    </span>
                  )}
                </div>

                <div className="space-y-1 text-xs text-gray-500">
                  {s.businessName && <p className="font-semibold text-gray-700 truncate">{s.businessName}</p>}
                  {s.rfc && <p className="font-mono text-[11px] text-gray-400">RFC: {s.rfc}</p>}
                  {s.contactPerson && <p className="text-[11px] text-gray-600">Contacto: {s.contactPerson}</p>}
                  {s.phone && (
                    <p className="flex items-center gap-1 text-[11px]">
                      <Phone size={11} className="text-gray-400" /> {s.phone}
                    </p>
                  )}
                  {s.email && (
                    <p className="flex items-center gap-1 text-[11px] truncate">
                      <Mail size={11} className="text-gray-400" /> {s.email}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 text-center">
                  <div className="bg-gray-50 p-2 rounded-xl">
                    <span className="text-xs font-black text-gray-800 block">
                      {s.purchaseOrders.length}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">Órdenes Compra</span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-xl">
                    <span className="text-xs font-black text-blue-600 block">
                      {s.expenses.length}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">Compras / Gastos</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}