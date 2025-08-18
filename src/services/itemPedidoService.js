import { addItemsToPedido } from '../repositories/itemPedidoRepository.js';

export const agregarItemsAlPedido = async (pedido_id, items) => {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('La lista de items no puede estar vacía');
  }
  return await addItemsToPedido(pedido_id, items);
};
