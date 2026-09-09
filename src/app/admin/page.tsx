import Link from 'next/link'
import prisma from '@/lib/prisma'
import {
  Wrench,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Plus,
  ArrowUpRight,
  TrendingUp,
  DollarSign,
  Package,
  ShieldCheck,
  Calendar,
  Building2,
  UserCheck
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  // Query live metrics from database
  const [
    totalActiveOrders,
    diagnosingOrders,
    waitingApprovalOrders,
    repairingOrders,
    readyOrders,
    recentOrders,
    recentQuotes,
    lowStockProducts
  ] = await Promise.all([
    prisma.serviceOrder.count({
      where: { status: { notIn: ['DELIVERED', 'CANCELLED'] } }
    }),
    prisma.serviceOrder.count({
      where: { status: 'DIAGNOSING' }
    }),
    prisma.serviceOrder.count({
      where: { status: 'WAITING_APPROVAL' }
    }),
    prisma.serviceOrder.count({
      where: { status: 'REPAIRING' }
    }),
    prisma.serviceOrder.count({
      where: { status: 'READY' }
    }),
    prisma.serviceOrder.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
      include: { client: true }
    }),
    prisma.quote.findMany({
      take: 4,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.product.findMany({
      where: { stock: { lte: 3 } },
      take: 5
    })
  ])

  return (
    <div className="space-y-6">
      {/* Header & Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Dashboard Ejecutivo</h1>
          <p className="text-xs text-gray-500 mt-0.5">Control integral y métricas en tiempo real de Service Desk</p>
        </div>

        {/* Global Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs text-gray-600 font-medium">
            <Calendar size={13} className="text-gray-400" />
            <select className="bg-transparent outline-none cursor-pointer">
              <option value="today">Hoy</option>
              <option value="week">Esta semana</option>
              <option value="month">Este mes</option>
              <option value="custom">Periodo personalizado</option>
            </select>
          </div>

          <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs text-gray-600 font-medium">
            <Building2 size={13} className="text-gray-400" />
            <select className="bg-transparent outline-none cursor-pointer">
              <option value="all">Todas las sucursales</option>
              <option value="matriz">Matriz</option>
            </select>
          </div>

          <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs text-gray-600 font-medium">
            <UserCheck size={13} className="text-gray-400" />
            <select className="bg-transparent outline-none cursor-pointer">
              <option value="all">Todos los técnicos</option>
            </select>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/ordenes/nueva"
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-sm"
          >
            <Plus size={14} /> Nueva Orden
          </Link>
          <Link
            href="/admin/cotizaciones/nueva"
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-sm"
          >
            <Plus size={14} /> Nueva Cotización
          </Link>
          <Link
            href="/admin/ventas/pos"
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-sm"
          >
            <Plus size={14} /> Nueva Venta
          </Link>
          <Link
            href="/admin/clientes/nuevo"
            className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-3.5 py-2 rounded-xl transition border border-gray-200"
          >
            <Plus size={14} /> Nuevo Cliente
          </Link>
        </div>
      </div>

      {/* Primary Operation Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Órdenes Activas</span>
            <Wrench size={16} className="text-blue-500" />
          </div>
          <p className="text-2xl font-black text-gray-900">{totalActiveOrders}</p>
          <span className="text-[10px] text-blue-600 font-medium">En flujo de taller</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Por Diagnóstico</span>
            <Clock size={16} className="text-amber-500" />
          </div>
          <p className="text-2xl font-black text-amber-600">{diagnosingOrders}</p>
          <span className="text-[10px] text-gray-400">Técnicos asignados</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Por Autorizar</span>
            <AlertTriangle size={16} className="text-orange-500" />
          </div>
          <p className="text-2xl font-black text-orange-600">{waitingApprovalOrders}</p>
          <span className="text-[10px] text-orange-600 font-medium">Cotizaciones enviadas</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">En Reparación</span>
            <Wrench size={16} className="text-indigo-500" />
          </div>
          <p className="text-2xl font-black text-indigo-600">{repairingOrders}</p>
          <span className="text-[10px] text-gray-400">Trabajándose hoy</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Listas Entrega</span>
            <CheckCircle2 size={16} className="text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-emerald-600">{readyOrders}</p>
          <span className="text-[10px] text-emerald-600 font-medium">Por notificar / entregar</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Garantías</span>
            <ShieldCheck size={16} className="text-purple-500" />
          </div>
          <p className="text-2xl font-black text-purple-600">0</p>
          <span className="text-[10px] text-gray-400">Reingresos activos</span>
        </div>
      </div>

      {/* Financial KPIs & Stock Alerts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between opacity-90 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Ventas de Hoy</span>
            <DollarSign size={18} />
          </div>
          <p className="text-2xl font-black tracking-tight">$0.00</p>
          <p className="text-[11px] opacity-80 mt-1 flex items-center gap-1">
            <TrendingUp size={12} /> POS + Servicios facturados
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Cobrado Hoy</span>
            <DollarSign size={18} className="text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-gray-900">$0.00</p>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">Efectivo, Tarjeta, Transferencia</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Saldo por Cobrar</span>
            <Clock size={18} className="text-amber-500" />
          </div>
          <p className="text-2xl font-black text-amber-600">$0.00</p>
          <p className="text-[11px] text-gray-400 mt-1">Órdenes listas y anticipos pendientes</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Utilidad del Mes</span>
            <TrendingUp size={18} className="text-blue-500" />
          </div>
          <p className="text-2xl font-black text-blue-600">$0.00</p>
          <p className="text-[11px] text-gray-400 mt-1">Margen estimado consolidado</p>
        </div>
      </div>

      {/* Two Column Layout: Operación del día + Alertas & Pendientes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Operación del Día (Órdenes Recientes) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Operación del Día</h2>
              <p className="text-xs text-gray-400">Órdenes recibidas y en seguimiento</p>
            </div>
            <Link
              href="/admin/ordenes"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              Ver todas <ArrowUpRight size={13} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-3 rounded-l-lg">Folio</th>
                  <th className="py-2.5 px-3">Cliente</th>
                  <th className="py-2.5 px-3">Equipo</th>
                  <th className="py-2.5 px-3">Falla</th>
                  <th className="py-2.5 px-3 rounded-r-lg">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-400">
                      No hay órdenes registradas aún.
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-gray-50/50 transition">
                      <td className="py-3 px-3 font-bold text-blue-600">
                        <Link href={`/admin/servicios/${ord.folio}`}>{ord.folio}</Link>
                      </td>
                      <td className="py-3 px-3 font-medium text-gray-900">
                        {ord.clientName || ord.client?.name || 'Cliente Particular'}
                      </td>
                      <td className="py-3 px-3 text-gray-600">
                        {ord.brand} {ord.model}
                      </td>
                      <td className="py-3 px-3 text-gray-500 truncate max-w-[180px]">
                        {ord.issueDesc}
                      </td>
                      <td className="py-3 px-3">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700">
                          {ord.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alertas & Stock Bajo */}
        <div className="space-y-4">
          {/* Stock Bajo Alert */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <div className="flex items-center gap-2">
                <Package size={16} className="text-amber-500" />
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide">Stock Bajo</h3>
              </div>
              <Link href="/admin/inventario/stock-bajo" className="text-[11px] font-bold text-blue-600">
                Ver todos
              </Link>
            </div>

            {lowStockProducts.length === 0 ? (
              <p className="text-xs text-gray-400 py-3 text-center">Sin alertas de stock bajo</p>
            ) : (
              <div className="space-y-2">
                {lowStockProducts.map((p) => (
                  <div key={p.id} className="flex items-center justify-between text-xs py-1.5 border-b border-gray-50">
                    <div className="min-w-0 flex-1 pr-2">
                      <p className="font-semibold text-gray-800 truncate">{p.name}</p>
                      <p className="text-[10px] text-gray-400">SKU: {p.sku}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-red-50 text-red-600 shrink-0">
                      {p.stock} pzas
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cotizaciones Recientes */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide">Cotizaciones Recientes</h3>
              <Link href="/admin/cotizaciones" className="text-[11px] font-bold text-blue-600">
                Ver todas
              </Link>
            </div>

            {recentQuotes.length === 0 ? (
              <p className="text-xs text-gray-400 py-3 text-center">No hay cotizaciones registradas</p>
            ) : (
              <div className="space-y-2">
                {recentQuotes.map((q) => (
                  <div key={q.id} className="flex items-center justify-between text-xs py-1.5 border-b border-gray-50">
                    <div>
                      <p className="font-bold text-gray-900">{q.folio}</p>
                      <p className="text-[10px] text-gray-400 truncate max-w-[140px]">{q.clientName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">${q.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</p>
                      <span className="text-[9px] font-bold uppercase text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                        {q.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}