'use server'

import { requireAdmin } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getCompanySettings() {
  await requireAdmin()
  
  let settings = await prisma.companySettings.findUnique({
    where: { id: 'default' }
  })
  
  if (!settings) {
    settings = await prisma.companySettings.create({
      data: { id: 'default' }
    })
  }
  
  return settings
}

export async function updateCompanySettings(data: any) {
  await requireAdmin()
  
  await prisma.companySettings.upsert({
    where: { id: 'default' },
    update: data,
    create: { id: 'default', ...data }
  })
  
  revalidatePath('/admin/configuracion')
  revalidatePath('/admin/cotizaciones')
  return { success: true }
}
