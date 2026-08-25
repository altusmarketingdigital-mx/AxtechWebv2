import prisma from '@/lib/prisma'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { logout } from '@/app/actions/authActions'
import { ClipboardList, Clock, CheckCircle2, Wrench, LogOut, Package } from 'lucide-react'
import Link from 'next/link'

const statusLabel: Record<string, { label: string; color: string }> = {
  RECEIVED:         { label: 'Recibido',           color: 'bg-gray-100 text-gray-700' },
  DIAGNOSING:       { label: 'Diagnosticando',      color: 'bg-yellow-100 text-yellow-800' },
  WAITING_APPROVAL: { label: 'Esperando Aprobación', color: 'bg-orange-100 text-orange-800' },
  REPAIRING:        { label: 'En Reparación',       color: 'bg-blue-100 text-blue-800' },
  READY:            { label: 'Listo para Entrega',  color: 'bg-green-100 text-green-800' },
  DELIVERED:        { label: 'Entregado',           color: 'bg-slate-100 text-slate-700' },
  CANCELLED:        { label: 'Cancelado',           color: 'bg-red-100 text-red-700' },
}

export default async function MiCuentaPage() {
  const session = await getSession()

  if (!session) redirect('/login')

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      serviceOrdersAsClient: {
        orderBy: { createdAt: 'desc' }
      }
    }
  })

  if (!user) redirect('/login')

  const orders = user.serviceOrdersAsClient

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl text-gray-900">
            Axtech <span className="text-blue-600">Portal</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 hidden sm:block">
              Hola, <strong>{user.name || user.email}</strong>
            </span>
            <form action={logout}>
              <button
                type="submit"
                className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 font-medium transition"
              >
                <LogOut size={16} />
                Salir
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">

        {/* Welcome Card */}
        <div className="bg-blue-600 text-white rounded-2xl p-6 flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
            {(user.name || user.email).charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-bold">Bienvenido, {user.name || 'Cliente'}</h1>
            <p className="text-blue-100 text-sm">{user.email}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
            <ClipboardList className="text-blue-500" size={24} />
            <div>
              <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              <p className="text-xs text-gray-500">Órdenes Totales</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
            <Wrench className="text-yellow-500" size={24} />
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter(o => !['DELIVERED', 'CANCELLED'].includes(o.status)).length}
              </p>
              <p className="text-xs text-gray-500">En Proceso</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
            <CheckCircle2 className="text-green-500" size={24} />
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter(o => o.status === 'DELIVERED').length}
              </p>
              <p className="text-xs text-gray-500">Completadas</p>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Mis Órdenes de Servicio</h2>

          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center">
              <Package className="mx-auto mb-3 text-gray-300" size={48} />
              <p className="text-gray-500 font-medium">No tienes órdenes registradas aún.</p>
              <p className="text-gray-400 text-sm mt-1">Visítanos o llámanos para registrar tu equipo.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => {
                const st = statusLabel[order.status] || { label: order.status, color: 'bg-gray-100 text-gray-700' }
                return (
                  <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono font-bold text-blue-600 text-sm">{order.folio}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${st.color}`}>
                            {st.label}
                          </span>
                        </div>
                        <p className="font-semibold text-gray-900">
                          {order.brand} {order.model}
                        </p>
                        <p className="text-sm text-gray-500 mt-0.5">{order.deviceType}</p>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          <span className="font-medium">Problema: </span>{order.issueDesc}
                        </p>
                        {order.diagnosis && (
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            <span className="font-medium">Diagnóstico: </span>{order.diagnosis}
                          </p>
                        )}
                        {order.costQuote && (
                          <p className="text-sm font-semibold text-blue-600 mt-2">
                            Cotización: ${order.costQuote.toFixed(2)}
                          </p>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock size={12} />
                          {new Date(order.createdAt).toLocaleDateString('es-MX')}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Quick Link: Public Tracker */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-800">Seguimiento Público</p>
            <p className="text-sm text-gray-500">Consulta el estado de tu equipo por folio o teléfono</p>
          </div>
          <Link
            href="/estado-reparacion"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            Consultar
          </Link>
        </div>

      </main>
    </div>
  )
}
