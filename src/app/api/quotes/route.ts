import { NextResponse } from 'next/server';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { name, email, service, message } = await req.json();

    // 1. Guardar en Base de Datos (Neon / Prisma)
    const newQuote = await prisma.quote.create({
      data: {
        name,
        email,
        service,
        message,
      }
    });

    // 2. Generar PDF (Cotización)
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
    doc.text('Cotización Automática', 150, 20);
    doc.text(`ID: ${newQuote.id.slice(-6).toUpperCase()}`, 150, 26);
    
    // Datos del Cliente
    doc.setTextColor(...darkColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Datos del Cliente', 14, 55);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Nombre: ${name}`, 14, 65);
    doc.text(`Correo Electrónico: ${email}`, 14, 72);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-MX')}`, 14, 79);
    
    // Tabla de Servicios
    (doc as any).autoTable({
      startY: 95,
      headStyles: { fillColor: primaryColor, textColor: 255, fontStyle: 'bold' },
      bodyStyles: { textColor: 50 },
      alternateRowStyles: { fillColor: [245, 247, 250] },
      head: [['Descripción del Servicio', 'Estado']],
      body: [
        [service, 'Cotización Solicitada'],
        ['Detalles adicionales:', message || 'N/A'],
      ],
      theme: 'grid',
    });
    
    // Pie de Página
    const finalY = (doc as any).lastAutoTable.finalY + 30;
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Gracias por confiar en Grupo Axtech.', 14, finalY);
    doc.text('Un especialista se pondrá en contacto contigo a la brevedad.', 14, finalY + 6);
    doc.text('Innovación, ingeniería y tecnología para impulsar el crecimiento de tu empresa.', 14, finalY + 12);
    
    // Obtener el PDF en formato ArrayBuffer o Base64
    const pdfBuffer = doc.output('arraybuffer');

    // Retornar el PDF directamente para que el cliente lo descargue
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Cotizacion_AXTECH_${name.replace(/\s+/g, '_')}.pdf"`,
      },
    });

  } catch (error) {
    console.error('Error al procesar la cotización:', error);
    return NextResponse.json(
      { success: false, error: 'Hubo un error al procesar tu solicitud.' },
      { status: 500 }
    );
  }
}
