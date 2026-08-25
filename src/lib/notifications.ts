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
