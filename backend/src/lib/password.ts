import bcrypt from 'bcrypt'
import { getEnv } from '../config/env.js'

export function hashPassword(password: string) {
  return bcrypt.hash(password, getEnv().BCRYPT_ROUNDS)
}

export function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash)
}
