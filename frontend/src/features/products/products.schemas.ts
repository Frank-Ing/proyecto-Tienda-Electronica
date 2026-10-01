import { z } from 'zod'

export const categories = ['celular', 'laptop', 'monitor', 'teclado', 'mouse', 'audifonos'] as const
export const productSchema = z.object({
  modelo_producto: z.string().trim().min(1, 'El modelo es obligatorio').max(100),
  precio: z.coerce.number().positive('El precio debe ser mayor que cero'),
  stock: z.coerce.number().int().nonnegative('El stock no puede ser negativo'),
  categoria: z.enum(categories, { errorMap: () => ({ message: 'Selecciona una categoría' }) }),
  imagen_url: z.string().trim().url('Escribe una URL válida').refine(
    (value) => /^https?:\/\//i.test(value),
    'La imagen debe usar HTTP o HTTPS',
  ).optional().or(z.literal('')),
})
