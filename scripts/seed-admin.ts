/**
 * Script para crear el usuario administrador inicial.
 * Ejecutar UNA SOLA VEZ con:
 *   npx tsx scripts/seed-admin.ts
 */
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@axtech.mx'
  const password = 'Axtech2024!'

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    console.log('✅ El usuario admin ya existe.')
    return
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

  console.log('✅ Usuario admin creado correctamente:')
  console.log(`   Email:    ${user.email}`)
  console.log(`   Password: ${password}`)
  console.log('\n⚠️  Cambia la contraseña en producción.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
