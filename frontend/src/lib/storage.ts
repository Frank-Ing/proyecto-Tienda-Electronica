const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'

export type SessionUser = { identificador: number; usuario: string }

export function getToken() { return typeof localStorage === 'undefined' ? null : localStorage.getItem(TOKEN_KEY) }
export function getUser(): SessionUser | null {
  if (typeof localStorage === 'undefined') return null
  const value = localStorage.getItem(USER_KEY)
  return value ? JSON.parse(value) as SessionUser : null
}
export function saveSession(token: string, user: SessionUser) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}
export function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}
