import jsPDF from "jspdf"
import "jspdf-autotable"

type TicketData = {
  folio: string
  clientName?: string
  total: number
  date: Date
  items: { name: string; quantity: number; price: number }[]
}

export function generateTicket(data: TicketData) {
  const doc = new jsPDF({
    format: [80, 200], // Formato ticket de 80mm
    unit: "mm"
  })

  // Cabecera
  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.text("AXTECH WEB", 40, 10, { align: "center" })
  
  doc.setFontSize(9)
  doc.setFont("helvetica", "normal")
  doc.text("Soluciones Tecnológicas", 40, 15, { align: "center" })
  doc.text(`Folio: ${data.folio}`, 40, 22, { align: "center" })
  doc.text(`Fecha: ${data.date.toLocaleString()}`, 40, 27, { align: "center" })
  if (data.clientName) {
    doc.text(`Cliente: ${data.clientName}`, 40, 32, { align: "center" })
  }

  // Separador
  doc.text("-----------------------------------------", 40, 37, { align: "center" })

  // Items
  let y = 42
  data.items.forEach(item => {
    // Truncar nombre si es muy largo
    const name = item.name.length > 20 ? item.name.substring(0, 20) + "..." : item.name
    
    // Fila 1: Nombre
    doc.text(name, 5, y)
    y += 4
    
    // Fila 2: Cantidad x Precio = Subtotal
    const subtotal = item.quantity * item.price
    doc.text(`${item.quantity} x $${item.price.toFixed(2)}`, 5, y)
    doc.text(`$${subtotal.toFixed(2)}`, 75, y, { align: "right" })
    
    y += 6
  })

  // Separador
  doc.text("-----------------------------------------", 40, y, { align: "center" })
  y += 5

  // Total
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text("TOTAL:", 5, y)
  doc.text(`$${data.total.toFixed(2)}`, 75, y, { align: "right" })
  
  y += 10
  doc.setFontSize(9)
  doc.setFont("helvetica", "normal")
  doc.text("¡Gracias por tu compra!", 40, y, { align: "center" })

  // Abrir en nueva ventana o descargar
  doc.autoPrint()
  window.open(doc.output("bloburl"), "_blank")
}
