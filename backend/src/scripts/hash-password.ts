import { hashPassword } from '../lib/password.js'

const password = process.argv[2]

if (!password) {
  console.error('Uso: npm exec tsx src/scripts/hash-password.ts <contraseña>')
  process.exit(1)
}

console.log(await hashPassword(password))
