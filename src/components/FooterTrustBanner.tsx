import React from "react"
import { Truck, ShieldCheck, Wrench, CreditCard } from "lucide-react"

export default function FooterTrustBanner() {
  return (
    <div className="w-full max-w-7xl mx-auto mb-16 relative z-10">
      <div className="bg-[#0b1736]/90 border border-blue-500/20 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-widest text-blue-300">
            Garantía y Confianza
          </h3>
          <span className="text-xs bg-emerald-500/20 text-emerald-300 px-3.5 py-1 rounded-full font-bold border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Tienda Activa
          </span>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Envíos */}
          <div className="bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-blue-400/40 rounded-2xl p-5 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-3 group-hover:scale-110 transition-transform">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-black text-white group-hover:text-blue-300 transition-colors">
              Envíos Rápidos
            </h4>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              A todo México con empaque seguro
            </p>
          </div>

          {/* Card 2: 100% Original */}
          <div className="bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-emerald-400/40 rounded-2xl p-5 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-black text-white group-hover:text-emerald-300 transition-colors">
              100% Original
            </h4>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Garantía directa de laboratorio
            </p>
          </div>

          {/* Card 3: Instalación */}
          <div className="bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-amber-400/40 rounded-2xl p-5 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-110 transition-transform">
              <Wrench className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
              Instalación
            </h4>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Servicio técnico en mostrador
            </p>
          </div>

          {/* Card 4: Facturación */}
          <div className="bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-purple-400/40 rounded-2xl p-5 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-110 transition-transform">
              <CreditCard className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-black text-white group-hover:text-purple-300 transition-colors">
              Facturación
            </h4>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Precios con IVA incluido
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
