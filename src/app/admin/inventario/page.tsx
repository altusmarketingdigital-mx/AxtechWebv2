import React from "react"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { PlusCircle, Search, Package } from "lucide-react"

export default async function InventoryPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Inventario</h1>
        <Link 
          href="/admin/inventario/nuevo"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition"
        >
          <PlusCircle size={20} />
          <span>Nuevo Producto</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nombre o SKU..." 
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm">
                <th className="p-4 font-medium border-b">SKU</th>
                <th className="p-4 font-medium border-b">Producto</th>
                <th className="p-4 font-medium border-b">Precio</th>
                <th className="p-4 font-medium border-b">Stock</th>
                <th className="p-4 font-medium border-b">Estado</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No hay productos registrados en el inventario.
                  </td>
                </tr>
              ) : (
                products.map(product => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="p-4 border-b text-gray-500 font-mono text-sm">{product.sku}</td>
                    <td className="p-4 border-b font-medium text-gray-900 flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                        <Package size={20} />
                      </div>
                      <span>{product.name}</span>
                    </td>
                    <td className="p-4 border-b text-gray-900 font-medium">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="p-4 border-b">
                      {product.stock}
                    </td>
                    <td className="p-4 border-b">
                      {product.stock > 10 ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 font-medium">En Stock</span>
                      ) : product.stock > 0 ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 font-medium">Bajo Stock</span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 font-medium">Agotado</span>
                      )}
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
