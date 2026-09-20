import React from "react"
import prisma from "@/lib/prisma"
import POSClient from "./POSClient"

export const dynamic = 'force-dynamic'

export default async function POSPage() {
  const products = await prisma.product.findMany({
    orderBy: { name: "asc" }
  })

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Punto de Venta (POS)</h1>
        <p className="text-xs text-gray-500 mt-0.5">Terminal de venta rápida de mostrador, refacciones y accesorios</p>
      </div>

      <POSClient products={JSON.parse(JSON.stringify(products))} />
    </div>
  )
}