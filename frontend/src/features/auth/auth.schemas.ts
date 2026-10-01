import { z } from 'zod'

export const loginSchema = z.object({
  usuario: z.string().trim().min(1, 'Escribe tu usuario').max(15, 'Máximo 15 caracteres'),
  contrasena: z.string().min(1, 'Escribe tu contraseña').max(60, 'Máximo 60 caracteres'),
})
