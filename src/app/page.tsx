'use client';

import { motion } from 'framer-motion';
import { Server, ShieldCheck, Network, Settings, Laptop, ArrowRight, Cpu, ChevronRight, MonitorSmartphone, Wifi, Database, Lock, Video, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import QuoteForm from '@/components/QuoteForm';

export default function Home() {
  const services = [
    {
      title: 'Soporte Técnico Especializado en Computadoras',
      features: [
        'Diagnóstico avanzado de equipos de cómputo',
        'Mantenimiento preventivo y correctivo',
        'Optimización del rendimiento',
        'Instalación y configuración de sistemas',
        'Seguridad informática'
      ],
      icon: <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl inline-block shadow-lg"><MonitorSmartphone className="w-10 h-10 text-gray-900 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" /></div>,
      colSpan: 'col-span-1 md:col-span-2',
      bg: 'bg-gradient-to-br from-primary via-[#0a4aa3] to-[#04265a] hover:shadow-[0_0_40px_rgba(15,98,209,0.3)]',
      slug: 'soporte-tecnico'
    },
    {
      title: 'Redes y Telecomunicaciones',
      features: [
        'Diagnóstico y solución de fallas de red',
        'Diseño e instalación de redes empresariales',
        'Configuración de routers y switches',
        'Optimización de redes inalámbricas',
        'Seguridad de red',
        'Integración de dispositivos y sistemas'
      ],
      icon: <div className="p-4 bg-black/20 backdrop-blur-md rounded-2xl inline-block shadow-lg"><Wifi className="w-10 h-10 text-black drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]" /></div>,
      colSpan: 'col-span-1 md:col-span-2',
      bg: 'bg-gradient-to-br from-accent via-[#c78f0f] to-[#5a4205] hover:shadow-[0_0_40px_rgba(253,182,20,0.3)]',
      slug: 'redes-telecomunicaciones'
    },
    {
      title: 'Cámaras de Seguridad y Control de Accesos',
      features: [
        'Instalación de cámaras de seguridad',
        'Monitoreo remoto',
        'Sistemas de grabación y almacenamiento',
        'Control de accesos',
        'Automatización de accesos',
        'Administración y supervisión de accesos'
      ],
      icon: <div className="p-4 bg-green-500/10 backdrop-blur-md rounded-2xl inline-block shadow-lg"><Video className="w-10 h-10 text-green-700 drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]" /></div>,
      colSpan: 'col-span-1 md:col-span-2',
      bg: 'bg-white hover:bg-gray-50 border border-green-500/30 hover:border-green-500 shadow-sm',
      slug: 'cctv'
    },
    {
      title: 'Servidores e Infraestructura',
      features: [
        'Instalación y configuración de servidores',
        'Servidor de archivos',
        'Servidores virtuales',
        'Seguridad y respaldo de información',
        'Administración y mantenimiento de servidores',
        'Integración con redes empresariales'
      ],
      icon: <div className="p-4 bg-primary/10 backdrop-blur-md rounded-2xl inline-block shadow-lg"><Database className="w-10 h-10 text-primary drop-shadow-[0_0_15px_rgba(15,98,209,0.3)]" /></div>,
      colSpan: 'col-span-1 md:col-span-2',
      bg: 'bg-white hover:bg-gray-50 border border-primary/30 hover:border-primary shadow-sm',
      slug: 'servidores'
    }
  ];

  return (
    <main className="min-h-screen bg-background selection:bg-primary/30">
      {/* Tech Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-gray-800 z-50 px-6 py-4 flex justify-between items-center transition-all">
        <div className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform shrink-0">
          <Image src="/logo.png" alt="AXTECH INGENIERÍA" width={200} height={55} className="object-contain" priority />
        </div>
        <div className="hidden md:flex gap-10 font-medium text-sm text-gray-300">
          <Link href="#inicio" className="hover:text-white transition-all">INICIO</Link>
          <Link href="#soluciones" className="hover:text-white transition-all">SOLUCIONES</Link>
          <Link href="#nosotros" className="hover:text-white transition-all">NOSOTROS</Link>
          <Link href="#contacto" className="hover:text-white transition-all">CONTACTO</Link>
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
      <section className="relative pt-32 pb-20 px-6 min-h-[90vh] flex items-center justify-center overflow-hidden" id="inicio">
        {/* Cinematic Background Image */}
        <div className="absolute inset-0 z-0">
          <Image src="/hero-bg.png" alt="AXTECH Technology" fill className="object-cover opacity-30 mix-blend-luminosity" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white/90"></div>
        </div>
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[128px] z-0"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-[128px] z-0"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left Content */}
          <div className="text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-6 text-gray-900 leading-[1.1]"
            >
              Ingeniería <br/>
              <span className="text-gradient-brand font-black">Especializada</span><br/>
              en Soluciones Tecnológicas.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 mb-10 font-light max-w-lg leading-relaxed"
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

          {/* Right Visual */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            <Link href="/servicios/soporte-tecnico" className="block group">
              <div className="glass-panel p-8 md:p-10 rounded-[2rem] border-t border-primary/20 hover:border-primary/50 transition-all hover:-translate-y-2 hover:shadow-2xl bg-white shadow-xl">
                <div className="flex justify-between items-start mb-6">
                  <Laptop className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-primary text-xs font-bold bg-primary/10 px-3 py-1.5 rounded-full uppercase tracking-wider">Ver Detalles</span>
                </div>
                <h3 className="text-3xl font-bold mb-5 text-gray-900 group-hover:text-primary transition-colors">Soporte Técnico Reparación</h3>
                <ul className="space-y-4 text-gray-600 font-medium">
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>Diagnóstico avanzado de equipos de cómputo</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>Mantenimiento preventivo y correctivo</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>Optimización del rendimiento</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>Instalación y configuración de sistemas</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>Seguridad informática</li>
                </ul>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Services Section */}
      <section id="soluciones" className="py-24 px-6 relative z-20 bg-background border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Nuestros <span className="text-primary">Servicios</span></h2>
            <p className="text-gray-600 text-lg max-w-2xl">Soluciones profesionales adaptadas a las necesidades de nuestros clientes. Nos enfocamos en brindar calidad, eficiencia y un servicio confiable.</p>
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
                      <h3 className={`text-2xl md:text-3xl font-bold mb-4 tracking-tight ${service.bg.includes('accent') ? 'text-black' : (service.bg.includes('primary') ? 'text-white' : 'text-gray-900')}`}>{service.title}</h3>
                      <ul className="space-y-2">
                        {service.features.map((feature, fIdx) => (
                          <li key={fIdx} className={`flex items-start gap-2 ${service.bg.includes('accent') ? 'text-black/80' : (service.bg.includes('primary') ? 'text-white/80' : 'text-gray-600')} text-sm md:text-base font-medium`}>
                            <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${service.bg.includes('accent') ? 'bg-black/60' : 'bg-primary'}`}></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quiénes Somos Section */}
      <section className="py-24 px-6 relative bg-gray-50 border-t border-white/5 overflow-hidden" id="nosotros">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 pointer-events-none z-0">
          <Image src="/cybersecurity.png" alt="Cybersecurity" fill className="object-cover object-right mix-blend-screen mask-image-l-to-r" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">Quiénes <span className="text-primary">Somos</span></h2>
            <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
              <p>
                En <strong className="text-gray-900">GRUPO AXTECH</strong> somos una empresa enfocada en el desarrollo, integración e implementación de soluciones tecnológicas que impulsan la eficiencia, innovación y crecimiento de las organizaciones.
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
            <div className="glass-panel p-8 rounded-3xl border-t border-primary/30 bg-[#0a0a0a]/80 backdrop-blur-md">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Nuestra Misión</h3>
              <p className="text-sm text-gray-600">Brindar soluciones tecnológicas innovadoras y eficientes mediante ingeniería especializada, ayudando a las organizaciones a mejorar sus procesos, productividad y competitividad.</p>
            </div>
            <div className="glass-panel p-8 rounded-3xl border-t border-accent/30 bg-[#0a0a0a]/80 backdrop-blur-md">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Nuestra Visión</h3>
              <p className="text-sm text-gray-600">Ser una empresa referente en ingeniería tecnológica, reconocida por la calidad de nuestras soluciones, la innovación constante y la confianza que generamos en nuestros clientes.</p>
            </div>
            <div className="glass-panel p-8 rounded-3xl sm:col-span-2 bg-[#0a0a0a]/80 backdrop-blur-md">
              <h3 className="text-xl font-bold mb-4 text-gray-900 text-center">Nuestros Valores</h3>
              <ul className="flex flex-wrap justify-center gap-4 text-sm text-gray-700 font-semibold">
                <li className="bg-gray-100 px-4 py-2 rounded-full border border-white/10">Innovación tecnológica</li>
                <li className="bg-gray-100 px-4 py-2 rounded-full border border-white/10">Calidad y profesionalismo</li>
                <li className="bg-gray-100 px-4 py-2 rounded-full border border-white/10">Compromiso con el cliente</li>
                <li className="bg-gray-100 px-4 py-2 rounded-full border border-white/10">Integridad y confianza</li>
                <li className="bg-gray-100 px-4 py-2 rounded-full border border-white/10">Mejora continua</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-24 px-6 relative tech-grid border-t border-white/5" id="cotizacion">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Inicia tu <span className="text-accent">Proyecto</span></h2>
            <p className="text-gray-600">Automatiza la cotización de tu requerimiento técnico al instante.</p>
          </div>
          <QuoteForm />
        </div>
      </section>

      {/* Trust Section (Moved to Bottom) */}
      <section className="py-12 px-6 border-y border-white/10 bg-gradient-to-b from-gray-100 to-transparent relative">
        <div className="absolute inset-0 bg-primary/10 blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <p className="text-sm text-gray-700 font-bold tracking-widest uppercase mb-10">Empresas que confían en nuestros servicios</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20">
            <div className="flex items-center gap-3 hover:scale-110 transition-transform cursor-default">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-cyan-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
              <span className="text-2xl font-bold tracking-tight text-gray-900">METROLOGIA FROMI</span>
            </div>
            <div className="flex items-center gap-3 hover:scale-110 transition-transform cursor-default">
              <div className="w-8 h-8 rounded-full border-4 border-accent shadow-[0_0_15px_rgba(253,182,20,0.5)]"></div>
              <span className="text-2xl font-bold tracking-widest text-gray-900">TENSOS</span>
            </div>
            <div className="flex items-center gap-3 hover:scale-110 transition-transform cursor-default">
              <div className="w-8 h-8 rotate-45 bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
              <span className="text-2xl font-bold tracking-tighter text-gray-900">TORDO TECNOLOGIAS</span>
            </div>
            <div className="flex items-center gap-3 hover:scale-110 transition-transform cursor-default">
              <div className="w-10 h-3 bg-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)]"></div>
              <span className="text-2xl font-black italic text-gray-900">SDPN INGENIERIA</span>
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
              <li><Link href="#soluciones" className="hover:text-primary transition-colors">Servicios</Link></li>
            </ul>
          </div>

          <div id="contacto">
            <h4 className="text-white font-bold mb-6 tracking-wide">Contacto Directo</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" /> 55 1348 5574
              </li>
              <li className="flex items-center gap-2 break-all">
                <Mail className="w-4 h-4 text-accent" /> ventas@grupo-axtech.com
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Redes Sociales</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">Facebook: AXTECH INGENIERIA</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">TikTok: AXTECH INGENIERIA</a></li>
              <li className="pt-4"><a href="#" className="text-xs underline hover:text-primary transition-colors">Aviso de Privacidad</a></li>
              <li><a href="#" className="text-xs underline hover:text-primary transition-colors">Términos y Condiciones</a></li>
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
