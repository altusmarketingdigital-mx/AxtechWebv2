"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function processPosSale(data: {
  clientName: string
  paymentMethod: string
  amountPaid: number
  items: { productId: string; quantity: number; price: number }[]
}) {
  try {
    const { clientName, paymentMethod, amountPaid, items } = data

    if (!items || items.length === 0) {
      return { success: false, error: "El carrito no contiene productos" }
    }

    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0)
    const total = subtotal
    const change = Math.max(0, amountPaid - total)

    // Generate folio VTA-YYYY-000001
    const year = new Date().getFullYear()
    const prefix = `VTA-${year}-`
    const lastSale = await prisma.sale.findFirst({
      where: { folio: { startsWith: prefix } },
      orderBy: { createdAt: 'desc' }
    })
    let nextNum = 1
    if (lastSale) {
      const last = parseInt(lastSale.folio.replace(prefix, ''), 10)
      if (!isNaN(last)) nextNum = last + 1
    }
    const folio = `${prefix}${nextNum.toString().padStart(6, '0')}`

    // Create sale and reduce stock
    const sale = await prisma.$transaction(async (tx) => {
      const createdSale = await tx.sale.create({
        data: {
          folio,
          type: "POS",
          total,
          clientName: clientName || "Cliente Mostrador",
          paymentMethod: paymentMethod || "EFECTIVO",
          amountPaid,
          change,
          items: {
            create: items.map(i => ({
              productId: i.productId,
              quantity: i.quantity,
              price: i.price
            }))
          }
        },
        include: { items: { include: { product: true } } }
      })

      // Decrement stock for each product
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: { decrement: item.quantity }
          }
        })
      }

      return createdSale
    })

    revalidatePath("/admin/ventas")
    revalidatePath("/admin/inventario")
    revalidatePath("/admin")

    return { success: true, folio: sale.folio, total: sale.total, change: sale.change }
  } catch (error) {
    console.error("Error processing POS sale:", error)
    return { success: false, error: "No se pudo procesar la venta" }
  }
}