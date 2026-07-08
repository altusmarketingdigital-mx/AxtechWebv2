'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Cpu, Settings, ShieldAlert, Search, Download } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function SoporteTecnicoPage() {
  const caracteristicas = [
    {
      titulo: 'Diagnóstico Avanzado de Equipos de Cómputo',
      descripcion: 'Realizamos evaluaciones técnicas integrales para identificar fallas de hardware y software, determinando la causa raíz del problema y estableciendo soluciones eficientes.',
      icono: <Search className="w-8 h-8 text-primary" />
    },
    {
      titulo: 'Mantenimiento Preventivo y Correctivo',
      descripcion: 'Aplicamos procedimientos especializados para conservar la estabilidad operativa de los equipos, prevenir fallas futuras y extender su vida útil mediante limpieza técnica, ajustes de rendimiento y correcciones necesarias.',
      icono: <Settings className="w-8 h-8 text-accent" />
    },
    {
      titulo: 'Optimización del Rendimiento',
      descripcion: 'Mejoramos la velocidad y eficiencia de los sistemas mediante configuraciones avanzadas, actualización de componentes y ajustes técnicos que permiten un mejor desempeño operativo.',
      icono: <Cpu className="w-8 h-8 text-green-500" />
    },
    {
      titulo: 'Instalación y Configuración de Sistemas',
      descripcion: 'Brindamos servicios de instalación, configuración y actualización de sistemas operativos, aplicaciones empresariales, controladores y herramientas necesarias para una operación eficiente.',
      icono: <Download className="w-8 h-8 text-purple-500" />
    },
    {
      titulo: 'Seguridad Informática',
      descripcion: 'Implementamos soluciones orientadas a proteger la información y los equipos mediante análisis de seguridad, eliminación de amenazas, configuración de sistemas de protección y buenas prácticas tecnológicas.',
      icono: <ShieldAlert className="w-8 h-8 text-red-500" />
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 selection:bg-primary/30 pb-20">
      
      {/* Navbar simplificado */}
      <nav className="w-full bg-white border-gray-200 shadow-sm backdrop-blur-md border-b px-6 py-4 flex justify-between items-center sticky top-0 z-50">
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
              className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-[1.1]"
            >
              Servicios de Soporte Técnico Especializado en <br />
              <span className="text-gray-600 font-medium text-3xl md:text-4xl">Reparación de Computadoras</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-lg leading-relaxed mb-8 max-w-lg"
            >
              Brindamos servicios especializados de diagnóstico, mantenimiento y reparación para equipos de cómputo, respaldados por personal técnico altamente calificado y procesos estandarizados. Nuestro compromiso es garantizar la disponibilidad, el rendimiento y la confiabilidad de su infraestructura tecnológica, proporcionando soluciones eficientes para usuarios particulares, empresas e instituciones.
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
      <section className="py-20 px-6 bg-white border-y border-gray-200 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Servicios <span className="text-primary">Especializados</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caracteristicas.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel p-8 rounded-3xl border border-gray-200 hover:bg-white shadow-sm transition-all group hover:-translate-y-1"
              >
                <div className="mb-6 p-4 bg-white border border-gray-100 shadow-sm rounded-2xl inline-block group-hover:scale-110 transition-transform">
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
        <h2 className="text-3xl font-bold text-center mb-12">Proceso de Servicio</h2>
        <div className="space-y-6">
          <div className="flex items-start gap-6 glass-panel p-6 rounded-3xl border-l-4 border-primary">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-black text-primary shrink-0">1</div>
            <div>
              <h4 className="text-xl font-bold mb-2">Recepción y Diagnóstico</h4>
              <p className="text-gray-600 text-sm leading-relaxed">Iniciamos el proceso con la recepción y el registro técnico del equipo, documentando su estado físico y funcional. Posteriormente, realizamos un diagnóstico integral mediante herramientas especializadas para identificar con precisión el origen de la falla y establecer la solución más adecuada.</p>
            </div>
          </div>
          <div className="flex items-start gap-6 glass-panel p-6 rounded-3xl border-l-4 border-accent">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center font-black text-accent shrink-0">2</div>
            <div>
              <h4 className="text-xl font-bold mb-2">Análisis Técnico y Autorización</h4>
              <p className="text-gray-600 text-sm leading-relaxed">Con base en los resultados del diagnóstico, elaboramos una propuesta de servicio que incluye el detalle de las acciones correctivas, las refacciones requeridas, el tiempo estimado de ejecución y el costo correspondiente. El proceso de reparación inicia únicamente después de contar con la autorización del cliente, garantizando transparencia y confianza en cada etapa.</p>
            </div>
          </div>
          <div className="flex items-start gap-6 glass-panel p-6 rounded-3xl border-l-4 border-green-500">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center font-black text-green-500 shrink-0">3</div>
            <div>
              <h4 className="text-xl font-bold mb-2">Reparación, Verificación y Entrega</h4>
              <p className="text-gray-600 text-sm leading-relaxed">La reparación es ejecutada por personal técnico calificado, siguiendo procedimientos estandarizados y aplicando estrictos controles de calidad. Antes de la entrega, el equipo es sometido a pruebas funcionales para verificar su óptimo desempeño. Finalmente, se entrega completamente operativo, con la documentación del servicio realizado y la garantía correspondiente.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Compromiso y CTA Final */}
      <section className="py-10 px-6">
        <div className="max-w-5xl mx-auto glass-panel p-10 md:p-16 rounded-[3rem] text-center bg-gradient-to-br from-primary/10 to-accent/10 border border-white/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestro Compromiso</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">Proporcionamos soluciones confiables y eficientes que permiten a nuestros clientes mantener equipos seguros, funcionales y preparados para sus necesidades operativas.</p>
          <Link href="/#cotizacion" className="px-8 py-4 bg-white text-black rounded-xl font-bold transition-all hover:scale-105 inline-block shadow-lg">
            Quiero una Cotización Formal
          </Link>
        </div>
      </section>

    </main>
  );
}
