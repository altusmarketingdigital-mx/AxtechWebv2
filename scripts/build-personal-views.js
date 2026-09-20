const fs = require('fs');
const path = require('path');

const personalViews = [
  {
    dir: 'src/app/admin/personal',
    title: 'Personal y Técnicos',
    subtitle: 'Directorio de colaboradores, técnicos asignados y roles'
  },
  {
    dir: 'src/app/admin/personal/tecnicos',
    title: 'Equipo Técnico',
    subtitle: 'Especialistas de hardware, software y diagnóstico'
  },
  {
    dir: 'src/app/admin/personal/carga',
    title: 'Carga de Trabajo de Técnicos',
    subtitle: 'Balance de órdenes activas y pendientes asignadas por técnico'
  },
  {
    dir: 'src/app/admin/personal/productividad',
    title: 'Productividad y Rendimiento',
    subtitle: 'Tasa de cierre de órdenes y tiempos promedio de reparación'
  },
  {
    dir: 'src/app/admin/personal/roles',
    title: 'Roles y Permisos del Sistema',
    subtitle: 'Matriz de control de acceso (Administrador, Recepción, Técnico, Ventas)'
  }
];

personalViews.forEach(v => {
  const fullDir = path.resolve(v.dir);
  if (!fs.existsSync(fullDir)) fs.mkdirSync(fullDir, { recursive: true });
  
  const content = `import React from "react"
import prisma from "@/lib/prisma"
import { UserCheck, Shield, Clock, Award } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function PersonalViewPage() {
  const users = await prisma.user.findMany({
    where: { role: { in: ['admin', 'technician'] } },
    include: { serviceOrdersAsTech: true },
    orderBy: { name: 'asc' }
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">${v.title}</h1>
        <p className="text-xs text-gray-500 mt-0.5">${v.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.length === 0 ? (
          <div className="col-span-full bg-white p-12 text-center rounded-2xl border border-gray-100 text-gray-400 text-xs">
            No hay colaboradores técnicos registrados.
          </div>
        ) : (
          users.map((u) => (
            <div key={u.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-blue-600 uppercase bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100">
                  {u.role}
                </span>
                <span className="text-[10px] text-gray-400 font-medium">
                  {u.serviceOrdersAsTech.length} órdenes asignadas
                </span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">{u.name || 'Personal AxTech'}</h3>
                <p className="text-xs text-gray-500">{u.email}</p>
                {u.phone && <p className="text-xs text-gray-400 mt-0.5">{u.phone}</p>}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
`;

  fs.writeFileSync(path.join(fullDir, 'page.tsx'), content, 'utf8');
});

console.log('Successfully generated live pages for Personal sub-routes!');