import React from "react"
import prisma from "@/lib/prisma"
import { Search, Wrench, CheckCircle, Clock } from "lucide-react"

export default async function TrackOrderPage({
  searchParams,
}: {
  searchParams: { folio?: string }
}) {
  const folio = searchParams.folio?.toUpperCase()
  let order = null
  let error = ""

  if (folio) {
    order = await prisma.serviceOrder.findUnique({
      where: { folio }
    })
    
    if (!order) {
      error = "No se encontró ninguna orden con ese folio. Verifica y vuelve a intentarlo."
    }
  }

  const getStatusDisplay = (status: string) => {
    switch(status) {
      case "RECEIVED": return { text: "Recibido en Taller", color: "bg-blue-100 text-blue-800" }
      case "DIAGNOSING": return { text: "En Diagnóstico", color: "bg-yellow-100 text-yellow-800" }
      case "WAITING_APPROVAL": return { text: "Esperando Aprobación", color: "bg-orange-100 text-orange-800" }
      case "REPAIRING": return { text: "En Reparación", color: "bg-purple-100 text-purple-800" }
      case "READY": return { text: "Listo para Entrega", color: "bg-green-100 text-green-800" }
      case "DELIVERED": return { text: "Entregado", color: "bg-gray-100 text-gray-800" }
      case "CANCELLED": return { text: "Cancelado", color: "bg-red-100 text-red-800" }
      default: return { text: status, color: "bg-gray-100 text-gray-800" }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Consulta el Estado de tu Equipo</h1>
          <p className="text-gray-500">Ingresa tu número de folio (ej. ORD-1234) para ver los detalles y el avance.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <form className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                name="folio"
                defaultValue={folio || ""}
                placeholder="Ingresa tu folio..." 
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                required
              />
            </div>
            <button 
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition"
            >
              Buscar
            </button>
          </form>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center font-medium">
            {error}
          </div>
        )}

        {order && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 font-medium">Orden de Servicio</p>
                <h2 className="text-2xl font-bold text-blue-600">{order.folio}</h2>
              </div>
              <div className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusDisplay(order.status).color}`}>
                {getStatusDisplay(order.status).text}
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">Equipo</h3>
                  <p className="font-medium text-gray-900">{order.brand} {order.model}</p>
                  <p className="text-sm text-gray-600">{order.deviceType}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">Fecha de Ingreso</h3>
                  <p className="font-medium text-gray-900">{order.createdAt.toLocaleDateString()}</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">Problema Reportado</h3>
                <p className="text-gray-800 bg-gray-50 p-4 rounded-lg">{order.issueDesc}</p>
              </div>

              {order.diagnosis && (
                <div className="border-t border-gray-100 pt-6">
                  <h3 className="flex items-center space-x-2 text-sm font-semibold text-blue-600 mb-2">
                    <Wrench size={16} /> <span>Diagnóstico Técnico</span>
                  </h3>
                  <p className="text-gray-800">{order.diagnosis}</p>
                </div>
              )}

              {order.costQuote && (
                <div className="border-t border-gray-100 pt-6 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900">Presupuesto Estimado</h3>
                  <p className="text-2xl font-bold text-blue-600">${order.costQuote.toFixed(2)} MXN</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
