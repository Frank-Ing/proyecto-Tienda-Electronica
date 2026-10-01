import { apiClient } from '../../lib/api-client'
import { saveSession } from '../../lib/storage'
import type { z } from 'zod'
import type { loginSchema } from './auth.schemas'

type LoginResponse = { data: { token: string; administrador: { identificador: number; usuario: string } } }

export async function login(input: z.infer<typeof loginSchema>) {
  const result = await apiClient<LoginResponse>('/api/auth/login', { method: 'POST', body: JSON.stringify(input) })
  saveSession(result.data.token, result.data.administrador)
  return result.data.administrador
}

export function logout() { return apiClient('/api/auth/logout', { method: 'POST' }) }
