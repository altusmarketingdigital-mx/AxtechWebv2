'use server'

import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'
import { createSession, deleteSession } from '@/lib/session'

type AuthState = { error?: string; success?: boolean } | undefined

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

export async function register(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const name = (formData.get('name') as string)?.trim()
  const rawEmail = formData.get('email') as string
  const phone = (formData.get('phone') as string)?.trim()
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!name || !rawEmail || !password) {
    return { error: 'Nombre, correo y contraseña son obligatorios' }
  }

  if (password.length < 6) {
    return { error: 'La contraseña debe tener al menos 6 caracteres' }
  }

  if (password !== confirmPassword) {
    return { error: 'Las contraseñas no coinciden' }
  }

  const email = rawEmail.toLowerCase().trim()

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return { error: 'Ya existe una cuenta registrada con este correo electrónico' }
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone: phone || null,
        password: hashedPassword,
        role: 'customer',
      },
    })

    // Asociar órdenes de servicio previas que se hayan registrado con el mismo correo/teléfono
    await prisma.serviceOrder.updateMany({
      where: {
        clientId: null,
        OR: [
          { clientEmail: email },
          ...(phone ? [{ clientPhone: phone }] : []),
        ],
      },
      data: {
        clientId: newUser.id,
      },
    })

    await createSession(newUser.id, newUser.role)
  } catch (error) {
    console.error('Error during registration:', error)
    return { error: 'Ocurrió un error al crear la cuenta. Intenta de nuevo.' }
  }

  redirect('/mi-cuenta')
}

export async function logout() {
  await deleteSession()
  redirect('/')
}
