import { Pool } from 'pg'
import { getEnv } from './env.js'

let pool: Pool | undefined

export function getDatabase() {
  if (!pool) {
    pool = new Pool({ connectionString: getEnv().DATABASE_URL })
  }
  return pool
}
