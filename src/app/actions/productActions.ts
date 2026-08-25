"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createProduct(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const sku = formData.get("sku") as string
    const description = formData.get("description") as string
    const price = parseFloat(formData.get("price") as string)
    const stock = parseInt(formData.get("stock") as string)
    
    await prisma.product.create({
      data: {
        name,
        sku,
        description,
        price,
        stock
      }
    })

    revalidatePath("/admin/inventario")
    revalidatePath("/admin/pos")
    return { success: true }
  } catch (error) {
    console.error("Error creating product:", error)
    return { success: false, error: "No se pudo crear el producto. ¿El SKU ya existe?" }
  }
}

export async function processPosSale(items: { productId: string, quantity: number, price: number }[], total: number, clientName?: string) {
  try {
    const folio = "POS-" + Math.floor(10000 + Math.random() * 90000)

    // Using transaction to ensure atomicity
    await prisma.$transaction(async (tx) => {
      // Create Sale
      const sale = await tx.sale.create({
        data: {
          folio,
          type: "POS",
          total,
          clientName,
          items: {
            create: items.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price
            }))
          }
        }
      })

      // Update Stock
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity
            }
          }
        })
      }
    })

    revalidatePath("/admin/inventario")
    revalidatePath("/admin/pos")
    return { success: true, folio }
  } catch (error) {
    console.error("Error processing POS sale:", error)
    return { success: false, error: "Error al procesar la venta." }
  }
}
