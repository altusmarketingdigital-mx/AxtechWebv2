"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { OrderStatus } from "@prisma/client"
import { sendOrderNotification } from "@/lib/notifications"

export async function updateServiceOrder(formData: FormData) {
  try {
    const id = formData.get("id") as string
    const status = formData.get("status") as OrderStatus
    const diagnosis = formData.get("diagnosis") as string
    const repairNotes = formData.get("repairNotes") as string
    const costQuoteRaw = formData.get("costQuote") as string
    const costQuote = costQuoteRaw ? parseFloat(costQuoteRaw) : null

    const updatedOrder = await prisma.serviceOrder.update({
      where: { id },
      data: {
        status,
        diagnosis,
        repairNotes,
        costQuote
      }
    })

    if (updatedOrder.clientEmail) {
      // Intentar enviar notificación asíncronamente
      sendOrderNotification(updatedOrder.clientEmail, updatedOrder.folio, status)
    }

    revalidatePath(`/admin/servicios`)
    return { success: true }
  } catch (error) {
    console.error("Error updating order:", error)
    return { success: false, error: "No se pudo actualizar la orden" }
  }
}
