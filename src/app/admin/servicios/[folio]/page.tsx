import React from "react"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, User, Laptop, Settings } from "lucide-react"
import { updateServiceOrder } from "@/app/actions/updateOrderActions"

export default async function OrderDetail({
  params
}: {
  params: Promise<{ folio: string }> | { folio: string }
}) {
  const resolvedParams = await Promise.resolve(params)
  const folio = resolvedParams.folio
  
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
          </div>
        </div>

        {/* Action Col */}
        <div className="lg:col-span-2 space-y-6">
          <form action={updateServiceOrder} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
            <input type="hidden" name="id" value={order.id} />
            
            <div>
              <h3 className="flex items-center space-x-2 text-lg font-semibold mb-4 border-b pb-2">
                <Settings size={18} /> <span>Gestión y Diagnóstico</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estado del Servicio</label>
                  <select 
                    name="status" 
                    defaultValue={order.status}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white font-medium"
                  >
                    <option value="RECEIVED">Recibido</option>
                    <option value="DIAGNOSING">En Diagnóstico</option>
                    <option value="WAITING_APPROVAL">Esperando Aprobación</option>
                    <option value="REPAIRING">En Reparación</option>
                    <option value="READY">Listo para Entrega</option>
                    <option value="DELIVERED">Entregado</option>
                    <option value="CANCELLED">Cancelado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Costo Estimado / Cotización ($)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    name="costQuote" 
                    defaultValue={order.costQuote || ""} 
                    placeholder="0.00"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fallo Reportado (Cliente)</label>
              <div className="p-3 bg-gray-50 rounded-lg text-gray-700 text-sm border">
                {order.issueDesc}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Diagnóstico Técnico</label>
              <textarea 
                name="diagnosis" 
                rows={3} 
                defaultValue={order.diagnosis || ""} 
                placeholder="Detalla lo encontrado durante la revisión..."
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notas de Reparación / Acciones Realizadas</label>
              <textarea 
                name="repairNotes" 
                rows={3} 
                defaultValue={order.repairNotes || ""} 
                placeholder="Piezas cambiadas, pruebas realizadas..."
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              ></textarea>
            </div>

            <div className="flex justify-end pt-4 border-t">
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