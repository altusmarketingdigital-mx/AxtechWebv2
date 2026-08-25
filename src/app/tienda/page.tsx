import React from "react"
import prisma from "@/lib/prisma"
import StoreCatalog from "@/components/StoreCatalog"
import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, ChevronRight, Phone, Mail, ShieldCheck, Truck, Wrench, ArrowLeft } from "lucide-react"

export default async function StorePage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: { createdAt: "desc" }
  })

  return (
    <main className="min-h-screen bg-gray-50 selection:bg-primary/30">
      
      {/* Tech Navbar (Exact same corporate structure) */}
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
            href="/tienda/carrito" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 shadow-md shadow-blue-600/20"
          >
            <ShoppingBag className="w-4 h-4" />
            Carrito
          </Link>
        </div>
      </nav>

      {/* Store Hero Banner (Matching the corporate dark hero aesthetic) */}
      <section className="relative pt-36 pb-20 px-6 bg-gradient-to-b from-[#02040a] via-[#04122e] to-slate-900 text-white overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 font-semibold text-xs mb-4 uppercase tracking-wider">
                <ShoppingBag className="w-4 h-4" />
                Catálogo Oficial AXTECH
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
                Tienda en Línea & <span className="text-blue-400">Refacciones</span>
              </h1>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                Adquiere componentes de alta durabilidad, equipos de cómputo, refacciones originales y accesorios con garantía técnica directa.
              </p>
            </div>

            {/* Quick Benefits Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 shrink-0">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 flex items-center gap-3">
                <Truck className="w-5 h-5 text-blue-400 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-white">Envíos Rápidos</p>
                  <p className="text-[10px] text-gray-400">Entrega asegurada</p>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-green-400 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-white">Garantía Real</p>
                  <p className="text-[10px] text-gray-400">Soporte directo</p>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 flex items-center gap-3">
                <Wrench className="w-5 h-5 text-yellow-400 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-white">Asesoría TI</p>
                  <p className="text-[10px] text-gray-400">Atención técnica</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Body */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <StoreCatalog products={products} />
      </section>

      {/* Trust & Support Section */}
      <section className="py-16 px-6 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base mb-1">Envíos a Todo México</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Empaque profesional antiestático y seguro para que tus componentes lleguen en perfectas condiciones.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base mb-1">Garantía y Facturación</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Todos nuestros precios incluyen IVA. Emitimos facturas fiscales válidas para tu empresa.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base mb-1">Instalación y Configuración</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                ¿Necesitas que instalemos tu refacción? Consulta nuestro servicio técnico especializado en mostrador.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Footer (Exact same as homepage) */}
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
