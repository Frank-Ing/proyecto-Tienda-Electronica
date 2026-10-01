import type { Context, Next } from 'hono'
import { verifyAccessToken } from '../lib/jwt.js'
import type { AuthUser } from '../types/context.js'

export async function authMiddleware(c: Context, next: Next) {
  const header = c.req.header('Authorization')
  const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined

  if (!token) {
    return c.json({ error: { code: 'UNAUTHORIZED', message: 'Se requiere un token Bearer' } }, 401)
  }

  try {
    const user = await verifyAccessToken(token)
    c.set('authUser' as never, user as never)
    await next()
  } catch {
    return c.json({ error: { code: 'UNAUTHORIZED', message: 'Token inválido o expirado' } }, 401)
  }
}
