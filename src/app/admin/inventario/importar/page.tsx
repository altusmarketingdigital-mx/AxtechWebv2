"use client"

import React, { useState, useRef } from "react"
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle, X, Download, Loader2 } from "lucide-react"
import * as XLSX from "xlsx"
import { importProducts } from "@/app/actions/importActions"

type ProductRow = {
  sku: string
  name: string
  description?: string
  price: number
  stock: number
  category?: string
}

type ImportResult = {
  created: number
  skipped: number
  errors: string[]
}

const REQUIRED_COLUMNS = ["sku", "name", "price", "stock"]
const OPTIONAL_COLUMNS = ["description", "category"]
const ALL_COLUMNS = [...REQUIRED_COLUMNS, ...OPTIONAL_COLUMNS]

export default function ImportarProductosPage() {
  const [preview, setPreview] = useState<ProductRow[]>([])
  const [fileName, setFileName] = useState("")
  const [error, setError] = useState("")
  const [result, setResult] = useState<ImportResult | null>(null)
  const [loading, setLoading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const parseFile = (file: File) => {
    setError("")
    setResult(null)
    setFileName(file.name)

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: "array" })
        const sheet = workbook.Sheets[workbook.SheetNames[0]]
        const raw: any[] = XLSX.utils.sheet_to_json(sheet, { defval: "" })

        if (raw.length === 0) {
          setError("El archivo está vacío o no tiene datos.")
          return
        }

        // Normalizar columnas (minúsculas, sin espacios)
        const normalized = raw.map(row => {
          const clean: any = {}
          for (const key of Object.keys(row)) {
            clean[key.toLowerCase().trim().replace(/ /g, "_")] = row[key]
          }
          return clean
        })

        // Validar que existan columnas obligatorias
        const firstRow = normalized[0]
        const missing = REQUIRED_COLUMNS.filter(col => !(col in firstRow))
        if (missing.length > 0) {
          setError(`Faltan columnas obligatorias: ${missing.join(", ")}. Descarga la plantilla para ver el formato correcto.`)
          return
        }

        const rows: ProductRow[] = normalized.map(row => ({
          sku: String(row.sku),
          name: String(row.name),
          description: row.description ? String(row.description) : undefined,
          price: parseFloat(row.price) || 0,
          stock: parseInt(row.stock) || 0,
          category: row.category ? String(row.category) : undefined,
        }))

        setPreview(rows)
      } catch {
        setError("No se pudo leer el archivo. Asegúrate de que sea un Excel (.xlsx) o CSV válido.")
      }
    }
    reader.readAsArrayBuffer(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) parseFile(file)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) parseFile(file)
  }

  const handleImport = async () => {
    if (preview.length === 0) return
    setLoading(true)
    try {
      const res = await importProducts(preview)
      setResult(res)
      setPreview([])
      setFileName("")
    } catch {
      setError("Error al importar los productos. Intenta de nuevo.")
    }
    setLoading(false)
  }

  const downloadTemplate = () => {
    const template = [
      { sku: "PROD-001", name: "Laptop Dell Inspiron", description: "Laptop 15 pulgadas 8GB RAM", price: 12999.00, stock: 5, category: "Laptops" },
      { sku: "PROD-002", name: "Mouse Inalámbrico", description: "Mouse ergonómico USB", price: 299.00, stock: 20, category: "Periféricos" },
    ]
    const ws = XLSX.utils.json_to_sheet(template)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Productos")
    XLSX.writeFile(wb, "plantilla-productos-axtech.xlsx")
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Importar Catálogo de Productos</h1>
          <p className="text-gray-500 text-sm mt-1">Carga tu archivo Excel o CSV para subir productos en masa.</p>
        </div>
        <button
          onClick={downloadTemplate}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          <Download size={16} />
          Descargar Plantilla
        </button>
      </div>

      {/* Format Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
        <p className="font-semibold mb-2">📋 Columnas del archivo:</p>
        <div className="flex flex-wrap gap-2">
          {REQUIRED_COLUMNS.map(c => (
            <span key={c} className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs font-mono">{c} *</span>
          ))}
          {OPTIONAL_COLUMNS.map(c => (
            <span key={c} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-mono">{c}</span>
          ))}
        </div>
        <p className="mt-2 text-xs text-blue-600">* Obligatorias. Los SKU duplicados se actualizarán automáticamente.</p>
      </div>

      {/* Result */}
      {result && (
        <div className={`rounded-xl p-5 border ${result.errors.length > 0 ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200'}`}>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="text-green-600" size={22} />
            <h3 className="font-bold text-gray-900">Importación completada</h3>
          </div>
          <div className="flex gap-6 text-sm mb-3">
            <span className="text-green-700 font-medium">✅ {result.created} productos importados</span>
            {result.skipped > 0 && <span className="text-yellow-700 font-medium">⚠️ {result.skipped} omitidos</span>}
          </div>
          {result.errors.length > 0 && (
            <ul className="text-xs text-yellow-800 space-y-1 list-disc ml-4">
              {result.errors.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
          )}
          <button onClick={() => setResult(null)} className="mt-3 text-xs text-gray-500 hover:text-gray-700 underline">
            Cerrar
          </button>
        </div>
      )}

      {/* Upload Zone */}
      {!preview.length && !result && (
        <div
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-2xl p-12 text-center cursor-pointer transition-colors bg-white hover:bg-blue-50"
        >
          <FileSpreadsheet className="mx-auto mb-4 text-gray-400" size={52} />
          <p className="text-gray-700 font-semibold text-lg">Arrastra tu archivo aquí</p>
          <p className="text-gray-400 text-sm mt-1">o haz clic para seleccionar</p>
          <p className="text-xs text-gray-400 mt-3">Formatos soportados: .xlsx, .xls, .csv</p>
          <input
            ref={fileRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 text-red-700 text-sm">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      {/* Preview Table */}
      {preview.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900">Vista Previa: {fileName}</h3>
              <p className="text-sm text-gray-500 mt-0.5">{preview.length} productos listos para importar</p>
            </div>
            <button
              onClick={() => { setPreview([]); setFileName("") }}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <X size={18} className="text-gray-500" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">SKU</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Nombre</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Descripción</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Precio</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Stock</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Categoría</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {preview.slice(0, 50).map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs text-blue-600">{row.sku}</td>
                    <td className="px-4 py-3 font-medium text-gray-900 max-w-[200px] truncate">{row.name}</td>
                    <td className="px-4 py-3 text-gray-500 max-w-[180px] truncate">{row.description || "—"}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900">${Number(row.price).toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${row.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {row.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{row.category || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {preview.length > 50 && (
              <p className="text-center text-xs text-gray-400 py-3">
                Mostrando 50 de {preview.length} filas. Todos se importarán.
              </p>
            )}
          </div>

          <div className="p-5 border-t border-gray-100 flex justify-end gap-3">
            <button
              onClick={() => { setPreview([]); setFileName("") }}
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
            >
              Cancelar
            </button>
            <button
              onClick={handleImport}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition disabled:opacity-60"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
              {loading ? "Importando..." : `Importar ${preview.length} productos`}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
