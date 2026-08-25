'use client';

import { motion } from 'framer-motion';
import { Server, ShieldCheck, Network, Settings, Laptop, ArrowRight, Cpu, ChevronRight, MonitorSmartphone, Wifi, Database, Lock, Video, Phone, Mail, CalendarDays, Star, User, MessageSquarePlus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { X } from 'lucide-react';


export default function Home() {
  const [isFlyerOpen, setIsFlyerOpen] = useState(false);
  const [isCamarasFlyerOpen, setIsCamarasFlyerOpen] = useState(false);
  const [isRedesFlyerOpen, setIsRedesFlyerOpen] = useState(false);
  
  const services = [
    {
      title: 'Reparación de Computadoras',
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
      title: 'Redes y Conectividad',
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
      colSpan: 'col-span-1 md:col-span-2 md:col-start-2',
      bg: 'bg-white hover:bg-gray-50 border border-green-500/30 hover:border-green-500 shadow-sm',
      slug: 'cctv'
    }
  ];

  return (
    <main className="min-h-screen bg-background selection:bg-primary/30">
      {/* Tech Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-200 z-50 px-6 py-2 flex justify-between items-center transition-all shadow-sm">
        <div className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform shrink-0">
          <Image src="/logo.png" alt="AXTECH INGENIERÍA" width={160} height={45} className="object-contain" priority />
        </div>
        <div className="hidden md:flex gap-10 font-medium text-sm text-gray-800">
          <Link href="#inicio" className="hover:text-primary transition-all">INICIO</Link>
          <Link href="#soluciones" className="hover:text-primary transition-all">SOLUCIONES</Link>
          <Link href="#nosotros" className="hover:text-primary transition-all">NOSOTROS</Link>
          <Link href="#contacto" className="hover:text-primary transition-all">CONTACTO</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="border border-gray-300 text-gray-700 hover:border-primary hover:text-primary px-5 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2"
          >
            Iniciar Sesión
          </Link>
          <Link 
            href="#cotizacion" 
            className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 group shadow-[0_4px_14px_0_rgba(15,98,209,0.39)] hover:shadow-[0_6px_20px_rgba(15,98,209,0.23)] hover:-translate-y-0.5"
          >
            Iniciar Proyecto
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 min-h-[90vh] flex items-center justify-center overflow-hidden" id="inicio">
        {/* Cinematic Background Image */}
        <div className="absolute inset-0 z-0">
          <Image src="/hero-bg-repair.jpeg" alt="AXTECH Technology" fill className="object-cover opacity-30 mix-blend-luminosity" priority />
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
              INGENIERIA <br/>
              <span className="text-gradient-brand font-black">ESPECIALIZADA</span><br/>
              EN SOLUCIONES TECNOLÓGICAS.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-800 mb-10 font-light max-w-lg leading-relaxed"
            >
              Innovación, ingeniería y tecnología para impulsar el crecimiento de tu empresa.
            </motion.p>
            
          </div>

          {/* Right Visual */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            <Link href="/servicios/soporte-tecnico" className="block group cursor-pointer relative rounded-[2rem] overflow-hidden shadow-2xl hover:shadow-[0_0_40px_rgba(15,98,209,0.3)] transition-all hover:-translate-y-2 border border-gray-200">
              <img src="/flyer-soporte.jpeg" alt="Reparación de Computadoras" className="w-full h-auto object-cover" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Services Section */}
      <section id="soluciones" className="py-24 px-6 relative z-20 bg-background border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Nuestros <span className="text-primary">Servicios</span></h2>
            <p className="text-gray-800 text-lg max-w-2xl">Soluciones profesionales adaptadas a las necesidades de nuestros clientes. Nos enfocamos en brindar calidad, eficiencia y un servicio confiable.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {services.map((service, idx) => {
              const content = (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`h-full ${service.bg} p-8 md:p-10 rounded-[2rem] border border-white/10 transition-all duration-300 overflow-hidden relative group hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:-translate-y-1 ${service.slug === 'soporte-tecnico' ? 'cursor-pointer' : ''}`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="mb-8">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className={`text-2xl md:text-3xl font-bold mb-4 tracking-tight ${service.bg.includes('accent') ? 'text-black' : (service.bg.includes('from-primary') ? 'text-white' : 'text-gray-900')}`}>{service.title}</h3>
                      <ul className="space-y-2">
                        {service.features.map((feature, fIdx) => (
                          <li key={fIdx} className={`flex items-start gap-2 ${service.bg.includes('accent') ? 'text-black/80' : (service.bg.includes('from-primary') ? 'text-white/80' : 'text-gray-800')} text-sm md:text-base font-medium`}>
                            <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${service.bg.includes('accent') ? 'bg-black/60' : 'bg-primary'}`}></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );

              if (service.slug === 'soporte-tecnico') {
                return (
                  <Link href="/servicios/soporte-tecnico" key={idx} className={`${service.colSpan} block cursor-pointer`}>
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="h-full p-0 rounded-[2rem] border border-gray-200 transition-all duration-300 overflow-hidden relative hover:shadow-[0_0_40px_rgba(15,98,209,0.3)] hover:-translate-y-1 shadow-xl bg-white flex items-center"
                    >
                      <img src="/flyer-soporte-nuevo.jpeg" alt="Reparación de Computadoras" className="w-full h-full object-cover" />
                    </motion.div>
                  </Link>
                );
              }

              if (service.slug === 'cctv') {
                return (
                  <Link href="/servicios/cctv" key={idx} className={`${service.colSpan} block cursor-pointer`}>
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="h-full p-0 rounded-[2rem] border border-gray-200 transition-all duration-300 overflow-hidden relative hover:shadow-[0_0_40px_rgba(15,98,209,0.3)] hover:-translate-y-1 shadow-xl bg-white flex items-center"
                    >
                      <img src="/flyer-camaras.jpeg" alt="Cámaras de Seguridad" className="w-full h-full object-cover" />
                    </motion.div>
                  </Link>
                );
              }

              if (service.slug === 'redes-telecomunicaciones') {
                return (
                  <Link href="/servicios/redes-telecomunicaciones" key={idx} className={`${service.colSpan} block cursor-pointer`}>
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="h-full p-0 rounded-[2rem] border border-gray-200 transition-all duration-300 overflow-hidden relative hover:shadow-[0_0_40px_rgba(15,98,209,0.3)] hover:-translate-y-1 shadow-xl bg-white flex items-center"
                    >
                      <img src="/flyer-redes.jpeg" alt="Redes y Conectividad" className="w-full h-full object-cover" />
                    </motion.div>
                  </Link>
                );
              }

              return (
                <Link href={`/servicios/${service.slug}`} key={idx} className={`${service.colSpan} block`}>
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quiénes Somos Section */}
      <section className="py-24 px-6 relative bg-gray-50 border-t border-white/5 overflow-hidden" id="nosotros">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-30 pointer-events-none z-0">
          <Image src="/nosotros-bg.png" alt="AXTECH Background" fill className="object-cover object-right mix-blend-luminosity mask-image-l-to-r" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">Quiénes <span className="text-primary">Somos</span></h2>
            <div className="space-y-6 text-gray-800 leading-relaxed text-lg">
              <p>
                En <strong className="text-gray-900">AXTECH INGENIERIA</strong> somos una empresa enfocada en el desarrollo, integración e implementación de soluciones tecnológicas que impulsan la eficiencia, innovación y crecimiento de las organizaciones.
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
              <p className="text-sm text-gray-800">Brindar soluciones tecnológicas innovadoras y eficientes mediante ingeniería especializada, ayudando a las organizaciones a mejorar sus procesos, productividad y competitividad.</p>
            </div>
            <div className="glass-panel p-8 rounded-3xl border-t border-accent/30 bg-[#0a0a0a]/80 backdrop-blur-md">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Nuestra Visión</h3>
              <p className="text-sm text-gray-800">Ser una empresa referente en ingeniería tecnológica, reconocida por la calidad de nuestras soluciones, la innovación constante y la confianza que generamos en nuestros clientes.</p>
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
      <section className="py-24 px-6 relative border-t border-white/5" id="cotizacion">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Comienza la transformación tecnológica de tu <span className="text-accent">empresa</span></h2>
            <p className="text-gray-800 mb-8 max-w-2xl mx-auto text-lg">Recibe una evaluación profesional y una propuesta personalizada para fortalecer tu infraestructura, seguridad y operación tecnológica.</p>
            <a 
              href="https://wa.me/525513485574" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-accent text-black rounded-2xl font-bold text-lg hover:scale-105 hover:shadow-[0_0_30px_rgba(253,182,20,0.4)] transition-all shadow-xl"
            >
              <CalendarDays className="w-7 h-7" />
              Agendar Consulta
            </a>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-6 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-black font-bold tracking-widest uppercase mb-12">Empresas que confían en nuestros servicios</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">

            <div className="flex items-center hover:scale-110 transition-transform cursor-default">
              <Image src="/fromi-transparente.webp" alt="METROLOGIA FROMI" width={120} height={120} className="object-contain max-h-[90px] w-auto" />
            </div>
            <div className="flex items-center hover:scale-110 transition-transform cursor-default">
              <Image src="/tordo-logo.png" alt="TORDO TECNOLOGÍAS" width={180} height={80} className="object-contain max-h-[80px] w-auto mix-blend-multiply" />
            </div>
            <div className="flex items-center hover:scale-110 transition-transform cursor-default">
              <Image src="/sdpn-logo.jpeg" alt="SDPN INGENIERIA" width={180} height={80} className="object-contain max-h-[80px] w-auto mix-blend-multiply" />
            </div>
            <div className="flex items-center hover:scale-110 transition-transform cursor-default">
              <Image src="/conceptos-logo.jpeg" alt="CONCEPTOS METROLÓGICOS" width={180} height={80} className="object-contain max-h-[80px] w-auto mix-blend-multiply" />
            </div>
            <div className="flex items-center hover:scale-110 transition-transform cursor-default">
              <Image src="/conocimiento-logo.jpeg" alt="CONOCIMIENTO INTEGRAL" width={180} height={80} className="object-contain max-h-[80px] w-auto mix-blend-multiply" />
            </div>
          </div>
        </div>
      </section>




      {/* Reseñas */}
      <section className="py-24 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Lo que dicen nuestros <span className="text-primary">Clientes</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Nos enorgullece brindar un servicio de excelencia y construir relaciones de confianza a largo plazo.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Carlos Mendoza",
                role: "Director de Operaciones",
                text: "Excelente servicio. Solucionaron los problemas de nuestra red en tiempo récord y el seguimiento que nos dieron fue impecable. Altamente recomendados para cualquier empresa."
              },
              {
                name: "Laura Gutiérrez",
                role: "Gerente Administrativo",
                text: "Instalaron nuestro sistema de cámaras de seguridad de forma muy profesional. El equipo técnico es muy amable y nos explicaron paso a paso cómo utilizar todo el sistema."
              },
              {
                name: "Ing. Ricardo Silva",
                role: "Coordinador de TI",
                text: "Llevamos 2 años trabajando con ellos para el mantenimiento de nuestros servidores. Siempre tienen gran disposición y resuelven cualquier eventualidad sin interrumpir nuestra operación."
              }
            ].map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-panel p-8 rounded-[2rem] border border-gray-200 hover:shadow-lg transition-all bg-white"
              >
                <div className="flex gap-1 mb-6 text-accent">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <p className="text-gray-700 italic mb-8 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 leading-tight">{review.name}</h4>
                    <span className="text-sm text-gray-500">{review.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#02040a] pt-20 pb-10 px-6 border-t border-white/10 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/10 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 relative z-10">
          
          <div className="space-y-6">
            <Image src="/logo.png" alt="AXTECH INGENIERÍA" width={160} height={45} className="object-contain bg-white px-3 py-1 rounded-full shadow-lg" />
            <p className="text-gray-300 text-sm leading-relaxed">
              Innovación, ingeniería y tecnología para impulsar el crecimiento de tu empresa.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Enlaces Rápidos</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="#inicio" className="hover:text-primary transition-colors">Inicio</Link></li>
              <li><Link href="#soluciones" className="hover:text-primary transition-colors">Soluciones</Link></li>
              <li><Link href="#nosotros" className="hover:text-primary transition-colors">Nosotros</Link></li>
              <li><Link href="#contacto" className="hover:text-primary transition-colors">Contacto</Link></li>
            </ul>
          </div>

          <div id="contacto">
            <h4 className="text-white font-bold mb-6 tracking-wide">Contacto</h4>
            <ul className="space-y-3 text-sm text-gray-300">
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
            <ul className="space-y-3 text-sm text-gray-300">
              <li><a href="#" className="text-xs underline hover:text-primary transition-colors">Aviso de Privacidad</a></li>
              <li><a href="#" className="text-xs underline hover:text-primary transition-colors">Términos y Condiciones</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 relative z-10">
          <p>© {new Date().getFullYear()} AXTECH INGENIERÍA. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Flyer Modal */}
      {isFlyerOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setIsFlyerOpen(false)}>
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setIsFlyerOpen(false)}
              className="absolute -top-12 right-0 md:-right-12 text-white/70 hover:text-white transition-colors bg-black/50 p-2 rounded-full backdrop-blur-md"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center bg-[#1e2329]">
              <img 
                src="/flyer-soporte.jpeg" 
                alt="Soporte Técnico Especializado" 
                className="w-full h-auto max-h-[85vh] object-contain relative z-10"
              />
            </div>
            <div className="mt-6 flex flex-col md:flex-row gap-4 items-center justify-center">
              <a 
                href="https://wa.me/525513485574?text=Hola,%20estoy%20interesado%20en%20el%20servicio%20de%20Soporte%20T%C3%A9cnico%20Especializado%20y%20Reparaci%C3%B3n" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-3 bg-whatsapp hover:bg-green-600 text-white rounded-full font-bold shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Solicitar este servicio por WhatsApp
              </a>
              <Link
                href="/servicios/soporte-tecnico"
                className="px-8 py-3 bg-white hover:bg-gray-100 text-gray-900 rounded-full font-bold shadow-lg transition-transform hover:scale-105 border border-gray-200"
              >
                Más información
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Cameras Flyer Modal */}
      {isCamarasFlyerOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setIsCamarasFlyerOpen(false)}>
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setIsCamarasFlyerOpen(false)}
              className="absolute -top-12 right-0 md:-right-12 text-white/70 hover:text-white transition-colors bg-black/50 p-2 rounded-full backdrop-blur-md"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center bg-[#1e2329]">
              <div className="absolute inset-0 flex items-center justify-center text-white/50 text-center p-8 -z-10">
                Guarda la imagen enviada como "flyer-camaras.jpeg" en la carpeta public para que se muestre aquí.
              </div>
              <img 
                src="/flyer-camaras.jpeg" 
                alt="Cámaras de Seguridad y Control de Accesos" 
                className="w-full h-auto max-h-[85vh] object-contain relative z-10"
              />
            </div>
            <div className="mt-6 flex flex-col md:flex-row gap-4 items-center justify-center">
              <a 
                href="https://wa.me/525513485574?text=Hola,%20estoy%20interesado%20en%20el%20servicio%20de%20C%C3%A1maras%20de%20Seguridad%20y%20Control%20de%20Accesos" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-3 bg-whatsapp hover:bg-green-600 text-white rounded-full font-bold shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Solicitar este servicio por WhatsApp
              </a>
              <Link
                href="/servicios/cctv"
                className="px-8 py-3 bg-white hover:bg-gray-100 text-gray-900 rounded-full font-bold shadow-lg transition-transform hover:scale-105 border border-gray-200"
              >
                Más información
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Redes Flyer Modal */}
      {isRedesFlyerOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setIsRedesFlyerOpen(false)}>
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setIsRedesFlyerOpen(false)}
              className="absolute -top-12 right-0 md:-right-12 text-white/70 hover:text-white transition-colors bg-black/50 p-2 rounded-full backdrop-blur-md"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center bg-[#1e2329]">
              <div className="absolute inset-0 flex items-center justify-center text-white/50 text-center p-8 -z-10">
                Guarda la imagen enviada como "flyer-redes.jpeg" en la carpeta public para que se muestre aquí.
              </div>
              <img 
                src="/flyer-redes.jpeg" 
                alt="Redes y Conectividad" 
                className="w-full h-auto max-h-[85vh] object-contain relative z-10"
              />
            </div>
            <div className="mt-6 flex flex-col md:flex-row gap-4 items-center justify-center">
              <a 
                href="https://wa.me/525513485574?text=Hola,%20estoy%20interesado%20en%20el%20servicio%20de%20Redes%20y%20Conectividad" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-3 bg-whatsapp hover:bg-green-600 text-white rounded-full font-bold shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Solicitar este servicio por WhatsApp
              </a>
              <Link
                href="/servicios/redes-telecomunicaciones"
                className="px-8 py-3 bg-white hover:bg-gray-100 text-gray-900 rounded-full font-bold shadow-lg transition-transform hover:scale-105 border border-gray-200"
              >
                Más información
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
