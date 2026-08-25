'use server'

import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'
import { createSession, deleteSession } from '@/lib/session'

type AuthState = { error: string } | undefined

export async function login(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Correo y contraseña son requeridos' }
  }

  let userId: string

  try {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user || !user.password) {
      return { error: 'Credenciales incorrectas' }
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return { error: 'Credenciales incorrectas' }
    }

    userId = user.id
    await createSession(user.id, user.role)
  } catch {
    return { error: 'Error del servidor, intenta más tarde' }
  }

  redirect('/admin')
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}
