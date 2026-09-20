"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function processOrderDelivery(formData: FormData) {
  try {
    const orderId = formData.get("orderId") as string
    const receivedBy = formData.get("receivedBy") as string
    const receiverIdDoc = formData.get("receiverIdDoc") as string
    const deliveryNotes = formData.get("deliveryNotes") as string
    const warrantyDaysRaw = formData.get("warrantyDays") as string
    const warrantyDays = parseInt(warrantyDaysRaw, 10) || 30
    const deliveryChecksRaw = formData.get("deliveryChecks") as string
    
    // Pago final si liquida saldo en entrega
    const paymentAmountRaw = formData.get("paymentAmount") as string
    const paymentMethod = (formData.get("paymentMethod") as string) || "EFECTIVO"
    const paymentAmount = paymentAmountRaw ? parseFloat(paymentAmountRaw) : 0

    // Calcular fecha límite de garantía
    const deliveredAt = new Date()
    const warrantyValidUntil = new Date()
    warrantyValidUntil.setDate(warrantyValidUntil.getDate() + warrantyDays)

    const updated = await prisma.$transaction(async (tx) => {
      // Registrar pago si hay liquidación
      if (paymentAmount > 0) {
        await tx.payment.create({
          data: {
            amount: paymentAmount,
            method: paymentMethod,
            serviceOrderId: orderId
          }
        })
      }

      // Actualizar la orden a DELIVERED y guardar póliza de garantía
      const ord = await tx.serviceOrder.update({
        where: { id: orderId },
        data: {
          status: "DELIVERED",
          deliveredAt,
          receivedBy,
          receiverIdDoc,
          deliveryNotes,
          warrantyDays,
          warrantyValidUntil,
          deliveryChecks: deliveryChecksRaw
        }
      })

      return ord
    })

    revalidatePath("/admin/entregas/pendientes")
    revalidatePath("/admin/entregas/entregadas")
    revalidatePath("/admin/servicios")
    revalidatePath("/admin/ordenes")
    revalidatePath(`/admin/servicios/${updated.folio}`)
    revalidatePath(`/admin/entregas/${updated.id}`)
    revalidatePath("/admin")

    return { success: true, folio: updated.folio, id: updated.id }
  } catch (error) {
    console.error("Error processing delivery:", error)
    return { success: false, error: "No se pudo registrar la entrega de la orden" }
  }
}