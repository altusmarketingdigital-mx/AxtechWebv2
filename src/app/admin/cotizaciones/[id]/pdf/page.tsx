import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/session'
import { notFound } from 'next/navigation'
import { Phone, Mail, Globe, MapPin, Printer } from 'lucide-react'

export default async function QuotePdfPage({ params }: { params: { id: string } }) {
  await requireAdmin()
  
  const quote = await prisma.quote.findUnique({
    where: { id: params.id },
    include: { items: true }
  })
  
  if (!quote) notFound()
    
  const settings = await prisma.companySettings.findUnique({
    where: { id: 'default' }
  })

  // We add a script to auto-print when loaded if desired, or just a button.
  return (
    <div className="bg-gray-100 min-h-screen font-sans print:bg-white text-sm sm:text-base">
      
      {/* Floating Print Button (hidden when printing) */}
      <div className="fixed bottom-8 right-8 print:hidden z-50">
        <button 
          id="print-btn"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-2xl flex items-center justify-center transition-transform hover:scale-110 group relative"
        >
          <Printer size={24} />
          <span className="absolute right-full mr-4 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Imprimir / Descargar PDF
          </span>
        </button>
      </div>

      {/* A4 Canvas */}
      <div className="max-w-[210mm] mx-auto bg-white min-h-[297mm] p-[10mm] sm:p-[15mm] md:p-[20mm] print:p-[10mm] shadow-xl print:shadow-none print:max-w-none">
        
        {/* HEADER */}
        <header className="flex justify-between items-start mb-8 pb-6 border-b-2 border-gray-100">
          <div className="max-w-[50%]">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">{settings?.companyName || 'AXTECH INGENIERÃA'}</h1>
            {settings?.address && (
              <p className="text-gray-500 text-xs mt-2 flex items-start gap-1">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                <span>{settings.address}</span>
              </p>
            )}
            <div className="mt-2 text-xs text-gray-500 space-y-1">
              {settings?.phones && <p className="flex items-center gap-1"><Phone size={12}/> {settings.phones}</p>}
              {settings?.email && <p className="flex items-center gap-1"><Mail size={12}/> {settings.email}</p>}
              {settings?.website && <p className="flex items-center gap-1"><Globe size={12}/> {settings.website}</p>}
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl sm:text-4xl font-black text-blue-600 tracking-widest uppercase mb-2">COTIZACIÃ“N</div>
            <div className="inline-block bg-gray-100 px-4 py-2 rounded-lg">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-0.5">Folio</p>
              <p className="text-lg font-bold text-gray-900">{quote.folio}</p>
            </div>
            <p className="text-xs text-gray-500 mt-3 font-medium">Fecha: {quote.date.toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </header>

        {/* CLIENT DATA */}
        <section className="mb-8 bg-gray-50 p-5 rounded-xl border border-gray-100">
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">Datos del Cliente</h2>
          <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Nombre / RazÃ³n Social</p>
              <p className="font-bold text-gray-900">{quote.clientName}</p>
            </div>
            {quote.clientRfc && (
              <div>
                <p className="text-xs text-gray-500 mb-0.5">RFC</p>
                <p className="font-semibold text-gray-800">{quote.clientRfc}</p>
              </div>
            )}
            {quote.clientEmail && (
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Correo ElectrÃ³nico</p>
                <p className="font-medium text-gray-800">{quote.clientEmail}</p>
              </div>
            )}
            {quote.clientPhone && (
              <div>
                <p className="text-xs text-gray-500 mb-0.5">TelÃ©fono</p>
                <p className="font-medium text-gray-800">{quote.clientPhone}</p>
              </div>
            )}
            {quote.clientAddr && (
              <div className="col-span-2">
                <p className="text-xs text-gray-500 mb-0.5">DirecciÃ³n</p>
                <p className="font-medium text-gray-800">{quote.clientAddr}</p>
              </div>
            )}
          </div>
        </section>

        {/* ITEMS TABLE */}
        <section className="mb-8">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-900 text-white print:bg-gray-200 print:text-black">
              <tr>
                <th className="py-3 px-4 font-semibold text-center w-16 rounded-tl-lg">Cant.</th>
                <th className="py-3 px-4 font-semibold">DescripciÃ³n</th>
                <th className="py-3 px-4 font-semibold text-right w-28">P. Unitario</th>
                <th className="py-3 px-4 font-semibold text-right w-32 rounded-tr-lg">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {quote.items.map((item, idx) => (
                <tr key={idx} className="print:break-inside-avoid">
                  <td className="py-4 px-4 text-center font-medium text-gray-700 align-top">{item.quantity}</td>
                  <td className="py-4 px-4 align-top whitespace-pre-wrap text-gray-800 leading-relaxed">{item.description}</td>
                  <td className="py-4 px-4 text-right align-top text-gray-700">${item.unitPrice.toLocaleString('es-MX', {minimumFractionDigits:2})}</td>
                  <td className="py-4 px-4 text-right align-top font-semibold text-gray-900">${item.total.toLocaleString('es-MX', {minimumFractionDigits:2})}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* TOTALS */}
        <section className="flex justify-end mb-10 print:break-inside-avoid">
          <div className="w-64 space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal:</span>
              <span className="font-semibold text-gray-800">${quote.subtotal.toLocaleString('es-MX', {minimumFractionDigits:2})}</span>
            </div>
            {quote.ivaAmount > 0 && (
              <div className="flex justify-between text-sm text-gray-600">
                <span>IVA:</span>
                <span className="font-semibold text-gray-800">${quote.ivaAmount.toLocaleString('es-MX', {minimumFractionDigits:2})}</span>
              </div>
            )}
            {quote.isrAmount > 0 && (
              <div className="flex justify-between text-sm text-gray-600">
                <span>RetenciÃ³n ISR:</span>
                <span className="font-semibold text-red-600">-${quote.isrAmount.toLocaleString('es-MX', {minimumFractionDigits:2})}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-black text-blue-600 border-t-2 border-gray-900 pt-2 mt-2">
              <span>TOTAL:</span>
              <span>${quote.total.toLocaleString('es-MX', {minimumFractionDigits:2})}</span>
            </div>
          </div>
        </section>

        {/* NOTES & BANK INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 print:break-inside-avoid text-sm">
          {/* Notes */}
          <div>
            {quote.notes && (
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-2 border-b border-gray-200 pb-1">Notas y GarantÃ­a</h3>
                <p className="text-gray-600 whitespace-pre-wrap leading-relaxed text-xs">{quote.notes}</p>
              </div>
            )}
            
            {/* Terms */}
            {(quote.terms || settings?.termsAndConds) && (
              <div>
                <h3 className="font-bold text-gray-900 mb-2 border-b border-gray-200 pb-1">TÃ©rminos y Condiciones</h3>
                <p className="text-gray-600 whitespace-pre-wrap leading-relaxed text-xs">{quote.terms || settings?.termsAndConds}</p>
              </div>
            )}
          </div>
          
          {/* Bank */}
          {(settings?.bankName || settings?.accountName) && (
            <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
              <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                Datos Bancarios
              </h3>
              <div className="space-y-2 text-xs text-blue-800">
                {settings.bankName && <p><span className="font-semibold">Banco:</span> {settings.bankName}</p>}
                {settings.accountName && <p><span className="font-semibold">Titular:</span> {settings.accountName}</p>}
                {settings.accountNumber && <p><span className="font-semibold">Cuenta:</span> {settings.accountNumber}</p>}
                {settings.clabe && <p><span className="font-semibold">CLABE:</span> {settings.clabe}</p>}
              </div>
            </div>
          )}
        </div>

        {/* LEGAL (AVISOS) */}
        <section className="pt-6 mt-10 border-t border-gray-200 text-[10px] text-gray-400 text-justify leading-tight space-y-4 print:break-inside-avoid">
          {settings?.dataUsagePolicy && (
            <div>
              <strong className="text-gray-500 uppercase">Uso de Datos Personales:</strong> {settings.dataUsagePolicy}
            </div>
          )}
          {settings?.privacyNotice && (
            <div>
              <strong className="text-gray-500 uppercase">Aviso de Privacidad:</strong> {settings.privacyNotice}
            </div>
          )}
        </section>

      </div>
      
      {/* Script for window print */}
      <script dangerouslySetInnerHTML={{__html: `
        function printDoc() { window.print() }
        document.getElementById('print-btn')?.addEventListener('click', printDoc)
      `}} />
    </div>
  )
}