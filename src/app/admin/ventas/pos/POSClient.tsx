"use client"

import React, { useState } from "react"
import { processPosSale } from "@/app/actions/posActions"
import { 
  ShoppingCart, 
  Search, 
  Trash2, 
  Plus, 
  Minus, 
  CreditCard, 
  Banknote, 
  ArrowRightLeft, 
  CheckCircle2, 
  DollarSign, 
  Package, 
  Receipt,
  User,
  AlertCircle
} from "lucide-react"

type CartItem = {
  productId: string
  name: string
  sku: string
  price: number
  quantity: number
  stock: number
}

export default function POSClient({ products }: { products: any[] }) {
  const [search, setSearch] = useState("")
  const [cart, setCart] = useState<CartItem[]>([])
  const [clientName, setClientName] = useState("Cliente Mostrador")
  const [paymentMethod, setPaymentMethod] = useState("EFECTIVO")
  const [amountPaid, setAmountPaid] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [lastSaleResult, setLastSaleResult] = useState<any>(null)

  // Filtrar productos
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  )

  const addToCart = (product: any) => {
    if (product.stock <= 0) {
      alert("¡Producto sin existencias disponibles en inventario!")
      return
    }

    setCart(prev => {
      const existing = prev.find(i => i.productId === product.id)
      if (existing) {
        if (existing.quantity >= product.stock) {
          alert(`No puedes agregar más de ${product.stock} unidades (límite de existencias).`)
          return prev
        }
        return prev.map(i => i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, {
        productId: product.id,
        name: product.name,
        sku: product.sku,
        price: product.price,
        quantity: 1,
        stock: product.stock
      }]
    })
  }

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.productId === productId) {
        const newQty = i.quantity + delta
        if (newQty <= 0) return null as any
        if (newQty > i.stock) {
          alert("Límite de stock alcanzado")
          return i
        }
        return { ...i, quantity: newQty }
      }
      return i
    }).filter(Boolean))
  }

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(i => i.productId !== productId))
  }

  const clearCart = () => setCart([])

  // Totales
  const total = cart.reduce((sum, item) => sum + (item.quantity * item.price), 0)
  const numPaid = parseFloat(amountPaid) || 0
  const change = Math.max(0, numPaid - total)

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("El carrito está vacío")
      return
    }

    if (paymentMethod === "EFECTIVO" && numPaid < total) {
      alert(`El monto recibido ($${numPaid}) es menor al total a cobrar ($${total})`)
      return
    }

    setLoading(true)
    const payload = {
      clientName,
      paymentMethod,
      amountPaid: paymentMethod === "EFECTIVO" ? numPaid : total,
      items: cart.map(i => ({
        productId: i.productId,
        quantity: i.quantity,
        price: i.price
      }))
    }

    const res = await processPosSale(payload)
    if (res.success) {
      setLastSaleResult(res)
      setCart([])
      setAmountPaid("")
    } else {
      alert(res.error || "Ocurrió un error al procesar la venta")
    }
    setLoading(false)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full min-h-[75vh]">
      
      {/* Columna Izquierda: Catálogo y Búsqueda */}
      <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col space-y-4">
        {/* Buscador */}
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Escanear código de barras, SKU o buscar por nombre de producto..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            autoFocus
          />
        </div>

        {/* Rejilla de productos */}
        <div className="flex-1 overflow-y-auto max-h-[600px] grid grid-cols-2 sm:grid-cols-3 gap-3 pr-1">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full py-12 text-center text-gray-400 text-xs">
              No se encontraron productos en el inventario.
            </div>
          ) : (
            filteredProducts.map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => addToCart(p)}
                disabled={p.stock <= 0}
                className="p-3 bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 rounded-xl text-left transition flex flex-col justify-between group disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <div>
                  <span className="text-[9px] font-mono text-gray-400 block mb-0.5 truncate">{p.sku}</span>
                  <h4 className="text-xs font-bold text-gray-800 group-hover:text-blue-600 line-clamp-2 leading-snug">
                    {p.name}
                  </h4>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs font-black text-gray-900">
                    ${p.price.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                  </span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    p.stock > 3 ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                  }`}>
                    {p.stock} pza{p.stock !== 1 && 's'}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Columna Derecha: Carrito y Cobro */}
      <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between space-y-4">
        
        {/* Ticket Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
              <ShoppingCart size={18} className="text-blue-600" /> Ticket de Venta
            </h2>
            {cart.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="text-[11px] font-bold text-red-500 hover:text-red-700 flex items-center gap-1"
              >
                <Trash2 size={12} /> Limpiar
              </button>
            )}
          </div>

          {/* Cliente mostrador */}
          <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-100 text-xs">
            <User size={14} className="text-gray-400 shrink-0" />
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Nombre del cliente o razón social..."
              className="bg-transparent w-full outline-none font-semibold text-gray-700"
            />
          </div>

          {/* Lista de partidas en carrito */}
          <div className="overflow-y-auto max-h-[250px] space-y-2 divide-y divide-gray-50 pr-1">
            {cart.length === 0 ? (
              <div className="py-10 text-center text-gray-400 text-xs">
                El carrito está vacío. Haz clic en un producto para agregarlo.
              </div>
            ) : (
              cart.map(item => (
                <div key={item.productId} className="pt-2 flex items-center justify-between text-xs gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-800 truncate">{item.name}</p>
                    <p className="text-[10px] text-gray-400">${item.price.toFixed(2)} c/u</p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, -1)}
                      className="w-5 h-5 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center font-bold text-gray-600"
                    >
                      <Minus size={11} />
                    </button>
                    <span className="font-bold text-xs w-4 text-center">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, 1)}
                      className="w-5 h-5 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center font-bold text-gray-600"
                    >
                      <Plus size={11} />
                    </button>
                  </div>

                  <div className="text-right shrink-0 w-16">
                    <span className="font-bold text-gray-900">
                      ${(item.quantity * item.price).toFixed(2)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.productId)}
                    className="text-gray-300 hover:text-red-500 transition ml-1"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Resumen de Cobro y Métodos de Pago */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          {/* Métodos de Pago */}
          <div>
            <span className="text-[11px] font-bold text-gray-500 uppercase block mb-1.5">Método de Pago:</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod("EFECTIVO")}
                className={`py-2 px-2 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition ${
                  paymentMethod === "EFECTIVO" ? "bg-emerald-50 border-emerald-300 text-emerald-800" : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <Banknote size={14} /> Efectivo
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("TARJETA")}
                className={`py-2 px-2 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition ${
                  paymentMethod === "TARJETA" ? "bg-blue-50 border-blue-300 text-blue-800" : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <CreditCard size={14} /> Tarjeta
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("TRANSFERENCIA")}
                className={`py-2 px-2 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition ${
                  paymentMethod === "TRANSFERENCIA" ? "bg-purple-50 border-purple-300 text-purple-800" : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <ArrowRightLeft size={14} /> Transfer.
              </button>
            </div>
          </div>

          {/* Si es efectivo, calcular cambio */}
          {paymentMethod === "EFECTIVO" && (
            <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Paga con ($):</label>
                <input
                  type="number"
                  step="0.01"
                  value={amountPaid}
                  onChange={(e) => setAmountPaid(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg font-bold text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <span className="block font-bold text-gray-700 mb-1">Cambio:</span>
                <p className={`font-black text-base py-1 ${change > 0 ? "text-emerald-600" : "text-gray-400"}`}>
                  ${change.toFixed(2)}
                </p>
              </div>
            </div>
          )}

          {/* Gran Total */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-xs text-gray-400 uppercase font-bold">Total a Pagar</span>
              <p className="text-3xl font-black text-gray-900 leading-tight">
                ${total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
              </p>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              disabled={loading || cart.length === 0}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <CheckCircle2 size={18} />
              <span>{loading ? "Cobrando..." : "Cobrar Venta"}</span>
            </button>
          </div>

          {/* Mensaje de Venta Exitosa */}
          {lastSaleResult && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-800 flex items-center justify-between">
              <div>
                <p className="font-bold">¡Venta registrada con éxito!</p>
                <p className="text-[11px] font-mono">Folio: {lastSaleResult.folio} • Cambio: ${lastSaleResult.change.toFixed(2)}</p>
              </div>
              <button
                type="button"
                onClick={() => setLastSaleResult(null)}
                className="text-emerald-600 font-bold hover:underline"
              >
                Aceptar
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  )
}