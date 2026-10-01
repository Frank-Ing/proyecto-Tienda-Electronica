# Backend de la tienda electrónica

API REST construida con TypeScript y Hono para PostgreSQL.

## Instalación

```bash
npm install
```

Copiar `.env.example` como `.env` y completar las variables antes de ejecutar la aplicación.

## Endpoints

```text
GET    /health
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/products
GET    /api/products
GET    /api/products/:id
PATCH  /api/products/:id
DELETE /api/products/:id
```

Las operaciones de escritura de productos y logout requieren `Authorization: Bearer <token>`. Las consultas de productos son públicas para permitir mostrar el catálogo.

## Contraseña del administrador

La contraseña inicial del administrador es `1234` y solo se utiliza dentro del backend para generar el hash. El campo `administrador.contrasena` debe contener un hash bcrypt, nunca la contraseña en texto plano. Para generar un hash con 8 saltos:

```bash
npm exec tsx src/scripts/hash-password.ts "tu-contraseña"
```

Después se debe guardar el hash resultante en PostgreSQL.

También puede ejecutarse el seed interno del backend:

```bash
npm exec tsx src/scripts/seed-admin.ts
```

La contraseña `1234` no se expone al frontend ni se devuelve en ninguna respuesta JSON.

## Vercel

La entrada para Vercel es `api/index.ts`, que exporta la aplicación Hono como `default`. No se utiliza `listen()` en producción.

## Estado de ejecución

Este backend contiene código y configuración, pero no se instalaron dependencias, no se conectó a PostgreSQL y no se levantó ningún servicio.
