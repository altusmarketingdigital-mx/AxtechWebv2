"use client"

import React, { useState } from "react"
import ProductCard from "@/components/ProductCard"
import { Search, SlidersHorizontal } from "lucide-react"

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

export default function StoreCatalog({ products, categories }: { products: Product[]; categories: string[] }) {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("TODOS")

  const filtered = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.sku.toLowerCase().includes(search.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(search.toLowerCase()))

    const matchesCategory =
      selectedCategory === "TODOS" ||
      (product.category && product.category.name.toUpperCase() === selectedCategory.toUpperCase())

    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-8">
      {/* Filters & Search */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por producto, marca o modelo..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <span className="text-xs font-semibold text-gray-400 flex items-center gap-1 shrink-0 mr-1">
            <SlidersHorizontal size={14} /> Filtro:
          </span>
          <button
            onClick={() => setSelectedCategory("TODOS")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
              selectedCategory === "TODOS"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Todos ({products.length})
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                selectedCategory.toUpperCase() === cat.toUpperCase()
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300 p-8">
          <p className="text-gray-600 font-semibold text-lg">No encontramos productos con tu búsqueda.</p>
          <p className="text-gray-400 text-sm mt-1">Intenta con otro término o limpia los filtros.</p>
          <button
            onClick={() => { setSearch(""); setSelectedCategory("TODOS") }}
            className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-bold hover:bg-blue-100 transition"
          >
            Ver todos los productos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
