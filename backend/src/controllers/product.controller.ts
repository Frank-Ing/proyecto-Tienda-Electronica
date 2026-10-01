import type { Context } from 'hono'
import { createProductSchema, productFilterSchema, productIdSchema, updateProductSchema } from '../schemas/product.schema.js'
import * as productService from '../services/product.service.js'

function parseId(c: Context) {
  return productIdSchema.parse(c.req.param('id'))
}

export async function createProductController(c: Context) {
  const body = createProductSchema.parse(await c.req.json())
  const product = await productService.registerProduct(body)
  return c.json({ data: product, message: 'Producto registrado' }, 201)
}

export async function updateProductController(c: Context) {
  const body = updateProductSchema.parse(await c.req.json())
  const product = await productService.modifyProduct(parseId(c), body)
  if (!product) return c.json({ error: { code: 'NOT_FOUND', message: 'Producto no encontrado' } }, 404)
  return c.json({ data: product, message: 'Producto actualizado' })
}

export async function getProductController(c: Context) {
  const product = await productService.getProduct(parseId(c))
  if (!product) return c.json({ error: { code: 'NOT_FOUND', message: 'Producto no encontrado' } }, 404)
  return c.json({ data: product, message: 'Producto obtenido' })
}

export async function deleteProductController(c: Context) {
  const deleted = await productService.removeProduct(parseId(c))
  if (!deleted) return c.json({ error: { code: 'NOT_FOUND', message: 'Producto no encontrado' } }, 404)
  return c.body(null, 204)
}

export async function listProductsController(c: Context) {
  const filters = productFilterSchema.parse({
    modelo: c.req.query('modelo'),
    categoria: c.req.query('categoria'),
  })
  const products = await productService.getProducts(filters)
  return c.json({ data: products, message: 'Productos obtenidos' })
}
