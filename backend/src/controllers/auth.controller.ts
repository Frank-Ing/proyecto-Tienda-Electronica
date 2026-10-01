import type { Context } from 'hono'
import { loginSchema } from '../schemas/auth.schema.js'
import * as authService from '../services/auth.service.js'

export async function loginController(c: Context) {
  const body = loginSchema.parse(await c.req.json())
  const result = await authService.login(body.usuario, body.contrasena)

  if (!result) {
    return c.json({ error: { code: 'INVALID_CREDENTIALS', message: 'Usuario o contraseña incorrectos' } }, 401)
  }

  return c.json({ data: result, message: 'Inicio de sesión exitoso' })
}

export function logoutController(c: Context) {
  return c.json({ data: null, message: 'Sesión cerrada. El cliente debe eliminar el token.' })
}
