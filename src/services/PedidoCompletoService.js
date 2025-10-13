
import * as PedidoRepository from '../repositories/PedidoCompletoRepository.js';

export async function getPedidoCompleto(id_pedido) {
  const items = await PedidoRepository.getItemsByPedido(id_pedido);

  const estadosMap = {
    2: 'Standby',
    3: 'En proceso',
    4: 'Autorizado',
    5: 'Listo en Cocina',
    6: 'Entregado',
    7: 'Pagado y Finalizado'
  };

  const itemsConEstado = items.map(item => ({
    ...item,
    estado_nombre: estadosMap[item.id_estado_item] || 'Desconocido'
  }));

  return {
    id_pedido,
    items: itemsConEstado
  };
}
