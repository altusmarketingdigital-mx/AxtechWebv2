"use client"

import React, { useState, useEffect } from "react"
import { Search, ShoppingBag, ShoppingCart, Check, Filter, Tag, Package, ShieldCheck, Truck, ArrowRight } from "lucide-react"
import Link from "next/link"

type Product = {
  id: string
  sku: string
  name: string
  description: string | null
  price: number
  stock: number
  imageUrl: string | null
  category: { id: string; name: string } | null
}

export default function StoreCatalog({ products }: { products: Product[] }) {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("TODOS")
  const [cartCount, setCartCount] = useState(0)
  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({})

  // Update cart count
  const updateCartCount = () => {
    try {
      const cart = JSON.parse(localStorage.getItem("axtech_cart") || "[]")
      const count = cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0)
      setCartCount(count)
    } catch {
      setCartCount(0)
    }
  }

  useEffect(() => {
    updateCartCount()
    window.addEventListener("cartUpdated", updateCartCount)
    return () => window.removeEventListener("cartUpdated", updateCartCount)
  }, [])

  // Extract unique categories
  const categories = ["TODOS", ...Array.from(new Set(products.map(p => p.category?.name).filter(Boolean))) as string[]]

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                          product.sku.toLowerCase().includes(search.toLowerCase()) ||
                          (product.description && product.description.toLowerCase().includes(search.toLowerCase()))
    
    const matchesCategory = selectedCategory === "TODOS" || product.category?.name === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddToCart = (product: Product) => {
    if (product.stock <= 0) return

    const existingCart = JSON.parse(localStorage.getItem("axtech_cart") || "[]")
    const existingIndex = existingCart.findIndex((item: any) => item.id === product.id)
    if (existingIndex >= 0) {
      existingCart[existingIndex].quantity = (existingCart[existingIndex].quantity || 1) + 1
    } else {
      existingCart.push({ ...product, quantity: 1 })
    }
    localStorage.setItem("axtech_cart", JSON.stringify(existingCart))

    setAddedMap(prev => ({ ...prev, [product.id]: true }))
    setTimeout(() => {
      setAddedMap(prev => ({ ...prev, [product.id]: false }))
    }, 2000)

    window.dispatchEvent(new Event("cartUpdated"))
  }

  return (
    <div className="space-y-12">
      {/* Filters and Search Bar */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por nombre, SKU o modelo..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
          />
        </div>

        {/* Categories Pill List */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <Filter className="w-4 h-4 text-gray-400 shrink-0 hidden md:block" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Floating Cart Link */}
        <Link
          href="/tienda/carrito"
          className="flex items-center gap-2.5 bg-slate-900 hover:bg-blue-600 text-white px-5 py-3 rounded-xl font-bold text-sm transition shrink-0 shadow-md"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Ver Carrito</span>
          {cartCount > 0 && (
            <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-extrabold">
              {cartCount}
            </span>
          )}
        </Link>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300 p-8">
          <Package className="mx-auto mb-3 text-gray-300 w-16 h-16" />
          <h3 className="text-xl font-bold text-gray-800">No encontramos productos</h3>
          <p className="text-gray-500 text-sm mt-1 max-w-md mx-auto">
            {search || selectedCategory !== "TODOS"
              ? "Prueba cambiando el término de búsqueda o seleccionando otra categoría."
              : "Aún no se han publicado productos en el catálogo."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => {
            const isAdded = addedMap[product.id]
            const inStock = product.stock > 0

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col hover:shadow-xl hover:border-blue-300 transition-all duration-300 group"
              >
                {/* Image Box */}
                <div className="h-52 bg-gradient-to-br from-gray-50 to-gray-100 relative flex items-center justify-center overflow-hidden p-4">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="object-contain max-h-full max-w-full group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <Package className="w-12 h-12 stroke-[1.5] mb-1 opacity-50" />
                      <span className="text-[11px] uppercase tracking-wider font-semibold">Axtech Hardware</span>
                    </div>
                  )}

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.category && (
                      <span className="bg-white/90 backdrop-blur-md text-gray-800 text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm border border-gray-100 uppercase tracking-wide">
                        {product.category.name}
                      </span>
                    )}
                  </div>

                  <span
                    className={`absolute top-3 right-3 text-[10px] font-extrabold px-2.5 py-1 rounded-md shadow-sm ${
                      inStock
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {inStock ? `Stock: ${product.stock}` : "Agotado"}
                  </span>
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="text-[11px] font-mono text-gray-400 mb-1">
                    SKU: {product.sku}
                  </div>
                  <h3 className="font-bold text-gray-900 text-base line-clamp-2 mb-2 group-hover:text-blue-600 transition">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-4 flex-1">
                    {product.description || "Componente y refacción con respaldo y garantía oficial de ingeniería AXTECH."}
                  </p>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2 mt-auto">
                    <div>
                      <span className="text-[11px] text-gray-400 block font-medium">Precio</span>
                      <span className="text-xl font-extrabold text-blue-600">
                        ${product.price.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={!inStock}
                      className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md ${
                        !inStock
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                          : isAdded
                          ? "bg-green-600 text-white shadow-green-600/20"
                          : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20 hover:scale-105"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Agregado</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          <span>{inStock ? "Agregar" : "Agotado"}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
