import { z } from 'zod'

export const categories = ['celular', 'laptop', 'monitor', 'teclado', 'mouse', 'audifonos'] as const

const productFields = {
  modelo_producto: z.string().trim().min(1).max(100),
  precio: z.coerce.number().positive(),
  stock: z.coerce.number().int().nonnegative(),
  categoria: z.enum(categories),
  imagen_url: z.string().trim().url().refine(
    (value) => /^https?:\/\//i.test(value),
    'La imagen debe usar una URL HTTP o HTTPS',
  ).optional(),
}

export const createProductSchema = z.object(productFields)
export const updateProductSchema = z.object(productFields).partial().refine(
  (value) => Object.keys(value).length > 0,
  'Debe enviarse al menos un campo para actualizar',
)

export const productIdSchema = z.coerce.number().int().positive()

export const productFilterSchema = z.object({
  modelo: z.string().trim().min(1).optional(),
  categoria: z.enum(categories).optional(),
})
