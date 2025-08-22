import express from 'express';
import { actualizarEstadoItems } from '../services/UpdateEstadoitemPedidoService.js';

const router = express.Router();

router.put('/estado', async (req, res) => {
  const { id_pedido, items } = req.body;

  try {
    if (!id_pedido || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Debes enviar id_pedido y un array de items' });
    }

    const resultado = await actualizarEstadoItems(id_pedido, items);
    res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar estados de items' });
  }
});

export default router;
