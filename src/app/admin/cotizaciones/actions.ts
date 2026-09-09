'use server'
import { requireAdmin } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// Get next folio COT-YYYY-000001
async function getNextFolio() {
  const year = new Date().getFullYear()
  const prefix = `COT-${year}-`
  const lastQuote = await prisma.quote.findFirst({
    where: { folio: { startsWith: prefix } },
    orderBy: { createdAt: 'desc' },
  })
  if (!lastQuote) return `${prefix}000001`
  
  const lastNumber = parseInt(lastQuote.folio.replace(prefix, ''), 10)
  if (isNaN(lastNumber)) return `${prefix}000001`
  
  const nextNumber = lastNumber + 1
  return `${prefix}${nextNumber.toString().padStart(6, '0')}`
}

export async function createQuote(data: any) {
  await requireAdmin()
  const folio = await getNextFolio()
  
  const quote = await prisma.quote.create({
    data: {
      folio,
      clientName: data.clientName,
      clientRfc: data.clientRfc,
      clientPhone: data.clientPhone,
      clientEmail: data.clientEmail,
      clientAddr: data.clientAddr,
      subtotal: data.subtotal,
      ivaAmount: data.ivaAmount,
      isrAmount: data.isrAmount,
      total: data.total,
      notes: data.notes,
      terms: data.terms,
      date: new Date(data.date),
      items: {
        create: data.items.map((item: any) => ({
          quantity: item.quantity,
          description: item.description,
          unitPrice: item.unitPrice,
          total: item.total
        }))
      }
    }
  })
  
  revalidatePath('/admin/cotizaciones')
  return { success: true, id: quote.id }
}

export async function deleteQuote(id: string) {
  await requireAdmin()
  await prisma.quote.delete({ where: { id } })
  revalidatePath('/admin/cotizaciones')
  return { success: true }
}
