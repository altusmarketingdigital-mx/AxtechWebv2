'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from '@/app/actions/authActions'
import {
  LayoutDashboard,
  Wrench,
  Stethoscope,
  FileText,
  PackageCheck,
  Users,
  ShoppingCart,
  Package,
  ArrowLeftRight,
  Truck,
  CircleDollarSign,
  Receipt,
  Wallet,
  BarChart3,
  UserCheck,
  Settings,
  ChevronDown,
  ChevronRight,
  LogOut,
  User
} from 'lucide-react'

type SubItem = { label: string; href: string }
type NavModule = {
  icon: React.ReactNode
  label: string
  sub: SubItem[]
}
type NavGroup = {
  group: string
  items: NavModule[]
}

const NAV: NavGroup[] = [
  {
    group: 'OPERACIÓN',
    items: [
      {
        icon: <Wrench size={17} />,
        label: 'Órdenes de Servicio',
        sub: [
          { label: 'Todas', href: '/admin/ordenes' },
          { label: 'Activas', href: '/admin/ordenes/activas' },
          { label: 'Por Autorizar', href: '/admin/ordenes/autorizacion' },
          { label: 'En Reparación', href: '/admin/ordenes/reparacion' },
          { label: 'Control de Calidad', href: '/admin/ordenes/calidad' },
          { label: 'Listas para Entrega', href: '/admin/ordenes/listas' },
          { label: 'Finalizadas', href: '/admin/ordenes/entregadas' },
          { label: 'Garantías', href: '/admin/ordenes/garantias' },
          { label: 'Canceladas', href: '/admin/ordenes/canceladas' },
        ]
      },
      {
        icon: <Stethoscope size={17} />,
        label: 'Diagnósticos',
        sub: [
          { label: 'Pendientes', href: '/admin/diagnosticos/pendientes' },
          { label: 'En Proceso', href: '/admin/diagnosticos/en-proceso' },
          { label: 'Completados', href: '/admin/diagnosticos/completados' },
          { label: 'Plantillas', href: '/admin/diagnosticos/plantillas' },
          { label: 'Historial', href: '/admin/diagnosticos/historial' },
        ]
      },
      {
        icon: <FileText size={17} />,
        label: 'Cotizaciones',
        sub: [
          { label: 'Todas', href: '/admin/cotizaciones' },
          { label: 'Borradores', href: '/admin/cotizaciones/borradores' },
          { label: 'Enviadas', href: '/admin/cotizaciones/enviadas' },
          { label: 'Pendientes', href: '/admin/cotizaciones/pendientes' },
          { label: 'Autorizadas', href: '/admin/cotizaciones/autorizadas' },
          { label: 'Rechazadas', href: '/admin/cotizaciones/rechazadas' },
          { label: 'Vencidas', href: '/admin/cotizaciones/vencidas' },
        ]
      },
      {
        icon: <PackageCheck size={17} />,
        label: 'Entregas',
        sub: [
          { label: 'Por Entregar', href: '/admin/entregas/pendientes' },
          { label: 'Programadas', href: '/admin/entregas/programadas' },
          { label: 'Historial', href: '/admin/entregas/entregadas' },
        ]
      }
    ]
  },
  {
    group: 'COMERCIAL',
    items: [
      {
        icon: <Users size={17} />,
        label: 'Clientes',
        sub: [
          { label: 'Directorio', href: '/admin/clientes' },
          { label: 'Empresas', href: '/admin/clientes/empresas' },
          { label: 'Particulares', href: '/admin/clientes/particulares' },
          { label: 'Equipos', href: '/admin/clientes/equipos' },
          { label: 'Historial', href: '/admin/clientes/historial' },
          { label: 'Saldos', href: '/admin/clientes/saldos' },
          { label: 'Documentos', href: '/admin/clientes/documentos' },
        ]
      },
      {
        icon: <ShoppingCart size={17} />,
        label: 'Ventas / POS',
        sub: [
          { label: 'Punto de Venta', href: '/admin/ventas/pos' },
          { label: 'Ventas', href: '/admin/ventas' },
          { label: 'Pagos', href: '/admin/ventas/pagos' },
          { label: 'Anticipos', href: '/admin/ventas/anticipos' },
          { label: 'Cuentas por Cobrar', href: '/admin/ventas/cxc' },
          { label: 'Devoluciones', href: '/admin/ventas/devoluciones' },
          { label: 'Caja', href: '/admin/ventas/cortes' },
        ]
      }
    ]
  },
  {
    group: 'INVENTARIO',
    items: [
      {
        icon: <Package size={17} />,
        label: 'Inventario',
        sub: [
          { label: 'Productos', href: '/admin/inventario/productos' },
          { label: 'Existencias', href: '/admin/inventario' },
          { label: 'Refacciones', href: '/admin/inventario/refacciones' },
          { label: 'Números de Serie', href: '/admin/inventario/series' },
          { label: 'Stock Bajo', href: '/admin/inventario/stock-bajo' },
          { label: 'Reservados', href: '/admin/inventario/reservado' },
          { label: 'Ubicaciones', href: '/admin/inventario/ubicaciones' },
        ]
      },
      {
        icon: <ArrowLeftRight size={17} />,
        label: 'Movimientos',
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
        icon: <Truck size={17} />,
        label: 'Compras y Proveedores',
        sub: [
          { label: 'Proveedores', href: '/admin/proveedores' },
          { label: 'Órdenes de Compra', href: '/admin/proveedores/ordenes' },
          { label: 'Compras', href: '/admin/proveedores/compras' },
          { label: 'Recepciones', href: '/admin/proveedores/recepcion' },
          { label: 'Cuentas por Pagar', href: '/admin/proveedores/cxp' },
        ]
      }
    ]
  },
  {
    group: 'FINANZAS',
    items: [
      {
        icon: <CircleDollarSign size={17} />,
        label: 'Cobranza',
        sub: [
          { label: 'Cuentas por Cobrar', href: '/admin/finanzas/cobranza' },
          { label: 'Pagos', href: '/admin/finanzas/cobranza/pagos' },
          { label: 'Anticipos', href: '/admin/finanzas/cobranza/anticipos' },
          { label: 'Vencidos', href: '/admin/finanzas/cobranza/vencidos' },
          { label: 'Estados de Cuenta', href: '/admin/finanzas/cobranza/estados-cuenta' },
        ]
      },
      {
        icon: <Receipt size={17} />,
        label: 'Facturación',
        sub: [
          { label: 'Pendientes', href: '/admin/finanzas/facturacion' },
          { label: 'Facturas', href: '/admin/finanzas/facturacion/facturas' },
          { label: 'Notas de Crédito', href: '/admin/finanzas/facturacion/notas-credito' },
          { label: 'Datos Fiscales', href: '/admin/finanzas/facturacion/datos-fiscales' },
        ]
      },
      {
        icon: <Wallet size={17} />,
        label: 'Gastos',
        sub: [
          { label: 'Registrar Gasto', href: '/admin/finanzas/gastos/nuevo' },
          { label: 'Operativos', href: '/admin/finanzas/gastos' },
          { label: 'Compras', href: '/admin/finanzas/gastos/compras' },
          { label: 'Historial', href: '/admin/finanzas/gastos/historial' },
        ]
      }
    ]
  },
  {
    group: 'GESTIÓN',
    items: [
      {
        icon: <BarChart3 size={17} />,
        label: 'Reportes',
        sub: [
          { label: 'Ejecutivo', href: '/admin/reportes' },
          { label: 'Servicios', href: '/admin/reportes/servicios' },
          { label: 'Ventas', href: '/admin/reportes/ventas' },
          { label: 'Rentabilidad', href: '/admin/reportes/utilidad' },
          { label: 'Inventario', href: '/admin/reportes/inventario' },
          { label: 'Técnicos', href: '/admin/reportes/tecnicos' },
          { label: 'Clientes', href: '/admin/reportes/clientes' },
          { label: 'Garantías', href: '/admin/reportes/garantias' },
          { label: 'Exportaciones', href: '/admin/reportes/exportar' },
        ]
      },
      {
        icon: <UserCheck size={17} />,
        label: 'Personal',
        sub: [
          { label: 'Usuarios', href: '/admin/personal' },
          { label: 'Técnicos', href: '/admin/personal/tecnicos' },
          { label: 'Carga de Trabajo', href: '/admin/personal/carga' },
          { label: 'Productividad', href: '/admin/personal/productividad' },
          { label: 'Historial', href: '/admin/personal/historial' },
          { label: 'Roles y Permisos', href: '/admin/personal/roles' },
        ]
      },
      {
        icon: <Settings size={17} />,
        label: 'Configuración',
        sub: [
          { label: 'Empresa', href: '/admin/configuracion' },
          { label: 'Sucursales', href: '/admin/configuracion/sucursales' },
          { label: 'Usuarios', href: '/admin/configuracion/usuarios' },
          { label: 'Roles', href: '/admin/configuracion/roles' },
          { label: 'Folios', href: '/admin/configuracion/folios' },
          { label: 'Estados', href: '/admin/configuracion/estados' },
          { label: 'Servicios', href: '/admin/configuracion/catalogo' },
          { label: 'Impuestos', href: '/admin/configuracion/impuestos' },
          { label: 'Métodos de Pago', href: '/admin/configuracion/metodos-pago' },
          { label: 'Plantillas', href: '/admin/configuracion/plantillas' },
          { label: 'Notificaciones', href: '/admin/configuracion/notificaciones' },
          { label: 'WhatsApp', href: '/admin/configuracion/mensajeria' },
          { label: 'Correo', href: '/admin/configuracion/correo' },
          { label: 'Portal del Cliente', href: '/admin/configuracion/portal' },
          { label: 'Integraciones', href: '/admin/configuracion/integraciones' },
          { label: 'Auditoría', href: '/admin/configuracion/auditoria' },
          { label: 'Seguridad', href: '/admin/configuracion/seguridad' },
          { label: 'Respaldos', href: '/admin/configuracion/respaldos' },
        ]
      }
    ]
  }
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({})
  const [openModules, setOpenModules] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    NAV.forEach(g => g.items.forEach(item => {
      if (item.sub.some(s => pathname.startsWith(s.href))) {
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
    <aside className="w-64 bg-slate-950 text-white flex flex-col h-screen overflow-hidden border-r border-slate-800">
      {/* Brand Header */}
      <div className="p-4 flex flex-col items-center justify-center border-b border-slate-800 shrink-0 bg-slate-900/40">
        <h1 className="text-sm font-black tracking-widest text-white uppercase">AXTECH</h1>
        <p className="text-[11px] font-bold text-blue-400 tracking-wider">SERVICE DESK</p>
      </div>

      {/* Dashboard (Sin submenús, concentración directa) */}
      <div className="px-3 pt-3 shrink-0">
        <Link
          href="/admin"
          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium text-xs transition-colors ${
            pathname === '/admin'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'hover:bg-slate-800/80 text-slate-300 hover:text-white'
          }`}
        >
          <LayoutDashboard size={16} />
          <span>Dashboard</span>
        </Link>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 overflow-y-auto px-3 pb-3 mt-2 space-y-3">
        {NAV.map(group => (
          <div key={group.group}>
            <button
              onClick={() => toggleGroup(group.group)}
              className="flex items-center justify-between w-full px-2 py-1 text-[10px] font-bold tracking-widest text-slate-500 hover:text-slate-400 uppercase"
            >
              <span>{group.group}</span>
              {collapsedGroups[group.group] ? (
                <ChevronRight size={12} />
              ) : (
                <ChevronDown size={12} />
              )}
            </button>

            {!collapsedGroups[group.group] && (
              <div className="mt-1 space-y-0.5">
                {group.items.map(item => {
                  const isOpen = !!openModules[item.label]
                  const isActive = item.sub.some(s => pathname === s.href)

                  return (
                    <div key={item.label}>
                      <button
                        onClick={() => toggleModule(item.label)}
                        className={`flex items-center justify-between w-full gap-2 px-2.5 py-1.5 rounded-md text-xs transition-colors ${
                          isActive
                            ? 'text-white bg-slate-800'
                            : 'text-slate-400 hover:text-white hover:bg-slate-900'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {item.icon}
                          <span className="font-medium truncate">{item.label}</span>
                        </span>
                        {isOpen ? (
                          <ChevronDown size={13} className="shrink-0 text-slate-500" />
                        ) : (
                          <ChevronRight size={13} className="shrink-0 text-slate-500" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="ml-5 mt-0.5 space-y-0.5 border-l border-slate-800 pl-2.5">
                          {item.sub.map(sub => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className={`block px-2 py-1 rounded text-[11px] transition-colors ${
                                pathname === sub.href
                                  ? 'text-blue-400 font-semibold bg-slate-900'
                                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
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

      {/* User Profile / Footer */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/60 shrink-0">
        <div className="flex items-center gap-2.5 px-2 py-1.5">
          <div className="w-8 h-8 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 border border-blue-500/30">
            <User size={15} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate leading-tight">Administrador</p>
            <p className="text-[10px] text-slate-400 truncate leading-tight">AxTech Ingeniería</p>
          </div>
        </div>
        <form action={logout} className="mt-1">
          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full px-2 py-1.5 rounded-md text-[11px] text-slate-400 hover:text-red-400 hover:bg-red-950/20 transition-colors"
          >
            <LogOut size={13} />
            <span>Cerrar sesión</span>
          </button>
        </form>
      </div>
    </aside>
  )
}