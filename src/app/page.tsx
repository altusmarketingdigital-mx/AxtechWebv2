'use client';

import { motion } from 'framer-motion';
import { Server, ShieldCheck, Network, Settings, Laptop, ArrowRight, Cpu, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import QuoteForm from '@/components/QuoteForm';

export default function Home() {
  const services = [
    {
      title: 'Soporte Técnico Especializado en Computadoras',
      description: 'Nuestro servicio combina diagnóstico profesional, herramientas tecnológicas y personal especializado.',
      icon: <Laptop className="w-10 h-10 text-white" />,
      colSpan: 'col-span-1 md:col-span-2',
      bg: 'bg-gradient-to-br from-primary/90 to-primary/40',
      slug: 'soporte-tecnico'
    },
    {
      title: 'Redes y Conectividad',
      description: 'Diseñamos, implementamos y optimizamos infraestructuras de red seguras, eficientes y escalables.',
      icon: <Network className="w-10 h-10 text-black" />,
      colSpan: 'col-span-1 md:col-span-2',
      bg: 'bg-gradient-to-br from-accent/90 to-accent/40',
      slug: 'redes-telecomunicaciones'
    },
    {
      title: 'Infraestructura de Servidores',
      description: 'Arquitectura, virtualización y respaldo de datos empresariales.',
      icon: <Server className="w-8 h-8 text-primary" />,
      colSpan: 'col-span-1',
      bg: 'glass-panel hover:bg-white/5',
      slug: 'servidores'
    },
    {
      title: 'Ciberseguridad',
      description: 'Protección perimetral y análisis de vulnerabilidades.',
      icon: <ShieldCheck className="w-8 h-8 text-accent" />,
      colSpan: 'col-span-1',
      bg: 'glass-panel hover:bg-white/5',
      slug: 'ciberseguridad'
    },
    {
      title: 'Cámaras de Seguridad y Control de Accesos',
      description: 'Sistemas integrales de videovigilancia diseñados para proteger instalaciones.',
      icon: <Settings className="w-8 h-8 text-primary" />,
      colSpan: 'col-span-1 md:col-span-2',
      bg: 'glass-panel hover:bg-white/5',
      slug: 'cctv'
    }
  ];

  return (
    <main className="min-h-screen bg-background selection:bg-primary/30">
      {/* Floating Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl bg-white/90 backdrop-blur-2xl border border-gray-200/50 rounded-full z-50 px-6 py-3 flex justify-between items-center shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <div className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform">
          <Image src="/logo.png" alt="AXTECH INGENIERÍA" width={160} height={45} className="object-contain" priority />
        </div>
        <div className="hidden md:flex gap-8 font-semibold text-sm text-gray-700">
          <Link href="#inicio" className="hover:text-primary transition-colors">Inicio</Link>
          <Link href="#soluciones" className="hover:text-primary transition-colors">Soluciones</Link>
          <Link href="#cotizacion" className="hover:text-primary transition-colors">Cotización</Link>
        </div>
        <Link 
          href="#cotizacion" 
          className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 group shadow-[0_4px_14px_0_rgba(15,98,209,0.39)] hover:shadow-[0_6px_20px_rgba(15,98,209,0.23)] hover:-translate-y-0.5"
        >
          Iniciar Proyecto
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen pt-40 pb-20 px-6 lg:min-h-[90vh] flex items-center overflow-hidden tech-grid">
        {/* Glow Effects */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px]"></div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left Content */}
          <div className="text-left">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
            >
              <Cpu className="w-4 h-4 text-accent" />
              <span className="text-xs font-mono text-gray-300 tracking-wider uppercase">Ingeniería de Nueva Generación</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 text-white leading-[1.1]"
            >
              Arquitectura <br/>
              <span className="text-gradient-brand font-black">Tecnológica</span><br/>
              para el Futuro.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-400 mb-10 font-light max-w-lg leading-relaxed"
            >
              Innovación, ingeniería y tecnología para impulsar el crecimiento de tu empresa.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="#cotizacion" className="px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold flex items-center gap-3 transition-all hover:shadow-[0_0_30px_rgba(15,98,209,0.5)]">
                Cotizar Solución
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>

          {/* Right Visual (Bento Preview) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden lg:grid grid-cols-2 gap-4 relative"
          >
            <div className="col-span-2 glass-panel p-8 rounded-3xl border-t border-white/20">
              <div className="flex justify-between items-start mb-6">
                <Network className="w-10 h-10 text-primary" />
                <span className="text-green-400 text-xs font-mono bg-green-400/10 px-2 py-1 rounded">Sistema Activo</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Conectividad 99.9%</h3>
              <p className="text-gray-400 text-sm">Redes optimizadas para latencia cero.</p>
            </div>
            <div className="glass-panel p-6 rounded-3xl bg-accent/10 border-accent/20">
              <ShieldCheck className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-bold text-lg">Seguridad</h3>
              <p className="text-xs text-gray-400 mt-1">Protección 24/7</p>
            </div>
            <div className="glass-panel p-6 rounded-3xl">
              <Server className="w-8 h-8 text-gray-300 mb-4" />
              <h3 className="font-bold text-lg">Servidores</h3>
              <p className="text-xs text-gray-400 mt-1">Alta disponibilidad</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quiénes Somos Section */}
      <section className="py-24 px-6 relative bg-[#050505] border-t border-white/5" id="nosotros">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">Quiénes <span className="text-primary">Somos</span></h2>
            <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
              <p>
                En <strong className="text-white">GRUPO AXTECH</strong> somos una empresa enfocada en el desarrollo, integración e implementación de soluciones tecnológicas que impulsan la eficiencia, innovación y crecimiento de las organizaciones.
              </p>
              <p>
                Contamos con un equipo de profesionales especializados en tecnología e ingeniería, comprometidos con ofrecer soluciones integrales y personalizadas.
              </p>
              <p>
                En Ingeniería Especializada en Soluciones Tecnológicas creemos que la tecnología debe ser una herramienta estratégica para el crecimiento. Por ello, nos enfocamos en crear soluciones prácticas, eficientes y escalables.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-panel p-8 rounded-3xl border-t border-primary/30">
              <h3 className="text-xl font-bold mb-4 text-white">Nuestra Misión</h3>
              <p className="text-sm text-gray-400">Brindar soluciones tecnológicas innovadoras y eficientes mediante ingeniería especializada, ayudando a las organizaciones a mejorar sus procesos, productividad y competitividad.</p>
            </div>
            <div className="glass-panel p-8 rounded-3xl border-t border-accent/30">
              <h3 className="text-xl font-bold mb-4 text-white">Nuestra Visión</h3>
              <p className="text-sm text-gray-400">Ser una empresa referente en ingeniería tecnológica, reconocida por la calidad de nuestras soluciones, la innovación constante y la confianza que generamos en nuestros clientes.</p>
            </div>
            <div className="glass-panel p-8 rounded-3xl sm:col-span-2">
              <h3 className="text-xl font-bold mb-4 text-white text-center">Nuestros Valores</h3>
              <ul className="flex flex-wrap justify-center gap-4 text-sm text-gray-300 font-semibold">
                <li className="bg-white/5 px-4 py-2 rounded-full border border-white/10">Innovación tecnológica</li>
                <li className="bg-white/5 px-4 py-2 rounded-full border border-white/10">Calidad y profesionalismo</li>
                <li className="bg-white/5 px-4 py-2 rounded-full border border-white/10">Compromiso con el cliente</li>
                <li className="bg-white/5 px-4 py-2 rounded-full border border-white/10">Integridad y confianza</li>
                <li className="bg-white/5 px-4 py-2 rounded-full border border-white/10">Mejora continua</li>
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* Bento Grid Services Section */}
      <section id="soluciones" className="py-24 px-6 relative z-20 bg-background border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Ecosistema de <span className="text-primary">Soluciones</span></h2>
            <p className="text-gray-400 text-lg max-w-2xl">Diseñamos arquitecturas tecnológicas escalables y robustas. Explora nuestros servicios clave.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <Link href={`/servicios/${service.slug}`} key={idx} className={`${service.colSpan} block`}>
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`h-full ${service.bg} p-8 md:p-10 rounded-[2rem] border border-white/10 transition-all duration-300 cursor-pointer overflow-hidden relative group hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:-translate-y-1`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="mb-8">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className={`text-2xl md:text-3xl font-bold mb-3 tracking-tight ${service.bg.includes('accent') ? 'text-black' : 'text-white'}`}>{service.title}</h3>
                      <p className={`${service.bg.includes('accent') ? 'text-black/70' : 'text-white/70'} text-sm md:text-base font-medium max-w-md`}>{service.description}</p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-24 px-6 relative tech-grid border-t border-white/5" id="cotizacion">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Inicia tu <span className="text-accent">Proyecto</span></h2>
            <p className="text-gray-400">Automatiza la cotización de tu requerimiento técnico al instante.</p>
          </div>
          <QuoteForm />
        </div>
      </section>

      {/* Trust Section (Moved to Bottom) */}
      <section className="py-12 px-6 border-y border-white/10 bg-gradient-to-b from-white/5 to-transparent relative">
        <div className="absolute inset-0 bg-primary/10 blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <p className="text-sm text-gray-300 font-bold tracking-widest uppercase mb-10">Empresas que confían en nuestros servicios</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20">
            <div className="flex items-center gap-3 hover:scale-110 transition-transform cursor-default">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-cyan-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
              <span className="text-2xl font-bold tracking-tight text-white">METROLOGÍA FROMI</span>
            </div>
            <div className="flex items-center gap-3 hover:scale-110 transition-transform cursor-default">
              <div className="w-8 h-8 rounded-full border-4 border-accent shadow-[0_0_15px_rgba(253,182,20,0.5)]"></div>
              <span className="text-2xl font-bold tracking-widest text-white">TENSOS</span>
            </div>
            <div className="flex items-center gap-3 hover:scale-110 transition-transform cursor-default">
              <div className="w-8 h-8 rotate-45 bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
              <span className="text-2xl font-bold tracking-tighter text-white">TORDO TECH</span>
            </div>
            <div className="flex items-center gap-3 hover:scale-110 transition-transform cursor-default">
              <div className="w-10 h-3 bg-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)]"></div>
              <span className="text-2xl font-black italic text-white">SDPN</span>
            </div>
          </div>
        </div>
      </section>




      {/* Footer */}
      <footer className="bg-[#02040a] pt-20 pb-10 px-6 border-t border-white/10 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/10 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 relative z-10">
          
          <div className="space-y-6">
            <Image src="/logo.png" alt="AXTECH INGENIERÍA" width={160} height={45} className="object-contain bg-white px-3 py-1 rounded-full shadow-lg" />
            <p className="text-gray-400 text-sm leading-relaxed">
              Innovación, ingeniería y tecnología para impulsar el crecimiento de tu empresa. Soluciones corporativas en CDMX y Estado de México.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Enlaces Rápidos</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="#inicio" className="hover:text-primary transition-colors">Inicio</Link></li>
              <li><Link href="#soluciones" className="hover:text-primary transition-colors">Soluciones IT</Link></li>
              <li><Link href="#cotizacion" className="hover:text-primary transition-colors">Solicitar Cotización</Link></li>
              <li><Link href="/orden-servicio" className="hover:text-primary transition-colors">Orden de Servicio</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Contacto Directo</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <span className="text-accent">W/Tel:</span> 55 1348 5574
              </li>
              <li className="flex items-center gap-2 break-all">
                <span className="text-accent">E:</span> ventas@grupo-axtech.com
              </li>
              <li className="flex items-center gap-2 break-all">
                <span className="text-accent">E:</span> ventas@axtech-ingenieria.com
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Redes y Legales</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">Facebook: AXTECH INGENIERIA</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">TikTok: AXTECH INGENIERIA</a></li>
              <li className="pt-4"><a href="#" className="text-xs underline hover:text-white transition-colors">Aviso de Privacidad</a></li>
              <li><a href="#" className="text-xs underline hover:text-white transition-colors">Términos y Condiciones</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 relative z-10">
          <p>© {new Date().getFullYear()} AXTECH INGENIERÍA. Todos los derechos reservados.</p>
          <p>Ingeniería Especializada en Soluciones Tecnológicas.</p>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/525513485574?text=Hola,%20me%20gustaría%20solicitar%20información%20sobre%20sus%20servicios." 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-white text-black p-4 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-110 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all z-50 flex items-center justify-center group"
      >
        <span className="absolute right-full mr-4 bg-white text-black text-xs font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Soporte 24/7
        </span>
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-[#25D366]">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </main>
  );
}
