import React from "react"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, User, Laptop, Settings } from "lucide-react"
import { updateServiceOrder } from "@/app/actions/updateOrderActions"

export default async function OrderDetail({ params }: { params: { folio: string } }) {
  const folio = params.folio
  const order = await prisma.serviceOrder.findUnique({
    where: { folio }
  })

  if (!order) {
    notFound()
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/admin/servicios" className="p-2 bg-white border rounded-lg hover:bg-gray-50">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orden {order.folio}</h1>
          <p className="text-gray-500 text-sm">Creada el {order.createdAt.toLocaleDateString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Info Col */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="flex items-center space-x-2 text-lg font-semibold mb-4 border-b pb-2">
              <User size={18} /> <span>Cliente</span>
            </h3>
            <p className="font-medium text-gray-800">{order.clientName}</p>
            <p className="text-gray-600">{order.clientPhone}</p>
            {order.clientEmail && <p className="text-gray-600">{order.clientEmail}</p>}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="flex items-center space-x-2 text-lg font-semibold mb-4 border-b pb-2">
              <Laptop size={18} /> <span>Equipo</span>
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Tipo:</span>
                <span className="font-medium">{order.deviceType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Marca/Modelo:</span>
                <span className="font-medium">{order.brand} {order.model}</span>
              </div>
              {order.serialNum && (
                <div className="flex justify-between">
                  <span className="text-gray-500">No. Serie:</span>
                  <span className="font-medium">{order.serialNum}</span>
                </div>
              )}
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <h4 className="text-sm font-semibold text-gray-700 mb-1">Problema Reportado</h4>
              <p className="text-sm text-gray-600">{order.issueDesc}</p>
            </div>
          </div>
        </div>

        {/* Action Col */}
        <div className="lg:col-span-2">
          <form action={updateServiceOrder} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <input type="hidden" name="id" value={order.id} />
            
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                <Settings size={18} /> <span>Diagnóstico y Estado</span>
              </h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado de la Orden</label>
                <select 
                  name="status" 
                  defaultValue={order.status}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                >
                  <option value="RECEIVED">Recibido</option>
                  <option value="DIAGNOSING">Diagnosticando</option>
                  <option value="WAITING_APPROVAL">Esperando Aprobación</option>
                  <option value="REPAIRING">En Reparación</option>
                  <option value="READY">Listo para Entrega</option>
                  <option value="DELIVERED">Entregado</option>
                  <option value="CANCELLED">Cancelado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Diagnóstico Técnico</label>
                <textarea 
                  name="diagnosis" 
                  rows={3} 
                  defaultValue={order.diagnosis || ""}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  placeholder="Detalles del problema encontrado..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notas de Reparación / Procedimiento</label>
                <textarea 
                  name="repairNotes" 
                  rows={3} 
                  defaultValue={order.repairNotes || ""}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  placeholder="Qué se le hizo al equipo..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cotización (MXN)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input 
                    type="number" 
                    step="0.01"
                    name="costQuote"
                    defaultValue={order.costQuote || ""}
                    className="w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 flex justify-end">
              <button 
                type="submit" 
                className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition"
              >
                <Save size={20} />
                <span>Actualizar Orden</span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}
