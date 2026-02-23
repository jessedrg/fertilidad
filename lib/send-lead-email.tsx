import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface LeadData {
  nombre: string
  telefono: string
  zona: string
  tipoAtencion: string
  detalles: string
  conversacion: string
}

export async function sendLeadEmail(data: LeadData) {
  try {
    const result = await resend.emails.send({
      from: "nacería <leads@upnesttalent.com>",
      to: ["jesse@upnesttalent.com"],
      subject: `🍼 Nuevo Lead nacería - ${data.zona || "Sin zona"}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #fef7f0;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="background-color: #ffffff; border: 1px solid #f0e5e0; padding: 40px;">
              <!-- Header -->
              <div style="border-bottom: 1px solid #f0e5e0; padding-bottom: 24px; margin-bottom: 32px;">
                <h1 style="margin: 0; font-size: 24px; font-weight: 400; letter-spacing: -0.5px; color: #8b5a5a;">nacería</h1>
                <p style="margin: 8px 0 0; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #b8a090;">Nuevo lead fertilidad</p>
              </div>
              
              <!-- Lead Info -->
              <div style="margin-bottom: 32px;">
                <h2 style="margin: 0 0 20px; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; color: #b8a090; font-weight: 400;">Información del contacto</h2>
                
                <div style="background-color: #fefbf8; border: 1px solid #f0e5e0; padding: 20px; margin-bottom: 16px;">
                  <p style="margin: 0 0 12px; font-size: 13px; color: #666;"><strong style="color: #8b5a5a;">Nombre:</strong> ${data.nombre}</p>
                  <p style="margin: 0 0 12px; font-size: 13px; color: #666;"><strong style="color: #8b5a5a;">Teléfono:</strong> ${data.telefono}</p>
                  <p style="margin: 0 0 12px; font-size: 13px; color: #666;"><strong style="color: #8b5a5a;">Zona:</strong> ${data.zona}</p>
                  <p style="margin: 0; font-size: 13px; color: #666;"><strong style="color: #8b5a5a;">Tratamiento interesado:</strong> ${data.tipoAtencion}</p>
                </div>
              </div>
              
              <!-- Conversación -->
              <div>
                <h2 style="margin: 0 0 20px; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; color: #b8a090; font-weight: 400;">Conversación completa</h2>
                <div style="background-color: #fefbf8; border: 1px solid #f0e5e0; padding: 20px; white-space: pre-wrap; font-size: 13px; line-height: 1.6; color: #444;">
${data.conversacion}
                </div>
              </div>
              
              <!-- Footer -->
              <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #f0e5e0;">
                <p style="margin: 0; font-size: 11px; color: #b8a090; letter-spacing: 0.5px;">
                  Lead generado automáticamente desde naceria.com
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    console.log("[v0] Email sent successfully:", result)
    return { success: true, data: result }
  } catch (error) {
    console.error("[v0] Error sending email:", error)
    return { success: false, error }
  }
}
