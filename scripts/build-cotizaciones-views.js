const fs = require('fs');
const path = require('path');

const quotesViews = [
  {
    dir: 'src/app/admin/cotizaciones/borradores',
    title: 'Cotizaciones en Borrador',
    subtitle: 'Presupuestos en edición no enviados al cliente aún',
    status: 'DRAFT'
  },
  {
    dir: 'src/app/admin/cotizaciones/enviadas',
    title: 'Cotizaciones Enviadas',
    subtitle: 'Presupuestos emitidos y compartidos con el cliente',
    status: 'SENT'
  },
  {
    dir: 'src/app/admin/cotizaciones/pendientes',
    title: 'Cotizaciones Pendientes de Autorización',
    subtitle: 'Presupuestos esperando respuesta o aprobación',
    status: 'SENT'
  },
  {
    dir: 'src/app/admin/cotizaciones/autorizadas',
    title: 'Cotizaciones Autorizadas',
    subtitle: 'Presupuestos aceptados por el cliente listos para taller',
    status: 'ACCEPTED'
  },
  {
    dir: 'src/app/admin/cotizaciones/rechazadas',
    title: 'Cotizaciones Declinadas / Rechazadas',
    subtitle: 'Presupuestos no aprobados por el cliente',
    status: 'REJECTED'
  },
  {
    dir: 'src/app/admin/cotizaciones/vencidas',
    title: 'Cotizaciones Vencidas',
    subtitle: 'Presupuestos que superaron el periodo de validez',
    status: 'REJECTED'
  },
  {
    dir: 'src/app/admin/cotizaciones/vistas',
    title: 'Cotizaciones Consultadas por el Cliente',
    subtitle: 'Presupuestos vistos a través del portal de seguimiento',
    status: 'SENT'
  }
];

quotesViews.forEach(v => {
  const fullDir = path.resolve(v.dir);
  if (!fs.existsSync(fullDir)) fs.mkdirSync(fullDir, { recursive: true });
  
  const content = `import React from "react"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { FileText, Plus, ArrowRight, Printer } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function FilteredQuotesPage() {
  const quotes = await prisma.quote.findMany({
    where: { status: '${v.status}' },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">${v.title}</h1>
          <p className="text-xs text-gray-500 mt-0.5">${v.subtitle}</p>
        </div>
        <Link
          href="/admin/cotizaciones/nueva"
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition"
        >
          <Plus size={15} />
          <span>Nueva Cotización</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-[10px] border-b border-gray-100">
              <tr>
                <th className="py-3 px-4">Folio</th>
                <th className="py-3 px-4">Cliente</th>
                <th className="py-3 px-4">Fecha</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4 text-right">Subtotal</th>
                <th className="py-3 px-4 text-right">Total</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {quotes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    No hay cotizaciones con este estado en este momento.
                  </td>
                </tr>
              ) : (
                quotes.map((q) => (
                  <tr key={q.id} className="hover:bg-gray-50/50 transition">
                    <td className="py-3.5 px-4 font-bold text-blue-600">
                      {q.folio}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-gray-900">
                      <div>{q.clientName}</div>
                      <div className="text-[10px] text-gray-400">{q.clientPhone}</div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-500">
                      {new Date(q.date).toLocaleDateString('es-MX')}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                        {q.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right text-gray-600">
                      \${q.subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4 text-right font-black text-gray-900">
                      \${q.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <Link
                        href={\`/admin/cotizaciones/\${q.id}/pdf\`}
                        target="_blank"
                        className="inline-flex items-center gap-1 bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-700 font-bold px-3 py-1.5 rounded-xl text-[11px] transition"
                      >
                        <Printer size={13} />
                        <span>Ver PDF</span>
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

console.log('Successfully generated live filtered pages for Cotizaciones sub-routes!');