const fs = require('fs');
const path = require('path');

const groups = [
  // 1. ÓRDENES SUB-PAGES
  {
    dir: 'src/app/admin/ordenes/activas',
    title: 'Órdenes Activas en Taller',
    subtitle: 'Servicios en curso (recepción, diagnóstico y reparación)',
    statusFilter: "where: { status: { notIn: ['DELIVERED', 'CANCELLED'] } }"
  },
  {
    dir: 'src/app/admin/ordenes/autorizacion',
    title: 'Órdenes Esperando Autorización',
    subtitle: 'Equipos presupuestados pendientes de aprobación por el cliente',
    statusFilter: "where: { status: 'WAITING_APPROVAL' }"
  },
  {
    dir: 'src/app/admin/ordenes/reparacion',
    title: 'Órdenes en Reparación',
    subtitle: 'Equipos autorizados con trabajo técnico y reemplazo de refacciones en proceso',
    statusFilter: "where: { status: 'REPAIRING' }"
  },
  {
    dir: 'src/app/admin/ordenes/calidad',
    title: 'Control de Calidad (QA)',
    subtitle: 'Equipos terminados en pruebas de estrés y validación final',
    statusFilter: "where: { status: 'REPAIRING' }"
  },
  {
    dir: 'src/app/admin/ordenes/listas',
    title: 'Órdenes Listas para Entrega',
    subtitle: 'Equipos aprobados listos para entrega al cliente y liquidación',
    statusFilter: "where: { status: 'READY' }"
  },
  {
    dir: 'src/app/admin/ordenes/entregadas',
    title: 'Órdenes Entregadas y Finalizadas',
    subtitle: 'Histórico de equipos entregados con póliza de garantía',
    statusFilter: "where: { status: 'DELIVERED' }"
  },
  {
    dir: 'src/app/admin/ordenes/garantias',
    title: 'Reingresos y Garantías',
    subtitle: 'Equipos reingresados para validación técnica de garantía',
    statusFilter: "where: { status: 'RECEIVED' }"
  },
  {
    dir: 'src/app/admin/ordenes/canceladas',
    title: 'Órdenes Canceladas',
    subtitle: 'Servicios declinados por presupuesto o sin reparación',
    statusFilter: "where: { status: 'CANCELLED' }"
  },
  {
    dir: 'src/app/admin/ordenes/diagnostico',
    title: 'Órdenes en Diagnóstico',
    subtitle: 'Equipos en revisión física y lógica por el personal técnico',
    statusFilter: "where: { status: 'DIAGNOSING' }"
  }
];

groups.forEach(g => {
  const fullDir = path.resolve(g.dir);
  if (!fs.existsSync(fullDir)) fs.mkdirSync(fullDir, { recursive: true });
  
  const content = `import React from "react"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { Wrench, Plus, ArrowRight, Laptop, User } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function FilteredOrdersPage() {
  const orders = await prisma.serviceOrder.findMany({
    ${g.statusFilter},
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">${g.title}</h1>
          <p className="text-xs text-gray-500 mt-0.5">${g.subtitle}</p>
        </div>
        <Link
          href="/admin/ordenes/nueva"
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition"
        >
          <Plus size={15} />
          <span>Nueva Orden</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-[10px] border-b border-gray-100">
              <tr>
                <th className="py-3 px-4">Folio</th>
                <th className="py-3 px-4">Cliente</th>
                <th className="py-3 px-4">Equipo</th>
                <th className="py-3 px-4">Falla Reportada</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4 text-right">Presupuesto</th>
                <th className="py-3 px-4 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    No hay órdenes con este criterio en este momento.
                  </td>
                </tr>
              ) : (
                orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-gray-50/50 transition">
                    <td className="py-3.5 px-4 font-bold text-blue-600">
                      <Link href={\`/admin/servicios/\${ord.folio}\`}>{ord.folio}</Link>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-gray-900">
                      <div>{ord.clientName}</div>
                      <div className="text-[10px] text-gray-400">{ord.clientPhone}</div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600">
                      {ord.brand} {ord.model}
                    </td>
                    <td className="py-3.5 px-4 text-gray-500 truncate max-w-xs">
                      {ord.issueDesc}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-black text-gray-900">
                      \${(ord.costQuote || 0).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <Link
                        href={\`/admin/servicios/\${ord.folio}\`}
                        className="inline-flex items-center gap-1 bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-700 font-bold px-3 py-1.5 rounded-xl text-[11px] transition"
                      >
                        <span>Detalle</span>
                        <ArrowRight size={12} />
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
`;

  fs.writeFileSync(path.join(fullDir, 'page.tsx'), content, 'utf8');
});

console.log('Successfully generated live filtered pages for all Ordenes sub-routes!');