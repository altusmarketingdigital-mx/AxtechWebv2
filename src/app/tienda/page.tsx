import React from "react"
import prisma from "@/lib/prisma"
import ProductCard from "@/components/ProductCard"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"

export default async function StorePage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Store Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl text-gray-900">
            Axtech <span className="text-blue-600">Store</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/estado-reparacion" className="text-sm font-medium text-gray-600 hover:text-blue-600">
              Seguimiento de Reparación
            </Link>
            <Link href="/tienda/carrito" className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition relative">
              <ShoppingBag size={24} />
              {/* Note: In a real app this bubble would be dynamic via Context or Zustand */}
              <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                ?
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Catalog */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Catálogo de Productos</h1>
          <p className="text-gray-500">Encuentra los mejores componentes y accesorios para tu equipo.</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
            <p className="text-gray-500 font-medium">Aún no hay productos disponibles en la tienda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
