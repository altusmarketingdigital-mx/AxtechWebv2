'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Laptop, Network, Server, ShieldCheck, Settings, CheckCircle2 } from 'lucide-react';
import QuoteForm from '@/components/QuoteForm';
import { use } from 'react';
import Image from 'next/image';

const serviceData: Record<string, any> = {
  'soporte-tecnico': {
    title: 'Soporte Técnico Especializado en Computadoras',
    description: 'Nuestro servicio combina diagnóstico profesional, herramientas tecnológicas avanzadas y personal especializado para resolver de manera eficiente problemas de hardware, software y conectividad. Nos enfocamos en proporcionar soluciones confiables que permitan a empresas y usuarios aprovechar al máximo su infraestructura tecnológica.',
    extraDescription: 'A través de procesos técnicos estructurados y un enfoque preventivo, ayudamos a reducir fallas, mejorar el desempeño de los equipos y garantizar un entorno tecnológico seguro y estable.',
    icon: <Laptop className="w-16 h-16 text-primary" />,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    color: 'from-primary/20',
    servicesIncluded: [
      { name: 'Diagnóstico avanzado de equipos de cómputo', detail: 'Identificación precisa de fallas en hardware y software.' },
      { name: 'Mantenimiento preventivo y correctivo', detail: 'Optimización del rendimiento y prolongación de la vida útil de los equipos.' },
      { name: 'Seguridad informática', detail: 'Eliminación de virus, protección del sistema y resguardo de información.' },
      { name: 'Instalación y configuración de sistemas', detail: 'Configuración profesional de sistemas operativos, programas y herramientas tecnológicas.' },
      { name: 'Optimización del rendimiento', detail: 'Actualización de hardware y mejora del desempeño de computadoras.' }
    ],
    benefits: [
      'Mayor estabilidad tecnológica',
      'Reducción de tiempos de inactividad',
      'Protección de información crítica',
      'Soporte técnico confiable',
      'Optimización de recursos tecnológicos'
    ]
  },
  'redes-telecomunicaciones': {
    title: 'Redes y Conectividad',
    description: 'En AXTECH INGENIERIA diseñamos, implementamos y optimizamos infraestructuras de red seguras, eficientes y escalables, que permiten a las empresas mantener una conectividad confiable y un flujo continuo de información.',
    extraDescription: 'Nuestro equipo especializado analiza las necesidades de cada organización para desarrollar soluciones de red adaptadas a su operación, garantizando estabilidad, seguridad y alto rendimiento en los sistemas de comunicación y transferencia de datos. Implementamos tecnologías modernas que facilitan la integración de equipos, servidores, dispositivos móviles y plataformas digitales dentro de una red segura y eficiente.',
    icon: <Network className="w-16 h-16 text-accent" />,
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    color: 'from-accent/20',
    servicesIncluded: [
      { name: 'Diseño e instalación de redes empresariales', detail: 'Planificación e implementación de redes LAN y Wi-Fi adaptadas a las necesidades de cada empresa.' },
      { name: 'Configuración de routers y switches', detail: 'Instalación y configuración de equipos de red para una conectividad estable y eficiente.' },
      { name: 'Seguridad de red', detail: 'Implementación de medidas de seguridad para proteger la información y prevenir accesos no autorizados.' },
      { name: 'Optimización de redes inalámbricas', detail: 'Mejora del rendimiento y cobertura de redes Wi-Fi en oficinas y empresas.' },
      { name: 'Diagnóstico y solución de fallas de red', detail: 'Identificación y resolución de problemas de conectividad.' },
      { name: 'Integración de dispositivos y sistemas', detail: 'Conexión de computadoras, servidores, impresoras y dispositivos tecnológicos en una red segura.' }
    ],
    benefits: [
      'Conectividad estable y rápida',
      'Mayor seguridad de la información',
      'Mejor rendimiento de la red empresarial',
      'Reducción de interrupciones en el servicio',
      'Infraestructura tecnológica escalable'
    ]
  },
  'servidores': {
    title: 'Servidores e Infraestructura',
    description: 'En AXTECH INGENIERIA ofrecemos servicios profesionales de implementación, administración y mantenimiento de servidores, diseñados para garantizar el almacenamiento seguro de la información, el funcionamiento eficiente de los sistemas empresariales y la continuidad operativa de las organizaciones.',
    extraDescription: 'Nuestros especialistas en infraestructura tecnológica analizan las necesidades de cada empresa para diseñar soluciones de servidores confiables, escalables y seguras. Implementamos tecnologías modernas que permiten centralizar información, mejorar el rendimiento de las aplicaciones y optimizar la gestión de los recursos tecnológicos. Trabajamos con servidores físicos y virtuales que facilitan la administración de datos, aplicaciones y sistemas dentro de un entorno seguro y estable.',
    icon: <Server className="w-16 h-16 text-primary" />,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    color: 'from-primary/20',
    servicesIncluded: [
      { name: 'Instalación y configuración de servidores', detail: 'Implementación de servidores empresariales para almacenamiento, aplicaciones y gestión de red.' },
      { name: 'Servidor de archivos', detail: 'Centralización y administración segura de documentos e información empresarial.' },
      { name: 'Servidores virtuales', detail: 'Configuración de entornos virtualizados para optimizar recursos tecnológicos.' },
      { name: 'Seguridad y respaldo de información', detail: 'Implementación de sistemas de respaldo y protección de datos.' },
      { name: 'Administración y mantenimiento de servidores', detail: 'Monitoreo, actualización y optimización del rendimiento del servidor.' },
      { name: 'Integración con redes empresariales', detail: 'Configuración de servidores conectados a la infraestructura de red de la empresa.' }
    ],
    benefits: [
      'Almacenamiento seguro y centralizado de información',
      'Mayor rendimiento de los sistemas empresariales',
      'Seguridad y protección de datos',
      'Infraestructura tecnológica escalable',
      'Continuidad operativa de los servicios digitales'
    ]
  },
  'ciberseguridad': {
    title: 'Ciberseguridad',
    description: 'En Ingeniería Especializada en Soluciones Tecnológicas ofrecemos soluciones integrales de ciberseguridad diseñadas para proteger la infraestructura tecnológica, los sistemas informáticos y la información crítica de las organizaciones frente a amenazas digitales.',
    extraDescription: 'En la actualidad, las empresas dependen cada vez más de la tecnología para operar, almacenar información y comunicarse. Por ello, es fundamental contar con medidas de seguridad que permitan prevenir ataques cibernéticos, proteger los datos y garantizar la continuidad de las operaciones. A través de herramientas tecnológicas avanzadas, análisis de seguridad y monitoreo constante, ayudamos a las organizaciones a fortalecer su entorno digital y proteger sus activos tecnológicos.',
    icon: <ShieldCheck className="w-16 h-16 text-accent" />,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    color: 'from-accent/20',
    servicesIncluded: [
      { name: 'Evaluación de vulnerabilidades', detail: 'Realizamos análisis de seguridad para identificar posibles riesgos en redes, sistemas, equipos y aplicaciones, permitiendo detectar debilidades que puedan ser explotadas por ataques informáticos.' },
      { name: 'Implementación de seguridad informática', detail: 'Configuramos herramientas y controles de seguridad que protegen los sistemas contra accesos no autorizados, ataques de malware y otras amenazas digitales.' },
      { name: 'Protección contra virus y malware', detail: 'Instalación y configuración de soluciones antivirus y antimalware para prevenir infecciones que puedan afectar el funcionamiento de los equipos y la seguridad de la información.' },
      { name: 'Seguridad de redes', detail: 'Protección de la infraestructura de red mediante configuraciones seguras de routers, firewalls y sistemas de monitoreo para evitar intrusiones o accesos indebidos.' },
      { name: 'Control de accesos', detail: 'Implementación de políticas de autenticación y gestión de usuarios para garantizar que únicamente las personas autorizadas puedan acceder a los sistemas y datos de la organización.' },
      { name: 'Respaldo y recuperación de información', detail: 'Configuración de sistemas de respaldo automático que permiten proteger la información y recuperarla en caso de pérdida, fallas técnicas o incidentes de seguridad.' },
      { name: 'Monitoreo y supervisión de seguridad', detail: 'Seguimiento continuo de los sistemas para detectar actividades sospechosas, amenazas potenciales o vulnerabilidades que puedan comprometer la seguridad.' }
    ],
    benefits: [
      'Protección de información crítica',
      'Reducción de riesgos de ataques cibernéticos',
      'Mayor seguridad en redes y sistemas informáticos',
      'Protección de datos empresariales',
      'Continuidad operativa de la empresa',
      'Confianza en la gestión de la información'
    ]
  },
  'cctv': {
    title: 'Cámaras de Seguridad y Control de Accesos',
    description: 'En AXTECH INGENIERIA ofrecemos soluciones integrales de videovigilancia y control de accesos, diseñadas para proteger instalaciones, supervisar actividades y fortalecer la seguridad de empresas, oficinas y hogares.',
    extraDescription: 'Implementamos sistemas modernos de seguridad que permiten monitorear en tiempo real las instalaciones, registrar eventos importantes y controlar el acceso de personas a áreas específicas, brindando mayor tranquilidad y control operativo. Nuestros especialistas realizan el análisis de cada espacio para diseñar soluciones personalizadas que integren cámaras de alta definición, sistemas de grabación y herramientas de control de acceso que garanticen seguridad, eficiencia y facilidad de gestión.',
    icon: <Settings className="w-16 h-16 text-primary" />,
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    color: 'from-primary/20',
    servicesIncluded: [
      { name: 'Instalación de cámaras de seguridad', detail: 'Implementación de sistemas de videovigilancia con cámaras de alta resolución para monitoreo continuo.' },
      { name: 'Monitoreo remoto', detail: 'Acceso a cámaras en tiempo real desde computadoras o dispositivos móviles.' },
      { name: 'Sistemas de grabación y almacenamiento', detail: 'Configuración de equipos de grabación para resguardar videos y evidencias de seguridad.' },
      { name: 'Control de accesos', detail: 'Implementación de sistemas para controlar el ingreso a instalaciones mediante tarjetas, códigos o dispositivos biométricos.' },
      { name: 'Automatización de accesos', detail: 'Control de puertas, torniquetes y portones para regular el acceso a áreas restringidas.' },
      { name: 'Administración y supervisión de accesos', detail: 'Registro y monitoreo de entradas y salidas del personal o visitantes.' }
    ],
    benefits: [
      'Mayor seguridad para instalaciones y personal',
      'Supervisión en tiempo real desde cualquier lugar',
      'Registro de eventos y actividades',
      'Control eficiente de acceso a áreas restringidas',
      'Prevención de incidentes y mayor protección de bienes'
    ]
  }
};

export default function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const data = serviceData[slug];

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center text-gray-900">Servicio no encontrado</div>;
  }

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
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-[1.1]"
            >
              Servicios Especializados en <br />
              <span className="text-gray-800 font-medium text-3xl md:text-4xl">{data.title}</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-800 text-lg leading-relaxed mb-4 max-w-lg"
            >
              {data.description}
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-800 text-lg leading-relaxed mb-8 max-w-lg"
            >
              {data.extraDescription}
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] p-8 relative overflow-hidden shadow-2xl border border-gray-200">
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ backgroundImage: `url(${data.image})` }}
              ></div>
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
            {data.servicesIncluded.map((item: any, idx: number) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel p-8 rounded-3xl border border-gray-200 hover:bg-white shadow-sm transition-all group hover:-translate-y-1"
              >
                <div className="mb-6 p-4 bg-white border border-gray-100 shadow-sm rounded-2xl inline-block group-hover:scale-110 transition-transform text-primary">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.name}</h3>
                <p className="text-gray-800 text-sm leading-relaxed">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Nuestros Beneficios</h2>
        <div className="space-y-6">
          {data.benefits.map((benefit: string, idx: number) => {
            const colors = ['border-primary text-primary bg-primary/20', 'border-accent text-accent bg-accent/20', 'border-green-500 text-green-500 bg-green-500/20'];
            const colorIndex = idx % colors.length;
            const borderClass = colors[colorIndex].split(' ')[0];
            const textClass = colors[colorIndex].split(' ')[1];
            const bgClass = colors[colorIndex].split(' ')[2];
            
            return (
              <div key={idx} className={`flex items-start gap-6 glass-panel p-6 rounded-3xl border-l-4 ${borderClass}`}>
                <div className={`w-12 h-12 rounded-full ${bgClass} flex items-center justify-center font-black ${textClass} shrink-0`}>
                  {idx + 1}
                </div>
                <div className="flex items-center">
                  <h4 className="text-xl font-bold m-0 mt-3">{benefit}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Cotizar */}
      <div id="cotizar" className="max-w-4xl mx-auto border-t border-gray-200 pt-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">¿Necesitas {data.title}?</h2>
          <p className="text-gray-600">Llena el formulario y un especialista te contactará.</p>
        </div>
        <QuoteForm />
      </div>

    </main>
  );
}
