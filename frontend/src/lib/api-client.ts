import { clearSession, getToken } from './storage'

const configuredBaseUrl = import.meta.env.PUBLIC_API_URL
const developmentBaseUrl = typeof window !== 'undefined'
  ? `${window.location.protocol}//${window.location.hostname}:3000`
  : 'http://localhost:3000'
const baseUrl = configuredBaseUrl?.replace(/\/$/, '') ?? (import.meta.env.DEV ? developmentBaseUrl : '')

export async function apiClient<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers)
  headers.set('Content-Type', 'application/json')
  const token = getToken()
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const response = await fetch(`${baseUrl}${path}`, { ...init, headers })
  if (response.status === 401) clearSession()
  if (!response.ok) {
    const error = await response.json().catch(() => null)
    throw new Error(error?.error?.message ?? 'No fue posible completar la solicitud')
  }
  return response.status === 204 ? undefined as T : await response.json() as T
}
