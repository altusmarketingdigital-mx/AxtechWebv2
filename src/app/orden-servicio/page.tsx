'use client';

import { useState } from 'react';
import { FileText, Save, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function OrdenServicio() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    technician: '',
    clientName: '',
    serviceType: 'Mantenimiento Preventivo (CCTV)',
    serviceDate: '',
    report: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/service-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Error al registrar la orden');
      
      // Descargar el PDF devuelto por la API
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `OrdenServicio_AXTECH_${formData.clientName.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      
      setSuccess(true);
      setFormData({
        technician: '',
        clientName: '',
        serviceType: 'Mantenimiento Preventivo (CCTV)',
        serviceDate: '',
        report: ''
      });
    } catch (error) {
      console.error(error);
      alert("Hubo un error al generar la orden. Inténtelo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="glass-panel p-10 rounded-3xl text-center max-w-md w-full border border-green-500/30">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-2">Orden Generada y PDF Descargado</h2>
          <p className="text-gray-400 mb-6">La orden de servicio técnico ha sido registrada en la base de datos y tu PDF está listo.</p>
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
              <input name="technician" value={formData.technician} onChange={handleChange} required type="text" placeholder="Ej. Roberto Martínez" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-gray-600" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 ml-1">Cliente / Empresa</label>
              <input name="clientName" value={formData.clientName} onChange={handleChange} required type="text" placeholder="Ej. Corporativo XYZ" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-gray-600" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 ml-1">Tipo de Servicio</label>
              <select name="serviceType" value={formData.serviceType} onChange={handleChange} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-all">
                <option value="Mantenimiento Preventivo (CCTV)">Mantenimiento Preventivo (CCTV)</option>
                <option value="Instalación de Redes (LAN/Wi-Fi)">Instalación de Redes (LAN/Wi-Fi)</option>
                <option value="Soporte de Servidores">Soporte de Servidores</option>
                <option value="Análisis de Ciberseguridad">Análisis de Ciberseguridad</option>
                <option value="Reparación de Hardware">Reparación de Hardware</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 ml-1">Fecha del Servicio</label>
              <input name="serviceDate" value={formData.serviceDate} onChange={handleChange} required type="date" className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-all" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-gray-300 ml-1">Reporte Técnico (Descripción del Trabajo)</label>
              <textarea name="report" value={formData.report} onChange={handleChange} required rows={4} placeholder="Describe detalladamente los hallazgos, reparaciones realizadas y piezas utilizadas..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none placeholder:text-gray-600"></textarea>
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
