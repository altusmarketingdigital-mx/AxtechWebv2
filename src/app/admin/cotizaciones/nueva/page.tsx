'use client'
import { useState, useEffect } from 'react'
import { createQuote } from '../actions'
import { getCompanySettings } from '../../configuracion/actions'
import { useRouter, useSearchParams } from 'next/navigation'
import { Plus, Trash2, FilePlus, ChevronLeft, Save, CheckCircle2, MessageCircle, Mail, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function NuevaCotizacionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [settings, setSettings] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    clientName: searchParams.get('clientName') || '',
    clientRfc: searchParams.get('clientRfc') || '',
    clientPhone: searchParams.get('clientPhone') || '',
    clientEmail: searchParams.get('clientEmail') || '',
    clientAddr: searchParams.get('clientAddr') || '',
    date: new Date().toISOString().split('T')[0],
    notes: searchParams.get('notes') || 'Garantía fija de 30 días naturales a partir de la entrega del equipo o servicio.',
    terms: '1. Los precios incluidos en esta cotización tienen una vigencia de 15 días naturales a partir de la fecha de emisión. 2. El servicio se realizará una vez confirmado el pago total o el anticipo acordado. 3. La garantía cubre únicamente defectos relacionados con el servicio prestado, no daños por mal uso o causas externas. 4. AXTECH INGENIERIA no se hace responsable por pérdida de información; se recomienda respaldar datos previamente. 5. Cualquier servicio adicional no contemplado en esta cotización será presupuestado por separado.'
  })

  const [items, setItems] = useState([
    { quantity: 1, description: '', unitPrice: 0 }
  ])

  const [ivaPercent, setIvaPercent] = useState<number>(16)
  const [isrPercent, setIsrPercent] = useState<number>(0)
  const [applyIsr, setApplyIsr] = useState<boolean>(false)

  useEffect(() => {
    getCompanySettings().then(data => {
      setSettings(data)
      if (data?.defaultIva !== undefined && data?.defaultIva !== null) {
        setIvaPercent(Number(data.defaultIva))
      }
      if (data?.defaultIsr !== undefined && data?.defaultIsr !== null) {
        const defaultIsrVal = Number(data.defaultIsr)
        setIsrPercent(defaultIsrVal)
        if (defaultIsrVal > 0) {
          setApplyIsr(true)
        }
      }
      setFormData(prev => ({
        ...prev,
        notes: prev.notes || data?.defaultNotes || '',
        terms: prev.terms || data?.termsAndConds || ''
      }))
    })
  }, [])

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }

  const addItem = () => {
    setItems([...items, { quantity: 1, description: '', unitPrice: 0 }])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  // Cálculos
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)
  const activeIsrPercent = applyIsr ? isrPercent : 0
  const ivaAmount = subtotal * (ivaPercent / 100)
  const isrAmount = subtotal * (activeIsrPercent / 100)
  const total = subtotal + ivaAmount - isrAmount

  const [createdQuote, setCreatedQuote] = useState<{
    id: string
    folio: string
    whatsappUrl: string | null
    clientPhone?: string | null
    clientEmail?: string | null
    adminEmail?: string | null
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const itemsWithTotals = items.map(item => ({
        ...item,
        total: item.quantity * item.unitPrice
      }))
      
      const payload = {
        ...formData,
        items: itemsWithTotals,
        subtotal,
        ivaAmount,
        isrAmount,
        total
      }
      
      const res = await createQuote(payload)
      if (res.success) {
        // Si hay link de WhatsApp, podemos abrirlo o presentarlo en la confirmación
        if (res.whatsappUrl) {
          window.open(res.whatsappUrl, '_blank')
        }
        setCreatedQuote({
          id: res.id,
          folio: res.folio,
          whatsappUrl: res.whatsappUrl,
          clientPhone: res.clientPhone,
          clientEmail: res.clientEmail,
          adminEmail: res.adminEmail
        })
      }
    } catch (error) {
      alert('Error al crear la cotización')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/cotizaciones" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nueva Cotización</h1>
          <p className="text-gray-500 text-sm mt-1">Completa los datos para generar el documento.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Datos del Cliente */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Datos del Cliente</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cliente / Razón Social *</label>
              <input required type="text" value={formData.clientName} onChange={e => setFormData({...formData, clientName: e.target.value})} className="w-full border-gray-300 rounded-lg p-2.5 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">RFC</label>
              <input type="text" value={formData.clientRfc} onChange={e => setFormData({...formData, clientRfc: e.target.value})} className="w-full border-gray-300 rounded-lg p-2.5 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
              <input type="email" value={formData.clientEmail} onChange={e => setFormData({...formData, clientEmail: e.target.value})} className="w-full border-gray-300 rounded-lg p-2.5 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input type="text" value={formData.clientPhone} onChange={e => setFormData({...formData, clientPhone: e.target.value})} className="w-full border-gray-300 rounded-lg p-2.5 border" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
              <input type="text" value={formData.clientAddr} onChange={e => setFormData({...formData, clientAddr: e.target.value})} className="w-full border-gray-300 rounded-lg p-2.5 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Cotización</label>
              <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full border-gray-300 rounded-lg p-2.5 border" />
            </div>
          </div>
        </section>

        {/* Partidas */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="text-lg font-bold text-gray-800">Partidas (Productos/Servicios)</h2>
            <button type="button" onClick={addItem} className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg">
              <Plus size={16}/> Agregar Concepto
            </button>
          </div>
          
          <div className="space-y-4">
            {items.map((item, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-4 p-4 border border-gray-100 bg-gray-50/50 rounded-xl relative group">
                <div className="w-full md:w-24">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Cant.</label>
                  <input type="number" min="1" required value={item.quantity} onChange={e => handleItemChange(idx, 'quantity', Number(e.target.value))} className="w-full border-gray-300 rounded-lg p-2 border" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Descripción</label>
                  <textarea required rows={2} value={item.description} onChange={e => handleItemChange(idx, 'description', e.target.value)} className="w-full border-gray-300 rounded-lg p-2 border resize-y"></textarea>
                </div>
                <div className="w-full md:w-32">
                  <label className="block text-xs font-medium text-gray-500 mb-1">P. Unitario</label>
                  <input type="number" min="0" step="0.01" required value={item.unitPrice} onChange={e => handleItemChange(idx, 'unitPrice', Number(e.target.value))} className="w-full border-gray-300 rounded-lg p-2 border" />
                </div>
                <div className="w-full md:w-32 flex flex-col justify-center">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Importe</label>
                  <div className="font-bold text-gray-900 py-2">${(item.quantity * item.unitPrice).toLocaleString('es-MX', {minimumFractionDigits:2})}</div>
                </div>
                {items.length > 1 && (
                  <button type="button" onClick={() => removeItem(idx)} className="absolute -right-2 -top-2 bg-red-100 text-red-600 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <div className="w-full md:w-80 bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-3 shadow-sm">
              <div className="flex justify-between items-center text-gray-700 text-sm">
                <span>Subtotal:</span>
                <span className="font-semibold text-gray-900">${subtotal.toLocaleString('es-MX', {minimumFractionDigits:2})}</span>
              </div>
              
              <div className="flex justify-between items-center text-gray-700 text-sm">
                <div className="flex items-center gap-1.5">
                  <span>IVA</span>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.5"
                    value={ivaPercent}
                    onChange={e => setIvaPercent(parseFloat(e.target.value) || 0)}
                    className="w-14 text-center border-gray-300 rounded px-1 py-0.5 text-xs border bg-white"
                  />
                  <span>%:</span>
                </div>
                <span className="font-semibold text-gray-900">${ivaAmount.toLocaleString('es-MX', {minimumFractionDigits:2})}</span>
              </div>

              {/* Control de Retención de ISR */}
              <div className="border-t border-gray-200/60 pt-2 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-700 font-medium text-xs select-none">
                    <input 
                      type="checkbox" 
                      checked={applyIsr} 
                      onChange={e => setApplyIsr(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer" 
                    />
                    <span>Retención ISR (Personas Morales / RESICO)</span>
                  </label>
                </div>

                {applyIsr && (
                  <div className="flex justify-between items-center text-xs text-red-600 bg-red-50 p-2 rounded-lg border border-red-100">
                    <div className="flex items-center gap-1">
                      <span>Tasa ISR:</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        value={isrPercent}
                        onChange={e => setIsrPercent(parseFloat(e.target.value) || 0)}
                        placeholder="1.25 ó 10"
                        className="w-16 text-center border-red-200 rounded px-1.5 py-0.5 text-xs border bg-white font-bold text-red-700"
                      />
                      <span>%:</span>
                    </div>
                    <span className="font-bold text-red-700">-${isrAmount.toLocaleString('es-MX', {minimumFractionDigits:2})}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center text-gray-900 text-lg font-black border-t-2 border-gray-300 pt-3">
                <span>Total:</span>
                <span className="text-blue-700">${total.toLocaleString('es-MX', {minimumFractionDigits:2})}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Textos Adicionales */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Condiciones y Notas</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notas de la Cotización (ej. Garantía)</label>
              <textarea value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} rows={2} className="w-full border-gray-300 rounded-lg p-2.5 border" placeholder="Garantía de 1 mes..."></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Términos y Condiciones Específicos</label>
              <textarea value={formData.terms} onChange={e => setFormData({...formData, terms: e.target.value})} rows={3} className="w-full border-gray-300 rounded-lg p-2.5 border" placeholder="Vigencia, condiciones de pago..."></textarea>
            </div>
          </div>
        </section>

        <div className="flex justify-end pt-4">
          <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-transform hover:scale-105 disabled:opacity-50">
            <FilePlus size={20} />
            {loading ? 'Creando...' : 'Crear y Guardar Cotización'}
          </button>
        </div>

      </form>

      {/* Modal de confirmación y envíos */}
      {createdQuote && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-2xl font-black text-gray-900">¡Cotización Creada!</h3>
              <p className="text-gray-500 text-sm mt-1">
                Folio: <strong className="text-blue-600 font-mono text-base">{createdQuote.folio}</strong>
              </p>
            </div>

            <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 text-blue-700 rounded-lg shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Notificación por Correo</h4>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Se envió la cotización a: <strong className="text-gray-800">{createdQuote.adminEmail || 'tu correo de administrador'}</strong>
                    {createdQuote.clientEmail && (
                      <span> y al cliente (<strong className="text-gray-800">{createdQuote.clientEmail}</strong>).</span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-gray-200">
                <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg shrink-0">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Notificación por WhatsApp</h4>
                  {createdQuote.clientPhone ? (
                    <p className="text-xs text-gray-600 mt-0.5">
                      Se preparó el mensaje para el número <strong className="text-gray-800">{createdQuote.clientPhone}</strong> con el enlace y desglose de la cotización.
                    </p>
                  ) : (
                    <p className="text-xs text-amber-700 mt-0.5">
                      No se especificó teléfono del cliente en el formulario.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              {createdQuote.whatsappUrl && (
                <a
                  href={createdQuote.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-transform hover:scale-[1.02]"
                >
                  <MessageCircle size={20} />
                  Abrir WhatsApp del Cliente
                </a>
              )}

              <Link
                href={`/admin/cotizaciones/${createdQuote.id}/pdf`}
                target="_blank"
                className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <ExternalLink size={18} />
                Ver / Imprimir PDF
              </Link>

              <button
                type="button"
                onClick={() => router.push('/admin/cotizaciones')}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-xl font-semibold transition-colors"
              >
                Ir a Lista de Cotizaciones
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
