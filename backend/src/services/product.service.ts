import {
  createProduct,
  deleteProduct,
  findProductById,
  listProducts,
  updateProduct,
  type Product,
  type ProductInput,
} from '../repositories/product.repository.js'

export function registerProduct(input: ProductInput) {
  return createProduct(input)
}

export function modifyProduct(id: number, input: Partial<ProductInput>) {
  return updateProduct(id, input)
}

export function getProduct(id: number) {
  return findProductById(id)
}

export function removeProduct(id: number) {
  return deleteProduct(id)
}

export function getProducts(filters: { modelo?: string; categoria?: string }) {
  return listProducts(filters)
}
