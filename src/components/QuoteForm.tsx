'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Send, CheckCircle } from 'lucide-react';

export default function QuoteForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Error al generar la cotización');
      
      // Descargar el PDF devuelto por la API
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Cotizacion_AXTECH_${formData.name.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      
      setStatus('success');
      setFormData({ name: '', email: '', service: '', message: '' }); // Reset
    } catch (error) {
      console.error(error);
      alert("Hubo un error al generar la cotización. Inténtelo de nuevo.");
      setStatus('idle');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        <h3 className="text-3xl font-bold mb-4">¡Cotización Descargada!</h3>
        <p className="text-gray-300 max-w-md mx-auto mb-8">
          Hemos recibido tu solicitud y tu PDF se ha descargado automáticamente. Nuestro equipo técnico evaluará tus requerimientos y se pondrá en contacto pronto.
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="px-6 py-3 bg-primary hover:bg-primary-hover text-gray-900 rounded-full font-medium transition"
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
          <p className="text-sm text-gray-300">Completa los datos y recibirás un PDF formal al instante.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Nombre Completo / Empresa *</label>
            <input 
              required 
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text" 
              placeholder="Ej. AXTECH CORP" 
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-primary transition"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Correo Electrónico *</label>
            <input 
              required 
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email" 
              placeholder="ventas@empresa.com" 
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-primary transition"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Servicio de Interés *</label>
          <select 
            required 
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-primary transition appearance-none"
          >
            <option value="" disabled>Seleccione un servicio...</option>
            <option value="Soporte Técnico Especializado en Computadoras">Soporte Técnico Especializado en Computadoras</option>
            <option value="Redes y Conectividad">Redes y Conectividad</option>
            <option value="Infraestructura de Servidores">Infraestructura de Servidores</option>
            <option value="Ciberseguridad">Ciberseguridad</option>
            <option value="Cámaras de Seguridad y Control de Accesos">Cámaras de Seguridad y Control de Accesos</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Detalles del Requerimiento *</label>
          <textarea 
            required 
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4} 
            placeholder="Describa brevemente lo que necesita..." 
            className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-primary transition resize-none"
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
              Enviando...
            </span>
          ) : (
            <>
              Enviar
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
