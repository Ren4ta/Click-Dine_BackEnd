import { updateEstadoPedido } from '../repositories/UpdateEstadoPedidoRespository.js';

export const cambiarEstadoPedido = (id_pedido, id_estado_pedido) => {
  return updateEstadoPedido(id_pedido, id_estado_pedido);
};
