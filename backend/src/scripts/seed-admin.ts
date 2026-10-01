import { getDatabase } from '../config/database.js'
import { hashPassword } from '../lib/password.js'

const ADMIN_USERNAME = 'Frankcode'
const ADMIN_PASSWORD = '1234'

const database = getDatabase()
const passwordHash = await hashPassword(ADMIN_PASSWORD)

const existing = await database.query(
  'SELECT identificador FROM administrador WHERE usuario = $1 LIMIT 1',
  [ADMIN_USERNAME],
)

if (existing.rowCount) {
  await database.query(
    'UPDATE administrador SET contrasena = $1 WHERE identificador = $2',
    [passwordHash, existing.rows[0].identificador],
  )
  console.log('Administrador actualizado con hash bcrypt.')
} else {
  await database.query(
    'INSERT INTO administrador (usuario, contrasena) VALUES ($1, $2)',
    [ADMIN_USERNAME, passwordHash],
  )
  console.log('Administrador creado con hash bcrypt.')
}

await database.end()
