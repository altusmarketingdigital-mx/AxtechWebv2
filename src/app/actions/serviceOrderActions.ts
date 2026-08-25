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

    // Generate a random Folio like ORD-XXXX
    const folio = "ORD-" + Math.floor(1000 + Math.random() * 9000)

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
