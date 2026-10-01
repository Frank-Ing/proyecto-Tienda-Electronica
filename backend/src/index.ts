import app from './app.js'
import { serve } from '@hono/node-server'

if (process.env.NODE_ENV !== 'production') {
  serve({
    fetch: app.fetch,
    port: Number(process.env.PORT ?? 3000),
    hostname: '0.0.0.0',
  }, (info) => {
    console.log(`Backend escuchando en http://localhost:${info.port}`)
  })
}

export default app
