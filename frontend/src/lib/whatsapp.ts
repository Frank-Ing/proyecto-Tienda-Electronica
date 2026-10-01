const WHATSAPP_NUMBER = '59176035687'

export function productWhatsappUrl(product: { modelo_producto: string; categoria: string; precio: number | string }) {
  const message = ['Hola, Tienda Loren.', '', 'Quiero consultar la compra de este producto:', `Producto: ${product.modelo_producto}`, `Categoría: ${product.categoria}`, `Precio: Bs. ${Number(product.precio).toFixed(2)}`].join('\n')
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
