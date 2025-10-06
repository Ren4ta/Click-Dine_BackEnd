import { crearPedidoConItems } from '../repositories/pedidoRepository.js';

export const generarPedido = async (pedidoData, items) => {
  if (!items || !Array.isArray(items) || items.length === 0) {
    throw new Error('No hay items para generar el pedido');
  }

  const itemsData = items.map(id_item_menu => ({
    id_item_menu,
    id_estado_item: 2
  }));

  return await crearPedidoConItems(pedidoData, itemsData);
};
