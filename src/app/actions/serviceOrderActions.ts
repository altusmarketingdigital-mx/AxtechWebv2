"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createServiceOrder(formData: FormData) {
  try {
    const clientName = formData.get("clientName") as string
    const clientPhone = formData.get("clientPhone") as string
    const clientEmail = formData.get("clientEmail") as string
    
    const deviceType = formData.get("deviceType") as string
    const brand = formData.get("brand") as string
    const model = formData.get("model") as string
    const serialNum = formData.get("serialNum") as string
    const issueDesc = formData.get("issueDesc") as string

    // Generate consecutive folio OS-YYYY-000001
    const year = new Date().getFullYear()
    const prefix = `OS-${year}-`
    const lastOrder = await prisma.serviceOrder.findFirst({
      where: { folio: { startsWith: prefix } },
      orderBy: { createdAt: 'desc' }
    })
    let nextNumber = 1
    if (lastOrder) {
      const lastNum = parseInt(lastOrder.folio.replace(prefix, ''), 10)
      if (!isNaN(lastNum)) nextNumber = lastNum + 1
    }
    const folio = `${prefix}${nextNumber.toString().padStart(6, '0')}`

    const order = await prisma.serviceOrder.create({
      data: {
        folio,
        clientName,
        clientPhone,
        clientEmail,
        deviceType,
        brand,
        model,
        serialNum,
        issueDesc,
        status: "RECEIVED"
      }
    })

    revalidatePath("/admin/servicios")
    return { success: true, folio: order.folio }
  } catch (error) {
    console.error("Error creating order:", error)
    return { success: false, error: "No se pudo crear la orden" }
  }
}

export async function searchServiceOrderByQuery(rawQuery: string) {
  if (!rawQuery || !rawQuery.trim()) {
    return { success: false, error: "Ingresa un folio o número de teléfono" }
  }

  const query = rawQuery.trim()
  const upperQuery = query.toUpperCase()
  const lowerQuery = query.toLowerCase()

  try {
    const order = await prisma.serviceOrder.findFirst({
      where: {
        OR: [
          { folio: upperQuery },
          { clientPhone: query },
          { clientEmail: lowerQuery }
        ]
      },
      include: {
        payments: true
      }
    })

    if (!order) {
      return { success: false, error: `No se encontró ninguna orden registrada con "${query}"` }
    }

    return { 
      success: true, 
      order: {
        ...order,
        createdAt: order.createdAt.toISOString(),
        updatedAt: order.updatedAt.toISOString(),
        serviceDate: order.serviceDate ? order.serviceDate.toISOString() : null,
      } 
    }
  } catch (error) {
    console.error("Error searching order:", error)
    return { success: false, error: "Ocurrió un error al buscar la orden" }
  }
}
