import { SignJWT, jwtVerify } from 'jose'
import { getEnv } from '../config/env.js'

function secretKey() {
  return new TextEncoder().encode(getEnv().JWT_SECRET)
}

function expiration() {
  return getEnv().JWT_EXPIRES_IN
}

export async function createAccessToken(adminId: number, username: string) {
  return new SignJWT({ username })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setSubject(String(adminId))
    .setIssuedAt()
    .setExpirationTime(expiration())
    .sign(secretKey())
}

export async function verifyAccessToken(token: string) {
  const { payload } = await jwtVerify(token, secretKey())
  if (!payload.sub || typeof payload.username !== 'string') {
    throw new Error('Token inválido')
  }
  return { adminId: Number(payload.sub), username: payload.username }
}
