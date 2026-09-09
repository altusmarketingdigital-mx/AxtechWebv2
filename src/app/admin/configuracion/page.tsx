'use client'

import { useState, useEffect } from 'react'
import { getCompanySettings, updateCompanySettings } from './actions'
import { Save, Building2, Landmark, ShieldCheck, Receipt } from 'lucide-react'

export default function ConfigPage() {
  const [settings, setSettings] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getCompanySettings().then(data => {
      setSettings(data)
      setLoading(false)
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      // parse numeric values
      const dataToSave = {
        ...settings,
        defaultIva: parseFloat(settings.defaultIva) || 0,
        defaultIsr: parseFloat(settings.defaultIsr) || 0
      }
      await updateCompanySettings(dataToSave)
      alert('Configuración guardada correctamente')
    } catch (error) {
      console.error(error)
      alert('Error al guardar la configuración')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value })
  }

  if (loading) return <div className="p-8 text-center text-gray-500">Cargando configuración...</div>

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Configuración del Sistema</h1>
          <p className="text-gray-500 text-sm mt-1">Administra los datos de la empresa, cotizaciones y textos legales.</p>
        </div>
        <button 
          onClick={handleSubmit} 
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          <Save size={18} />
          {saving ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </div>

      <form className="space-y-8">
        
        {/* Datos Corporativos */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Building2 className="text-blue-500" size={20} /> Datos Corporativos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Comercial</label>
              <input type="text" name="companyName" value={settings.companyName || ''} onChange={handleChange} className="w-full border-gray-300 rounded-lg p-2.5 border focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sitio Web</label>
              <input type="text" name="website" value={settings.website || ''} onChange={handleChange} className="w-full border-gray-300 rounded-lg p-2.5 border focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Dirección Oficial</label>
              <input type="text" name="address" value={settings.address || ''} onChange={handleChange} className="w-full border-gray-300 rounded-lg p-2.5 border focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfonos</label>
              <input type="text" name="phones" value={settings.phones || ''} onChange={handleChange} className="w-full border-gray-300 rounded-lg p-2.5 border focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
              <input type="text" name="email" value={settings.email || ''} onChange={handleChange} className="w-full border-gray-300 rounded-lg p-2.5 border focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </section>

        {/* Datos Bancarios */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Landmark className="text-blue-500" size={20} /> Datos Bancarios para Pagos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Banco</label>
              <input type="text" name="bankName" value={settings.bankName || ''} onChange={handleChange} className="w-full border-gray-300 rounded-lg p-2.5 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titular de la Cuenta</label>
              <input type="text" name="accountName" value={settings.accountName || ''} onChange={handleChange} className="w-full border-gray-300 rounded-lg p-2.5 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Número de Cuenta</label>
              <input type="text" name="accountNumber" value={settings.accountNumber || ''} onChange={handleChange} className="w-full border-gray-300 rounded-lg p-2.5 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CLABE Interbancaria</label>
              <input type="text" name="clabe" value={settings.clabe || ''} onChange={handleChange} className="w-full border-gray-300 rounded-lg p-2.5 border" />
            </div>
          </div>
        </section>

        {/* Cotizaciones y Textos Legales */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Receipt className="text-blue-500" size={20} /> Ajustes de Cotizaciones
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">IVA por defecto (%)</label>
              <input type="number" name="defaultIva" value={settings.defaultIva || 0} onChange={handleChange} className="w-full border-gray-300 rounded-lg p-2.5 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ISR Retenido por defecto (%)</label>
              <input type="number" name="defaultIsr" value={settings.defaultIsr || 0} onChange={handleChange} className="w-full border-gray-300 rounded-lg p-2.5 border" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Términos y Condiciones</label>
              <textarea name="termsAndConds" value={settings.termsAndConds || ''} onChange={handleChange} rows={4} className="w-full border-gray-300 rounded-lg p-2.5 border" placeholder="Vigencia de precios, condiciones de pago, alcance de garantía..."></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"><ShieldCheck size={16}/> Aviso / Uso de Datos Personales</label>
              <textarea name="dataUsagePolicy" value={settings.dataUsagePolicy || ''} onChange={handleChange} rows={3} className="w-full border-gray-300 rounded-lg p-2.5 border"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"><ShieldCheck size={16}/> Aviso de Privacidad Extendido</label>
              <textarea name="privacyNotice" value={settings.privacyNotice || ''} onChange={handleChange} rows={4} className="w-full border-gray-300 rounded-lg p-2.5 border"></textarea>
            </div>
          </div>
        </section>

      </form>
    </div>
  )
}
