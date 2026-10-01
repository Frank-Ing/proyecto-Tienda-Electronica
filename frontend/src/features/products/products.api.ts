import { apiClient } from '../../lib/api-client'

export type Product = { identificador_producto: number; modelo_producto: string; precio: number; stock: number; categoria: string; imagen_url: string | null }
type ProductResponse = { data: Product[] }
type SingleProductResponse = { data: Product }
export type ProductInput = Omit<Product, 'identificador_producto' | 'imagen_url'> & { imagen_url?: string }

export function getProducts(filters: { modelo?: string; categoria?: string } = {}) {
  const query = new URLSearchParams()
  if (filters.modelo) query.set('modelo', filters.modelo)
  if (filters.categoria) query.set('categoria', filters.categoria)
  return apiClient<ProductResponse>(`/api/products${query.size ? `?${query}` : ''}`)
}
export function getProduct(id: number) { return apiClient<SingleProductResponse>(`/api/products/${id}`) }
export function createProduct(input: ProductInput) { return apiClient('/api/products', { method: 'POST', body: JSON.stringify(input) }) }
export function updateProduct(id: number, input: Partial<ProductInput>) { return apiClient(`/api/products/${id}`, { method: 'PATCH', body: JSON.stringify(input) }) }
export function deleteProduct(id: number) { return apiClient(`/api/products/${id}`, { method: 'DELETE' }) }
