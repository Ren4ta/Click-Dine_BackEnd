import { addItemsToPedido } from '../repositories/UpdateEstadoitemPedidoRepository.js';

export const agregarItemsAlPedido = async (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('La lista de items no puede estar vacía');
  }
  return await addItemsToPedido(items);
};
