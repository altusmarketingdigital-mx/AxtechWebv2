import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/lib/session'

const adminRoutes = ['/admin']
const customerRoutes = ['/mi-cuenta']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  const isAdminRoute = adminRoutes.some(r => path.startsWith(r))
  const isCustomerRoute = customerRoutes.some(r => path.startsWith(r))

  const cookie = req.cookies.get('session')?.value
  const session = await decrypt(cookie)

  // Sin sesión → redirigir a login
  if ((isAdminRoute || isCustomerRoute) && !session) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // Ruta de admin: solo admin o technician
  if (isAdminRoute && session) {
    const role = session.role as string
    if (role !== 'admin' && role !== 'technician') {
      return NextResponse.redirect(new URL('/mi-cuenta', req.nextUrl))
    }
  }

  // Si ya tiene sesión e intenta ir al login o registro, redirigir según rol
  if ((path === '/login' || path === '/registro') && session) {
    const role = session.role as string
    if (role === 'admin' || role === 'technician') {
      return NextResponse.redirect(new URL('/admin', req.nextUrl))
    } else {
      return NextResponse.redirect(new URL('/mi-cuenta', req.nextUrl))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
