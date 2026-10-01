import { comparePassword } from '../lib/password.js'
import { createAccessToken } from '../lib/jwt.js'
import { findAdminByUsername } from '../repositories/admin.repository.js'

export async function login(username: string, password: string) {
  const admin = await findAdminByUsername(username)
  if (!admin || !(await comparePassword(password, admin.contrasena))) {
    return undefined
  }

  const token = await createAccessToken(admin.identificador, admin.usuario)
  return { token, administrador: { identificador: admin.identificador, usuario: admin.usuario } }
}
