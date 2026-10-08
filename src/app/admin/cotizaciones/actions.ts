'use server'
import { requireAdmin } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

import { sendQuoteNotification } from '@/lib/notifications'

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
    },
    include: {
      items: true
    }
  })

  // Obtener la configuración de la empresa para el correo del administrador
  const settings = await prisma.companySettings.findUnique({
    where: { id: 'default' }
  })
  const adminEmail = settings?.email || 'contacto@axtech.mx'

  // Determinar la URL base de la aplicación
  const baseUrl = process.env.NEXTAUTH_URL || process.env.VERCEL_URL 
    ? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.NEXTAUTH_URL) 
    : 'https://axtech.mx'
  const pdfUrl = `${baseUrl}/admin/cotizaciones/${quote.id}/pdf`

  // Enviar correo electrónico tanto al administrador como al cliente (si tiene)
  try {
    await sendQuoteNotification({
      folio: quote.folio,
      clientName: quote.clientName,
      clientEmail: quote.clientEmail,
      clientPhone: quote.clientPhone,
      total: quote.total,
      subtotal: quote.subtotal,
      ivaAmount: quote.ivaAmount,
      isrAmount: quote.isrAmount,
      notes: quote.notes,
      items: quote.items.map(item => ({
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: item.total
      })),
      pdfUrl
    }, adminEmail)
  } catch (err) {
    console.error('Error enviando notificación de cotización por correo:', err)
  }

  // Generar URL de WhatsApp para el cliente si se proporcionó teléfono
  let whatsappUrl: string | null = null
  if (data.clientPhone && typeof data.clientPhone === 'string') {
    const rawDigits = data.clientPhone.replace(/\D/g, '')
    if (rawDigits.length >= 10) {
      const phoneFormatted = rawDigits.length === 10 ? `52${rawDigits}` : rawDigits
      const messageText = `Hola ${data.clientName}, le compartimos su cotización con folio *${quote.folio}* de AXTECH INGENIERÍA.\n\nTotal: *$${quote.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN*\n\nPuede consultar el documento aquí: ${pdfUrl}\n\n¡Quedamos atentos a sus comentarios!`
      whatsappUrl = `https://wa.me/${phoneFormatted}?text=${encodeURIComponent(messageText)}`
    }
  }
  
  revalidatePath('/admin/cotizaciones')
  return { 
    success: true, 
    id: quote.id, 
    folio: quote.folio,
    whatsappUrl,
    clientPhone: quote.clientPhone,
    clientEmail: quote.clientEmail,
    adminEmail
  }
}

export async function deleteQuote(id: string) {
  await requireAdmin()
  await prisma.quote.delete({ where: { id } })
  revalidatePath('/admin/cotizaciones')
  return { success: true }
}
