import { Hono } from 'hono'
import { authMiddleware } from '../middleware/auth.middleware.js'
import {
  createProductController,
  deleteProductController,
  getProductController,
  listProductsController,
  updateProductController,
} from '../controllers/product.controller.js'

const productRoutes = new Hono()
productRoutes.get('/', listProductsController)
productRoutes.get('/:id', getProductController)
productRoutes.post('/', authMiddleware, createProductController)
productRoutes.patch('/:id', authMiddleware, updateProductController)
productRoutes.delete('/:id', authMiddleware, deleteProductController)

export default productRoutes
