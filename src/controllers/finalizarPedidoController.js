import express from 'express';
import { cerrarPedido } from '../services/finalizarPedidoService.js';

const router = express.Router();

router.put('/cerrar-pedido', async (req, res) => {
  const { id_pedido, id_restaurante, id_medio_pago, id_tipo_factura, propina } = req.body;

  if (!id_pedido || !id_restaurante || !id_medio_pago || !id_tipo_factura || propina === undefined) {
    return res.status(400).json({ error: 'Faltan parámetros obligatorios' });
  }

  try {
    const resultado = await cerrarPedido({ id_pedido, id_restaurante, id_medio_pago, id_tipo_factura, propina });
    res.json({
      mensaje: 'Pedido cerrado y pago registrado correctamente',
      datos_pago: {
        subtotal: resultado.subtotal,
        propina: resultado.propina,
        total: resultado.total
      },
      estados: {
        pedido: resultado.pedidoActualizado,
        mesa: resultado.mesaActualizada
      },
      ticket: resultado.ticketCreado
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
