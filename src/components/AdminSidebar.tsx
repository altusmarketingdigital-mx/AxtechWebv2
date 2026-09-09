'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Wrench,
  ClipboardList,
  Stethoscope,
  FileText,
  PackageCheck,
  Users,
  ShoppingCart,
  Package,
  ArrowLeftRight,
  Truck,
  BarChart3,
  UserCog,
  Settings,
  ChevronDown,
  ChevronRight,
} from 'lucide-react'

type SubItem = { label: string; href: string }
type NavModule = {
  icon: React.ReactNode
  label: string
  href?: string
  sub?: SubItem[]
}
type NavGroup = {
  group: string
  items: NavModule[]
}

const NAV: NavGroup[] = [
  {
    group: 'OPERACIÃ“N',
    items: [
      {
        icon: <Wrench size={18} />, label: 'Ã“rdenes de Servicio',
        sub: [
          { label: 'Todas las Ã“rdenes', href: '/admin/ordenes' },
          { label: 'Nueva Orden', href: '/admin/ordenes/nueva' },
          { label: 'Ã“rdenes Activas', href: '/admin/ordenes/activas' },
          { label: 'Pend. DiagnÃ³stico', href: '/admin/ordenes/diagnostico' },
          { label: 'Esp. AutorizaciÃ³n', href: '/admin/ordenes/autorizacion' },
          { label: 'En ReparaciÃ³n', href: '/admin/ordenes/reparacion' },
          { label: 'Control de Calidad', href: '/admin/ordenes/calidad' },
          { label: 'Listas para Entrega', href: '/admin/ordenes/listas' },
          { label: 'Entregadas', href: '/admin/ordenes/entregadas' },
          { label: 'GarantÃ­as / Reingresos', href: '/admin/ordenes/garantias' },
          { label: 'Canceladas', href: '/admin/ordenes/canceladas' },
        ]
      },
      {
        icon: <Stethoscope size={18} />, label: 'DiagnÃ³sticos',
        sub: [
          { label: 'Pendientes', href: '/admin/diagnosticos/pendientes' },
          { label: 'En Proceso', href: '/admin/diagnosticos/en-proceso' },
          { label: 'Completados', href: '/admin/diagnosticos/completados' },
          { label: 'Plantillas', href: '/admin/diagnosticos/plantillas' },
          { label: 'Historial', href: '/admin/diagnosticos/historial' },
        ]
      },
      {
        icon: <FileText size={18} />, label: 'Cotizaciones',
        sub: [
          { label: 'Todas', href: '/admin/cotizaciones' },
          { label: 'Nueva CotizaciÃ³n', href: '/admin/cotizaciones/nueva' },
          { label: 'Borradores', href: '/admin/cotizaciones/borradores' },
          { label: 'Enviadas', href: '/admin/cotizaciones/enviadas' },
          { label: 'Vistas por Cliente', href: '/admin/cotizaciones/vistas' },
          { label: 'Pend. AutorizaciÃ³n', href: '/admin/cotizaciones/pendientes' },
          { label: 'Autorizadas', href: '/admin/cotizaciones/autorizadas' },
          { label: 'Rechazadas', href: '/admin/cotizaciones/rechazadas' },
          { label: 'Vencidas', href: '/admin/cotizaciones/vencidas' },
        ]
      },
      {
        icon: <PackageCheck size={18} />, label: 'Entregas',
        sub: [
          { label: 'Pend. de Entrega', href: '/admin/entregas/pendientes' },
          { label: 'Programadas', href: '/admin/entregas/programadas' },
          { label: 'Entregadas', href: '/admin/entregas/entregadas' },
          { label: 'Comprobantes', href: '/admin/entregas/comprobantes' },
          { label: 'GarantÃ­as', href: '/admin/entregas/garantias' },
        ]
      },
    ]
  },
  {
    group: 'COMERCIAL',
    items: [
      {
        icon: <Users size={18} />, label: 'Clientes',
        sub: [
          { label: 'Todos los Clientes', href: '/admin/clientes' },
          { label: 'Nuevo Cliente', href: '/admin/clientes/nuevo' },
          { label: 'Empresas', href: '/admin/clientes/empresas' },
          { label: 'Particulares', href: '/admin/clientes/particulares' },
          { label: 'Equipos Registrados', href: '/admin/clientes/equipos' },
          { label: 'Historial de Servicios', href: '/admin/clientes/historial' },
          { label: 'Saldos Pendientes', href: '/admin/clientes/saldos' },
          { label: 'Documentos', href: '/admin/clientes/documentos' },
        ]
      },
      {
        icon: <ShoppingCart size={18} />, label: 'Ventas / POS',
        sub: [
          { label: 'Nueva Venta', href: '/admin/ventas/nueva' },
          { label: 'Punto de Venta', href: '/admin/ventas/pos' },
          { label: 'Historial de Ventas', href: '/admin/ventas' },
          { label: 'Pagos', href: '/admin/ventas/pagos' },
          { label: 'Anticipos', href: '/admin/ventas/anticipos' },
          { label: 'Cuentas por Cobrar', href: '/admin/ventas/cxc' },
          { label: 'Devoluciones', href: '/admin/ventas/devoluciones' },
          { label: 'Cortes de Caja', href: '/admin/ventas/cortes' },
          { label: 'MÃ©todos de Pago', href: '/admin/ventas/metodos-pago' },
        ]
      },
    ]
  },
  {
    group: 'INVENTARIO',
    items: [
      {
        icon: <Package size={18} />, label: 'Inventario',
        sub: [
          { label: 'Existencias', href: '/admin/inventario' },
          { label: 'Productos', href: '/admin/inventario/productos' },
          { label: 'Refacciones', href: '/admin/inventario/refacciones' },
          { label: 'Equipos', href: '/admin/inventario/equipos' },
          { label: 'CategorÃ­as', href: '/admin/inventario/categorias' },
          { label: 'Marcas', href: '/admin/inventario/marcas' },
          { label: 'NÃºmeros de Serie', href: '/admin/inventario/series' },
          { label: 'Stock Bajo', href: '/admin/inventario/stock-bajo' },
          { label: 'Reservado Servicio', href: '/admin/inventario/reservado' },
          { label: 'Ubicaciones', href: '/admin/inventario/ubicaciones' },
        ]
      },
      {
        icon: <ArrowLeftRight size={18} />, label: 'Movimientos',
        sub: [
          { label: 'Entradas', href: '/admin/movimientos/entradas' },
          { label: 'Salidas', href: '/admin/movimientos/salidas' },
          { label: 'Transferencias', href: '/admin/movimientos/transferencias' },
          { label: 'Reservas', href: '/admin/movimientos/reservas' },
          { label: 'Ajustes', href: '/admin/movimientos/ajustes' },
          { label: 'Devoluciones', href: '/admin/movimientos/devoluciones' },
          { label: 'Historial', href: '/admin/movimientos/historial' },
        ]
      },
      {
        icon: <Truck size={18} />, label: 'Proveedores',
        sub: [
          { label: 'Todos los Proveedores', href: '/admin/proveedores' },
          { label: 'Nuevo Proveedor', href: '/admin/proveedores/nuevo' },
          { label: 'Ã“rdenes de Compra', href: '/admin/proveedores/ordenes' },
          { label: 'Compras', href: '/admin/proveedores/compras' },
          { label: 'RecepciÃ³n MercancÃ­a', href: '/admin/proveedores/recepcion' },
          { label: 'Cuentas por Pagar', href: '/admin/proveedores/cxp' },
          { label: 'Historial', href: '/admin/proveedores/historial' },
        ]
      },
    ]
  },
  {
    group: 'GESTIÃ“N',
    items: [
      {
        icon: <BarChart3 size={18} />, label: 'Reportes',
        sub: [
          { label: 'Resumen Ejecutivo', href: '/admin/reportes' },
          { label: 'Servicios', href: '/admin/reportes/servicios' },
          { label: 'Ventas', href: '/admin/reportes/ventas' },
          { label: 'Utilidad', href: '/admin/reportes/utilidad' },
          { label: 'Inventario', href: '/admin/reportes/inventario' },
          { label: 'TÃ©cnicos', href: '/admin/reportes/tecnicos' },
          { label: 'Clientes', href: '/admin/reportes/clientes' },
          { label: 'Tiempos ReparaciÃ³n', href: '/admin/reportes/tiempos' },
          { label: 'GarantÃ­as', href: '/admin/reportes/garantias' },
          { label: 'Exportar', href: '/admin/reportes/exportar' },
        ]
      },
      {
        icon: <UserCog size={18} />, label: 'TÃ©cnicos',
        sub: [
          { label: 'TÃ©cnicos', href: '/admin/tecnicos' },
          { label: 'Carga de Trabajo', href: '/admin/tecnicos/carga' },
          { label: 'Ã“rdenes Asignadas', href: '/admin/tecnicos/ordenes' },
          { label: 'Productividad', href: '/admin/tecnicos/productividad' },
          { label: 'Tiempos de Servicio', href: '/admin/tecnicos/tiempos' },
          { label: 'Historial', href: '/admin/tecnicos/historial' },
        ]
      },
      {
        icon: <Settings size={18} />, label: 'ConfiguraciÃ³n',
        sub: [
          { label: 'Datos de AxTech', href: '/admin/configuracion' },
          { label: 'Sucursales', href: '/admin/configuracion/sucursales' },
          { label: 'Usuarios', href: '/admin/configuracion/usuarios' },
          { label: 'Roles y Permisos', href: '/admin/configuracion/roles' },
          { label: 'Folios', href: '/admin/configuracion/folios' },
          { label: 'Estados de Servicio', href: '/admin/configuracion/estados' },
          { label: 'CatÃ¡logo de Servicios', href: '/admin/configuracion/catalogo' },
          { label: 'Impuestos', href: '/admin/configuracion/impuestos' },
          { label: 'MÃ©todos de Pago', href: '/admin/configuracion/metodos-pago' },
          { label: 'Plantillas', href: '/admin/configuracion/plantillas' },
          { label: 'WhatsApp / Correo', href: '/admin/configuracion/mensajeria' },
          { label: 'Notificaciones', href: '/admin/configuracion/notificaciones' },
          { label: 'Portal del Cliente', href: '/admin/configuracion/portal' },
          { label: 'AuditorÃ­a', href: '/admin/configuracion/auditoria' },
          { label: 'Seguridad', href: '/admin/configuracion/seguridad' },
        ]
      },
    ]
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({})
  const [openModules, setOpenModules] = useState<Record<string, boolean>>(() => {
    // Auto-open the module that matches the current path
    const initial: Record<string, boolean> = {}
    NAV.forEach(g => g.items.forEach(item => {
      if (item.sub?.some(s => pathname.startsWith(s.href))) {
        initial[item.label] = true
      }
    }))
    return initial
  })

  const toggleGroup = (group: string) =>
    setCollapsedGroups(p => ({ ...p, [group]: !p[group] }))

  const toggleModule = (label: string) =>
    setOpenModules(p => ({ ...p, [label]: !p[label] }))

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen overflow-hidden">
      {/* Logo */}
      <div className="p-4 flex items-center justify-center h-16 border-b border-slate-700 shrink-0">
        <h1 className="text-lg font-black tracking-wide">AXTECH INGENIERIA</h1>
      </div>

      {/* Dashboard link */}
      <div className="px-3 pt-3 shrink-0">
        <Link
          href="/admin"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold transition-colors text-sm ${
            pathname === '/admin'
              ? 'bg-blue-600 text-white'
              : 'hover:bg-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>
      </div>

      {/* Scrollable Nav */}
      <nav className="flex-1 overflow-y-auto px-3 pb-4 mt-3 space-y-1 scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-slate-700">
        {NAV.map(group => (
          <div key={group.group}>
            {/* Group Header */}
            <button
              onClick={() => toggleGroup(group.group)}
              className="flex items-center justify-between w-full px-2 py-1.5 text-[10px] font-bold tracking-widest text-slate-500 hover:text-slate-400 transition-colors uppercase mt-3"
            >
              {group.group}
              {collapsedGroups[group.group]
                ? <ChevronRight size={12} />
                : <ChevronDown size={12} />
              }
            </button>

            {/* Group Items */}
            {!collapsedGroups[group.group] && (
              <div className="space-y-0.5">
                {group.items.map(item => {
                  const isOpen = !!openModules[item.label]
                  const isActive = item.sub
                    ? item.sub.some(s => pathname.startsWith(s.href))
                    : pathname === item.href

                  return (
                    <div key={item.label}>
                      <button
                        onClick={() => toggleModule(item.label)}
                        className={`flex items-center justify-between w-full gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive
                            ? 'text-white bg-slate-700'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        <span className="flex items-center gap-2 font-medium">
                          {item.icon}
                          {item.label}
                        </span>
                        {item.sub && (
                          isOpen
                            ? <ChevronDown size={14} className="shrink-0" />
                            : <ChevronRight size={14} className="shrink-0" />
                        )}
                      </button>

                      {/* Sublinks */}
                      {item.sub && isOpen && (
                        <div className="ml-7 mt-0.5 space-y-0.5 border-l border-slate-700 pl-3">
                          {item.sub.map(sub => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className={`block px-2 py-1.5 rounded text-xs transition-colors ${
                                pathname === sub.href
                                  ? 'text-blue-400 font-semibold bg-slate-800'
                                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                              }`}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}