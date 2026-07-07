'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Cpu, MonitorSmartphone, Settings, ShieldAlert, HardDrive, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function SoporteTecnicoPage() {
  const caracteristicas = [
    {
      titulo: 'Diagnóstico Preciso',
      descripcion: 'Identificamos la raíz del problema de hardware o software rápidamente con herramientas avanzadas.',
      icono: <MonitorSmartphone className="w-8 h-8 text-primary" />
    },
    {
      titulo: 'Mantenimiento Preventivo',
      descripcion: 'Limpieza interna, cambio de pasta térmica y optimización para alargar la vida útil de tu equipo.',
      icono: <Settings className="w-8 h-8 text-accent" />
    },
    {
      titulo: 'Reparación de Hardware',
      descripcion: 'Reemplazo de componentes dañados: discos duros, memoria RAM, fuentes de poder y tarjetas madre.',
      icono: <Cpu className="w-8 h-8 text-green-500" />
    },
    {
      titulo: 'Respaldo y Recuperación',
      descripcion: 'Protegemos tu información vital y recuperamos datos de discos dañados o formateados accidentalmente.',
      icono: <HardDrive className="w-8 h-8 text-purple-500" />
    },
    {
      titulo: 'Desinfección de Software',
      descripcion: 'Eliminación de virus, malware y ransomware, restaurando la seguridad de tu sistema operativo.',
      icono: <ShieldAlert className="w-8 h-8 text-red-500" />
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 selection:bg-primary/30 pb-20">
      
      {/* Navbar simplificado */}
      <nav className="w-full bg-white border-gray-200 shadow-sm backdrop-blur-md border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <Link href="/" className="hover:scale-105 transition-transform">
          <Image src="/logo.png" alt="AXTECH INGENIERÍA" width={140} height={40} className="object-contain" priority />
        </Link>
        <Link href="/" className="text-gray-700 hover:text-gray-900 flex items-center gap-2 text-sm font-bold transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Volver al Inicio
        </Link>
      </nav>

      {/* Hero Service */}
      <section className="relative pt-20 pb-16 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-bold tracking-widest uppercase mb-6"
            >
              Servicio Estrella
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-[1.1]"
            >
              Soporte Técnico <br />
              <span className="text-gray-600 font-medium text-3xl md:text-5xl">Especializado en Computadoras</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-lg leading-relaxed mb-8 max-w-lg"
            >
              Nuestro servicio combina diagnóstico profesional, herramientas tecnológicas y personal especializado para resolver cualquier fallo en tu equipo y dejarlo como nuevo.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/#cotizacion" className="px-8 py-4 bg-primary hover:bg-primary-hover text-gray-900 rounded-xl font-bold transition-all hover:shadow-[0_0_25px_rgba(15,98,209,0.5)] inline-block">
                Solicitar Diagnóstico
              </Link>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] p-8 relative overflow-hidden shadow-2xl border border-gray-200">
              <Image src="/it-support.png" alt="Soporte Técnico Especializado" fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Características del Servicio */}
      <section className="py-20 px-6 bg-white border-y border-white/5 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Por qué elegir nuestro <span className="text-primary">Soporte</span>?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Abordamos tanto problemas de software como de hardware para garantizar el rendimiento óptimo de tu computadora corporativa o personal.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caracteristicas.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel p-8 rounded-3xl border border-gray-200 hover:bg-white border-gray-200 shadow-sm transition-all group hover:-translate-y-1"
              >
                <div className="mb-6 p-4 bg-white border-gray-200 shadow-sm rounded-2xl inline-block group-hover:scale-110 transition-transform">
                  {item.icono}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.titulo}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.descripcion}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Nuestro Proceso de Trabajo</h2>
        <div className="space-y-6">
          <div className="flex items-start gap-6 glass-panel p-6 rounded-3xl border-l-4 border-primary">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-black text-primary shrink-0">1</div>
            <div>
              <h4 className="text-xl font-bold mb-2">Recepción y Diagnóstico</h4>
              <p className="text-gray-600 text-sm">Recibimos tu equipo, documentamos el estado inicial y realizamos pruebas exhaustivas para encontrar la falla exacta.</p>
            </div>
          </div>
          <div className="flex items-start gap-6 glass-panel p-6 rounded-3xl border-l-4 border-accent">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center font-black text-accent shrink-0">2</div>
            <div>
              <h4 className="text-xl font-bold mb-2">Cotización y Aprobación</h4>
              <p className="text-gray-600 text-sm">Te entregamos un reporte detallado con las refacciones necesarias y el costo de reparación para tu validación.</p>
            </div>
          </div>
          <div className="flex items-start gap-6 glass-panel p-6 rounded-3xl border-l-4 border-green-500">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center font-black text-green-500 shrink-0">3</div>
            <div>
              <h4 className="text-xl font-bold mb-2">Reparación y Entrega</h4>
              <p className="text-gray-600 text-sm">Aplicamos las soluciones pertinentes, testeamos el equipo al 100% y te lo entregamos funcionando a la perfección.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-10 px-6">
        <div className="max-w-5xl mx-auto glass-panel p-10 md:p-16 rounded-[3rem] text-center bg-gradient-to-br from-primary/10 to-accent/10 border-white/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Tu equipo está fallando?</h2>
          <p className="text-gray-700 mb-8 max-w-xl mx-auto">No pierdas tiempo ni información valiosa. Déjalo en manos de nuestros expertos en AXTECH.</p>
          <Link href="/#cotizacion" className="px-8 py-4 bg-white text-black rounded-xl font-bold transition-all hover:scale-105 inline-block shadow-lg">
            Quiero una Cotización Formal
          </Link>
        </div>
      </section>

    </main>
  );
}
