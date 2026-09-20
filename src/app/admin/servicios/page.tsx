import React from "react"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { PlusCircle, Search, FileText } from "lucide-react"

export const dynamic = 'force-dynamic'

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
                    No hay órdenes de servicio registradas.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 border-b border-gray-100">
                    <td className="p-4 font-bold text-blue-600">
                      <Link href={`/admin/servicios/${order.folio}`}>
                        {order.folio}
                      </Link>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-gray-800">{order.clientName}</div>
                      <div className="text-sm text-gray-500">{order.clientPhone}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-gray-800">{order.deviceType}</div>
                      <div className="text-sm text-gray-500">{order.brand} {order.model}</div>
                    </td>
                    <td className="p-4 text-sm text-gray-600 max-w-xs truncate">
                      {order.issueDesc}
                    </td>
                    <td className="p-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
                        ${order.status === 'RECEIVED' ? 'bg-blue-100 text-blue-800' : ''}
                        ${order.status === 'DIAGNOSING' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${order.status === 'WAITING_APPROVAL' ? 'bg-orange-100 text-orange-800' : ''}
                        ${order.status === 'REPAIRING' ? 'bg-purple-100 text-purple-800' : ''}
                        ${order.status === 'READY' ? 'bg-green-100 text-green-800' : ''}
                        ${order.status === 'DELIVERED' ? 'bg-gray-100 text-gray-800' : ''}
                        ${order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' : ''}
                      `}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <Link 
                        href={`/admin/servicios/${order.folio}`}
                        className="text-gray-500 hover:text-blue-600 p-2 inline-block"
                        title="Ver detalle"
                      >
                        <FileText size={18} />
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