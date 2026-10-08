import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY || "re_mock_key")

export async function sendOrderNotification(email: string, folio: string, status: string) {
  if (!email) return

  try {
    // Si no hay API KEY real, solo hacemos un console.log simulando el envío
    if (!process.env.RESEND_API_KEY) {
      console.log(`[SIMULACIÓN NOTIFICACIÓN] Correo enviado a ${email}: Tu orden ${folio} está ahora en estado: ${status}`)
      return { success: true, simulated: true }
    }

    const { data, error } = await resend.emails.send({
      from: "Axtech Web <notificaciones@axtech.mx>",
      to: email,
      subject: `Actualización de Orden ${folio} - Axtech`,
      html: `
        <div>
          <h2>¡Hola! Tenemos noticias sobre tu equipo</h2>
          <p>Tu orden de servicio con folio <strong>${folio}</strong> ha cambiado al estado: <strong>${status}</strong>.</p>
          <p>Puedes consultar más detalles y tu presupuesto en línea visitando nuestra página web.</p>
          <br/>
          <p>Gracias por tu preferencia,<br/>El equipo de Axtech</p>
        </div>
      `,
    })

    if (error) {
      console.error("Resend Error:", error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (err) {
    console.error("Failed to send email:", err)
    return { success: false, error: err }
  }
}

export async function sendAdminAlert(subject: string, message: string) {
  // Simular envío de alerta al administrador (Por email o WhatsApp en el futuro)
  console.log(`[ALERTA ADMINISTRADOR] ${subject} - ${message}`)
  return { success: true }
}

export interface QuoteNotificationData {
  folio: string
  clientName: string
  clientEmail?: string | null
  clientPhone?: string | null
  total: number
  subtotal?: number
  ivaAmount?: number
  isrAmount?: number
  notes?: string | null
  items: Array<{
    description: string
    quantity: number
    unitPrice: number
    total: number
  }>
  pdfUrl?: string
}

export async function sendQuoteNotification(data: QuoteNotificationData, adminEmail?: string | null) {
  const recipients: string[] = []
  
  if (adminEmail && adminEmail.trim()) {
    recipients.push(adminEmail.trim())
  }
  if (data.clientEmail && data.clientEmail.trim() && !recipients.includes(data.clientEmail.trim())) {
    recipients.push(data.clientEmail.trim())
  }

  if (recipients.length === 0) {
    console.log('[NOTIFICACIÓN COTIZACIÓN] No hay correos destinatarios configurados.')
    return { success: true, simulated: true }
  }

  const itemsHtml = data.items.map(item => `
    <tr style="border-bottom: 1px solid #e5e7eb;">
      <td style="padding: 8px 12px; font-size: 14px; color: #374151;">${item.description}</td>
      <td style="padding: 8px 12px; font-size: 14px; text-align: center; color: #374151;">${item.quantity}</td>
      <td style="padding: 8px 12px; font-size: 14px; text-align: right; color: #374151;">$${item.unitPrice.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</td>
      <td style="padding: 8px 12px; font-size: 14px; text-align: right; font-weight: 600; color: #111827;">$${item.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</td>
    </tr>
  `).join('')

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
      <div style="background: #2563eb; color: #ffffff; padding: 24px; text-align: center;">
        <h1 style="margin: 0; font-size: 22px; font-weight: bold; letter-spacing: 0.5px;">AXTECH INGENIERÍA</h1>
        <p style="margin: 6px 0 0; font-size: 14px; opacity: 0.9;">Cotización Generada: <strong>${data.folio}</strong></p>
      </div>

      <div style="padding: 24px;">
        <p style="font-size: 15px; color: #374151; margin-top: 0;">
          Estimado(a) <strong>${data.clientName}</strong>,
        </p>
        <p style="font-size: 14px; color: #4b5563; line-height: 1.5;">
          Le compartimos el detalle de la cotización realizada. A continuación encontrará el resumen de los conceptos y el monto total:
        </p>

        <table style="width: 100%; border-collapse: collapse; margin-top: 16px; margin-bottom: 20px;">
          <thead>
            <tr style="background: #f9fafb; border-bottom: 2px solid #e5e7eb;">
              <th style="padding: 10px 12px; text-align: left; font-size: 12px; text-transform: uppercase; color: #6b7280;">Descripción</th>
              <th style="padding: 10px 12px; text-align: center; font-size: 12px; text-transform: uppercase; color: #6b7280;">Cant.</th>
              <th style="padding: 10px 12px; text-align: right; font-size: 12px; text-transform: uppercase; color: #6b7280;">Precio U.</th>
              <th style="padding: 10px 12px; text-align: right; font-size: 12px; text-transform: uppercase; color: #6b7280;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
          <tfoot>
            ${data.subtotal !== undefined ? `
              <tr>
                <td colspan="3" style="padding: 8px 12px; text-align: right; font-size: 13px; color: #6b7280;">Subtotal:</td>
                <td style="padding: 8px 12px; text-align: right; font-size: 14px; color: #374151;">$${data.subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</td>
              </tr>
            ` : ''}
            ${data.ivaAmount !== undefined && data.ivaAmount > 0 ? `
              <tr>
                <td colspan="3" style="padding: 8px 12px; text-align: right; font-size: 13px; color: #6b7280;">IVA:</td>
                <td style="padding: 8px 12px; text-align: right; font-size: 14px; color: #374151;">$${data.ivaAmount.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</td>
              </tr>
            ` : ''}
            ${data.isrAmount !== undefined && data.isrAmount > 0 ? `
              <tr>
                <td colspan="3" style="padding: 8px 12px; text-align: right; font-size: 13px; color: #dc2626;">Retención ISR:</td>
                <td style="padding: 8px 12px; text-align: right; font-size: 14px; color: #dc2626; font-weight: 600;">-$${data.isrAmount.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</td>
              </tr>
            ` : ''}
            <tr style="border-top: 2px solid #e5e7eb;">
              <td colspan="3" style="padding: 12px; text-align: right; font-size: 16px; font-weight: bold; color: #111827;">TOTAL:</td>
              <td style="padding: 12px; text-align: right; font-size: 18px; font-weight: bold; color: #2563eb;">$${data.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN</td>
            </tr>
          </tfoot>
        </table>

        ${data.notes ? `
          <div style="background: #f8fafc; border-left: 4px solid #2563eb; padding: 12px; margin-bottom: 20px; font-size: 13px; color: #475569;">
            <strong>Notas / Observaciones:</strong><br/>
            ${data.notes}
          </div>
        ` : ''}

        ${data.pdfUrl ? `
          <div style="text-align: center; margin: 28px 0 16px;">
            <a href="${data.pdfUrl}" style="background: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block;">
              Ver y Descargar Cotización en PDF
            </a>
          </div>
        ` : ''}

        <p style="font-size: 12px; color: #9ca3af; text-align: center; margin-top: 24px; border-top: 1px solid #f3f4f6; pt-4">
          Este es un correo automático emitido por el sistema de AXTECH INGENIERÍA.<br/>
          Si tiene dudas o requiere aclaraciones, favor de responder a este correo o comunicarse con nosotros.
        </p>
      </div>
    </div>
  `

  try {
    if (!process.env.RESEND_API_KEY) {
      console.log(`[SIMULACIÓN NOTIFICACIÓN COTIZACIÓN] Correos a [${recipients.join(', ')}]: Folio ${data.folio}, Total: $${data.total}`)
      return { success: true, simulated: true }
    }

    const { data: resendData, error } = await resend.emails.send({
      from: "Axtech Web <notificaciones@axtech.mx>",
      to: recipients,
      subject: `Cotización ${data.folio} - AXTECH INGENIERÍA`,
      html,
    })

    if (error) {
      console.error("Resend Error al enviar cotización:", error)
      return { success: false, error }
    }

    return { success: true, data: resendData }
  } catch (err) {
    console.error("Error al enviar correo de cotización:", err)
    return { success: false, error: err }
  }
}
