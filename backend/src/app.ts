import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { ZodError } from 'zod'
import { getEnv } from './config/env.js'
import authRoutes from './routes/auth.routes.js'
import productRoutes from './routes/product.routes.js'

const app = new Hono()

app.use('/api/*', async (c, next) => {
  const env = getEnv()
  const requestOrigin = c.req.header('Origin') ?? ''
  const allowedOrigins = env.CORS_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean)
  return cors({
    origin: (origin) => allowedOrigins.includes(origin) ? origin : '',
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  })(c, next)
})

app.get('/health', (c) => c.json({ data: { status: 'ok' }, message: 'API funcionando' }))
app.route('/api/auth', authRoutes)
app.route('/api/products', productRoutes)

app.onError((error, c) => {
  if (error instanceof ZodError) {
    return c.json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Los datos enviados no son válidos',
        details: error.issues,
      },
    }, 422)
  }

  console.error(error)
  return c.json({ error: { code: 'INTERNAL_ERROR', message: 'Error interno del servidor' } }, 500)
})

export default app
