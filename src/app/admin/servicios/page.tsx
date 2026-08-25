import React from "react"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { PlusCircle, Search, FileText } from "lucide-react"

export default async function ServicesPage() {
  const orders = await prisma.serviceOrder.findMany({
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Órdenes de Servicio</h1>
        <Link 
          href="/admin/servicios/nuevo"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition"
        >
          <PlusCircle size={20} />
          <span>Nueva Orden</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por folio o cliente..." 
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm">
                <th className="p-4 font-medium border-b">Folio</th>
                <th className="p-4 font-medium border-b">Cliente</th>
                <th className="p-4 font-medium border-b">Equipo</th>
                <th className="p-4 font-medium border-b">Problema</th>
                <th className="p-4 font-medium border-b">Estado</th>
                <th className="p-4 font-medium border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    No hay órdenes registradas.
                  </td>
                </tr>
              ) : (
                orders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="p-4 border-b font-medium text-blue-600">{order.folio}</td>
                    <td className="p-4 border-b">
                      <div className="font-medium text-gray-800">{order.clientName}</div>
                      <div className="text-sm text-gray-500">{order.clientPhone}</div>
                    </td>
                    <td className="p-4 border-b">
                      <div className="font-medium text-gray-800">{order.brand} {order.model}</div>
                      <div className="text-sm text-gray-500">{order.deviceType}</div>
                    </td>
                    <td className="p-4 border-b max-w-xs truncate" title={order.issueDesc}>
                      {order.issueDesc}
                    </td>
                    <td className="p-4 border-b">
                      <span className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-800 font-medium">
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 border-b">
                      <Link 
                        href={`/admin/servicios/${order.folio}`}
                        className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                      >
                        <FileText size={16} />
                        <span>Detalles</span>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
