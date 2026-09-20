"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createSupplier(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const businessName = formData.get("businessName") as string
    const rfc = formData.get("rfc") as string
    const phone = formData.get("phone") as string
    const whatsapp = formData.get("whatsapp") as string
    const email = formData.get("email") as string
    const address = formData.get("address") as string
    const contactPerson = formData.get("contactPerson") as string
    const creditDaysRaw = formData.get("creditDays") as string
    const creditDays = parseInt(creditDaysRaw, 10) || 0
    const notes = formData.get("notes") as string

    const supplier = await prisma.supplier.create({
      data: {
        name,
        businessName,
        rfc,
        phone,
        whatsapp,
        email,
        address,
        contactPerson,
        creditDays,
        notes
      }
    })

    revalidatePath("/admin/proveedores")
    return { success: true, id: supplier.id }
  } catch (error) {
    console.error("Error creating supplier:", error)
    return { success: false, error: "No se pudo registrar el proveedor" }
  }
}

export async function createPurchaseOrder(data: {
  supplierId: string
  notes?: string
  items: { description: string; quantity: number; unitCost: number }[]
}) {
  try {
    const { supplierId, notes, items } = data

    if (!items || items.length === 0) {
      return { success: false, error: "Debes agregar al menos una partida a la orden de compra" }
    }

    const total = items.reduce((sum, item) => sum + (item.quantity * item.unitCost), 0)

    // Folio OC-YYYY-000001
    const year = new Date().getFullYear()
    const prefix = `OC-${year}-`
    const lastOrder = await prisma.purchaseOrder.findFirst({
      where: { folio: { startsWith: prefix } },
      orderBy: { createdAt: "desc" }
    })
    let nextNum = 1
    if (lastOrder) {
      const last = parseInt(lastOrder.folio.replace(prefix, ""), 10)
      if (!isNaN(last)) nextNum = last + 1
    }
    const folio = `${prefix}${nextNum.toString().padStart(6, "0")}`

    const po = await prisma.purchaseOrder.create({
      data: {
        folio,
        supplierId,
        total,
        notes,
        status: "BORRADOR",
        items: {
          create: items.map(i => ({
            description: i.description,
            quantity: i.quantity,
            unitCost: i.unitCost,
            total: i.quantity * i.unitCost
          }))
        }
      }
    })

    revalidatePath("/admin/proveedores/ordenes")
    revalidatePath("/admin/proveedores")
    return { success: true, folio: po.folio, id: po.id }
  } catch (error) {
    console.error("Error creating purchase order:", error)
    return { success: false, error: "No se pudo crear la orden de compra" }
  }
}