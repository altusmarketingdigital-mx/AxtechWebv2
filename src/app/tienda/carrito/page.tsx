"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Trash2, CreditCard } from "lucide-react"
import { processPosSale } from "@/app/actions/productActions" // Reusing this for simplicity

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [clientName, setClientName] = useState("")

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("axtech_cart") || "[]")
    setCart(saved)
  }, [])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    const updated = cart.map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
    setCart(updated)
    localStorage.setItem("axtech_cart", JSON.stringify(updated))
  }

  const removeItem = (id: string) => {
    const updated = cart.filter(item => item.id !== id)
    setCart(updated)
    localStorage.setItem("axtech_cart", JSON.stringify(updated))
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const handleCheckout = async () => {
    setLoading(true)
    // Note: In a real E-commerce, we would integrate Stripe here.
    // For this prototype, we'll process it directly as an online sale.
    const items = cart.map(i => ({ productId: i.id, quantity: i.quantity, price: i.price }))
    
    // We reuse the POS action but we'd ideally have a specific one for Online Sales
    const result = await processPosSale(items, total, clientName || "Cliente Online")

    if (result.success) {
      alert(`¡Compra Exitosa! Folio de Pedido: ${result.folio}`)
      setCart([])
      localStorage.removeItem("axtech_cart")
    } else {
      alert("Hubo un problema al procesar el pedido.")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        
        <div className="flex items-center space-x-4">
          <Link href="/tienda" className="p-2 bg-white border rounded-lg hover:bg-gray-50">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Tu Carrito de Compras</h1>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
            <p className="text-gray-500 mb-4">No tienes productos en tu carrito.</p>
            <Link href="/tienda" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700">
              Ir a la tienda
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-4">
              {cart.map(item => (
                <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0">
                    {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover rounded-lg" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500 font-mono">{item.sku}</p>
                    <p className="font-medium text-blue-600 mt-1">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 bg-gray-50 hover:bg-gray-100">-</button>
                      <span className="px-3 font-medium text-sm w-8 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 bg-gray-50 hover:bg-gray-100">+</button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Checkout Summary */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit space-y-6">
              <h2 className="text-xl font-bold text-gray-900 border-b pb-4">Resumen de Pedido</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                  <input 
                    type="text" 
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
                    placeholder="Para el envío..."
                  />
                </div>
              </div>

              <div className="border-t pt-4 flex justify-between items-center text-lg">
                <span className="font-bold text-gray-700">Total a pagar:</span>
                <span className="font-bold text-blue-600 text-2xl">${total.toFixed(2)}</span>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold flex justify-center items-center space-x-2 hover:bg-slate-800 transition disabled:opacity-50"
              >
                <CreditCard size={20} />
                <span>{loading ? "Procesando..." : "Pagar con Tarjeta (Simulado)"}</span>
              </button>
              
              <p className="text-xs text-center text-gray-500 mt-2">
                En esta versión de prueba, la compra se procesa internamente sin Stripe.
              </p>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}
