"use client"

import React, { useState, useEffect } from "react"
import { Search, ShoppingCart, Trash2, Printer } from "lucide-react"
import { processPosSale } from "@/app/actions/productActions"
import { generateTicket } from "@/lib/generateTicket"

type Product = {
  id: string
  name: string
  sku: string
  price: number
  stock: number
}

type CartItem = Product & { quantity: number }

export default function POSPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState("")
  const [cart, setCart] = useState<CartItem[]>([])
  const [clientName, setClientName] = useState("")
  const [loading, setLoading] = useState(false)

  // In a real app, we'd fetch this from an API route. 
  // For simplicity, we are mocking the fetch or doing it client-side.
  // We should ideally fetch in a Server Component or use an API route.
  // I will add a simple placeholder message for now.

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const addToCart = (product: Product) => {
    if (product.stock <= 0) return alert("Producto sin stock")
    
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        if (existing.quantity >= product.stock) return prev
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }



  const handleCheckout = async () => {
    if (cart.length === 0) return
    setLoading(true)

    const items = cart.map(i => ({ productId: i.id, quantity: i.quantity, price: i.price, name: i.name }))
    const result = await processPosSale(items, total, clientName)

    if (result.success) {
      alert(`Venta completada. Folio: ${result.folio}`)
      
      // Generar ticket PDF
      generateTicket({
        folio: result.folio!,
        clientName,
        total,
        date: new Date(),
        items: items
      })

      setCart([])
      setClientName("")
    } else {
      alert(result.error)
    }
    setLoading(false)
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      {/* Products Section */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <h2 className="font-bold text-gray-800">Catálogo de Productos</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto">
           {/* Placeholder for products - ideally fetched via SWR or similar */}
           <div className="text-center text-gray-500 p-8 border-2 border-dashed rounded-xl">
             <p>Nota: Para que el POS funcione en tiempo real, se requiere conectar la API de búsqueda.</p>
             <p className="text-sm mt-2">Puedes buscar productos registrados previamente.</p>
           </div>
        </div>
      </div>

      {/* Cart Section */}
      <div className="w-96 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center space-x-2">
          <ShoppingCart size={20} className="text-gray-600" />
          <h2 className="font-bold text-gray-800">Carrito de Venta</h2>
        </div>

        <div className="p-4 border-b border-gray-100">
          <input 
            type="text" 
            placeholder="Nombre del Cliente (Opcional)" 
            value={clientName}
            onChange={e => setClientName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center text-gray-400 mt-10">
              <ShoppingCart size={48} className="mx-auto mb-2 opacity-20" />
              <p>El carrito está vacío</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900 line-clamp-1">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.quantity} x ${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-3 ml-2">
                  <p className="font-bold text-gray-900">${(item.quantity * item.price).toFixed(2)}</p>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:bg-red-50 p-1 rounded">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-100 space-y-4">
          <div className="flex justify-between items-center text-lg">
            <span className="font-bold text-gray-700">Total:</span>
            <span className="font-bold text-blue-600 text-2xl">${total.toFixed(2)}</span>
          </div>
          <button 
            onClick={handleCheckout}
            disabled={cart.length === 0 || loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold flex justify-center items-center space-x-2 hover:bg-blue-700 transition disabled:opacity-50"
          >
            <span>{loading ? "Procesando..." : "Cobrar"}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
