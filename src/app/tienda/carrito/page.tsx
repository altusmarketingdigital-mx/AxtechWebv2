"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Trash2, CreditCard, ShoppingBag, Phone, Mail, ShieldCheck, CheckCircle2, Package } from "lucide-react"
import { processPosSale } from "@/app/actions/productActions"

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [clientName, setClientName] = useState("")
  const [successFolio, setSuccessFolio] = useState<string | null>(null)

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("axtech_cart") || "[]")
    setCart(saved)
  }, [])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    const updated = cart.map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
    setCart(updated)
    localStorage.setItem("axtech_cart", JSON.stringify(updated))
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const removeItem = (id: string) => {
    const updated = cart.filter(item => item.id !== id)
    setCart(updated)
    localStorage.setItem("axtech_cart", JSON.stringify(updated))
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const handleCheckout = async () => {
    if (cart.length === 0) return
    setLoading(true)
    const items = cart.map(i => ({ productId: i.id, quantity: i.quantity, price: i.price }))
    
    const result = await processPosSale(items, total, clientName || "Cliente Tienda Online")

    if (result.success && result.folio) {
      setSuccessFolio(result.folio)
      setCart([])
      localStorage.removeItem("axtech_cart")
      window.dispatchEvent(new Event("cartUpdated"))
    } else {
      alert("Hubo un problema al procesar el pedido. Por favor intenta de nuevo.")
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-between selection:bg-primary/30">
      
      {/* Corporate Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-200 z-50 px-6 py-2 flex justify-between items-center transition-all shadow-sm">
        <div className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform shrink-0">
          <Link href="/">
            <Image src="/logo.png" alt="AXTECH INGENIERÍA" width={160} height={45} className="object-contain" priority />
          </Link>
        </div>
        <div className="hidden md:flex gap-8 font-medium text-sm text-gray-800 items-center">
          <Link href="/" className="hover:text-primary transition-all">INICIO</Link>
          <Link href="/#soluciones" className="hover:text-primary transition-all">SOLUCIONES</Link>
          <Link href="/tienda" className="text-blue-600 font-bold transition-all flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200 shadow-sm">
            <ShoppingBag className="w-4 h-4 text-blue-600" />
            TIENDA ONLINE
          </Link>
          <Link href="/estado-reparacion" className="hover:text-primary transition-all text-gray-600">
            ESTADO DE EQUIPO
          </Link>
          <Link href="/#nosotros" className="hover:text-primary transition-all">NOSOTROS</Link>
          <Link href="/#contacto" className="hover:text-primary transition-all">CONTACTO</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="border border-gray-300 text-gray-700 hover:border-primary hover:text-primary px-5 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2"
          >
            Iniciar Sesión
          </Link>
          <Link 
            href="/tienda" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 shadow-md shadow-blue-600/20"
          >
            Seguir Comprando
          </Link>
        </div>
      </nav>

      {/* Cart Body */}
      <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto w-full flex-1">
        <div className="mb-8 flex items-center gap-4">
          <Link href="/tienda" className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-100 transition shadow-sm">
            <ArrowLeft size={20} className="text-gray-700" />
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Carrito de Compras</h1>
            <p className="text-sm text-gray-500 mt-0.5">Revisa tus productos seleccionados y confirma tu pedido</p>
          </div>
        </div>

        {/* Success Modal/Card */}
        {successFolio ? (
          <div className="bg-white p-12 rounded-3xl shadow-sm border border-green-200 text-center max-w-xl mx-auto space-y-6">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={36} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">¡Pedido Realizado con Éxito!</h2>
              <p className="text-gray-500 mt-2 text-sm">
                Hemos registrado tu compra correctamente. Tu folio de seguimiento es:
              </p>
              <div className="mt-3 inline-block bg-blue-50 border border-blue-200 text-blue-700 font-mono font-bold text-lg px-6 py-2 rounded-xl">
                {successFolio}
              </div>
            </div>
            <p className="text-xs text-gray-400">
              Uno de nuestros especialistas te contactará para coordinar la entrega o envío de tus componentes.
            </p>
            <div className="flex justify-center gap-3 pt-4">
              <Link
                href="/tienda"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition text-sm shadow-md"
              >
                Volver a la Tienda
              </Link>
            </div>
          </div>
        ) : cart.length === 0 ? (
          <div className="bg-white p-16 rounded-3xl shadow-sm border border-gray-200 text-center max-w-lg mx-auto">
            <Package className="mx-auto mb-4 text-gray-300 w-16 h-16" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h3>
            <p className="text-gray-500 text-sm mb-6">Explora nuestro catálogo para agregar componentes, refacciones o kits CCTV.</p>
            <Link href="/tienda" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition shadow-md">
              <ShoppingBag size={16} />
              Explorar Catálogo
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => (
                <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-4">
                  <div className="w-20 h-20 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center p-2 shrink-0">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="object-contain max-h-full max-w-full" />
                    ) : (
                      <Package className="text-gray-400 w-8 h-8 opacity-40" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-mono text-gray-400 block mb-0.5">SKU: {item.sku}</span>
                    <h3 className="font-bold text-gray-900 text-base truncate">{item.name}</h3>
                    <p className="font-extrabold text-blue-600 text-base mt-1">
                      ${Number(item.price).toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1.5 hover:bg-gray-200 font-bold text-gray-700 transition">-</button>
                      <span className="px-3 text-sm font-bold text-gray-900 min-w-[2rem] text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1.5 hover:bg-gray-200 font-bold text-gray-700 transition">+</button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary & Checkout Card */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200 space-y-6">
              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">Resumen del Pedido</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Nombre Completo / Empresa (Opcional)
                  </label>
                  <input 
                    type="text" 
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-sm" 
                    placeholder="Ej. Miriam Castro / Corporativo XYZ"
                  />
                </div>
              </div>

              <div className="space-y-2 border-t border-gray-100 pt-4 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">${total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Impuestos (IVA 16% incluido)</span>
                  <span>Incluido</span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between items-center text-lg font-black text-gray-900">
                  <span>Total:</span>
                  <span className="text-2xl font-black text-blue-600">${total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={loading || cart.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-2xl font-bold text-sm flex justify-center items-center gap-2 transition-all shadow-lg shadow-blue-600/30 disabled:opacity-50"
              >
                <CreditCard size={18} />
                <span>{loading ? "Procesando Pedido..." : "Confirmar y Realizar Pedido"}</span>
              </button>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-blue-800">
                <ShieldCheck size={16} className="text-blue-600 shrink-0 mt-0.5" />
                <p>Tu orden será procesada directamente por el equipo técnico de AXTECH con garantía oficial.</p>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Corporate Footer */}
      <footer className="bg-[#02040a] pt-20 pb-10 px-6 border-t border-white/10 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/10 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 relative z-10">
          
          <div className="space-y-6">
            <Image src="/logo.png" alt="AXTECH INGENIERÍA" width={160} height={45} className="object-contain bg-white px-3 py-1 rounded-full shadow-lg" />
            <p className="text-gray-300 text-sm leading-relaxed">
              Innovación, ingeniería y tecnología para impulsar el crecimiento de tu empresa.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Enlaces Rápidos</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/" className="hover:text-primary transition-colors">Inicio</Link></li>
              <li><Link href="/tienda" className="hover:text-primary transition-colors text-blue-400 font-medium flex items-center gap-1.5"><ShoppingBag className="w-3.5 h-3.5" />Tienda en Línea</Link></li>
              <li><Link href="/estado-reparacion" className="hover:text-primary transition-colors">Seguimiento de Reparación</Link></li>
              <li><Link href="/#soluciones" className="hover:text-primary transition-colors">Soluciones</Link></li>
              <li><Link href="/#nosotros" className="hover:text-primary transition-colors">Nosotros</Link></li>
              <li><Link href="/#contacto" className="hover:text-primary transition-colors">Contacto</Link></li>
            </ul>
          </div>

          <div id="contacto">
            <h4 className="text-white font-bold mb-6 tracking-wide">Contacto</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" /> 55 1348 5574
              </li>
              <li className="flex items-center gap-2 break-all">
                <Mail className="w-4 h-4 text-accent" /> ventas@axtech-ingenieria.com
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Redes Sociales</h4>
            <div className="flex gap-4 mb-6">
              <a href="https://www.facebook.com/share/1JXiLjqwKJ/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-primary/20 hover:text-primary transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://vt.tiktok.com/ZSXd9yK1K/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-primary/20 hover:text-primary transition-colors" aria-label="TikTok">
                <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                </svg>
              </a>
            </div>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><a href="#" className="text-xs underline hover:text-primary transition-colors">Aviso de Privacidad</a></li>
              <li><a href="#" className="text-xs underline hover:text-primary transition-colors">Términos y Condiciones</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 relative z-10">
          <p>© {new Date().getFullYear()} AXTECH INGENIERÍA. Todos los derechos reservados.</p>
        </div>
      </footer>

    </main>
  )
}
