import { updateEstadoItems } from '../repositories/itemPedidoRepository.js';

export const actualizarEstadoItems = async (id_pedido, items) => {
  for (const item of items) {
    if (!item.id_item_pedido || !item.id_estado_item) {
      throw new Error('Cada item debe tener id_item_pedido e id_estado_item');
    }
  }
  return await updateEstadoItems(id_pedido, items);
};
