import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/session'
import Link from 'next/link'
import { Plus, FileText, Trash2, Search } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function QuotesPage() {
  await requireAdmin()
  
  const quotes = await prisma.quote.findMany({
    orderBy: { createdAt: 'desc' }
  })
  
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cotizaciones</h1>
          <p className="text-gray-500 text-sm mt-1">Historial de cotizaciones emitidas.</p>
        </div>
        <Link 
          href="/admin/cotizaciones/nueva"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={18} /> Nueva Cotización
        </Link>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-700 uppercase font-semibold text-xs">
              <tr>
                <th className="px-6 py-4">Folio</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4 text-right">Total</th>
                <th className="px-6 py-4 text-center">Estado</th>
                <th className="px-6 py-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {quotes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No hay cotizaciones registradas. Crea la primera.
                  </td>
                </tr>
              ) : (
                quotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{quote.folio}</td>
                    <td className="px-6 py-4">{quote.date.toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-800">{quote.clientName}</div>
                      <div className="text-xs text-gray-500">{quote.clientEmail}</div>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-gray-900">
                      ${quote.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                        {quote.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex items-center justify-center gap-3">
                      <Link 
                        href={/admin/cotizaciones/ + quote.id + /pdf}
                        target="_blank"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title="Ver PDF"
                      >
                        <FileText size={18} />
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
