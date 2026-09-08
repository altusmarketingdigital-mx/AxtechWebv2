'use client'
import { useState, useEffect } from 'react'
import { createQuote } from '../actions'
import { getCompanySettings } from '../../configuracion/actions'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, FilePlus, ChevronLeft, Save } from 'lucide-react'
import Link from 'next/link'

export default function NuevaCotizacionPage() {
  const router = useRouter()
  const [settings, setSettings] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    clientName: '',
    clientRfc: '',
    clientPhone: '',
    clientEmail: '',
    clientAddr: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    terms: ''
  })

  const [items, setItems] = useState([
    { quantity: 1, description: '', unitPrice: 0 }
  ])

  useEffect(() => {
    getCompanySettings().then(data => {
      setSettings(data)
      setFormData(prev => ({
        ...prev,
        notes: data?.defaultNotes || '',
        terms: data?.termsAndConds || ''
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
  const ivaPercent = settings?.defaultIva || 16
  const isrPercent = settings?.defaultIsr || 0
  const ivaAmount = subtotal * (ivaPercent / 100)
  const isrAmount = subtotal * (isrPercent / 100)
  const total = subtotal + ivaAmount - isrAmount

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
        alert('Cotización creada con éxito')
        router.push('/admin/cotizaciones')
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
            <div className="w-full md:w-72 bg-gray-50 p-4 rounded-xl space-y-3">
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Subtotal:</span>
                <span className="font-semibold">${subtotal.toLocaleString('es-MX', {minimumFractionDigits:2})}</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm">
                <span>IVA ({ivaPercent}%):</span>
                <span className="font-semibold">${ivaAmount.toLocaleString('es-MX', {minimumFractionDigits:2})}</span>
              </div>
              {isrPercent > 0 && (
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Ret. ISR ({isrPercent}%):</span>
                  <span className="font-semibold text-red-600">-${isrAmount.toLocaleString('es-MX', {minimumFractionDigits:2})}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-900 text-lg font-bold border-t border-gray-200 pt-3">
                <span>Total:</span>
                <span>${total.toLocaleString('es-MX', {minimumFractionDigits:2})}</span>
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
    </div>
  )
}
