'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

type ProductRow = {
  sku: string
  name: string
  description?: string
  price: number
  stock: number
  category?: string
}

export async function importProducts(rows: ProductRow[]) {
  const results = { created: 0, skipped: 0, errors: [] as string[] }

  for (const row of rows) {
    try {
      // Validar campos obligatorios
      if (!row.sku || !row.name || !row.price) {
        results.skipped++
        results.errors.push(`Fila SKU="${row.sku || '?'}" omitida: faltan campos obligatorios`)
        continue
      }

      // Buscar o crear categoría si se especificó
      let categoryId: string | undefined
      if (row.category) {
        const cat = await prisma.category.upsert({
          where: { name: row.category.trim() },
          update: {},
          create: { name: row.category.trim() },
        })
        categoryId = cat.id
      }

      // Crear o actualizar el producto por SKU
      await prisma.product.upsert({
        where: { sku: row.sku.trim() },
        update: {
          name: row.name.trim(),
          description: row.description?.trim() || null,
          price: Number(row.price),
          stock: Number(row.stock) || 0,
          categoryId: categoryId || null,
        },
        create: {
          sku: row.sku.trim(),
          name: row.name.trim(),
          description: row.description?.trim() || null,
          price: Number(row.price),
          stock: Number(row.stock) || 0,
          categoryId: categoryId || null,
        },
      })

      results.created++
    } catch (err: any) {
      results.skipped++
      results.errors.push(`SKU "${row.sku}": ${err.message}`)
    }
  }

  revalidatePath('/admin/inventario')
  return results
}
