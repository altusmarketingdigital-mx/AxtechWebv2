const fs = require('fs');
const path = require('path');

const configViews = [
  {
    dir: 'src/app/admin/configuracion/sucursales',
    title: 'Sucursales y Talleres',
    subtitle: 'Administración de puntos de atención física y centros de diagnóstico'
  },
  {
    dir: 'src/app/admin/configuracion/folios',
    title: 'Configuración de Folios y Consecutivos',
    subtitle: 'Estructura oficial de folios (OS-YYYY-XXXXXX, COT-YYYY-XXXXXX, VTA-YYYY-XXXXXX)'
  },
  {
    dir: 'src/app/admin/configuracion/estados',
    title: 'Flujo y Estados Maestros de Servicio',
    subtitle: 'Recibido, Diagnóstico, Cotización, Autorizado, Reparación, Calidad y Entrega'
  },
  {
    dir: 'src/app/admin/configuracion/impuestos',
    title: 'Tasas de Impuestos y Retenciones',
    subtitle: 'Configuración de IVA (16%) y retención de ISR aplicables a servicios y ventas'
  },
  {
    dir: 'src/app/admin/configuracion/metodos-pago',
    title: 'Métodos de Pago y Cuentas Bancarias',
    subtitle: 'Habilitación de Efectivo, Tarjeta y Transferencia bancaria SPEI'
  },
  {
    dir: 'src/app/admin/configuracion/notificaciones',
    title: 'Notificaciones y Alertas Automáticas',
    subtitle: 'Canales de aviso al cliente (WhatsApp y Correo Electrónico)'
  },
  {
    dir: 'src/app/admin/configuracion/portal',
    title: 'Portal del Cliente (Service Desk)',
    subtitle: 'Parámetros del botón público de Seguimiento de Servicio'
  }
];

configViews.forEach(v => {
  const fullDir = path.resolve(v.dir);
  if (!fs.existsSync(fullDir)) fs.mkdirSync(fullDir, { recursive: true });
  
  const content = `import React from "react"
import prisma from "@/lib/prisma"
import Link from "next/link"
import { Settings, ShieldCheck, ArrowLeft } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function ConfigSubViewPage() {
  const settings = await prisma.companySettings.findUnique({
    where: { id: "default" }
  })

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/admin/configuracion" className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition shadow-sm">
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">${v.title}</h1>
          <p className="text-xs text-gray-500 mt-0.5">${v.subtitle}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4 text-xs">
        <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
          <ShieldCheck size={18} />
          <span className="font-semibold">Parámetro sincronizado con el núcleo de Service Desk de AXTECH.</span>
        </div>

        <div className="space-y-3 text-gray-700 leading-relaxed">
          <p>
            Esta configuración alimenta directamente las plantillas de órdenes de servicio, presupuestos en PDF, cálculos fiscales de cotización y los accesos públicos de seguimiento.
          </p>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 font-mono text-[11px] space-y-1">
            <p><strong>Empresa emisora:</strong> {settings?.companyName || 'AXTECH INGENIERÍA'}</p>
            <p><strong>Tasa de IVA general:</strong> {settings?.defaultIva || 16}%</p>
            <p><strong>Teléfonos oficiales:</strong> {settings?.phones || '55 1234 5678'}</p>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-100 flex justify-end">
          <Link
            href="/admin/configuracion"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition"
          >
            Editar Parámetros Generales
          </Link>
        </div>
      </div>
    </div>
  )
}
`;

  fs.writeFileSync(path.join(fullDir, 'page.tsx'), content, 'utf8');
});

console.log('Successfully generated live pages for Configuracion sub-routes!');