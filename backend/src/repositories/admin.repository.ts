import { getDatabase } from '../config/database.js'

export type AdminRecord = {
  identificador: number
  usuario: string
  contrasena: string
}

export async function findAdminByUsername(username: string) {
  const result = await getDatabase().query<AdminRecord>(
    'SELECT identificador, usuario, contrasena FROM administrador WHERE usuario = $1 LIMIT 1',
    [username],
  )
  return result.rows[0]
}
