# Frontend de la tienda electrónica

Frontend modular construido con Astro, Tailwind CSS, TypeScript y Zod.

## Integración

Configurar `PUBLIC_API_URL` con la URL del backend. El cliente HTTP envía JSON y agrega automáticamente el JWT almacenado en `localStorage`.

## Astro estático y Vercel

El proyecto usa `output: 'static'`. No utiliza SSR, Node.js Runtime ni `@astrojs/vercel`; Vercel puede desplegar el resultado estático generado por `astro build`.

En Vercel configurar antes del build:

```text
PUBLIC_API_URL=https://dominio-del-backend.vercel.app
```

En desarrollo, el cliente utiliza `http://localhost:3000` únicamente cuando `import.meta.env.DEV` está activo.

El backend debe permitir mediante CORS el dominio de producción del frontend y el origen local `http://localhost:4321`.

## Sesión

El frontend solo guarda el token y los datos públicos del administrador. La contraseña nunca se guarda, se precarga ni se incluye en el código frontend.

## Estado

El código fue creado sin instalar dependencias ni levantar Astro o el backend.
