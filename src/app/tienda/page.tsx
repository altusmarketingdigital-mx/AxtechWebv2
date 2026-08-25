import React from "react"
import prisma from "@/lib/prisma"
import StoreCatalog from "@/components/StoreCatalog"
import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, ChevronRight, Phone, Mail, ShieldCheck, Truck, Wrench, ArrowRight, Zap, RefreshCw, CreditCard, Sparkles, CheckCircle2 } from "lucide-react"
import FooterTrustBanner from "@/components/FooterTrustBanner"

export default async function StorePage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: { createdAt: "desc" }
  })

  return (
    <main className="min-h-screen bg-[#f8fafc] selection:bg-blue-600/30">
      
      {/* Tech Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-200 z-50 px-6 py-2 flex justify-between items-center transition-all shadow-sm">
        <div className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform shrink-0">
          <Link href="/">
            <Image src="/logo.png" alt="AXTECH INGENIERÍA" width={160} height={45} className="object-contain" priority />
          </Link>
        </div>
        <div className="hidden md:flex gap-8 font-medium text-sm text-gray-800 items-center">
          <Link href="/" className="hover:text-primary transition-all">INICIO</Link>
          <Link href="/#soluciones" className="hover:text-primary transition-all">SOLUCIONES</Link>
          <Link href="/tienda" className="text-blue-600 font-bold transition-all flex items-center gap-1.5 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200 shadow-sm">
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 shadow-md shadow-blue-600/25"
          >
            <ShoppingBag className="w-4 h-4" />
            Ver Carrito
          </Link>
        </div>
      </nav>

      {/* Modern Store Hero Banner */}
      <section className="relative pt-36 pb-20 px-6 bg-gradient-to-br from-[#02040a] via-[#071738] to-[#040e24] text-white overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 right-10 w-[550px] h-[550px] bg-blue-600/15 rounded-full blur-[160px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Header Info */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 font-semibold text-xs uppercase tracking-wider backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                Catálogo Digital de Hardware y Refacciones
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08]">
                Tienda Oficial <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
                  AXTECH INGENIERÍA
                </span>
              </h1>
              
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl">
                Componentes originales, discos SSD, memorias RAM, kits CCTV y equipo de red con <strong>garantía por escrito</strong>, soporte técnico y factura fiscal.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <a
                  href="#catalogo"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-7 py-3.5 rounded-2xl text-sm transition-all shadow-xl shadow-blue-600/30 flex items-center gap-2 hover:scale-105"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Explorar Catálogo
                </a>
                <Link
                  href="/estado-reparacion"
                  className="border border-white/20 hover:border-white/40 hover:bg-white/5 text-gray-200 font-semibold px-6 py-3.5 rounded-2xl text-sm transition flex items-center gap-2"
                >
                  Rastrear Reparación
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>
              </div>
            </div>

            {/* Right Interactive Stats Showcase */}
            <div className="lg:col-span-5">
              <div className="bg-white/[0.07] border border-white/10 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-sm font-extrabold uppercase tracking-wider text-blue-300">Garantía y Confianza</span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full font-bold border border-emerald-500/30 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Tienda Activa
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <Truck className="w-6 h-6 text-blue-400 mb-2" />
                    <p className="text-lg font-black text-white">Envíos Rápidos</p>
                    <p className="text-xs text-gray-400 mt-0.5">A todo México con empaque seguro</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <ShieldCheck className="w-6 h-6 text-emerald-400 mb-2" />
                    <p className="text-lg font-black text-white">100% Original</p>
                    <p className="text-xs text-gray-400 mt-0.5">Garantía directa de laboratorio</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <Wrench className="w-6 h-6 text-amber-400 mb-2" />
                    <p className="text-lg font-black text-white">Instalación</p>
                    <p className="text-xs text-gray-400 mt-0.5">Servicio técnico en mostrador</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <CreditCard className="w-6 h-6 text-purple-400 mb-2" />
                    <p className="text-lg font-black text-white">Facturación</p>
                    <p className="text-xs text-gray-400 mt-0.5">Precios con IVA incluido</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Catalog Body */}
      <section id="catalogo" className="max-w-7xl mx-auto px-6 py-14">
        <StoreCatalog products={products} />
      </section>

      {/* Custom Quote Banner */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl border border-blue-500/20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="text-blue-400 font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
              <Zap className="w-4 h-4" /> Cotizaciones Especiales y Empresariales
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">¿Buscas un componente específico o compra por volumen?</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Si no encuentras el modelo exacto en el catálogo, nuestros ingenieros te consiguen la pieza o cotizan lotes completos para tu empresa.
            </p>
          </div>

          <a
            href="https://wa.me/525513485574?text=Hola%20AXTECH,%20busco%20una%20cotizaci%C3%B3n%20personalizada%20de%20refacciones/equipos"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-black px-8 py-4 rounded-2xl text-sm transition-all shadow-xl shadow-emerald-500/25 shrink-0 flex items-center gap-2 hover:scale-105"
          >
            <Phone className="w-4 h-4" />
            Cotizar por WhatsApp
          </a>
        </div>
      </section>

      {/* Corporate Footer */}
      <footer className="bg-[#02040a] pt-16 pb-10 px-6 border-t border-white/10 relative overflow-hidden text-gray-300">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/10 rounded-full blur-[150px] pointer-events-none"></div>
        
        {/* Garantía y Confianza Banner */}
        <FooterTrustBanner />

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 relative z-10">
          
          <div className="space-y-6">
            <Image src="/logo.png" alt="AXTECH INGENIERÍA" width={160} height={45} className="object-contain bg-white px-3 py-1 rounded-full shadow-lg" />
            <p className="text-gray-400 text-sm leading-relaxed">
              Innovación, ingeniería y tecnología para impulsar el crecimiento de tu empresa.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Enlaces Rápidos</h4>
            <ul className="space-y-3 text-sm text-gray-400">
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
            <ul className="space-y-3 text-sm text-gray-400">
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
            <ul className="space-y-3 text-sm text-gray-400">
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
