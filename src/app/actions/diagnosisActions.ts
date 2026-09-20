"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function saveTechnicalDiagnosis(formData: FormData) {
  try {
    const orderId = formData.get("orderId") as string
    const status = (formData.get("status") as any) || "WAITING_APPROVAL"
    const diagnosis = formData.get("diagnosis") as string
    const rootCause = formData.get("rootCause") as string
    const recommendedSolution = formData.get("recommendedSolution") as string
    const requiredParts = formData.get("requiredParts") as string
    const estimatedTime = formData.get("estimatedTime") as string
    const hardwareCheck = formData.get("hardwareCheck") as string
    const softwareCheck = formData.get("softwareCheck") as string
    const repairNotes = formData.get("repairNotes") as string
    const costQuoteRaw = formData.get("costQuote") as string
    const costQuote = costQuoteRaw ? parseFloat(costQuoteRaw) : null

    const updated = await prisma.serviceOrder.update({
      where: { id: orderId },
      data: {
        status,
        diagnosis,
        rootCause,
        recommendedSolution,
        requiredParts,
        estimatedTime,
        hardwareCheck,
        softwareCheck,
        repairNotes,
        costQuote
      }
    })

    revalidatePath("/admin/diagnosticos")
    revalidatePath(`/admin/diagnosticos/${orderId}`)
    revalidatePath(`/admin/servicios/${updated.folio}`)
    revalidatePath("/admin/servicios")
    revalidatePath("/admin/ordenes")

    return { success: true, folio: updated.folio }
  } catch (error) {
    console.error("Error saving diagnosis:", error)
    return { success: false, error: "No se pudo guardar el diagnóstico" }
  }
}