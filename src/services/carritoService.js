import { getCarritoByPedido } from '../repositories/carritoRepository.js';

export const listarCarrito = (id_pedido) => {
  return getCarritoByPedido(id_pedido);
};
