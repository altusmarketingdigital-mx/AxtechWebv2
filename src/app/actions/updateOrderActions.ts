"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { sendOrderNotification } from "@/lib/notifications"

export async function updateServiceOrder(formData: FormData) {
  const id = formData.get("id") as string
  const status = formData.get("status") as any
  const diagnosis = formData.get("diagnosis") as string
  const repairNotes = formData.get("repairNotes") as string
  const costQuoteRaw = formData.get("costQuote") as string
  const costQuote = costQuoteRaw ? parseFloat(costQuoteRaw) : null

  let updatedOrder;
  try {
    updatedOrder = await prisma.serviceOrder.update({
      where: { id },
      data: {
        status,
        diagnosis,
        repairNotes,
        costQuote
      }
    })
  } catch (error) {
    console.error("Error updating order:", error)
    throw new Error("No se pudo actualizar la orden")
  }

  if (updatedOrder.clientEmail) {
    // Intentar enviar notificación asíncronamente
    sendOrderNotification(updatedOrder.clientEmail, updatedOrder.folio, status)
  }

  revalidatePath(`/admin/servicios`)
  redirect(`/admin/servicios`)
}
