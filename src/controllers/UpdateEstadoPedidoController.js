import express from 'express';
import { cambiarEstadoPedido } from '../services/UpdateEstadoPedidoService.js';

const router = express.Router();

router.put('/update-estado', async (req, res) => {
  const { id_pedido, id_estado_pedido } = req.body;

  if (!id_pedido || !id_estado_pedido) {
    return res.status(400).json({ error: 'Faltan parámetros: id_pedido y/o id_estado_pedido' });
  }

  try {
    const resultado = await cambiarEstadoPedido(id_pedido, id_estado_pedido);

    if (!resultado) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    res.json({
      mensaje: 'Estado del pedido actualizado correctamente',
      pedido: resultado
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el estado del pedido' });
  }
});

export default router;
