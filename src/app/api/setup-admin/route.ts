import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

// RUTA TEMPORAL - ELIMINAR DESPUÉS DE CREAR EL USUARIO ADMIN
// Accede a: /api/setup-admin?secret=axtech-setup-2024

export async function GET(req: Request) {
  const url = new URL(req.url)
  const secret = url.searchParams.get('secret')

  // Protección básica con llave secreta
  if (secret !== 'axtech-setup-2024') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const prisma = new PrismaClient()

  try {
    const email = 'admin@axtech.mx'
    const password = 'Axtech2024!'

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ 
        message: '✅ El usuario admin ya existe.',
        email: existing.email,
        role: existing.role
      })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: 'Administrador',
        role: 'admin',
      },
    })

    return NextResponse.json({
      message: '✅ Usuario admin creado correctamente.',
      email: user.email,
      password: password,
      role: user.role,
      warning: '⚠️ Elimina esta ruta del proyecto después de usarla.'
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
