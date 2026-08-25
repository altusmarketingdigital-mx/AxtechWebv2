"use client"

import React, { useState } from "react"
import { ShoppingCart } from "lucide-react"

type Product = {
  id: string
  name: string
  description: string | null
  price: number
  stock: number
  imageUrl: string | null
}

export default function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    // Basic LocalStorage Cart Implementation
    const existingCart = JSON.parse(localStorage.getItem("axtech_cart") || "[]")
    
    const existingItemIndex = existingCart.findIndex((item: any) => item.id === product.id)
    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += 1
    } else {
      existingCart.push({ ...product, quantity: 1 })
    }
    
    localStorage.setItem("axtech_cart", JSON.stringify(existingCart))
    
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
    
    // Trigger a custom event so the cart header can update
    window.dispatchEvent(new Event('cartUpdated'))
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col transition hover:shadow-md">
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-full" />
        ) : (
          <span className="text-gray-400">Sin Imagen</span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-900 line-clamp-2">{product.name}</h3>
          <span className="font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg text-sm whitespace-nowrap ml-2">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">
          {product.description || "Sin descripción adicional."}
        </p>
        
        <button 
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className={`w-full py-2.5 rounded-lg font-medium flex justify-center items-center space-x-2 transition ${
            product.stock <= 0 
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : added 
                ? "bg-green-600 text-white" 
                : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          <ShoppingCart size={18} />
          <span>{product.stock <= 0 ? "Agotado" : added ? "¡Agregado!" : "Agregar al Carrito"}</span>
        </button>
      </div>
    </div>
  )
}
