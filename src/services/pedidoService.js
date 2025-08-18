import { crearPedidoConItems } from '../repositories/pedidoRepository.js';

export const generarPedido = async (pedidoData, items) => {
  if (!items || !Array.isArray(items) || items.length === 0) {
    throw new Error('No hay items para generar el pedido');
  }
  return await crearPedidoConItems(pedidoData, items);
};
