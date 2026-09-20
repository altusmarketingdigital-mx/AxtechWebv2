"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createExpense(formData: FormData) {
  const concept = formData.get("concept") as string
  const category = (formData.get("category") as string) || "OPERATIVO"
  const amountRaw = formData.get("amount") as string
  const amount = parseFloat(amountRaw) || 0
  const paymentMethod = (formData.get("paymentMethod") as string) || "EFECTIVO"
  const receiptRef = formData.get("receiptRef") as string
  const supplierId = formData.get("supplierId") as string
  const notes = formData.get("notes") as string
  const dateRaw = formData.get("date") as string
  const date = dateRaw ? new Date(dateRaw) : new Date()

  try {
    await prisma.expense.create({
      data: {
        concept,
        category,
        amount,
        paymentMethod,
        receiptRef,
        supplierId: supplierId || null,
        notes,
        date
      }
    })
  } catch (error) {
    console.error("Error creating expense:", error)
    throw new Error("No se pudo registrar el gasto")
  }

  revalidatePath("/admin/finanzas/gastos")
  revalidatePath("/admin/finanzas/gastos/historial")
  revalidatePath("/admin")
  redirect("/admin/finanzas/gastos")
}