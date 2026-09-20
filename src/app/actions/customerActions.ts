"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createCustomer(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = (formData.get("email") as string) || `${Date.now()}@cliente.axtech.mx`
    const phone = formData.get("phone") as string
    const customerType = (formData.get("customerType") as string) || "PARTICULAR"
    const rfc = formData.get("rfc") as string
    const whatsapp = formData.get("whatsapp") as string
    const address = formData.get("address") as string
    const notes = formData.get("notes") as string

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        customerType,
        rfc,
        whatsapp,
        address,
        notes,
        role: "customer"
      }
    })

    revalidatePath("/admin/clientes")
    return { success: true, id: user.id }
  } catch (error: any) {
    console.error("Error creating customer:", error)
    if (error.code === 'P2002') {
      return { success: false, error: "Ya existe un cliente con ese correo electrónico" }
    }
    return { success: false, error: "No se pudo registrar el cliente" }
  }
}