import { NextResponse } from 'next/server';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { technician, clientName, serviceType, serviceDate, report } = await req.json();

    // 1. Guardar en Base de Datos (Neon / Prisma)
    const newOrder = await prisma.serviceOrder.create({
      data: {
        technician,
        clientName,
        serviceType,
        serviceDate,
        report,
      }
    });

    // 2. Generar PDF (Orden de Servicio)
    const doc = new jsPDF();
    
    // Configuración de colores corporativos
    const primaryColor: [number, number, number] = [15, 98, 209]; // #0F62D1
    const darkColor: [number, number, number] = [2, 4, 10];
    
    // Encabezado
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('AXTECH INGENIERÍA', 14, 25);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Orden de Servicio Técnico', 135, 20);
    doc.text(`Folio: ORD-${newOrder.id.slice(-6).toUpperCase()}`, 135, 26);
    
    // Datos del Cliente y Servicio
    doc.setTextColor(...darkColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Información del Servicio', 14, 55);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Técnico Asignado: ${technician}`, 14, 65);
    doc.text(`Cliente / Empresa: ${clientName}`, 14, 72);
    doc.text(`Fecha del Servicio: ${serviceDate}`, 14, 79);
    doc.text(`Tipo de Servicio: ${serviceType}`, 14, 86);
    
    // Tabla de Detalles (Reporte Técnico)
    (doc as any).autoTable({
      startY: 95,
      headStyles: { fillColor: primaryColor, textColor: 255, fontStyle: 'bold' },
      bodyStyles: { textColor: 50 },
      alternateRowStyles: { fillColor: [245, 247, 250] },
      head: [['Reporte Técnico Detallado']],
      body: [
        [report || 'Sin observaciones adicionales.'],
      ],
      theme: 'grid',
    });
    
    // Pie de Página y Firmas
    const finalY = (doc as any).lastAutoTable.finalY + 30;
    
    // Líneas de firma
    doc.setDrawColor(150);
    doc.line(20, finalY, 80, finalY);
    doc.line(130, finalY, 190, finalY);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Firma del Técnico', 35, finalY + 6);
    doc.text('Firma del Cliente', 145, finalY + 6);

    doc.text('Ingeniería Especializada en Soluciones Tecnológicas.', 14, finalY + 25);
    
    // Obtener el PDF en formato ArrayBuffer o Base64
    const pdfBuffer = doc.output('arraybuffer');

    // Retornar el PDF directamente para que el cliente lo descargue
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="OrdenServicio_AXTECH_${clientName.replace(/\s+/g, '_')}.pdf"`,
      },
    });

  } catch (error) {
    console.error('Error al procesar la orden de servicio:', error);
    return NextResponse.json(
      { success: false, error: 'Hubo un error al procesar tu solicitud.' },
      { status: 500 }
    );
  }
}
