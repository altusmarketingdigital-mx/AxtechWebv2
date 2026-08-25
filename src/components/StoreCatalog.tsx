"use client"

import React, { useState, useEffect } from "react"
import { 
  Search, 
  ShoppingBag, 
  ShoppingCart, 
  Check, 
  Filter, 
  Tag, 
  Package, 
  ShieldCheck, 
  Truck, 
  ArrowRight, 
  SlidersHorizontal, 
  Sparkles, 
  Phone, 
  Monitor, 
  HardDrive, 
  Video, 
  Wifi, 
  Cpu, 
  Layers,
  Star
} from "lucide-react"
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

const categoryIcons: Record<string, React.ReactNode> = {
  "Laptops": <Monitor className="w-5 h-5" />,
  "CCTV": <Video className="w-5 h-5" />,
  "Cámaras": <Video className="w-5 h-5" />,
  "Redes": <Wifi className="w-5 h-5" />,
  "Almacenamiento": <HardDrive className="w-5 h-5" />,
  "Componentes": <Cpu className="w-5 h-5" />,
  "Periféricos": <Layers className="w-5 h-5" />,
}

export default function StoreCatalog({ products }: { products: Product[] }) {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("TODOS")
  const [sortBy, setSortBy] = useState<string>("default")
  const [cartCount, setCartCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)
  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({})

  // Update cart count and total
  const updateCartState = () => {
    try {
      const cart = JSON.parse(localStorage.getItem("axtech_cart") || "[]")
      const count = cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0)
      const total = cart.reduce((sum: number, item: any) => sum + (Number(item.price) * (item.quantity || 1)), 0)
      setCartCount(count)
      setCartTotal(total)
    } catch {
      setCartCount(0)
      setCartTotal(0)
    }
  }

  useEffect(() => {
    updateCartState()
    window.addEventListener("cartUpdated", updateCartState)
    return () => window.removeEventListener("cartUpdated", updateCartState)
  }, [])

  // Extract unique categories
  const categories = ["TODOS", ...Array.from(new Set(products.map(p => p.category?.name).filter(Boolean))) as string[]]

  // Filter & Sort products
  let filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                          product.sku.toLowerCase().includes(search.toLowerCase()) ||
                          (product.description && product.description.toLowerCase().includes(search.toLowerCase()))
    
    const matchesCategory = selectedCategory === "TODOS" || product.category?.name === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (sortBy === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price)
  } else if (sortBy === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price)
  } else if (sortBy === "name-asc") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
  }

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
    }, 1800)

    window.dispatchEvent(new Event("cartUpdated"))
  }

  return (
    <div className="space-y-10">
      
      {/* Category Visual Cards Bar */}
      {categories.length > 1 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              Categorías de Hardware
            </h2>
            <span className="text-xs text-gray-500">{products.length} productos en inventario</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {categories.map(cat => {
              const count = cat === "TODOS" 
                ? products.length 
                : products.filter(p => p.category?.name === cat).length
              const isSelected = selectedCategory === cat
              const icon = categoryIcons[cat] || <Package className="w-5 h-5" />

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/25 scale-[1.02]"
                      : "bg-white text-gray-800 border-gray-200 hover:border-blue-300 hover:shadow-md"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                    isSelected ? "bg-white/20 text-white" : "bg-blue-50 text-blue-600"
                  }`}>
                    {icon}
                  </div>
                  <div>
                    <p className="font-bold text-sm leading-tight line-clamp-1">{cat}</p>
                    <p className={`text-[11px] mt-0.5 ${isSelected ? "text-blue-100" : "text-gray-400"}`}>
                      {count} {count === 1 ? "producto" : "productos"}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Interactive Search & Sort Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por nombre, SKU, modelo o especificación..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition placeholder:text-gray-400 font-medium"
          />
        </div>

        {/* Sort and Actions */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gray-400 shrink-0" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-700 text-xs font-bold py-2.5 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="default">Relevancia</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="name-asc">Nombre: A - Z</option>
            </select>
          </div>

          <Link
            href="/tienda/carrito"
            className="flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition shadow-md shrink-0"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Carrito</span>
            {cartCount > 0 && (
              <span className="bg-blue-500 text-white text-[11px] px-2 py-0.5 rounded-full font-black">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Catalog Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-300 p-8 shadow-sm">
          <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">No encontramos productos coincidentes</h3>
          <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto leading-relaxed">
            {search || selectedCategory !== "TODOS"
              ? "Prueba modificando tu búsqueda o seleccionando la opción 'TODOS' en categorías."
              : "Aún no se han cargado productos en esta sección del catálogo."}
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => { setSearch(""); setSelectedCategory("TODOS") }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition shadow-md"
            >
              Restablecer Filtros
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => {
            const isAdded = addedMap[product.id]
            const inStock = product.stock > 0
            const isLowStock = inStock && product.stock <= 3

            // WhatsApp link for custom query
            const waText = encodeURIComponent(`Hola AXTECH, me interesa cotizar/adquirir el producto: ${product.name} (SKU: ${product.sku}). ¿Tienen disponibilidad inmediata?`)
            const waUrl = `https://wa.me/525513485574?text=${waText}`

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-gray-200 overflow-hidden flex flex-col hover:shadow-2xl hover:border-blue-400 transition-all duration-300 group relative"
              >
                {/* Product Image Stage */}
                <div className="h-56 bg-gradient-to-b from-gray-50 to-white relative flex items-center justify-center p-6 border-b border-gray-100 overflow-hidden">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="object-contain max-h-full max-w-full group-hover:scale-108 transition-transform duration-500 ease-out"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-300 group-hover:text-blue-500 transition-colors">
                      <Package className="w-16 h-16 stroke-[1.2] mb-1.5" />
                      <span className="text-[10px] uppercase tracking-widest font-extrabold text-gray-400">AXTECH HARDWARE</span>
                    </div>
                  )}

                  {/* Top Category Badge */}
                  <div className="absolute top-3.5 left-3.5 flex flex-col gap-1">
                    {product.category && (
                      <span className="bg-white/95 backdrop-blur-md text-gray-800 text-[10px] font-extrabold px-3 py-1 rounded-full shadow-sm border border-gray-200/80 uppercase tracking-wider">
                        {product.category.name}
                      </span>
                    )}
                  </div>

                  {/* Stock Status Pill */}
                  <div className="absolute top-3.5 right-3.5">
                    {inStock ? (
                      <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-3 py-1 rounded-full shadow-sm ${
                        isLowStock 
                          ? "bg-amber-100 text-amber-800 border border-amber-200" 
                          : "bg-emerald-500 text-white"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isLowStock ? "bg-amber-600 animate-ping" : "bg-white"}`}></span>
                        {isLowStock ? `¡Solo ${product.stock} disp.!` : `Stock: ${product.stock}`}
                      </span>
                    ) : (
                      <span className="bg-rose-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow-sm">
                        Agotado
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col flex-1">
                  
                  {/* SKU & Brand */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 mb-1.5">
                    <span>SKU: {product.sku}</span>
                    <span className="text-emerald-600 font-semibold flex items-center gap-1 text-[10px]">
                      <ShieldCheck className="w-3 h-3" /> Garantía 1 Año
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-gray-900 text-base line-clamp-2 leading-snug mb-2 group-hover:text-blue-600 transition">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed flex-1">
                    {product.description || "Componente verificado bajo estándares de ingeniería y calidad AXTECH."}
                  </p>

                  {/* Price & Cart Actions */}
                  <div className="pt-3 border-t border-gray-100 space-y-3 mt-auto">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Precio Final</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-black text-blue-600 tracking-tight">
                            ${product.price.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                          <span className="text-[11px] font-medium text-gray-400">MXN</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-2">
                      {/* WhatsApp consultation */}
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Consultar por WhatsApp"
                        className="col-span-1 border border-gray-200 hover:border-green-500 hover:bg-green-50 text-gray-600 hover:text-green-600 rounded-xl flex items-center justify-center transition p-2.5 shadow-sm"
                      >
                        <Phone className="w-4 h-4" />
                      </a>

                      {/* Add to Cart Button */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={!inStock}
                        className={`col-span-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
                          !inStock
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                            : isAdded
                            ? "bg-emerald-600 text-white shadow-emerald-600/30 scale-[0.98]"
                            : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25 hover:shadow-lg hover:scale-[1.02]"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>¡En Carrito!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4" />
                            <span>{inStock ? "Agregar al Carrito" : "Sin Stock"}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Floating Bottom Cart Bar (Appears when cart has items) */}
      {cartCount > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 backdrop-blur-xl border border-white/20 text-white px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-6 animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-black text-xs text-white">
              {cartCount}
            </div>
            <div>
              <p className="text-xs text-gray-300 font-medium">Total en carrito:</p>
              <p className="text-sm font-black text-white">
                ${cartTotal.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN
              </p>
            </div>
          </div>

          <Link
            href="/tienda/carrito"
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full font-bold text-xs flex items-center gap-1.5 transition shadow-md"
          >
            <span>Ver Carrito y Pagar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

    </div>
  )
}
