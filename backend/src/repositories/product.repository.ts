import { getDatabase } from '../config/database.js'

export type Product = {
  identificador_producto: number
  modelo_producto: string
  precio: number
  stock: number
  categoria: string
  imagen_url: string | null
}

export type ProductInput = Omit<Product, 'identificador_producto' | 'imagen_url'> & {
  imagen_url?: string | null
}

function normalizeProduct(product: Product | undefined) {
  if (!product) return product
  return { ...product, precio: Number(product.precio), stock: Number(product.stock) }
}

export async function createProduct(input: ProductInput) {
  const result = await getDatabase().query<Product>(
    `INSERT INTO producto (modelo_producto, precio, stock, categoria, imagen_url)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING identificador_producto, modelo_producto, precio, stock, categoria, imagen_url`,
    [input.modelo_producto, input.precio, input.stock, input.categoria, input.imagen_url ?? null],
  )
  return normalizeProduct(result.rows[0])
}

export async function findProductById(id: number) {
  const result = await getDatabase().query<Product>(
    `SELECT identificador_producto, modelo_producto, precio, stock, categoria, imagen_url
     FROM producto WHERE identificador_producto = $1`,
    [id],
  )
  return normalizeProduct(result.rows[0])
}

export async function updateProduct(id: number, input: Partial<ProductInput>) {
  const fields = Object.entries(input)
  const assignments = fields.map(([field], index) => `"${field}" = $${index + 2}`)
  const values = fields.map(([, value]) => value)
  const result = await getDatabase().query<Product>(
    `UPDATE producto SET ${assignments.join(', ')}
     WHERE identificador_producto = $1
     RETURNING identificador_producto, modelo_producto, precio, stock, categoria, imagen_url`,
    [id, ...values],
  )
  return normalizeProduct(result.rows[0])
}

export async function deleteProduct(id: number) {
  const result = await getDatabase().query(
    'DELETE FROM producto WHERE identificador_producto = $1 RETURNING identificador_producto',
    [id],
  )
  return result.rowCount === 1
}

export async function listProducts(filters: { modelo?: string; categoria?: string }) {
  const conditions: string[] = []
  const values: string[] = []

  if (filters.modelo) {
    values.push(`%${filters.modelo}%`)
    conditions.push(`modelo_producto ILIKE $${values.length}`)
  }
  if (filters.categoria) {
    values.push(filters.categoria)
    conditions.push(`categoria = $${values.length}`)
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''
  const result = await getDatabase().query<Product>(
    `SELECT identificador_producto, modelo_producto, precio, stock, categoria, imagen_url
     FROM producto ${where} ORDER BY identificador_producto`,
    values,
  )
  return result.rows.map(normalizeProduct)
}
