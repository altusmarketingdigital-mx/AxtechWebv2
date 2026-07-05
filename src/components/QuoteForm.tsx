'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Send, CheckCircle } from 'lucide-react';

export default function QuoteForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      // In real app, we will send data to Supabase/API here
    }, 1500);
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-8 md:p-12 rounded-3xl text-center flex flex-col items-center justify-center border-accent/20"
      >
        <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-accent" />
        </div>
        <h3 className="text-3xl font-bold mb-4">¡Cotización Solicitada!</h3>
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          Hemos recibido tu solicitud. Nuestro equipo técnico evaluará tus requerimientos y te enviaremos la cotización formal muy pronto.
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-full font-medium transition"
        >
          Enviar otra solicitud
        </button>
      </motion.div>
    );
  }

  return (
    <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden" id="cotizacion">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-primary/10 rounded-xl">
          <FileText className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Solicitar Cotización</h2>
          <p className="text-sm text-gray-400">Completa los datos y te enviaremos un PDF formal.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Nombre Completo / Empresa *</label>
            <input 
              required 
              type="text" 
              placeholder="Ej. AXTECH CORP" 
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Correo Electrónico *</label>
            <input 
              required 
              type="email" 
              placeholder="ventas@empresa.com" 
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Servicio de Interés *</label>
          <select 
            required 
            defaultValue=""
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition appearance-none"
          >
            <option value="" disabled>Seleccione un servicio...</option>
            <option value="Soporte Técnico">Soporte Técnico Especializado</option>
            <option value="Redes">Redes y Conectividad</option>
            <option value="Servidores">Servidores e Infraestructura</option>
            <option value="Ciberseguridad">Ciberseguridad</option>
            <option value="CCTV">CCTV y Control de Accesos</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Detalles del Requerimiento *</label>
          <textarea 
            required 
            rows={4} 
            placeholder="Describa brevemente lo que necesita..." 
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition resize-none"
          ></textarea>
        </div>

        <button 
          disabled={status === 'submitting'}
          type="submit" 
          className="w-full py-4 bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition"
        >
          {status === 'submitting' ? (
            <span className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Procesando...
            </span>
          ) : (
            <>
              Generar Cotización
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
