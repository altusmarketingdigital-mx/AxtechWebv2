import React from "react"
import prisma from "@/lib/prisma"
import StoreCatalog from "@/components/StoreCatalog"
import Link from "next/link"
import { ArrowLeft, ShoppingBag, ShieldCheck, Truck, Headphones, Receipt } from "lucide-react"

export default async function StorePage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      include: {
        category: true
      },
      orderBy: { createdAt: "desc" }
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" }
    })
  ])

  const categoryNames = categories.map(c => c.name)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Store Header */}
      <header className="bg-white border-b sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          
          {/* Back Button to Homepage */}
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-bold text-sm transition-all hover:-translate-x-0.5 border border-gray-200 shrink-0"
          >
            <ArrowLeft size={18} />
            <span>Regresar a Página</span>
          </Link>

          {/* Store Brand */}
          <div className="text-center">
            <Link href="/tienda" className="font-extrabold text-xl sm:text-2xl text-gray-900 tracking-tight">
              AXTECH <span className="text-blue-600">STORE</span>
            </Link>
            <p className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase hidden sm:block">
              Tienda Oficial en Línea
            </p>
          </div>

          {/* Actions: Tracker & Cart */}
          <div className="flex items-center gap-3">
            <Link
              href="/estado-reparacion"
              className="text-xs font-semibold text-gray-600 hover:text-blue-600 hidden md:block"
            >
              Rastrear Reparación
            </Link>
            <Link
              href="/tienda/carrito"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition shadow-sm"
            >
              <ShoppingBag size={18} />
              <span className="hidden sm:inline">Mi Carrito</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Store Value Banner */}
      <section className="bg-gradient-to-r from-blue-900 to-slate-900 text-white py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded-full text-xs font-bold uppercase tracking-wider">
              Catálogo de Productos
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold mt-2">
              Equipos, Componentes y Accesorios
            </h1>
            <p className="text-gray-300 text-sm sm:text-base mt-1">
              Todos los productos cuentan con garantía directa y soporte especializado.
            </p>
          </div>

          {/* Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10 flex items-center gap-2.5">
              <ShieldCheck size={20} className="text-blue-400 shrink-0" />
              <span className="text-xs font-semibold">Garantía Directa</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10 flex items-center gap-2.5">
              <Truck size={20} className="text-green-400 shrink-0" />
              <span className="text-xs font-semibold">Envío Seguro</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10 flex items-center gap-2.5">
              <Receipt size={20} className="text-yellow-400 shrink-0" />
              <span className="text-xs font-semibold">Facturación</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10 flex items-center gap-2.5">
              <Headphones size={20} className="text-purple-400 shrink-0" />
              <span className="text-xs font-semibold">Soporte TI</span>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog & Filter Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex-1 w-full">
        <StoreCatalog products={products} categories={categoryNames} />
      </main>

      {/* Store Footer */}
      <footer className="bg-white border-t py-8 px-4 sm:px-6 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} AXTECH STORE — Todos los derechos reservados.</p>
          <div className="flex gap-6 font-medium">
            <Link href="/" className="hover:text-blue-600">Página Principal</Link>
            <Link href="/estado-reparacion" className="hover:text-blue-600">Rastrear Equipo</Link>
            <Link href="/tienda/carrito" className="hover:text-blue-600">Carrito</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
