'use server'

import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'
import { createSession, deleteSession } from '@/lib/session'

type AuthState = { error: string } | undefined

export async function login(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const rawEmail = formData.get('email') as string
  const password = formData.get('password') as string

  if (!rawEmail || !password) {
    return { error: 'Correo y contraseña son requeridos' }
  }

  const email = rawEmail.toLowerCase().trim()
  let role: string

  try {
    let user = await prisma.user.findUnique({ where: { email } })

    // Si es el usuario admin por defecto y no existe en la BD, crearlo automáticamente
    if (!user && email === 'admin@axtech.mx' && password === 'Axtech2024!') {
      const hashedPassword = await bcrypt.hash('Axtech2024!', 12)
      user = await prisma.user.create({
        data: {
          email: 'admin@axtech.mx',
          password: hashedPassword,
          name: 'Administrador',
          role: 'admin',
        },
      })
    }

    if (!user || !user.password) {
      return { error: 'Credenciales incorrectas' }
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return { error: 'Credenciales incorrectas' }
    }

    role = user.role
    await createSession(user.id, user.role)
  } catch (error) {
    console.error('Error during login:', error)
    return { error: 'Error del servidor, intenta más tarde' }
  }

  // Redirigir según el rol
  if (role === 'admin' || role === 'technician') {
    redirect('/admin')
  } else {
    redirect('/mi-cuenta')
  }
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}
