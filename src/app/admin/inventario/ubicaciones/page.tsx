import React from "react"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { Package, Plus, Search, FileSpreadsheet } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function FilteredInventoryPage() {
  const products = await prisma.product.findMany({
    
    orderBy: { name: 'asc' }
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Ubicaciones de Almacén</h1>
          <p className="text-xs text-gray-500 mt-0.5">Distribución por sucursal, anaquel, nivel y gaveta</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/inventario/importar"
            className="border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition"
          >
            <FileSpreadsheet size={15} />
            <span>Importar CSV</span>
          </Link>
          <Link
            href="/admin/inventario/nuevo"
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition"
          >
            <Plus size={15} />
            <span>Nuevo Producto</span>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-[10px] border-b border-gray-100">
              <tr>
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">Nombre del Producto / Refacción</th>
                <th className="py-3 px-4">Descripción</th>
                <th className="py-3 px-4 text-right">Precio Venta</th>
                <th className="py-3 px-4 text-center">Existencia</th>
                <th className="py-3 px-4 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    No se encontraron artículos en esta categoría.
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-600">
                      {p.sku}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-gray-900">
                      {p.name}
                    </td>
                    <td className="py-3.5 px-4 text-gray-500 truncate max-w-xs">
                      {p.description || '-'}
                    </td>
                    <td className="py-3.5 px-4 text-right font-black text-gray-900">
                      ${p.price.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] ${
                        p.stock > 3 ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700 font-black"
                      }`}>
                        {p.stock} pzas
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        p.stock > 0 ? "text-emerald-700 bg-emerald-50" : "text-red-700 bg-red-50"
                      }`}>
                        {p.stock > 0 ? "Disponible" : "Agotado"}
                      </span>
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
