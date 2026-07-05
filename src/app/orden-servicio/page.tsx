'use client';

import { useState } from 'react';
import { FileText, Save, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function OrdenServicio() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulating API Call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="glass-panel p-10 rounded-3xl text-center max-w-md w-full border border-green-500/30">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-2">Orden Generada</h2>
          <p className="text-gray-400 mb-6">La orden de servicio técnico ha sido registrada en la base de datos.</p>
          <button 
            onClick={() => setSuccess(false)}
            className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-xl font-bold transition-all"
          >
            Registrar Nueva Orden
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 py-20 relative">
      <Link href="/" className="absolute top-6 left-6 text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Volver al Inicio
      </Link>
      
      <div className="max-w-3xl w-full">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-accent/10 rounded-full mb-4 ring-1 ring-accent/30">
            <FileText className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Orden de <span className="text-accent">Servicio Técnico</span></h1>
          <p className="text-gray-400">Portal interno para registro de mantenimientos, instalaciones y soporte AXTECH.</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel p-8 md:p-10 rounded-3xl border border-white/10 space-y-6 shadow-2xl relative overflow-hidden">
          {/* Form Glow */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 ml-1">Técnico Asignado</label>
              <input required type="text" placeholder="Ej. Roberto Martínez" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-gray-600" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 ml-1">Cliente / Empresa</label>
              <input required type="text" placeholder="Ej. Corporativo XYZ" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-gray-600" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 ml-1">Tipo de Servicio</label>
              <select className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-all">
                <option>Mantenimiento Preventivo (CCTV)</option>
                <option>Instalación de Redes (LAN/Wi-Fi)</option>
                <option>Soporte de Servidores</option>
                <option>Análisis de Ciberseguridad</option>
                <option>Reparación de Hardware</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 ml-1">Fecha del Servicio</label>
              <input required type="date" className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-all" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-gray-300 ml-1">Reporte Técnico (Descripción del Trabajo)</label>
              <textarea required rows={4} placeholder="Describe detalladamente los hallazgos, reparaciones realizadas y piezas utilizadas..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none placeholder:text-gray-600"></textarea>
            </div>
          </div>

          <button 
            disabled={loading}
            type="submit" 
            className="w-full mt-4 bg-accent hover:bg-accent-hover text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:-translate-y-1 shadow-[0_5px_20px_rgba(253,182,20,0.3)] disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Registrar Orden y Generar PDF
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
