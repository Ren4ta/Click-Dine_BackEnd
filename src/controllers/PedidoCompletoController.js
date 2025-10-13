import * as PedidoService from '../services/PedidoCompletoService.js';


export async function getPedido(req, res) {
  const { id_pedido } = req.params;

  if (!id_pedido) return res.status(400).json({ error: 'ID de pedido requerido' });

  try {
    const pedido = await PedidoService.getPedidoCompleto(id_pedido);
    return res.json(pedido);
  } catch (error) {
    console.error('Error al obtener el pedido:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
