import { Construction } from 'lucide-react'

export default function EquiposInventarioPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center">
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-10 max-w-md">
        <Construction size={48} className="mx-auto text-yellow-500 mb-4" />
        <h1 className="text-xl font-bold text-gray-800 mb-2">Equipos en Inventario</h1>
        <p className="text-gray-500 text-sm">Esta sección está en desarrollo. Estará disponible próximamente.</p>
      </div>
    </div>
  )
}
