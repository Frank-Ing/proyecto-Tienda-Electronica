import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL es obligatoria'),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET debe tener al menos 32 caracteres'),
  JWT_EXPIRES_IN: z.string().default('1h'),
  BCRYPT_ROUNDS: z.coerce.number().int().min(4).max(31).default(8),
  FRONTEND_URL: z.string().url().default('http://localhost:4321'),
  CORS_ORIGINS: z.string().default('http://localhost:4321,http://127.0.0.1:4321,https://tiendaelectronica1.infosis.org'),
})

let cachedEnv: z.infer<typeof envSchema> | undefined

export function getEnv() {
  if (!cachedEnv) {
    const result = envSchema.safeParse(process.env)
    if (!result.success) {
      throw new Error(`Configuración inválida: ${result.error.message}`)
    }
    cachedEnv = result.data
  }
  return cachedEnv
}
